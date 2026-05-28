package com.bank.account.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(AccountNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(
            AccountNotFoundException ex) {

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(ErrorResponse.builder()
                        .errorCode("ACCOUNT_NOT_FOUND")
                        .message(ex.getMessage())
                        .build());
    }

    @ExceptionHandler(
            InvalidAccountStateException.class)
    public ResponseEntity<ErrorResponse> handleState(
            InvalidAccountStateException ex) {

        return ResponseEntity
                .badRequest()
                .body(ErrorResponse.builder()
                        .errorCode("INVALID_ACCOUNT_STATE")
                        .message(ex.getMessage())
                        .build());
    }
}
