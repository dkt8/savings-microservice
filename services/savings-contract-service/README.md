# savings-contract-service

**Port:** 8086
**Database:** `contract_db`
**Java package:** `com.bank.contract`

## Where to put your code

| What | Where |
|------|-------|
| JPA entities | `src/main/java/com/bank/contract/entity/` |
| Repositories | `src/main/java/com/bank/contract/repository/` |
| REST controllers | `src/main/java/com/bank/contract/controller/` |
| Service classes (business logic) | create `src/main/java/com/bank/contract/service/` |

The Spring Boot bootstrap class is at [SavingsContractServiceApplication.java](src/main/java/com/bank/contract/SavingsContractServiceApplication.java). Don't move or rename it.

## Run via Docker (recommended)

From the repo root:

```
docker compose up savings-contract-service --build
```

## Run locally (without Docker)

1. Start Postgres from the repo root: `docker compose up postgres -d`
2. From this folder: `gradle bootRun`

## Hand-off to other teammates

Document your endpoints here:

- `POST /api/v1/contracts` — TODO
- `GET /api/v1/contracts/{id}` — TODO
