package com.example.triptuneletter.entity

import jakarta.persistence.*
import java.util.UUID

@Entity
class ProductComment(
    user: User,
    content: String,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    var product: Product,

    id: UUID? = null,
) : BaseComment(id = id, user = user, content = content)

