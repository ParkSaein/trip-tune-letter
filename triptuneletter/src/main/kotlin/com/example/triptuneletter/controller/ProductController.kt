package com.example.triptuneletter.controller

import com.example.triptuneletter.data.ProductRequest
import com.example.triptuneletter.data.ProductRequestWithFile
import com.example.triptuneletter.data.ProductResponse
import com.example.triptuneletter.service.FileService
import com.example.triptuneletter.service.ProductService
import io.swagger.v3.oas.annotations.Operation
import jakarta.validation.Valid
import org.springframework.core.io.FileSystemResource
import org.springframework.core.io.Resource
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken
import org.springframework.web.bind.annotation.*
import java.nio.file.Files
import java.util.UUID

@RestController
@RequestMapping("/api/products")
class ProductController(
    private val productService: ProductService,
    private val fileService: FileService
) {

    @Operation(summary = "모든 상품 조회", description = "저장된 모든 상품을 조회합니다.")
    @GetMapping
    fun getAllProducts(): ResponseEntity<List<ProductResponse>> {
        return ResponseEntity.ok(productService.getAllProducts())
    }

    @Operation(summary = "상품 상세 조회", description = "특정 ID의 상품을 조회합니다.")
    @GetMapping("/{id}")
    fun getProduct(@PathVariable id: UUID): ResponseEntity<ProductResponse> {
        return ResponseEntity.ok(productService.getProduct(id))
    }

    @Operation(summary = "본인이 작성한 상품 조회", description = "로그인한 사용자가 등록한 모든 상품을 조회합니다.")
    @GetMapping("/me")
    fun getMyProducts(token: JwtAuthenticationToken): ResponseEntity<List<ProductResponse>> {
        return ResponseEntity.ok(productService.getMyProducts(token))
    }

    @Operation(summary = "상품 검색", description = "상품명에 특정 키워드가 포함된 상품을 검색합니다.")
    @GetMapping("/search")
    fun searchProducts(@RequestParam keyword: String): ResponseEntity<List<ProductResponse>> {
        return ResponseEntity.ok(productService.searchProducts(keyword))
    }

    @Operation(summary = "상품 추천", description = "자연어 문장을 바탕으로 유사한 상품을 추천합니다.")
    @GetMapping("/recommend")
    fun recommendProducts(@RequestParam sentence: String): ResponseEntity<List<ProductResponse>> {
        return ResponseEntity.ok(productService.recommendProducts(sentence))
    }

    @Operation(summary = "전체 상품 재인덱싱", description = "DB의 모든 상품을 벡터 DB에 다시 저장합니다. (관리자용)")
    @PostMapping("/reindex")
    fun reindexAllProducts(): ResponseEntity<String> {
        productService.reindexAllProducts()
        return ResponseEntity.ok("Reindexing triggered")
    }

    @Operation(summary = "이미지 조회", description = "상품 이미지를 조회합니다.")
    @GetMapping("/images/{fileName}")
    fun getImage(@PathVariable fileName: String): ResponseEntity<Resource> {
        val file = fileService.getFile(fileName)
        val resource = FileSystemResource(file)
        val contentType = Files.probeContentType(file.toPath())

        return ResponseEntity.ok()
            .contentType(MediaType.parseMediaType(contentType ?: "application/octet-stream"))
            .body(resource)
    }

    @Operation(summary = "상품 생성", description = "새로운 상품을 등록합니다.")
    @PostMapping(consumes = [MediaType.MULTIPART_FORM_DATA_VALUE])
    fun createProduct(
        @Valid @ModelAttribute dto: ProductRequestWithFile,
        token: JwtAuthenticationToken
    ): ResponseEntity<UUID> {
        val request = ProductRequest(
            name = dto.name,
            price = dto.price,
            description = dto.description,
            smallCategory = dto.smallCategory
        )
        val productId = productService.createProduct(request, token, dto.files)
        return ResponseEntity.status(HttpStatus.CREATED).body(productId)
    }

    @Operation(summary = "상품 수정", description = "특정 ID의 상품 정보를 수정합니다.")
    @PutMapping("/{id}", consumes = [MediaType.MULTIPART_FORM_DATA_VALUE])
    fun updateProduct(
        @PathVariable id: UUID,
        @Valid @ModelAttribute dto: ProductRequestWithFile,
        token: JwtAuthenticationToken
    ): ResponseEntity<Unit> {
        val request = ProductRequest(
            name = dto.name,
            price = dto.price,
            description = dto.description,
            smallCategory = dto.smallCategory
        )
        productService.updateProduct(id, request, token, dto.files)
        return ResponseEntity.noContent().build()
    }

    @Operation(summary = "상품 삭제", description = "특정 ID의 상품을 삭제합니다.")
    @DeleteMapping("/{id}")
    fun deleteProduct(
        @PathVariable id: UUID,
        token: JwtAuthenticationToken
    ): ResponseEntity<Unit> {
        productService.deleteProduct(id, token)
        return ResponseEntity.noContent().build()
    }
}
