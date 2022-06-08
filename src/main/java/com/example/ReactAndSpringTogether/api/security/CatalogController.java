package com.example.ReactAndSpringTogether.api.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientManager;
import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;

import static org.springframework.security.oauth2.client.web.reactive.function.client.ServletOAuth2AuthorizedClientExchangeFilterFunction.oauth2AuthorizedClient;

@RestController
@RequestMapping("/api")
public class CatalogController {

    @Autowired
    private WebClient webClient;

    @Autowired
    private OAuth2AuthorizedClientManager auth2AuthorizedClientManager;

    @GetMapping("/flows")
    public ResponseEntity<String> getFlows(
            @RegisteredOAuth2AuthorizedClient("dhp-eventproc-catalog") OAuth2AuthorizedClient catalogService) {
        return new ResponseEntity<>(callCatalogService(catalogService), HttpStatus.OK);
    }

    private String callCatalogService(OAuth2AuthorizedClient catalogService) {
        if (null != catalogService) {
            String body = this.webClient
                    .get()
                    .uri("http://localhost:8181/v1/flows" + "?page=1&pageSize=1")
                    .attributes(oauth2AuthorizedClient(catalogService))
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();
            return "catalogService response " + (null != body ? "success." : "failed.") + body;
        } else {
            return "catalogService response failed.";
        }
    }
}
