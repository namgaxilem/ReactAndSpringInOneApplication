package com.example.ReactAndSpringTogether;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class ReactAndSpringTogetherApplication implements WebMvcConfigurer {

	public static void main(String[] args) {
		SpringApplication.run(ReactAndSpringTogetherApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry
						.addMapping("/api/**")
						.allowedOrigins("http://localhost:3000")
						.allowedMethods("*")
						.allowCredentials(true);
			}
		};
	}

//	@Override
//	public void addCorsMappings(CorsRegistry registry) {
//		registry
//			.addMapping("/api/**")
//			.allowedOrigins("http://localhost:3000")
//			.allowedMethods("*")
//			.allowCredentials(true);
//	}

}
