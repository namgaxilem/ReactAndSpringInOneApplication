package com.example.ReactAndSpringTogether.api.security;

import com.nimbusds.jose.util.JSONStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientManager;
import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.BodyInserter;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.security.Principal;

import static org.springframework.security.oauth2.client.web.reactive.function.client.ServletOAuth2AuthorizedClientExchangeFilterFunction.oauth2AuthorizedClient;

@RestController
@RequestMapping("/api")
public class DeploymentController {

    @Autowired
    private WebClient webClient;

    @Autowired
    private OAuth2AuthorizedClientManager auth2AuthorizedClientManager;

    @PostMapping("/deployment")
    public ResponseEntity<String> createDeployment(
            @RegisteredOAuth2AuthorizedClient("dhp-eventproc-deployment") OAuth2AuthorizedClient deploymentService,
            @RequestBody Object body
            ) {
        return new ResponseEntity<>(callDeploymentService(deploymentService, body), HttpStatus.OK);
    }

    private String callDeploymentService(OAuth2AuthorizedClient deploymentService, Object reqBody) {
        if (null != deploymentService) {
            String body = this.webClient
                    .post()
                    .uri("http://localhost:8282/v1/deployment")
                    .body(BodyInserters.fromValue(JSONStringUtils.toJSONString(reqBody.toString())))
                    .attributes(oauth2AuthorizedClient(deploymentService))
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();
            return "deploymentService response " + (null != body ? "success." : "failed.") + body;
        } else {
            return "deploymentService response failed.";
        }
    }
}
