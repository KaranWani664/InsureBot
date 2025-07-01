// package com.insurebot.quest.config;

// import com.google.ai.client.generativeai.GenerativeModel;
// import com.google.ai.client.generativeai.GenerativeModelConfig;
// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;

// @Configuration
// public class LLMConfig {

//     @Value("${AIzaSyDxZw05j-UfmlQW1mc75ny8jNaMMGAzYfw}")
//     private String geminiApiKey;

//     @Bean
//     public GenerativeModel geminiModel() {
//         return new GenerativeModel(
//             GenerativeModelConfig.builder()
//                 .setApiKey(geminiApiKey)
//                 .setModelName("gemini-pro")
//                 .build()
//         );
//     }
// }
