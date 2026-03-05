package com.example.triptuneletter.data

import java.time.LocalDateTime
import java.util.UUID

data class NewsResponse(
    val id: UUID?,
    val title: String,
    val content: String,
    val userName: String,
    val imageUrls: List<String> = emptyList(),
    val createdAt: LocalDateTime,
    val updatedAt: LocalDateTime = LocalDateTime.now(),
)
