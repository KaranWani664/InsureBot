package com.insurebot.quest.service;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class ConversationServiceTest {
    @Test
    void testProcessMessage() {
        ConversationService service = new ConversationService();
        String result = service.processMessage("Hello");
        assertTrue(result.contains("Processed"));
    }
} 