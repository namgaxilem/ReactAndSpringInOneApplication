package com.example.ReactAndSpringTogether.config;

import com.example.ReactAndSpringTogether.exception.BadRequestException;
import com.example.ReactAndSpringTogether.exception.NotFoundException;
import com.example.ReactAndSpringTogether.exception.UpstreamServiceException;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.web.reactive.function.client.ClientResponse;
import org.springframework.web.reactive.function.client.ExchangeFilterFunction;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Configuration
public class WebClientConfig {

    ExchangeFilterFunction errorResponseFilter = ExchangeFilterFunction
            .ofResponseProcessor(WebClientConfig::exchangeFilterResponseProcessor);

    @Bean
    public WebClient webClient() {
        return WebClient
                .builder()
                .filter(errorResponseFilter)
                .build();
    }

    private static Mono<ClientResponse> exchangeFilterResponseProcessor(ClientResponse response) {
        HttpStatus status = response.statusCode();
        if (HttpStatus.INTERNAL_SERVER_ERROR.equals(status)) {
            return response.bodyToMono(String.class)
                    .flatMap(body -> Mono.error(new UpstreamServiceException(body)));
        }
        if (HttpStatus.BAD_REQUEST.equals(status)) {
            return response.bodyToMono(String.class)
                    .flatMap(body -> Mono.error(new BadRequestException(body)));
        }
        if (HttpStatus.NOT_FOUND.equals(status)) {
            return response.bodyToMono(String.class)
                    .flatMap(body -> Mono.error(new NotFoundException(body)));
        }
        return Mono.just(response);
    }
}
