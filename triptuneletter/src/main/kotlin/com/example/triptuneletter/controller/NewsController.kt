package com.example.triptuneletter.controller


import com.example.triptuneletter.data.NewsRequest
import com.example.triptuneletter.data.NewsRequestWithFile
import com.example.triptuneletter.data.NewsResponse
import com.example.triptuneletter.service.NewsService
import io.swagger.v3.oas.annotations.Operation
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken
import org.springframework.web.bind.annotation.*
import org.springframework.core.io.Resource
import org.springframework.core.io.FileSystemResource
import java.nio.file.Files
import java.util.UUID

@RestController
@RequestMapping("/api/news")
class NewsController(
    private val newsService: NewsService
) {
    @Operation(summary = "모든 뉴스 조회", description = "저장된 모든 뉴스를 조회합니다.")
    @GetMapping
    fun getAllNews(): ResponseEntity<List<NewsResponse>> {
        return ResponseEntity.ok(newsService.getAllNews())
    }


//    @Operation(summary = "뉴스 5개씩 조회", description = "뉴스를 5개씩 조회합니다.")
//    @GetMapping("/{page}/{category}")
//    fun getNewsByPageAndCategory(@PathVariable page: Int, @PathVariable category: String): ResponseEntity<List<NewsResponse>> {
//        return ResponseEntity.ok(newsService.getNewsByPage(page, category))
//    }


    @Operation(summary = "뉴스 상세 조회", description = "특정 ID의 뉴스를 조회합니다.")
    @GetMapping("/{id}")
    fun getOneNews(@PathVariable id: UUID): ResponseEntity<NewsResponse> = ResponseEntity.ok(newsService.getNews(id))


    @Operation(summary = "본인이 작성한 뉴스 조회", description = "로그인한 사용자가 작성한 모든 뉴스를 조회합니다.")
    @GetMapping("/me")
    fun getMyNews(token: JwtAuthenticationToken): ResponseEntity<List<NewsResponse>> {
        return ResponseEntity.ok(newsService.getMyNews(token))
    }


    @Operation(summary = "이미지 조회", description = "서버에 저장된 이미지를 조회합니다.")
    @GetMapping("/images/{fileName}")
    fun getImage(@PathVariable fileName: String): ResponseEntity<Resource> {
        val file = newsService.getImage(fileName)
        val resource = FileSystemResource(file)
        val contentType = Files.probeContentType(file.toPath())

        return ResponseEntity.ok()
            .contentType(MediaType.parseMediaType(contentType ?: "application/octet-stream"))
            .body(resource)
    }


    @Operation(summary = "뉴스 생성", description = "새로운 뉴스를 생성합니다.")
    @PostMapping(consumes = [MediaType.MULTIPART_FORM_DATA_VALUE])
    fun createNews(
//        @Valid @RequestPart dto: NewsRequest,
//        @RequestPart("files", required = false) files: List<MultipartFile>?,
        @ModelAttribute dto: NewsRequestWithFile,
        token: JwtAuthenticationToken
    ): ResponseEntity<UUID> {
        val newsRequest = NewsRequest(dto.title, dto.content)
        val newsId = newsService.createNews(newsRequest, token, dto.files?.toList())
        return ResponseEntity.status(HttpStatus.CREATED).body(newsId)
    }


    @Operation(summary = "뉴스 검색", description = "제목 또는 내용에 특정 키워드가 포함된 뉴스를 검색합니다.")
    @GetMapping("/search")
    fun searchNews(@RequestParam keyword: String): ResponseEntity<List<NewsResponse>> {
        return ResponseEntity.ok(newsService.searchNews(keyword))
    }


    @Operation(summary = "뉴스 요약", description = "특정 뉴스의 내용을 GEMINI로 요약합니다.")
    @PostMapping("/summarization")
    fun summarizeNews(
        @RequestBody req: com.example.triptuneletter.data.SummarizationRequest
    ): ResponseEntity<String> {
        // 서비스에서 @PreAuthorize가 동작하려면 인증 토큰이 필요함
        return ResponseEntity.ok(newsService.summarizeNews(req.newsId))
    }


    @Operation(summary = "뉴스 수정", description = "특정 ID의 뉴스를 수정합니다.")
    @PutMapping("/{id}", consumes = [MediaType.MULTIPART_FORM_DATA_VALUE])
    fun updateNews(
        @PathVariable id: UUID,
        @Valid @ModelAttribute dto: NewsRequestWithFile,
        token: JwtAuthenticationToken
    ): ResponseEntity<Unit> {
        val newsRequest = NewsRequest(dto.title, dto.content)
        newsService.updateNews(id, newsRequest, token, dto.files?.toList())
        return ResponseEntity.noContent().build()
    }


    @Operation(summary = "뉴스 삭제", description = "특정 ID의 뉴스를 삭제합니다.")
    @DeleteMapping("/{id}")
    fun deleteNews(
        @PathVariable id: UUID, token: JwtAuthenticationToken
    ): ResponseEntity<Unit> {
        newsService.deleteNews(id, token)
        return ResponseEntity.noContent().build()
    }
}