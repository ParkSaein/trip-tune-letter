package com.example.triptuneletter.data

import com.example.triptuneletter.category.travel.Country
import com.example.triptuneletter.category.travel.City
import java.time.LocalDateTime
import java.util.UUID

data class TravelDestinationResponse(
    val id: UUID?,
    val name: String,
    val description: String?,
    val location: String,
    val userName: String,
    val country: Country?,
    val city: City?,
    val imageUrls: List<String>,
    val createdAt: LocalDateTime,
    val updatedAt: LocalDateTime
)
