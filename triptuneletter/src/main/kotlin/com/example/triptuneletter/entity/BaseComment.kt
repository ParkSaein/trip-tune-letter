package com.example.triptuneletter.entity

import jakarta.persistence.Column
import jakarta.persistence.Embedded
import jakarta.persistence.GeneratedValue
import jakarta.persistence.Id
import jakarta.persistence.MappedSuperclass
import org.hibernate.annotations.UuidGenerator
import java.util.UUID

@MappedSuperclass
abstract class BaseComment(
    @Id
    @GeneratedValue
    @UuidGenerator(style = UuidGenerator.Style.TIME)
    @Column(columnDefinition = "uuid")
    var id: UUID? = null,

    @Embedded
    var user: User,

    @Column(columnDefinition = "TEXT", nullable = false)
    var content: String,
) : BaseTimeEntity()

