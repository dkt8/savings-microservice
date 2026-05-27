# transaction-service

**Port:** 8085
**Database:** `transaction_db`
**Java package:** `com.bank.transaction`

## Where to put your code

| What | Where |
|------|-------|
| JPA entities | `src/main/java/com/bank/transaction/entity/` |
| Repositories | `src/main/java/com/bank/transaction/repository/` |
| REST controllers | `src/main/java/com/bank/transaction/controller/` |
| Service classes (business logic) | create `src/main/java/com/bank/transaction/service/` |

The Spring Boot bootstrap class is at [TransactionServiceApplication.java](src/main/java/com/bank/transaction/TransactionServiceApplication.java). Don't move or rename it.

## Run via Docker (recommended)

From the repo root:

```
docker compose up transaction-service --build
```

## Run locally (without Docker)

1. Start Postgres from the repo root: `docker compose up postgres -d`
2. From this folder: `gradle bootRun`

## Hand-off to other teammates

Document your endpoints here:

- `GET /api/v1/transactions` — TODO
- `POST /api/v1/transactions` — TODO
