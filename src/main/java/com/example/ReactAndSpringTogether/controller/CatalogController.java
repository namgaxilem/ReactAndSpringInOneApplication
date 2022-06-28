package com.example.ReactAndSpringTogether.controller;

import com.example.ReactAndSpringTogether.service.RequestMethodMapping;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@Slf4j
@RestController
public class CatalogController extends BaseController {

    private final RequestMethodMapping requestMethodMapping;

    @Autowired
    public CatalogController(RequestMethodMapping requestMethodMapping) {
        this.requestMethodMapping = requestMethodMapping;
    }

    @RequestMapping("/api/flows/**")
    public String getFlows(
            @RegisteredOAuth2AuthorizedClient("dhp-eventproc-catalog") OAuth2AuthorizedClient client,
            HttpServletRequest request,
            @RequestBody(required = false) Object body
    ) {
        String uri = "http://localhost:8181/v1/flows?page=1&pageSize=1";
        return requestMethodMapping.checkMethodAndCallService(request, client, uri, body);
    }
}
