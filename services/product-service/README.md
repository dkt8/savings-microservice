# product-service

Owns saving products (the product catalog: product code, name, currency, interest rate type, status, maturities).

**Port:** 8083
**Database:** `product_db`
**Java package:** `com.bank.product`

## Where to put your code

| What | Where |
|------|-------|
| JPA entities | `src/main/java/com/bank/product/entity/` |
| Repositories | `src/main/java/com/bank/product/repository/` |
| REST controllers | `src/main/java/com/bank/product/controller/` |
| Service classes (business logic) | create `src/main/java/com/bank/product/service/` |

The Spring Boot bootstrap class is at [ProductServiceApplication.java](src/main/java/com/bank/product/ProductServiceApplication.java). Don't move or rename it.

## Run via Docker (recommended)

From the repo root:

```
docker compose up product-service --build
```

## Run locally (without Docker)

1. Start Postgres from the repo root: `docker compose up postgres -d`
2. From this folder: `gradle bootRun`

## Hand-off to other teammates

Document your endpoints here:

- `GET /api/v1/saving-products` — TODO
- `GET /api/v1/saving-products/{productCode}` — TODO
- `POST /api/v1/saving-products` — TODO
