package com.example.triptuneletter.entity

import com.fasterxml.jackson.annotation.JsonIgnore
import jakarta.persistence.Column
import jakarta.persistence.Embeddable

@Embeddable
class User (
    @JsonIgnore
    @Column(nullable = false)
    var userId: String,

    @Column(nullable = false)
    var userName: String,
)