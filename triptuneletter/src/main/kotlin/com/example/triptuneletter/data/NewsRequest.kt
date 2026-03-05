package com.example.triptuneletter.data

import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Size

data class NewsRequest(
    @field:NotBlank
    @field:Size(min = 5, max = 100, message = "제목은 5자에서 100자 사이여야 합니다.")
    val title: String,

    @field:NotBlank
    @field:Size(min = 10, message = "내용은 최소 10자 이상 입력해야 합니다.")
    val content: String
)
