package com.insurebot.quest.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class LLMConfig {
    // TODO: Configure Google Gemini API client
    @Bean
    public Object geminiApiClient() {
        // Return a configured Gemini API client here
        return new Object();
    }
} 