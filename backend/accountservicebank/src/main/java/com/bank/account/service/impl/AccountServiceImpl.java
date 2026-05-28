package com.bank.account.service.impl;

import com.bank.account.dto.request.OpenAccountRequest;
import com.bank.account.dto.response.AccountResponse;
import com.bank.account.entity.AccountStatus;
import com.bank.account.entity.SavingAccount;
import com.bank.account.exception.AccountNotFoundException;
import com.bank.account.exception.InvalidAccountStateException;
import com.bank.account.mapper.AccountMapper;
import com.bank.account.repository.AccountRepository;
import com.bank.account.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl
        implements AccountService {

    private final AccountRepository repository;

    @Override
    public AccountResponse openAccount(
            OpenAccountRequest request) {

        SavingAccount account = SavingAccount.builder()
                .accountNo(generateAccountNo())
                .customerId(request.getCustomerId())
                .productCode(request.getProductCode())
                .balance(request.getDepositAmount())
                .currency(request.getCurrency())
                .status(AccountStatus.ACTIVE)
                .maturityDate(
                        LocalDate.now().plusMonths(12))
                .build();

        return AccountMapper.toResponse(
                repository.save(account));
    }

    @Override
    public AccountResponse findById(UUID id) {

        SavingAccount account = repository.findById(id)
                .orElseThrow(() ->
                        new AccountNotFoundException(
                                "Account not found"));

        return AccountMapper.toResponse(account);
    }

    @Override
    public List<AccountResponse> findAll() {

        return repository.findAll()
                .stream()
                .map(AccountMapper::toResponse)
                .toList();
    }

    @Override
    public List<AccountResponse> findByCustomer(
            String customerId) {

        return repository.findByCustomerId(customerId)
                .stream()
                .map(AccountMapper::toResponse)
                .toList();
    }

    @Override
    public AccountResponse freeze(UUID id) {

        SavingAccount account = getAccount(id);

        account.setStatus(AccountStatus.FROZEN);

        return AccountMapper.toResponse(
                repository.save(account));
    }

    @Override
    public AccountResponse unfreeze(UUID id) {

        SavingAccount account = getAccount(id);

        if (account.getStatus() != AccountStatus.FROZEN) {

            throw new InvalidAccountStateException(
                    "Account is not frozen");
        }

        account.setStatus(AccountStatus.ACTIVE);

        return AccountMapper.toResponse(
                repository.save(account));
    }

    @Override
    public AccountResponse close(UUID id) {

        SavingAccount account = getAccount(id);

        account.setStatus(AccountStatus.CLOSED);

        return AccountMapper.toResponse(
                repository.save(account));
    }

    private SavingAccount getAccount(UUID id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new AccountNotFoundException(
                                "Account not found"));
    }

    private String generateAccountNo() {

        return "SA"
                + System.currentTimeMillis();
    }
}
