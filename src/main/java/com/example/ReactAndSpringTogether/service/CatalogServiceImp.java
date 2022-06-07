package com.example.ReactAndSpringTogether.service;

import com.example.ReactAndSpringTogether.config.WebClientConfig;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class CatalogService {

    @Value("${webClient.config.catalogUrl}")
    private final String baseUrl = "";

    private final WebClient webClient;

    public CatalogService() {
        this.webClient = WebClientConfig.returnWebClient(baseUrl);
    }

    public ResponseEntity<String> getFlows(String page, String pageSize) {
        String response = webClient
                .get()
                .uri("/flows")
                .retrieve()
                .bodyToMono(String.class)
                .block();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
