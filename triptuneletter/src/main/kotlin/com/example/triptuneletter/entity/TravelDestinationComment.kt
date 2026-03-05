package com.example.triptuneletter.entity

import jakarta.persistence.*
import java.util.UUID

@Entity
class TravelDestinationComment(
    user: User,
    content: String,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "travel_destination_id")
    var travelDestination: TravelDestination,

    id: UUID? = null,
) : BaseComment(id = id, user = user, content = content)

