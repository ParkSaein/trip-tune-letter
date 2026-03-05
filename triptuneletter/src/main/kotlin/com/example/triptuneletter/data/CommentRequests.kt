package com.example.triptuneletter.data

import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull
import jakarta.validation.constraints.Size
import java.util.UUID

data class NewsCommentRequest(
    @field:NotNull(message = "뉴스 ID는 필수 항목입니다.")
    var newsId: UUID,

    @field:NotBlank(message = "댓글 내용은 필수 항목입니다.")
    @field:Size(max = 500, message = "댓글은 500자를 초과할 수 없습니다.")
    var content: String
)

data class ProductCommentRequest(
    @field:NotNull(message = "상품 ID는 필수 항목입니다.")
    var productId: UUID,

    @field:NotBlank(message = "댓글 내용은 필수 항목입니다.")
    @field:Size(max = 500, message = "댓글은 500자를 초과할 수 없습니다.")
    var content: String
)

data class TravelDestinationCommentRequest(
    @field:NotNull(message = "여행지 ID는 필수 항목입니다.")
    var travelDestinationId: UUID,

    @field:NotBlank(message = "댓글 내용은 필수 항목입니다.")
    @field:Size(max = 500, message = "댓글은 500자를 초과할 수 없습니다.")
    var content: String
)
