package com.example.triptuneletter.repository

import com.example.triptuneletter.entity.NewsComment
import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID

interface NewsCommentRepository : JpaRepository<NewsComment, UUID> {
    fun findAllByNewsIdOrderByCreatedAtDesc(newsId: UUID): List<NewsComment>
    fun findAllByNewsUserUserIdOrderByCreatedAtDesc(userId: String): List<NewsComment>
}
