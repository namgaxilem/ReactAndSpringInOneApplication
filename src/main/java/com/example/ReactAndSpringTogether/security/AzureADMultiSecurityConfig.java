package com.example.ReactAndSpringTogether.security;

//import com.azure.spring.aad.webapi.AADResourceServerWebSecurityConfigurerAdapter;
//import com.azure.spring.cloud.autoconfigure.aad.AadResourceServerWebSecurityConfigurerAdapter;
import com.azure.spring.cloud.autoconfigure.aad.AadWebSecurityConfigurerAdapter;
//import com.azure.spring.aad.webapp.AADWebSecurityConfigurerAdapter;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import javax.servlet.Filter;

//@EnableWebSecurity
//@EnableGlobalMethodSecurity(prePostEnabled = true)
//public class AzureADMultiSecurityConfig {
//
//    @Order(1)
//    @Configuration
////    public static class ApiWebSecurityConfigurationAdapter extends AadResourceServerWebSecurityConfigurerAdapter {
//    public static class ApiWebSecurityConfigurationAdapter extends AADResourceServerWebSecurityConfigurerAdapter {
//        protected void configure(HttpSecurity http) throws Exception {
//            super.configure(http);
//            // All the paths that match `/api/**`(configurable) work as the resource server. Other paths work as  the web application.
//            http.antMatcher("/api/**")
//                    .authorizeRequests()
//                    .anyRequest().authenticated();
//            http
//                    .csrf()
//                    .disable();
//        }
//    }
//
//    @Configuration
////    public static class HtmlWebSecurityConfigurerAdapter extends AadWebSecurityConfigurerAdapter {
//    public static class HtmlWebSecurityConfigurerAdapter extends AADWebSecurityConfigurerAdapter {
//
//        @Override
//        protected void configure(HttpSecurity http) throws Exception {
//            super.configure(http);
//
//            http.authorizeRequests().antMatchers("/**").permitAll()
//                    .anyRequest().authenticated();
//            http
//                    .csrf()
//                    .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());
//            http
//                    .oauth2Login().defaultSuccessUrl("/").and()
//                    .logout()
//                    .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
//                    .logoutSuccessUrl("/");
//        }
//
////        @Override
////        protected Filter conditionalAccessFilter() {
////            return new AadConditionalAccessFilter();
////        }
//    }
//}

@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class AzureADMultiSecurityConfig extends AadWebSecurityConfigurerAdapter {
    @Override
    public void configure(HttpSecurity http) throws Exception {
        // use required configuration from AADWebSecurityAdapter.configure:
        super.configure(http);
        http.authorizeRequests()
                .antMatchers("/api/**").authenticated()
                .anyRequest().permitAll();
        http
                .csrf()
                .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());
        http.cors();
    }
}
