package com.example.triptuneletter.data

import com.example.triptuneletter.category.product.SmallCategory
import jakarta.validation.constraints.Min
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Size

data class ProductRequest(
    @field:NotBlank
    @field:Size(min = 2, max = 100, message = "상품명은 2자에서 100자 사이여야 합니다.")
    val name: String,

    @field:Min(value = 0, message = "가격은 0원 이상이어야 합니다.")
    val price: Long,

    val description: String? = null,

    val smallCategory: SmallCategory? = null
)
