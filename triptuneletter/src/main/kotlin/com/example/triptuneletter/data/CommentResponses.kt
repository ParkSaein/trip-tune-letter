package com.example.triptuneletter.data

import java.time.LocalDateTime
import java.util.UUID

data class NewsCommentResponse(
    val id: UUID?,
    val newsId: UUID,
    val content: String,
    val userName: String,
    val createdAt: LocalDateTime
)

data class ProductCommentResponse(
    val id: UUID?,
    val productId: UUID,
    val content: String,
    val userName: String,
    val createdAt: LocalDateTime
)

data class TravelDestinationCommentResponse(
    val id: UUID?,
    val travelDestinationId: UUID,
    val content: String,
    val userName: String,
    val createdAt: LocalDateTime
)
