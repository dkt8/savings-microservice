# account-service

**Port:** 8084
**Database:** `account_db`
**Java package:** `com.bank.account`

## Where to put your code

| What | Where |
|------|-------|
| JPA entities | `src/main/java/com/bank/account/entity/` |
| Repositories | `src/main/java/com/bank/account/repository/` |
| REST controllers | `src/main/java/com/bank/account/controller/` |
| Service classes (business logic) | create `src/main/java/com/bank/account/service/` |

The Spring Boot bootstrap class is at [AccountServiceApplication.java](src/main/java/com/bank/account/AccountServiceApplication.java). Don't move or rename it.

## Run via Docker (recommended)

From the repo root:

```
docker compose up account-service --build
```

## Run locally (without Docker)

1. Start Postgres from the repo root: `docker compose up postgres -d`
2. From this folder: `gradle bootRun`

## Hand-off to other teammates

Document your endpoints here:

- `GET /api/v1/accounts` — TODO
- `GET /api/v1/accounts/{accountNumber}` — TODO
