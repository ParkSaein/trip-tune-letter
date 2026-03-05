package com.example.triptuneletter.entity

import jakarta.persistence.*
import java.util.UUID

@Entity
class NewsComment(
    user: User,
    content: String,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "news_id")
    var news: News,

    id: UUID? = null,
) : BaseComment(id = id, user = user, content = content)


