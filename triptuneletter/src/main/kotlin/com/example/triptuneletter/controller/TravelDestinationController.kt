package com.example.triptuneletter.controller

import com.example.triptuneletter.data.TravelDestinationRequest
import com.example.triptuneletter.data.TravelDestinationRequestWithFile
import com.example.triptuneletter.data.TravelDestinationResponse
import com.example.triptuneletter.service.FileService
import com.example.triptuneletter.service.TravelDestinationService
import io.swagger.v3.oas.annotations.Operation
import jakarta.validation.Valid
import org.springframework.core.io.FileSystemResource
import org.springframework.core.io.Resource
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken
import org.springframework.web.bind.annotation.*
import java.nio.file.Files
import java.util.UUID

@RestController
@RequestMapping("/api/destinations")
class TravelDestinationController(
    private val travelDestinationService: TravelDestinationService,
    private val fileService: FileService
) {

    @Operation(summary = "모든 여행지 조회", description = "저장된 모든 여행지를 조회합니다.")
    @GetMapping
    fun getAllDestinations(): ResponseEntity<List<TravelDestinationResponse>> {
        return ResponseEntity.ok(travelDestinationService.getAllDestinations())
    }

    @Operation(summary = "여행지 상세 조회", description = "특정 ID의 여행지를 조회합니다.")
    @GetMapping("/{id}")
    fun getDestination(@PathVariable id: UUID): ResponseEntity<TravelDestinationResponse> {
        return ResponseEntity.ok(travelDestinationService.getDestination(id))
    }

    @Operation(summary = "본인이 작성한 여행지 조회", description = "로그인한 사용자가 등록한 모든 여행지를 조회합니다.")
    @GetMapping("/me")
    fun getMyDestinations(token: JwtAuthenticationToken): ResponseEntity<List<TravelDestinationResponse>> {
        return ResponseEntity.ok(travelDestinationService.getMyDestinations(token))
    }

    @Operation(summary = "여행지 검색", description = "여행지 이름에 특정 키워드가 포함된 여행지를 검색합니다.")
    @GetMapping("/search")
    fun searchDestinations(@RequestParam keyword: String): ResponseEntity<List<TravelDestinationResponse>> {
        return ResponseEntity.ok(travelDestinationService.searchDestinations(keyword))
    }

    @Operation(summary = "여행지 추천", description = "자연어 문장을 바탕으로 유사한 여행지를 추천합니다.")
    @GetMapping("/recommend")
    fun recommendDestinations(@RequestParam sentence: String): ResponseEntity<List<TravelDestinationResponse>> {
        return ResponseEntity.ok(travelDestinationService.recommendDestinations(sentence))
    }

    @Operation(summary = "전체 여행지 재인덱싱", description = "DB의 모든 여행지를 벡터 DB에 다시 저장합니다. (관리자용)")
    @PostMapping("/reindex")
    fun reindexAllDestinations(): ResponseEntity<String> {
        travelDestinationService.reindexAllDestinations()
        return ResponseEntity.ok("Reindexing triggered")
    }

    @Operation(summary = "이미지 조회", description = "여행지 이미지를 조회합니다.")
    @GetMapping("/images/{fileName}")
    fun getImage(@PathVariable fileName: String): ResponseEntity<Resource> {
        val file = fileService.getFile(fileName)
        val resource = FileSystemResource(file)
        val contentType = Files.probeContentType(file.toPath())

        return ResponseEntity.ok()
            .contentType(MediaType.parseMediaType(contentType ?: "application/octet-stream"))
            .body(resource)
    }

    @Operation(summary = "여행지 생성", description = "새로운 여행지를 등록합니다.")
    @PostMapping(consumes = [MediaType.MULTIPART_FORM_DATA_VALUE])
    fun createDestination(
        @Valid @ModelAttribute dto: TravelDestinationRequestWithFile,
        token: JwtAuthenticationToken
    ): ResponseEntity<UUID> {
        val request = TravelDestinationRequest(
            name = dto.name,
            description = dto.description,
            location = dto.location,
            city = dto.city
        )
        val destinationId = travelDestinationService.createDestination(request, token, dto.files)
        return ResponseEntity.status(HttpStatus.CREATED).body(destinationId)
    }

    @Operation(summary = "여행지 수정", description = "특정 ID의 여행지 정보를 수정합니다.")
    @PutMapping("/{id}", consumes = [MediaType.MULTIPART_FORM_DATA_VALUE])
    fun updateDestination(
        @PathVariable id: UUID,
        @Valid @ModelAttribute dto: TravelDestinationRequestWithFile,
        token: JwtAuthenticationToken
    ): ResponseEntity<Unit> {
        val request = TravelDestinationRequest(
            name = dto.name,
            description = dto.description,
            location = dto.location,
            city = dto.city
        )
        travelDestinationService.updateDestination(id, request, token, dto.files)
        return ResponseEntity.noContent().build()
    }

    @Operation(summary = "여행지 삭제", description = "특정 ID의 여행지를 삭제합니다.")
    @DeleteMapping("/{id}")
    fun deleteDestination(
        @PathVariable id: UUID,
        token: JwtAuthenticationToken
    ): ResponseEntity<Unit> {
        travelDestinationService.deleteDestination(id, token)
        return ResponseEntity.noContent().build()
    }
}
