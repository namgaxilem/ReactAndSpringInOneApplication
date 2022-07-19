package com.example.ReactAndSpringTogether.controller;

import com.example.ReactAndSpringTogether.security.UserInfo;
import com.example.ReactAndSpringTogether.security.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;

import java.security.Principal;

@RestController
@RequestMapping("/api/user-info")
public class UserInfoController {

    UserInfoService userInfoService;
    WebClient webClient;

    @Autowired
    public UserInfoController(UserInfoService userInfoService, WebClient webClient) {
        this.userInfoService= userInfoService;
        this.webClient = webClient;
    }

    @GetMapping("")
    public UserInfo getUserInfo(Principal principal) {
        return userInfoService.getUserInfo(principal);
    }

//    @GetMapping("/api/user-info/profile-image")
//    public UserInfo getProfileImage(Principal principal) {
//        return this.webClient
//                .get()
//                .uri("https://graph.microsoft.com/v1.0/me/photo/$value")
//                .header("Authorization", String.format("Bearer ", principal.))
//                .retrieve()
//                .bodyToMono(String.class)
//                .block();
//    }
}
