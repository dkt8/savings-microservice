# interest-calculation-service

**Port:** 8087
**Database:** `interest_db`
**Java package:** `com.bank.interest`

## Where to put your code

| What | Where |
|------|-------|
| JPA entities | `src/main/java/com/bank/interest/entity/` |
| Repositories | `src/main/java/com/bank/interest/repository/` |
| REST controllers | `src/main/java/com/bank/interest/controller/` |
| Service classes (business logic) | create `src/main/java/com/bank/interest/service/` |

The Spring Boot bootstrap class is at [InterestCalculationServiceApplication.java](src/main/java/com/bank/interest/InterestCalculationServiceApplication.java). Don't move or rename it.

## Run via Docker (recommended)

From the repo root:

```
docker compose up interest-calculation-service --build
```

## Run locally (without Docker)

1. Start Postgres from the repo root: `docker compose up postgres -d`
2. From this folder: `gradle bootRun`

## Hand-off to other teammates

Document your endpoints here:

- `POST /api/v1/interest/calculate` — TODO
- `GET /api/v1/interest/{contractId}` — TODO
