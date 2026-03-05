package com.example.triptuneletter.repository

import com.example.triptuneletter.entity.TravelDestination
import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID

interface TravelDestinationRepository : JpaRepository<TravelDestination, UUID> {
    fun findAllByOrderByCreatedAtDesc(): List<TravelDestination>
    fun findAllByUserUserIdOrderByCreatedAtDesc(userId: String): List<TravelDestination>
    fun findByNameContainingIgnoreCaseOrderByCreatedAtDesc(keyword: String): List<TravelDestination>
}

