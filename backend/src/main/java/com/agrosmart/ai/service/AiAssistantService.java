package com.agrosmart.ai.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class AiAssistantService {

    private final ChatClient chatClient;

    public AiAssistantService(ChatClient.Builder chatClientBuilder) {
        // Build the ChatClient with a system prompt that gives the assistant its persona
        this.chatClient = chatClientBuilder
                .defaultSystem("You are AgroSmart, a helpful and knowledgeable agricultural AI assistant for Indian farmers. " +
                        "You provide accurate, localized advice on crop management, pest control, weather patterns, and market prices. " +
                        "Always respond politely and clearly. When asked about specific regions, remember to consider Indian agricultural context.")
                .build();
    }

    public String chat(String userMessage) {
        try {
            return chatClient.prompt()
                    .user(userMessage)
                    .call()
                    .content();
        } catch (Exception e) {
            // Fallback gracefully if Ollama is not running
            return "I am currently unable to connect to my knowledge base. Please ensure the local AI service (Ollama) is running.";
        }
    }
}
