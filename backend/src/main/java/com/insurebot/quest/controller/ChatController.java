package com.insurebot.quest.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/chat")
public class ChatController {
    @PostMapping
    public ResponseEntity<String> chat(@RequestBody String message) {
        // TODO: Integrate with ConversationService
        return ResponseEntity.ok("Received: " + message);
    }
} 