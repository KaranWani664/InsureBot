package com.insurebot.quest.service;

import org.springframework.stereotype.Service;

@Service
public class ConversationService {
    public String processMessage(String message) {
        // TODO: Integrate with LLM/STT/TTS
        return "Processed: " + message;
    }
} 