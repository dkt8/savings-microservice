package com.bank.account.repository;

import com.bank.account.entity.SavingAccount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface AccountRepository
        extends JpaRepository<SavingAccount, UUID> {

    List<SavingAccount> findByCustomerId(
            String customerId);
}
