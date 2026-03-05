package com.example.triptuneletter.controller

import com.example.triptuneletter.data.*
import com.example.triptuneletter.service.CommentService
import io.swagger.v3.oas.annotations.Operation
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken
import org.springframework.web.bind.annotation.*
import java.util.UUID

@RestController
@RequestMapping("/api/comments")
class CommentController(
    private val commentService: CommentService
) {
    @Operation(summary = "뉴스 댓글 조회", description = "특정 뉴스에 대한 모든 댓글을 조회합니다.")
    @GetMapping("/news/{newsId}")
    fun getCommentsByNews(
        @PathVariable newsId: UUID
    ): ResponseEntity<List<NewsCommentResponse>> {
        val comments = commentService.getCommentsByNewsId(newsId)
        return ResponseEntity.ok(comments)
    }

    @Operation(summary = "상품 댓글 조회", description = "특정 상품에 대한 모든 댓글을 조회합니다.")
    @GetMapping("/product/{productId}")
    fun getCommentsByProduct(
        @PathVariable productId: UUID
    ): ResponseEntity<List<ProductCommentResponse>> {
        val comments = commentService.getCommentsByProductId(productId)
        return ResponseEntity.ok(comments)
    }

    @Operation(summary = "여행지 댓글 조회", description = "특정 여행지에 대한 모든 댓글을 조회합니다.")
    @GetMapping("/destination/{destinationId}")
    fun getCommentsByDestination(
        @PathVariable destinationId: UUID
    ): ResponseEntity<List<TravelDestinationCommentResponse>> {
        val comments = commentService.getCommentsByTravelDestinationId(destinationId)
        return ResponseEntity.ok(comments)
    }


    @Operation(summary = "내 뉴스 댓글 조회", description = "로그인한 사용자의 뉴스에 달린 모든 댓글을 조회합니다.")
    @GetMapping("/me/news")
    fun getNewsCommentsOnMyNews(
        token: JwtAuthenticationToken
    ): ResponseEntity<List<NewsCommentResponse>> {
        return ResponseEntity.ok(commentService.getNewsCommentsOnMyNews(token))
    }

    @Operation(summary = "내 상품 댓글 조회", description = "로그인한 사용자의 상품에 달린 모든 댓글을 조회합니다.")
    @GetMapping("/me/products")
    fun getProductCommentsOnMyProducts(
        token: JwtAuthenticationToken
    ): ResponseEntity<List<ProductCommentResponse>> {
        val comments = commentService.getProductCommentsOnMyProducts(token)
        return ResponseEntity.ok(comments)
    }

    @Operation(summary = "내가 받은 여행지 댓글 조회", description = "내가 등록한 여행지들에 달린 모든 댓글을 조회합니다.")
    @GetMapping("/destinations/received")
    fun getTravelDestinationCommentsOnMyDestinations(
        token: JwtAuthenticationToken
    ): ResponseEntity<List<TravelDestinationCommentResponse>> {
        val comments = commentService.getTravelDestinationCommentsOnMyDestinations(token)
        return ResponseEntity.ok(comments)
    }

    @Operation(summary = "뉴스 댓글 작성", description = "뉴스에 댓글을 작성합니다.")
    @PostMapping("/news")
    fun addNewsComment(
        @Valid @RequestBody request: NewsCommentRequest,
        token: JwtAuthenticationToken
    ): ResponseEntity<Unit> {
        commentService.addNewsComment(request, token)
        return ResponseEntity.status(HttpStatus.CREATED).build()
    }

    @Operation(summary = "상품 댓글 작성", description = "상품에 댓글을 작성합니다.")
    @PostMapping("/product")
    fun addProductComment(
        @Valid @RequestBody request: ProductCommentRequest,
        token: JwtAuthenticationToken
    ): ResponseEntity<Unit> {
        commentService.addProductComment(request, token)
        return ResponseEntity.status(HttpStatus.CREATED).build()
    }

    @Operation(summary = "여행지 댓글 작성", description = "여행지에 댓글을 작성합니다.")
    @PostMapping("/destination")
    fun addTravelDestinationComment(
        @Valid @RequestBody request: TravelDestinationCommentRequest,
        token: JwtAuthenticationToken
    ): ResponseEntity<Unit> {
        commentService.addTravelDestinationComment(request, token)
        return ResponseEntity.status(HttpStatus.CREATED).build()
    }

    @Operation(summary = "뉴스 댓글 삭제", description = "특정 뉴스 댓글을 삭제합니다.")
    @DeleteMapping("/news/{id}")
    fun deleteNewsComment(
        @PathVariable id: UUID,
        token: JwtAuthenticationToken
    ): ResponseEntity<Unit> {
        commentService.deleteNewsComment(id, token)
        return ResponseEntity.noContent().build()
    }

    @Operation(summary = "상품 댓글 삭제", description = "특정 상품 댓글을 삭제합니다.")
    @DeleteMapping("/product/{id}")
    fun deleteProductComment(
        @PathVariable id: UUID,
        token: JwtAuthenticationToken
    ): ResponseEntity<Unit> {
        commentService.deleteProductComment(id, token)
        return ResponseEntity.noContent().build()
    }

    @Operation(summary = "여행지 댓글 삭제", description = "특정 여행지 댓글을 삭제합니다.")
    @DeleteMapping("/destination/{id}")
    fun deleteTravelDestinationComment(
        @PathVariable id: UUID,
        token: JwtAuthenticationToken
    ): ResponseEntity<Unit> {
        commentService.deleteTravelDestinationComment(id, token)
        return ResponseEntity.noContent().build()
    }
}
