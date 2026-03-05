package com.example.triptuneletter.service

import org.springframework.ai.chat.client.ChatClient
import org.springframework.stereotype.Service

@Service
class GeminiChatService (chatBuilder: ChatClient.Builder) {
    private val chatClient: ChatClient = chatBuilder.build()

    fun getAnswer(message: String): String {
        return chatClient
            .prompt()
            .user(message)
            .call()
            .content() ?: "No response"
    }
}