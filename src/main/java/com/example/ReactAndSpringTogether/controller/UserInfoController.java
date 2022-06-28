package com.example.ReactAndSpringTogether.controller;

import com.example.ReactAndSpringTogether.security.UserInfo;
import com.example.ReactAndSpringTogether.security.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/api/user-info")
public class UserInfoController {

    @Autowired
    UserInfoService userInfoService;

    @GetMapping("")
    public UserInfo getUserInfo(Principal principal) {
        return userInfoService.getUserInfo(principal);
    }
}
