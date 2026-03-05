package com.example.triptuneletter.entity

import com.example.triptuneletter.category.product.LargeCategory
import com.example.triptuneletter.category.product.MiddleCategory
import com.example.triptuneletter.category.product.SmallCategory
import jakarta.persistence.CascadeType
import jakarta.persistence.Column
import jakarta.persistence.Embedded
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.Id
import jakarta.persistence.OneToMany
import jakarta.persistence.Enumerated
import jakarta.persistence.EnumType
import org.hibernate.annotations.JdbcTypeCode
import org.hibernate.annotations.UuidGenerator
import org.hibernate.type.SqlTypes
import java.util.UUID

@Entity
class Product(
    @Id
    @GeneratedValue
    @UuidGenerator(style = UuidGenerator.Style.TIME)
    @Column(columnDefinition = "uuid")
    var id: UUID? = null,

    @Column(nullable = false)
    var name: String,

    @Column(nullable = false)
    var price: Long,

    @Column(columnDefinition = "TEXT")
    var description: String? = null,

    @Embedded
    var user: User,

    @Enumerated(EnumType.STRING)
    var largeCategory: LargeCategory? = null,

    @Enumerated(EnumType.STRING)
    var middleCategory: MiddleCategory? = null,

    @Enumerated(EnumType.STRING)
    var smallCategory: SmallCategory? = null,

    @JdbcTypeCode(SqlTypes.ARRAY)
    @Column(columnDefinition = "text[]")
    var imageUrls: MutableList<String> = mutableListOf(),

    @OneToMany(mappedBy = "product", cascade = [CascadeType.ALL], orphanRemoval = true)
    var comments: MutableList<ProductComment> = mutableListOf(),

    ) : BaseTimeEntity()
