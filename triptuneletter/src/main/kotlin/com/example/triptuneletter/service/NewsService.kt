package com.example.triptuneletter.service

import com.example.triptuneletter.data.NewsRequest
import com.example.triptuneletter.data.NewsResponse
import com.example.triptuneletter.entity.User
import com.example.triptuneletter.entity.News
import com.example.triptuneletter.repository.NewsRepository
import org.springframework.ai.chat.client.ChatClient
import org.springframework.ai.chat.client.entity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.multipart.MultipartFile
import java.util.UUID

@Service
@Transactional
class NewsService(
    private val newsRepository: NewsRepository,
    private val fileService: FileService,
    chatBuilder: ChatClient.Builder
) {
    private val chatClient: ChatClient = chatBuilder.build()

    @PreAuthorize("hasRole('USER')")
    fun createNews(
        request: NewsRequest,
        token: JwtAuthenticationToken,
        files: List<MultipartFile>? = null
    ): UUID? {
        val user = User(
            userId = token.name,
            userName = token.tokenAttributes["preferred_username"] as? String ?: "Unknown"
        )
        val imageUrls = files?.let { fileService.saveFiles(it) } ?: mutableListOf()

        val news = News(
            title = request.title,
            content = request.content,
            user = user,
            imageUrls = imageUrls.toMutableList()
        )
        return newsRepository.save(news).id
    }


    fun getAllNews(): List<NewsResponse> {
        val newsList = newsRepository.findAll()
        return newsList.map { news ->
            NewsResponse(
                news.id,
                news.title,
                news.content,
                news.user.userName,
                news.imageUrls.take(1).map { "/api/news/images/$it" },
                news.createdAt,
                news.updatedAt,
            )
        }
    }


    fun getNews(id: UUID): NewsResponse {
        val news = newsRepository.findById(id)
            .orElseThrow { IllegalArgumentException("News not found") }
        return NewsResponse(
            news.id,
            news.title,
            news.content,
            news.user.userName,
            news.imageUrls.map { "/api/news/images/$it" },
            news.createdAt,
            news.updatedAt,
        )
    }


    fun getImage(fileName: String): java.io.File {
        return fileService.getFile(fileName)
    }


    @PreAuthorize("hasRole('USER')")
    @Transactional(readOnly = true)
    fun getNewsDto(
        id: UUID
    ): String {
        val news = newsRepository.findDtoById(id)
        return news!!.content
    }


    @PreAuthorize(
        "hasRole('ADMIN') " +
                "or " +
                "@newsService.isUser(#id, #token.name)"
    )
    fun updateNews(
        id: UUID,
        request: NewsRequest,
        token: JwtAuthenticationToken,
        files: List<MultipartFile>? = null
    ) {
        val news = newsRepository.findById(id)
            .orElseThrow { IllegalArgumentException("News not found") }
        news.title = request.title
        news.content = request.content

        files?.let {
            if (it.isNotEmpty()) {
                // 기존 파일 삭제
                fileService.deleteFiles(news.imageUrls)
                // 새 파일 저장
                val newImageUrls = fileService.saveFiles(it)
                news.imageUrls.clear()
                news.imageUrls.addAll(newImageUrls)
            }
        }
    }


    @PreAuthorize(
        "hasRole('ADMIN') " +
                "or " +
                "@newsService.isUser(#id, #token.name)"
    )
    fun deleteNews(
        id: UUID,
        token: JwtAuthenticationToken
    ) {
        val news = newsRepository.findById(id)
            .orElseThrow { NoSuchElementException("뉴스가 없습니다.") }

        // 물리적 파일 삭제
        fileService.deleteFiles(news.imageUrls)

        // DB 삭제
        newsRepository.delete(news)
    }


    @Transactional(readOnly = true)
    fun isUser(newsId: UUID, userId: String): Boolean {
        val news = newsRepository.findById(newsId)
            .orElse(null) ?: return false
        return news.user.userId == userId
    }


    @Transactional(readOnly = true)
    fun searchNews(keyword: String): List<NewsResponse> {
        val newsList = newsRepository.searchNews(keyword)
        return newsList.map { news ->
            NewsResponse(
                news.id,
                news.title,
                news.content,
                news.user.userName,
                news.imageUrls.take(1).map { "/api/news/images/$it" },
                news.createdAt,
                news.updatedAt,
            )
        }
    }

    @Transactional(readOnly = true)
    fun getMyNews(token: JwtAuthenticationToken): List<NewsResponse> {
        val newsList = newsRepository.findAllByUserUserIdOrderByCreatedAtDesc(token.name)
        return newsList.map { news ->
            NewsResponse(
                news.id,
                news.title,
                news.content,
                news.user.userName,
                news.imageUrls.take(1).map { "/api/news/images/$it" },
                news.createdAt,
                news.updatedAt,
            )
        }
    }

    @PreAuthorize("hasRole('USER')")
    @Transactional(readOnly = true)
    fun summarizeNews(newsId: UUID): String {
        val content = getNewsDto(newsId)
        val result = chatClient.prompt().user { u ->
            u.text(
                """
                   아래 제공된 본문을 분석해서 제목 생성하고 본문 요약해줘.

                   [본문]: {content}

                   지시사항:
                    1. 제목은 핵심 키워드를 포함하여 아주 짧게 요약할 것.
                    2. 본문은 전체 내용을 1~4문장으로 압축할 것.
                """.trimIndent()
            ).param("content", content)
        }
            .call()
            .entity<NewsRequest>()
        return result.content
    }
}