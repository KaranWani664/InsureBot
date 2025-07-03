package com.insurebot.quest.aiBot.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.*;

@Service
public class KnowledgeBaseService implements InitializingBean {
    private static class KnowledgeEntry {
        public String product;
        public String description;
        public List<String> coverage;
    }
    private static class FaqEntry {
        public String question;
        public String answer;
    }

    private List<KnowledgeEntry> knowledgeBase = new ArrayList<>();
    private List<FaqEntry> faqList = new ArrayList<>();

    private static final List<String> GREETINGS = Arrays.asList(
        "Hello! How can I help you today?",
        "Hi there! What can I do for you?",
        "Greetings! How may I assist you?"
    );
    private static final List<String> FILLERS = Arrays.asList(
        "Let me check that for you...",
        "One moment while I look that up...",
        "I'm finding the best answer for you..."
    );
    private static final List<String> APOLOGIES = Arrays.asList(
        "I'm sorry for any inconvenience.",
        "Apologies for the trouble.",
        "Sorry about that! Let me help you."
    );
    private static final List<String> EMPATHY = Arrays.asList(
        "I understand how you feel.",
        "That must be frustrating.",
        "I appreciate your patience."
    );
    private static final List<String> PROBLEM_RESOLUTION = Arrays.asList(
        "I'm working to resolve your issue.",
        "Let me help you fix that.",
        "I'll do my best to sort this out for you."
    );
    private static final List<String> QUERY_ANSWER_GIVEN = Arrays.asList(
        "Here's the information you requested:",
        "This should answer your question:",
        "Here are the details you need:"
    );
    private static final List<String> COMPLAINT_RAISED = Arrays.asList(
        "Your complaint has been raised. We'll get back to you soon.",
        "We've registered your complaint and will address it promptly.",
        "Thank you for letting us know. Your complaint is being processed."
    );

    private final Random random = new Random();

    @Override
    public void afterPropertiesSet() {
        ObjectMapper mapper = new ObjectMapper();
        try {
            knowledgeBase = mapper.readValue(new File("data/knowledge_base.json"), new TypeReference<List<KnowledgeEntry>>(){});
        } catch (IOException e) {
            knowledgeBase = new ArrayList<>();
        }
        try {
            faqList = mapper.readValue(new File("data/faq_content.json"), new TypeReference<List<FaqEntry>>(){});
        } catch (IOException e) {
            faqList = new ArrayList<>();
        }
    }

    public Optional<String> findFaqAnswer(String userPrompt) {
        return faqList.stream()
                .filter(faq -> userPrompt.toLowerCase().contains(faq.question.toLowerCase()))
                .map(faq -> faq.answer)
                .findFirst();
    }

    public Optional<String> findKnowledgeBaseInfo(String userPrompt) {
        return knowledgeBase.stream()
                .filter(entry -> userPrompt.toLowerCase().contains(entry.product.toLowerCase()))
                .map(entry -> entry.product + ": " + entry.description + " Coverage: " + String.join(", ", entry.coverage))
                .findFirst();
    }

    public String getFillerOrGreeting() {
        if (random.nextBoolean()) {
            return GREETINGS.get(random.nextInt(GREETINGS.size()));
        } else {
            return FILLERS.get(random.nextInt(FILLERS.size()));
        }
    }

    public String classifyAndRespond(String userPrompt) {
        String prompt = userPrompt.toLowerCase();
        // Greeting
        if (prompt.matches(".*\\b(hi|hello|hey|greetings|good morning|good afternoon|good evening)\\b.*")) {
            return GREETINGS.get(random.nextInt(GREETINGS.size()));
        }
        // Apology
        if (prompt.matches(".*\\b(sorry|apologize|apologies|my bad)\\b.*")) {
            return APOLOGIES.get(random.nextInt(APOLOGIES.size()));
        }
        // Empathy
        if (prompt.matches(".*\\b(frustrated|angry|upset|disappointed|annoyed|sad)\\b.*")) {
            return EMPATHY.get(random.nextInt(EMPATHY.size()));
        }
        // Complaint
        if (prompt.matches(".*\\b(complain|complaint|issue|problem|not working|doesn't work|does not work|bad service|unhappy)\\b.*")) {
            return COMPLAINT_RAISED.get(random.nextInt(COMPLAINT_RAISED.size()));
        }
        // Filler
        if (prompt.matches(".*\\b(wait|hold on|give me a second|moment|checking|loading)\\b.*")) {
            return FILLERS.get(random.nextInt(FILLERS.size()));
        }
        // Problem Resolution
        if (prompt.matches(".*\\b(fix|resolve|solution|help|support|assist)\\b.*")) {
            return PROBLEM_RESOLUTION.get(random.nextInt(PROBLEM_RESOLUTION.size()));
        }
        // Query Answer Given (fallback for when an answer is found)
        if (prompt.matches(".*\\b(answer|information|details|explain|tell me|what is|who is|how to|where is|when is)\\b.*")) {
            return QUERY_ANSWER_GIVEN.get(random.nextInt(QUERY_ANSWER_GIVEN.size()));
        }
        // Default: random greeting or filler
        return getFillerOrGreeting();
    }

    public String getRelevantContext(String userPrompt) {
        Optional<String> faq = findFaqAnswer(userPrompt);
        if (faq.isPresent()) return faq.get();
        Optional<String> kb = findKnowledgeBaseInfo(userPrompt);
        return kb.orElse(classifyAndRespond(userPrompt));
    }
} 