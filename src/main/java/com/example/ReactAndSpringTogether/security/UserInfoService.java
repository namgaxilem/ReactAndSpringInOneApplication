package com.example.ReactAndSpringTogether.security;

import java.security.Principal;

public interface UserInfoService {
    UserInfo getUserInfo(Principal principal);
}
