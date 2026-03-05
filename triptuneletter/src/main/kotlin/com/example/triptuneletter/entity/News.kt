package com.example.triptuneletter.entity

import jakarta.persistence.CascadeType
import jakarta.persistence.Column
import jakarta.persistence.Embedded
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.Id
import jakarta.persistence.OneToMany
import org.hibernate.annotations.JdbcTypeCode
import org.hibernate.annotations.UuidGenerator
import org.hibernate.type.SqlTypes
import java.util.UUID

@Entity
class News(
    @Id
    @GeneratedValue
    @UuidGenerator(style = UuidGenerator.Style.TIME)
    @Column(columnDefinition = "uuid")
    var id: UUID? = null,

    @Embedded
    var user: User,

    @Column(columnDefinition = "TEXT", nullable = false)
    var title: String,

    @Column(columnDefinition = "TEXT", nullable = false)
    var content: String,

//    @ElementCollection
//    @CollectionTable(name = "news_images", joinColumns = [JoinColumn(name = "news_id")])
//    @Column(name = "image_url")
//    var imageUrls: MutableList<String> = mutableListOf(),
    @JdbcTypeCode(SqlTypes.ARRAY)
    @Column(columnDefinition = "text[]")
    var imageUrls: MutableList<String> = mutableListOf(),

    @OneToMany(mappedBy = "news", cascade = [CascadeType.ALL], orphanRemoval = true)
    var comments: MutableList<NewsComment> = mutableListOf(),
) : BaseTimeEntity()