# auth-service

**Port:** 8081
**Database:** `auth_db`
**Java package:** `com.bank.auth`

## Where to put your code

| What | Where |
|------|-------|
| JPA entities | `src/main/java/com/bank/auth/entity/` |
| Repositories | `src/main/java/com/bank/auth/repository/` |
| REST controllers | `src/main/java/com/bank/auth/controller/` |
| Service classes (business logic) | create `src/main/java/com/bank/auth/service/` |

The Spring Boot bootstrap class is already at [AuthServiceApplication.java](src/main/java/com/bank/auth/AuthServiceApplication.java). Don't move or rename it.

## Run via Docker (recommended)

From the repo root:

```
docker compose up auth-service --build
```

This also brings up Postgres.

## Run locally (without Docker)

1. Start Postgres from the repo root: `docker compose up postgres -d`
2. From this folder: `gradle bootRun`

## Hand-off to other teammates

Document your endpoints here so the api-gateway and other services know what to call:

- `GET /api/v1/...` — TODO
- `POST /api/v1/...` — TODO
