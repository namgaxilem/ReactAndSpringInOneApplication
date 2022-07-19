package com.example.ReactAndSpringTogether.controller;

import com.nimbusds.jose.util.JSONStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.security.Principal;

@RestController
public class DeploymentController {
    private WebClient webClient;

    @Autowired
    public DeploymentController(WebClient webClient) {
        this.webClient = webClient;
    }

    @PostMapping("/api/deployment")
//    @PreAuthorize("hasAuthority('APPROLE_portalUser')")
    public ResponseEntity<String> createDeployment(
            @RegisteredOAuth2AuthorizedClient("dhp-eventproc-deployment") OAuth2AuthorizedClient deploymentService,
            @RequestBody Object body,
            Principal principal
            ) {
        System.out.println(principal);
        return new ResponseEntity<>(callDeploymentService(deploymentService, body), HttpStatus.OK);
    }

    private String callDeploymentService(OAuth2AuthorizedClient deploymentService, Object reqBody) {
        if (null != deploymentService) {
            String body = this.webClient
                    .post()
                    .uri("http://localhost:8282/v1/deployment")
                    .accept(MediaType.ALL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(BodyInserters.fromValue(JSONStringUtils.toJSONString(reqBody.toString())))
                    .header("Authorization", "Bearer " + deploymentService.getAccessToken().getTokenValue())
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();
            return "/api/deployment - " + (null != body ? body : "null");
        } else {
            return "/api/deployment - failed.";
        }
    }
}
