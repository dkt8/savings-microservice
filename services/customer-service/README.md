# customer-service

**Port:** 8082
**Database:** `customer_db`
**Java package:** `com.bank.customer`

## Where to put your code

| What | Where |
|------|-------|
| JPA entities | `src/main/java/com/bank/customer/entity/` |
| Repositories | `src/main/java/com/bank/customer/repository/` |
| REST controllers | `src/main/java/com/bank/customer/controller/` |
| Service classes (business logic) | create `src/main/java/com/bank/customer/service/` |

The Spring Boot bootstrap class is at [CustomerServiceApplication.java](src/main/java/com/bank/customer/CustomerServiceApplication.java). Don't move or rename it.

## Run via Docker (recommended)

From the repo root:

```
docker compose up customer-service --build
```

## Run locally (without Docker)

1. Start Postgres from the repo root: `docker compose up postgres -d`
2. From this folder: `gradle bootRun`

## Hand-off to other teammates

Document your endpoints here:

- `GET /api/v1/customers` — TODO
- `GET /api/v1/customers/{id}` — TODO
