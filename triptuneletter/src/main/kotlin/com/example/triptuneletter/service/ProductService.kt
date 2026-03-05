package com.example.triptuneletter.service

import com.example.triptuneletter.data.*
import com.example.triptuneletter.entity.Product
import com.example.triptuneletter.entity.User
import com.example.triptuneletter.repository.ProductRepository
import org.springframework.ai.document.Document
import org.springframework.ai.vectorstore.SearchRequest
import org.springframework.ai.vectorstore.VectorStore
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.multipart.MultipartFile
import java.util.UUID

@Service
@Transactional
class ProductService(
    private val productRepository: ProductRepository,
    private val fileService: FileService,
    private val vectorStore: VectorStore
) {

    @PreAuthorize("hasRole('USER')")
    fun createProduct(
        request: ProductRequest,
        token: JwtAuthenticationToken,
        files: List<MultipartFile>? = null
    ): UUID? {
        val user = User(
            userId = token.name,
            userName = token.tokenAttributes["preferred_username"] as? String ?: "Unknown"
        )
        val imageUrls = files?.let { fileService.saveFiles(it) } ?: mutableListOf()

        val product = Product(
            name = request.name,
            price = request.price,
            description = request.description,
            user = user,
            largeCategory = request.smallCategory?.largeCategory,
            middleCategory = request.smallCategory?.middleCategory,
            smallCategory = request.smallCategory,
            imageUrls = imageUrls.toMutableList()
        )
        val savedProduct = productRepository.save(product)

        indexProduct(savedProduct)

        return savedProduct.id
    }

    private fun indexProduct(product: Product) {
        val content = """
            상품명: ${product.name}
            가격: ${product.price}
            설명: ${product.description ?: ""}
            대분류: ${product.largeCategory?.description ?: ""}
            중분류: ${product.middleCategory?.description ?: ""}
            소분류: ${product.smallCategory?.description ?: ""}
        """.trimIndent()

        val doc = Document(
            product.id.toString(),
            content,
            mapOf("productId" to product.id.toString())
        )
        vectorStore.accept(listOf(doc))
    }

    @Transactional(readOnly = true)
    fun getAllProducts(): List<ProductResponse> {
        return productRepository.findAllByOrderByCreatedAtDesc().map { it.toResponse() }
    }

    @Transactional(readOnly = true)
    fun getProduct(id: UUID): ProductResponse {
        val product = productRepository.findById(id)
            .orElseThrow { NoSuchElementException("상품을 찾을 수 없습니다.") }
        return product.toResponse()
    }

    @Transactional(readOnly = true)
    fun getMyProducts(token: JwtAuthenticationToken): List<ProductResponse> {
        return productRepository.findAllByUserUserIdOrderByCreatedAtDesc(token.name).map { it.toResponse() }
    }

    @Transactional(readOnly = true)
    fun searchProducts(keyword: String): List<ProductResponse> {
        return productRepository.findByNameContainingIgnoreCaseOrderByCreatedAtDesc(keyword).map { it.toResponse() }
    }

    @Transactional(readOnly = true)
    fun recommendProducts(sentence: String): List<ProductResponse> {
        val searchRequest = SearchRequest.builder()
            .query(sentence)
            .topK(5)
            .similarityThreshold(0.5)
            .build()

        val docs = vectorStore.similaritySearch(searchRequest)
        val productIds = docs.mapNotNull { doc -> doc.metadata["productId"]?.toString() }
            .map { UUID.fromString(it) }

        val productsMap = productRepository.findAllById(productIds).associateBy { it.id }
        return productIds.mapNotNull { productsMap[it]?.toResponse() }
    }

    fun reindexAllProducts() {
        val products = productRepository.findAll()
        products.forEach { indexProduct(it) }
    }

    @PreAuthorize("hasRole('ADMIN') or @productService.isOwner(#id, #token.name)")
    fun updateProduct(
        id: UUID,
        request: ProductRequest,
        token: JwtAuthenticationToken,
        files: List<MultipartFile>? = null
    ) {
        val product = productRepository.findById(id)
            .orElseThrow { NoSuchElementException("상품을 찾을 수 없습니다.") }

        product.name = request.name
        product.price = request.price
        product.description = request.description

        product.largeCategory = request.smallCategory?.largeCategory
        product.middleCategory = request.smallCategory?.middleCategory
        product.smallCategory = request.smallCategory

        files?.let {
            if (it.isNotEmpty()) {
                fileService.deleteFiles(product.imageUrls)
                val newImageUrls = fileService.saveFiles(it)
                product.imageUrls.clear()
                product.imageUrls.addAll(newImageUrls)
            }
        }

        indexProduct(product)
    }

    @PreAuthorize("hasRole('ADMIN') or @productService.isOwner(#id, #token.name)")
    fun deleteProduct(id: UUID, token: JwtAuthenticationToken) {
        val product = productRepository.findById(id)
            .orElseThrow { NoSuchElementException("상품을 찾을 수 없습니다.") }

        fileService.deleteFiles(product.imageUrls)
        productRepository.delete(product)

        vectorStore.delete(listOf(id.toString()))
    }

    @Transactional(readOnly = true)
    fun isOwner(productId: UUID, userId: String): Boolean {
        val product = productRepository.findById(productId).orElse(null) ?: return false
        return product.user.userId == userId
    }

    private fun Product.toResponse(): ProductResponse {
        return ProductResponse(
            id = this.id,
            name = this.name,
            price = this.price,
            description = this.description,
            userName = this.user.userName,
            largeCategory = this.largeCategory,
            middleCategory = this.middleCategory,
            smallCategory = this.smallCategory,
            imageUrls = this.imageUrls.map { "/api/products/images/$it" },
            createdAt = this.createdAt,
            updatedAt = this.updatedAt
        )
    }
}
