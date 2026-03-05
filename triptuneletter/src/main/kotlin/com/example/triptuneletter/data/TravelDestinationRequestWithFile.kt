package com.example.triptuneletter.data

import com.example.triptuneletter.category.travel.City
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Size
import org.springframework.web.multipart.MultipartFile

data class TravelDestinationRequestWithFile(
    @field:NotBlank
    @field:Size(min = 2, max = 100, message = "여행지 이름은 2자에서 100자 사이여야 합니다.")
    val name: String,

    val description: String? = null,

    @field:NotBlank
    val location: String,

    val city: City? = null,
    val files: List<MultipartFile>? = null
)
