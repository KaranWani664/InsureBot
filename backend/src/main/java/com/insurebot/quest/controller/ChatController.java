package com.insurebot.quest.controller;

import com.insurebot.quest.service.ConversationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
public class ChatController {
    @Autowired
    private ConversationService conversationService;

    public static class ChatRequest {
        public String message;
    }

    @PostMapping
    public ResponseEntity<String> chat(@RequestBody ChatRequest request) {
        String response = conversationService.processMessage(request.message);
        return ResponseEntity.ok(response);
    }
} 