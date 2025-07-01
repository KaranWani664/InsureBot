package com.insurebot.quest.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.insurebot.quest.config.GeminiConfig;

@Service
public class GeminiService {

    @Autowired
    private GeminiConfig geminiConfig;

    @Autowired
    private RestTemplate restTemplate;

    public String askGemini(String userPrompt) {
        String url = geminiConfig.getGeminiEndpoint() + "?key=" + geminiConfig.getApiKey();

        Map<String, Object> payload = Map.of(
            "contents", List.of(
                Map.of("parts", List.of(
                    Map.of("text", userPrompt)
                ))
            )
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(payload, headers);

        try {
            ResponseEntity<Map<String, Object>> response = restTemplate.postForEntity(url, request, (Class<Map<String, Object>>)(Class<?>)Map.class);
            Map<String, Object> responseBody = response.getBody();
            if (responseBody == null) {
                return "No response from Gemini.";
            }
            List<Map<String, Object>> candidates = (List<Map<String, Object>>) responseBody.get("candidates");
            if (candidates != null && !candidates.isEmpty()) {
                Map<String, Object> candidate = candidates.get(0);
                Map<String, Object> content = (Map<String, Object>) candidate.get("content");
                List<Map<String, Object>> parts = (List<Map<String, Object>>) content.get("parts");
                Map<String, Object> firstPart = parts.get(0);
                return (String) firstPart.get("text");
            }
            return "No response from Gemini.";
        } catch (Exception e) {
            return "Error calling Gemini: " + e.getMessage();
        }
    }
}
