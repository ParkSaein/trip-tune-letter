package com.example.triptuneletter.service

import com.example.triptuneletter.data.*
import com.example.triptuneletter.entity.User
import com.example.triptuneletter.entity.NewsComment
import com.example.triptuneletter.entity.ProductComment
import com.example.triptuneletter.entity.TravelDestinationComment
import com.example.triptuneletter.repository.*
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.UUID

@Service
@Transactional
class CommentService(
    private val newsRepository: NewsRepository,
    private val productRepository: ProductRepository,
    private val travelDestinationRepository: TravelDestinationRepository,
    private val newsCommentRepository: NewsCommentRepository,
    private val productCommentRepository: ProductCommentRepository,
    private val travelDestinationCommentRepository: TravelDestinationCommentRepository,
) {
    @PreAuthorize("hasRole('USER')")
    fun addNewsComment(
        request: NewsCommentRequest,
        token: JwtAuthenticationToken
    ) {
        val user = User(
            userId = token.name,
            userName = token.tokenAttributes["preferred_username"] as? String ?: "Unknown"
        )
        val news = newsRepository.findById(request.newsId)
            .orElseThrow { NoSuchElementException("뉴스를 찾을 수 없습니다.") }
        val comment = NewsComment(
            content = request.content,
            user = user,
            news = news
        )
        newsCommentRepository.save(comment)
    }

    @PreAuthorize("hasRole('USER')")
    fun addProductComment(
        request: ProductCommentRequest,
        token: JwtAuthenticationToken
    ) {
        val user = User(
            userId = token.name,
            userName = token.tokenAttributes["preferred_username"] as? String ?: "Unknown"
        )
        val product = productRepository.findById(request.productId)
            .orElseThrow { NoSuchElementException("상품을 찾을 수 없습니다.") }
        val comment = ProductComment(
            content = request.content,
            user = user,
            product = product
        )
        productCommentRepository.save(comment)
    }

    @PreAuthorize("hasRole('USER')")
    fun addTravelDestinationComment(
        request: TravelDestinationCommentRequest,
        token: JwtAuthenticationToken
    ) {
        val user = User(
            userId = token.name,
            userName = token.tokenAttributes["preferred_username"] as? String ?: "Unknown"
        )
        val destination = travelDestinationRepository.findById(request.travelDestinationId)
            .orElseThrow { NoSuchElementException("여행지를 찾을 수 없습니다.") }
        val comment = TravelDestinationComment(
            content = request.content,
            user = user,
            travelDestination = destination
        )
        travelDestinationCommentRepository.save(comment)
    }

    @Transactional(readOnly = true)
    fun getCommentsByNewsId(newsId: UUID): List<NewsCommentResponse> {
        if (!newsRepository.existsById(newsId)) {
            throw NoSuchElementException("뉴스를 찾을 수 없습니다.")
        }

        return newsCommentRepository.findAllByNewsIdOrderByCreatedAtDesc(newsId).map {
            NewsCommentResponse(
                id = it.id,
                newsId = it.news.id!!,
                content = it.content,
                userName = it.user.userName,
                createdAt = it.createdAt
            )
        }
    }

    @Transactional(readOnly = true)
    fun getCommentsByProductId(productId: UUID): List<ProductCommentResponse> {
        if (!productRepository.existsById(productId)) {
            throw NoSuchElementException("상품을 찾을 수 없습니다.")
        }

        return productCommentRepository.findAllByProductIdOrderByCreatedAtDesc(productId).map {
            ProductCommentResponse(
                id = it.id,
                productId = it.product.id!!,
                content = it.content,
                userName = it.user.userName,
                createdAt = it.createdAt
            )
        }
    }

    @Transactional(readOnly = true)
    fun getCommentsByTravelDestinationId(destinationId: UUID): List<TravelDestinationCommentResponse> {
        return travelDestinationCommentRepository.findAllByTravelDestinationIdOrderByCreatedAtDesc(destinationId)
            .map {
                TravelDestinationCommentResponse(
                    id = it.id,
                    travelDestinationId = it.travelDestination.id!!,
                    content = it.content,
                    userName = it.user.userName,
                    createdAt = it.createdAt
                )
            }
    }

    @Transactional(readOnly = true)
    fun getProductCommentsOnMyProducts(token: JwtAuthenticationToken): List<ProductCommentResponse> {
        return productCommentRepository.findAllByProductUserUserIdOrderByCreatedAtDesc(token.name).map {
            ProductCommentResponse(
                id = it.id,
                productId = it.product.id!!,
                content = it.content,
                userName = it.user.userName,
                createdAt = it.createdAt
            )
        }
    }

    @Transactional(readOnly = true)
    fun getNewsCommentsOnMyNews(token: JwtAuthenticationToken): List<NewsCommentResponse> {
        return newsCommentRepository.findAllByNewsUserUserIdOrderByCreatedAtDesc(token.name).map {
            NewsCommentResponse(
                id = it.id,
                newsId = it.news.id!!,
                content = it.content,
                userName = it.user.userName,
                createdAt = it.createdAt
            )
        }
    }

    @Transactional(readOnly = true)
    fun getTravelDestinationCommentsOnMyDestinations(token: JwtAuthenticationToken): List<TravelDestinationCommentResponse> {
        return travelDestinationCommentRepository.findAllByTravelDestinationUserUserIdOrderByCreatedAtDesc(token.name)
            .map {
                TravelDestinationCommentResponse(
                    id = it.id,
                    travelDestinationId = it.travelDestination.id!!,
                    content = it.content,
                    userName = it.user.userName,
                    createdAt = it.createdAt
                )
            }
    }

    @PreAuthorize("hasRole('ADMIN') or @commentService.isNewsCommentOwner(#id, #token.name)")
    fun deleteNewsComment(id: UUID, token: JwtAuthenticationToken) {
        newsCommentRepository.deleteById(id)
    }

    @PreAuthorize("hasRole('ADMIN') or @commentService.isProductCommentOwner(#id, #token.name)")
    fun deleteProductComment(id: UUID, token: JwtAuthenticationToken) {
        productCommentRepository.deleteById(id)
    }

    @PreAuthorize("hasRole('ADMIN') or @commentService.isTravelDestinationCommentOwner(#id, #token.name)")
    fun deleteTravelDestinationComment(id: UUID, token: JwtAuthenticationToken) {
        travelDestinationCommentRepository.deleteById(id)
    }

    @Transactional(readOnly = true)
    fun isNewsCommentOwner(id: UUID, userId: String): Boolean {
        return newsCommentRepository.findById(id).map { it.user.userId == userId }.orElse(false) ?: false
    }

    @Transactional(readOnly = true)
    fun isProductCommentOwner(id: UUID, userId: String): Boolean {
        return productCommentRepository.findById(id).map { it.user.userId == userId }.orElse(false) ?: false
    }

    @Transactional(readOnly = true)
    fun isTravelDestinationCommentOwner(id: UUID, userId: String): Boolean {
        return travelDestinationCommentRepository.findById(id).map { it.user.userId == userId }.orElse(false) ?: false
    }
}
