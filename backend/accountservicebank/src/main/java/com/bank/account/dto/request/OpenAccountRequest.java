package com.bank.account.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class OpenAccountRequest {

    @NotBlank
    private String customerId;

    @NotBlank
    private String productCode;

    @NotNull
    private BigDecimal depositAmount;

    @NotBlank
    private String currency;
}
