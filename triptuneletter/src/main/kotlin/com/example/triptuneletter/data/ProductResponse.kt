package com.example.triptuneletter.data

import com.example.triptuneletter.category.product.LargeCategory
import com.example.triptuneletter.category.product.MiddleCategory
import com.example.triptuneletter.category.product.SmallCategory
import java.time.LocalDateTime
import java.util.UUID

data class ProductResponse(
    val id: UUID?,
    val name: String,
    val price: Long,
    val description: String? = null,
    val userName: String,
    val largeCategory: LargeCategory? = null,
    val middleCategory: MiddleCategory? = null,
    val smallCategory: SmallCategory? = null,
    val imageUrls: List<String> = emptyList(),
    val createdAt: LocalDateTime,
    val updatedAt: LocalDateTime
)

