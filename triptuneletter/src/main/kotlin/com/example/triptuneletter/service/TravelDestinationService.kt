package com.example.triptuneletter.service

import com.example.triptuneletter.data.*
import com.example.triptuneletter.entity.TravelDestination
import com.example.triptuneletter.entity.User
import com.example.triptuneletter.repository.TravelDestinationRepository
import org.springframework.ai.document.Document
import org.springframework.ai.vectorstore.SearchRequest
import org.springframework.ai.vectorstore.VectorStore
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.multipart.MultipartFile
import java.util.UUID

@Service
@Transactional
class TravelDestinationService(
    private val travelDestinationRepository: TravelDestinationRepository,
    private val fileService: FileService,
    private val vectorStore: VectorStore
) {

    @PreAuthorize("hasRole('USER')")
    fun createDestination(
        request: TravelDestinationRequest,
        token: JwtAuthenticationToken,
        files: List<MultipartFile>? = null
    ): UUID? {
        val user = User(
            userId = token.name,
            userName = token.tokenAttributes["preferred_username"] as? String ?: "Unknown"
        )
        val imageUrls = files?.let { fileService.saveFiles(it) } ?: mutableListOf()

        val destination = TravelDestination(
            name = request.name,
            description = request.description,
            location = request.location,
            user = user,
            country = request.city?.country,
            city = request.city,
            imageUrls = imageUrls.toMutableList()
        )
        val saved = travelDestinationRepository.save(destination)
        indexDestination(saved)
        return saved.id
    }

    private fun indexDestination(destination: TravelDestination) {
        val content = """
            여행지: ${destination.name}
            설명: ${destination.description ?: ""}
            위치: ${destination.location}
            국가: ${destination.country?.description ?: ""}
            도시: ${destination.city?.description ?: ""}
        """.trimIndent()

        val doc = Document(
            destination.id.toString(),
            content,
            mapOf("type" to "destination", "destinationId" to destination.id.toString())
        )
        vectorStore.accept(listOf(doc))
    }

    @Transactional(readOnly = true)
    fun getAllDestinations(): List<TravelDestinationResponse> {
        return travelDestinationRepository.findAllByOrderByCreatedAtDesc().map { it.toResponse() }
    }

    @Transactional(readOnly = true)
    fun getDestination(id: UUID): TravelDestinationResponse {
        val destination = travelDestinationRepository.findById(id)
            .orElseThrow { NoSuchElementException("여행지를 찾을 수 없습니다.") }
        return destination.toResponse()
    }

    @Transactional(readOnly = true)
    fun getMyDestinations(token: JwtAuthenticationToken): List<TravelDestinationResponse> {
        return travelDestinationRepository.findAllByUserUserIdOrderByCreatedAtDesc(token.name).map { it.toResponse() }
    }

    @Transactional(readOnly = true)
    fun searchDestinations(keyword: String): List<TravelDestinationResponse> {
        return travelDestinationRepository.findByNameContainingIgnoreCaseOrderByCreatedAtDesc(keyword).map { it.toResponse() }
    }

    @Transactional(readOnly = true)
    fun recommendDestinations(sentence: String): List<TravelDestinationResponse> {
        val searchRequest = SearchRequest.builder()
            .query(sentence)
            .topK(5)
            .similarityThreshold(0.5)
            .build()

        val docs = vectorStore.similaritySearch(searchRequest)
        val destinationIds = docs.mapNotNull { doc -> doc.metadata["destinationId"]?.toString() }
            .map { UUID.fromString(it) }

        val destinationsMap = travelDestinationRepository.findAllById(destinationIds).associateBy { it.id }
        return destinationIds.mapNotNull { destinationsMap[it]?.toResponse() }
    }

    fun reindexAllDestinations() {
        val destinations = travelDestinationRepository.findAll()
        destinations.forEach { indexDestination(it) }
    }

    @PreAuthorize("hasRole('ADMIN') or @travelDestinationService.isOwner(#id, #token.name)")
    fun updateDestination(
        id: UUID,
        request: TravelDestinationRequest,
        token: JwtAuthenticationToken,
        files: List<MultipartFile>? = null
    ) {
        val destination = travelDestinationRepository.findById(id)
            .orElseThrow { NoSuchElementException("여행지를 찾을 수 없습니다.") }

        destination.name = request.name
        destination.description = request.description
        destination.location = request.location
        destination.country = request.city?.country
        destination.city = request.city

        files?.let {
            if (it.isNotEmpty()) {
                fileService.deleteFiles(destination.imageUrls)
                val newImageUrls = fileService.saveFiles(it)
                destination.imageUrls.clear()
                destination.imageUrls.addAll(newImageUrls)
            }
        }
        indexDestination(destination)
    }

    @PreAuthorize("hasRole('ADMIN') or @travelDestinationService.isOwner(#id, #token.name)")
    fun deleteDestination(id: UUID, token: JwtAuthenticationToken) {
        val destination = travelDestinationRepository.findById(id)
            .orElseThrow { NoSuchElementException("여행지를 찾을 수 없습니다.") }

        fileService.deleteFiles(destination.imageUrls)
        travelDestinationRepository.delete(destination)
        vectorStore.delete(listOf(id.toString()))
    }

    @Transactional(readOnly = true)
    fun isOwner(id: UUID, userId: String): Boolean {
        val destination = travelDestinationRepository.findById(id).orElse(null) ?: return false
        return destination.user.userId == userId
    }

    private fun TravelDestination.toResponse(): TravelDestinationResponse {
        return TravelDestinationResponse(
            id = this.id,
            name = this.name,
            description = this.description ?: "",
            location = this.location,
            userName = this.user.userName,
            country = this.country,
            city = this.city,
            imageUrls = this.imageUrls.map { "/api/destinations/images/$it" },
            createdAt = this.createdAt,
            updatedAt = this.updatedAt
        )
    }
}