package com.insurebot.quest.repository;

import com.insurebot.quest.model.Policy;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PolicyRepository extends JpaRepository<Policy, Long> {
    // Add custom query methods if needed
} 