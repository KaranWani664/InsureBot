package com.insurebot.quest.service;

import org.springframework.stereotype.Service;

@Service
public class ConversationService {
    public String processMessage(String message) {
        // TODO: Integrate with LLM, Speech-to-Text, Text-to-Speech, etc.
        if (message == null || message.trim().isEmpty()) {
            return "I'm sorry, I didn't catch that. Could you please repeat?";
        }
        return "Bot: You said, '" + message + "'. How else can I assist you?";
    }
} 