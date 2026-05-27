# saving-lifecycle-service

**Port:** 8088
**Database:** `lifecycle_db`
**Java package:** `com.bank.lifecycle`

## Where to put your code

| What | Where |
|------|-------|
| JPA entities | `src/main/java/com/bank/lifecycle/entity/` |
| Repositories | `src/main/java/com/bank/lifecycle/repository/` |
| REST controllers | `src/main/java/com/bank/lifecycle/controller/` |
| Service classes (business logic) | create `src/main/java/com/bank/lifecycle/service/` |

The Spring Boot bootstrap class is at [SavingLifecycleServiceApplication.java](src/main/java/com/bank/lifecycle/SavingLifecycleServiceApplication.java). Don't move or rename it.

## Run via Docker (recommended)

From the repo root:

```
docker compose up saving-lifecycle-service --build
```

## Run locally (without Docker)

1. Start Postgres from the repo root: `docker compose up postgres -d`
2. From this folder: `gradle bootRun`

## Hand-off to other teammates

Document your endpoints here:

- `POST /api/v1/lifecycle/events` — TODO
- `GET /api/v1/lifecycle/{contractId}` — TODO
