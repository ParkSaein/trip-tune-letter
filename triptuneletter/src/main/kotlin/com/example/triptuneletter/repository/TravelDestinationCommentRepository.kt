package com.example.triptuneletter.repository

import com.example.triptuneletter.entity.TravelDestinationComment
import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID

interface TravelDestinationCommentRepository : JpaRepository<TravelDestinationComment, UUID> {
    fun findAllByTravelDestinationIdOrderByCreatedAtDesc(travelDestinationId: UUID): List<TravelDestinationComment>
    fun findAllByTravelDestinationUserUserIdOrderByCreatedAtDesc(userId: String): List<TravelDestinationComment>
}

