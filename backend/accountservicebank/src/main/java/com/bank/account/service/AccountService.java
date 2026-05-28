package com.bank.account.service;

import com.bank.account.dto.request.OpenAccountRequest;
import com.bank.account.dto.response.AccountResponse;

import java.util.List;
import java.util.UUID;

public interface AccountService {

    AccountResponse openAccount(
            OpenAccountRequest request);

    AccountResponse findById(UUID id);

    List<AccountResponse> findAll();

    List<AccountResponse> findByCustomer(
            String customerId);

    AccountResponse freeze(UUID id);

    AccountResponse unfreeze(UUID id);

    AccountResponse close(UUID id);
}
