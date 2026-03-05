package com.example.triptuneletter.repository

import com.example.triptuneletter.entity.Product
import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID

interface ProductRepository : JpaRepository<Product, UUID> {
    fun findAllByOrderByCreatedAtDesc(): List<Product>
    fun findAllByUserUserIdOrderByCreatedAtDesc(userId: String): List<Product>
    fun findByNameContainingIgnoreCaseOrderByCreatedAtDesc(keyword: String): List<Product>
}

