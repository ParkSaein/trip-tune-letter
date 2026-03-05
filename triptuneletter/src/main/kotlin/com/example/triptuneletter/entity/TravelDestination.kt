package com.example.triptuneletter.entity

import com.example.triptuneletter.category.travel.City
import com.example.triptuneletter.category.travel.Country
import jakarta.persistence.*
import org.hibernate.annotations.JdbcTypeCode
import org.hibernate.annotations.UuidGenerator
import org.hibernate.type.SqlTypes
import java.util.UUID

@Entity
class TravelDestination(
    @Id
    @GeneratedValue
    @UuidGenerator(style = UuidGenerator.Style.TIME)
    @Column(columnDefinition = "uuid")
    var id: UUID? = null,

    @Column(nullable = false)
    var name: String,

    @Column(columnDefinition = "TEXT")
    var description: String? = null,

    @Column(nullable = false)
    var location: String,

    @Embedded
    var user: User,

    @Enumerated(EnumType.STRING)
    var country: Country? = null,

    @Enumerated(EnumType.STRING)
    var city: City? = null,

    @JdbcTypeCode(SqlTypes.ARRAY)
    @Column(columnDefinition = "text[]")
    var imageUrls: MutableList<String> = mutableListOf(),

    @OneToMany(mappedBy = "travelDestination", cascade = [CascadeType.ALL], orphanRemoval = true)
    var comments: MutableList<TravelDestinationComment> = mutableListOf(),

    ) : BaseTimeEntity()
