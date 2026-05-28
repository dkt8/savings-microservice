package com.bank.account.mapper;

import com.bank.account.dto.response.AccountResponse;
import com.bank.account.entity.SavingAccount;

public class AccountMapper {

    public static AccountResponse toResponse(
            SavingAccount account) {

        return AccountResponse.builder()
                .id(account.getId())
                .accountNo(account.getAccountNo())
                .customerId(account.getCustomerId())
                .productCode(account.getProductCode())
                .balance(account.getBalance())
                .currency(account.getCurrency())
                .status(account.getStatus())
                .maturityDate(account.getMaturityDate())
                .build();
    }
}
