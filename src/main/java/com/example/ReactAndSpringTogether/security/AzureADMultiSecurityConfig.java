package com.example.ReactAndSpringTogether.security;

import com.azure.spring.cloud.autoconfigure.aad.AadResourceServerWebSecurityConfigurerAdapter;
import com.azure.spring.cloud.autoconfigure.aad.AadWebSecurityConfigurerAdapter;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class AzureADMultiSecurityConfig {

    @Order(1)
    @Configuration
    public static class ApiWebSecurityConfigurationAdapter extends AadResourceServerWebSecurityConfigurerAdapter {
        protected void configure(HttpSecurity http) throws Exception {
            super.configure(http);
            // All the paths that match `/api/**`(configurable) work as the resource server. Other paths work as  the web application.
            http.antMatcher("/api/**")
                    .authorizeRequests().anyRequest().authenticated();
        }
    }

    @Configuration
    public static class HtmlWebSecurityConfigurerAdapter extends AadWebSecurityConfigurerAdapter {

        @Override
        protected void configure(HttpSecurity http) throws Exception {
            super.configure(http);
            // @formatter:off
            http.authorizeRequests()
                    .antMatchers("/login").permitAll()
                    .anyRequest().authenticated();
            // @formatter:on
        }
    }
}
