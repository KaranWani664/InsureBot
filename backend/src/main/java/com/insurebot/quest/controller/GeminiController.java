package com.insurebot.quest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.insurebot.quest.service.GeminiService;

@RestController
@RequestMapping("/api/llm")
public class GeminiController {

    @Autowired
    private GeminiService geminiService;

    @GetMapping("/ask")
    public String askGemini(@RequestParam String q) {
        return geminiService.askGemini(q);
    }
}
