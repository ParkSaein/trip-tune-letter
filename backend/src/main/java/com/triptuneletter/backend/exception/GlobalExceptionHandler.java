package com.triptuneletter.backend.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.triptuneletter.backend.auth.dto.ApiResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiResponse> handleIllgalArgument(IllegalArgumentException e){

        return ResponseEntity
                .badRequest()
                .body(new ApiResponse(400, e.getMessage()));
    }
}