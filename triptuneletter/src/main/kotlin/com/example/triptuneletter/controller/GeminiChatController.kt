package com.example.triptuneletter.controller

import com.example.triptuneletter.service.GeminiChatService
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/chat")
class GeminiChatController(
    private val geminiChatService: GeminiChatService
) {
    @PostMapping
    @PreAuthorize("hasRole('USER')")
    fun postString(@RequestBody string: String): ResponseEntity<String> {
        val response = geminiChatService.getAnswer(string)
        return ResponseEntity.ok(response)
    }
}