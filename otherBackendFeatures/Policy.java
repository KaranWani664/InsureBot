package com.insurebot.quest.aiBot.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Policy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String policyNumber;
    private String coverage;
} 