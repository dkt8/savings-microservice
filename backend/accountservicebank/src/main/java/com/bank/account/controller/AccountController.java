package com.bank.account.controller;

import com.bank.account.dto.request.OpenAccountRequest;
import com.bank.account.dto.response.AccountResponse;
import com.bank.account.service.AccountService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/accounts")
@RequiredArgsConstructor
public class AccountController {

    private final AccountService service;

    @PostMapping
    public AccountResponse openAccount(
            @Valid
            @RequestBody
            OpenAccountRequest request) {

        return service.openAccount(request);
    }

    @GetMapping
    public List<AccountResponse> getAll() {

        return service.findAll();
    }

    @GetMapping("/{id}")
    public AccountResponse getById(
            @PathVariable UUID id) {

        return service.findById(id);
    }

    @GetMapping("/customer/{customerId}")
    public List<AccountResponse> getByCustomer(
            @PathVariable String customerId) {

        return service.findByCustomer(customerId);
    }

    @PutMapping("/{id}/freeze")
    public AccountResponse freeze(
            @PathVariable UUID id) {

        return service.freeze(id);
    }

    @PutMapping("/{id}/unfreeze")
    public AccountResponse unfreeze(
            @PathVariable UUID id) {

        return service.unfreeze(id);
    }

    @PutMapping("/{id}/close")
    public AccountResponse close(
            @PathVariable UUID id) {

        return service.close(id);
    }
}
