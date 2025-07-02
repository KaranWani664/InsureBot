package com.insurebot.quest.aiBot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.insurebot.quest.aiBot.service.GeminiService;
import com.insurebot.quest.aiBot.service.KnowledgeBaseService;

@RestController
@RequestMapping("/api/llm")
public class GeminiController {

    @Autowired
    private GeminiService geminiService;

    @Autowired
    private KnowledgeBaseService knowledgeBaseService;

    @GetMapping("/ask")
    public String askGemini(@RequestParam String q) {
        String context = knowledgeBaseService.getRelevantContext(q);
        // If context is a direct FAQ answer, return it directly
        if (knowledgeBaseService.findFaqAnswer(q).isPresent()) {
            return context;
        }
        return geminiService.askGeminiWithContext(q, context);
    }
}
