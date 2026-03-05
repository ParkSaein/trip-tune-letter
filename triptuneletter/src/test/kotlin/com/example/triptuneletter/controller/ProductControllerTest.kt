package com.example.triptuneletter.controller

import com.example.triptuneletter.data.ProductRequest
import com.example.triptuneletter.category.product.LargeCategory
import com.example.triptuneletter.category.product.MiddleCategory
import com.example.triptuneletter.category.product.SmallCategory
import com.example.triptuneletter.service.FileService
import com.example.triptuneletter.service.ProductService
import org.junit.jupiter.api.Test
import org.mockito.ArgumentMatchers.any
import org.mockito.BDDMockito.given
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.http.MediaType
import org.springframework.mock.web.MockMultipartFile
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt
import org.springframework.test.context.bean.override.mockito.MockitoBean
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import java.util.UUID

@WebMvcTest(ProductController::class)
class ProductControllerTest {

    @Autowired
    private lateinit var mockMvc: MockMvc

    @MockitoBean
    private lateinit var productService: ProductService

    @MockitoBean
    private lateinit var fileService: FileService

    private fun <T> anyKotlin(defaultValue: T): T {
        any<T>()
        return defaultValue
    }

    @Test
    fun createProductTest() {
        // given
        val productId = UUID.randomUUID()
        val file = MockMultipartFile(
            "files",
            "test.jpg",
            MediaType.IMAGE_JPEG_VALUE,
            "test image content".toByteArray()
        )

        val dummyRequest = ProductRequest(
            name = "dummy",
            price = 0,
            largeCategory = LargeCategory.FOOD,
            middleCategory = MiddleCategory.FRESH_FOOD,
            smallCategory = SmallCategory.OTHERS
        )
        val dummyToken = org.mockito.Mockito.mock(JwtAuthenticationToken::class.java)

        given(productService.createProduct(anyKotlin(dummyRequest), anyKotlin(dummyToken), any())).willReturn(productId)

        // when & then
        mockMvc.perform(
            multipart("/api/products")
                .file(file)
                .param("name", "테스트 상품")
                .param("price", "20000")
                .param("largeCategory", "ELECTRONICS")
                .param("middleCategory", "HOME_APPLIANCES")
                .param("smallCategory", "AIR_FRYER")
                .with(jwt().jwt { it.claim("preferred_username", "testuser") })
                .with(csrf())
        ).andExpect(status().isCreated)
    }
}
