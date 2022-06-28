package com.example.ReactAndSpringTogether.exception;

public class CustomBadRequestException extends Exception {

    public CustomBadRequestException(String message) {
        super(message);
    }
}
