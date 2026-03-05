package com.example.triptuneletter.controller

import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.util.LinkedMultiValueMap
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.client.RestClient
import org.springframework.web.client.body

@RestController
@RequestMapping("/api/test")
class TestApi {
    private val restClient = RestClient.create()

    @GetMapping("/key")
    fun getKey(): String? {
        val formData = LinkedMultiValueMap<String, String>().apply {
            add("client_id", "react-client")
            add("username", "User1")
            add("password", "1111")
            add("grant_type", "password")
        }

        // 2. API 호출
        val response = restClient.post()
            .uri("http://localhost:8080/realms/realm/protocol/openid-connect/token")
            .contentType(MediaType.APPLICATION_FORM_URLENCODED)
            .body(formData)
            .retrieve()
            .body<Map<String, Any>>() // 응답을 Map으로 받음

        // 3. access_token 추출
        return response?.get("access_token") as? String
    }


    @GetMapping("/vt-check")
    fun checkVirtualThread(): Map<String, Any> {
        val currentThread = Thread.currentThread()
        return mapOf(
            "isVirtual" to currentThread.isVirtual, // 가상 스레드 여부
            "threadName" to currentThread.toString()
        )
    }
}
