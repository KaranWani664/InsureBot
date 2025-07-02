package com.insurebot.quest.aiBot.service;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import com.insurebot.quest.aiBot.service.ConversationService;

class ConversationServiceTest {
    @Test
    void testProcessMessage() {
        ConversationService service = new ConversationService();
        String result = service.processMessage("Hello");
        assertTrue(result.contains("Processed"));
    }
} 