package com.bank.account.dto.response;

import com.bank.account.entity.AccountStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Builder
@Getter
@Setter
public class AccountResponse {

    private UUID id;

    private String accountNo;

    private String customerId;

    private String productCode;

    private BigDecimal balance;

    private String currency;

    private AccountStatus status;

    private LocalDate maturityDate;
}
