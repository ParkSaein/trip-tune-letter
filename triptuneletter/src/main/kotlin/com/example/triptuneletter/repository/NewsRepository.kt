package com.example.triptuneletter.repository

import com.example.triptuneletter.data.NewsRequest
import com.example.triptuneletter.entity.News
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import java.util.UUID

interface NewsRepository : JpaRepository<News, UUID> {
    fun findDtoById(id: UUID): NewsRequest?

    @Query("SELECT n FROM News n WHERE n.title LIKE %:keyword% OR n.content LIKE %:keyword% ORDER BY n.createdAt DESC")
    fun searchNews(keyword: String): List<News>

    fun findAllByUserUserIdOrderByCreatedAtDesc(authorId: String): List<News>
}