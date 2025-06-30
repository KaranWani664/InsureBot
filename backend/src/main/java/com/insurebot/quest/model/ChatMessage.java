package com.insurebot.quest.model;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ChatMessage {
    private String sender;
    private String content;
    private LocalDateTime timestamp;
} 