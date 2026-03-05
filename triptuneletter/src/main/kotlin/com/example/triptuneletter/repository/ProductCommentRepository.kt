package com.example.triptuneletter.repository

import com.example.triptuneletter.entity.ProductComment
import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID

interface ProductCommentRepository : JpaRepository<ProductComment, UUID> {
    fun findAllByProductIdOrderByCreatedAtDesc(productId: UUID): List<ProductComment>
    fun findAllByProductUserUserIdOrderByCreatedAtDesc(userId: String): List<ProductComment>
}
