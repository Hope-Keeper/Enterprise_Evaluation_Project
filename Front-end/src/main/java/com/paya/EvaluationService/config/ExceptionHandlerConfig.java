package com.Reihan.EvaluationService.config;

import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import Reihan.net.exceptionhandler.Config.GlobalExceptionHandler;

import java.util.LinkedHashMap;
import java.util.Map;

@RestControllerAdvice

@Configuration
public class ExceptionHandlerConfig {
    @Bean
    @ConditionalOnMissingBean
    public GlobalExceptionHandler globalExceptionHandler(MessageSource messageSource) {

        return new GlobalExceptionHandler(messageSource);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("code", 400);
        response.put("message", ex.getBindingResult().getFieldErrors().get(0).getDefaultMessage());
        response.put("trackingId", "");


        return ResponseEntity.badRequest().body(response);
    }


    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<Map<String, Object>> handleAccessDenied(AccessDeniedException ex) {
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("code", HttpStatus.FORBIDDEN.value());
        response.put("message", "شما به این سرویس دسترسی ندارید.");
        response.put("trackingId", "");
        return ResponseEntity.badRequest().body(response);

    }


    @ExceptionHandler(ClassCastException.class)
    public ResponseEntity<Map<String, Object>> handleQueryConversion(ClassCastException ex) {
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("code", HttpStatus.INTERNAL_SERVER_ERROR.value());
        response.put("message", "خطا در تبدیل داده‌های دریافتی از پایگاه داده.");
        response.put("trackingId", ""); // optional tracking ID
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }


}