# api-gateway (composite service)

This is the **API Composition** layer for the demo. It calls multiple downstream services and returns a merged response. Your professor's "API composite" requirement lives here.

**Port:** 8080 (the one the front-end / demo hits)
**Database:** none — this service is stateless
**Java package:** `com.bank.gateway`

## What goes in here

Composite endpoints that combine data from two or more services. Example demo endpoint to aim for:

```
GET /api/v1/composite/customer-overview/{customerId}
```

Should call:
1. `customer-service` to get customer info
2. `account-service` to get the customer's accounts
3. `transaction-service` to get recent transactions
4. Merge all three into one JSON response

## Service URLs

These are injected as environment variables by `docker-compose.yml`. Inside Java, read them with `@Value`:

| Env var | Default in docker-compose |
|---------|---------------------------|
| `AUTH_SERVICE_URL` | http://auth-service:8081 |
| `CUSTOMER_SERVICE_URL` | http://customer-service:8082 |
| `PRODUCT_SERVICE_URL` | http://product-service:8083 |
| `ACCOUNT_SERVICE_URL` | http://account-service:8084 |
| `TRANSACTION_SERVICE_URL` | http://transaction-service:8085 |
| `CONTRACT_SERVICE_URL` | http://savings-contract-service:8086 |
| `INTEREST_SERVICE_URL` | http://interest-calculation-service:8087 |
| `LIFECYCLE_SERVICE_URL` | http://saving-lifecycle-service:8088 |

## Where to put your code

| What | Where |
|------|-------|
| Composite REST controllers | `src/main/java/com/bank/gateway/controller/` |
| HTTP clients calling other services | `src/main/java/com/bank/gateway/client/` |
| Config (RestTemplate bean, etc.) | create `src/main/java/com/bank/gateway/config/` |

The Spring Boot bootstrap class is at [ApiGatewayApplication.java](src/main/java/com/bank/gateway/ApiGatewayApplication.java). Don't move or rename it.

## Suggested skeleton

```java
// config/RestTemplateConfig.java
@Configuration
public class RestTemplateConfig {
    @Bean RestTemplate restTemplate() { return new RestTemplate(); }
}

// controller/CompositeController.java
@RestController
@RequestMapping("/api/v1/composite")
public class CompositeController {
    private final RestTemplate http;
    @Value("${CUSTOMER_SERVICE_URL}") private String customerUrl;
    @Value("${ACCOUNT_SERVICE_URL}") private String accountUrl;
    // ... constructor injection of RestTemplate ...

    @GetMapping("/customer-overview/{id}")
    public Map<String, Object> overview(@PathVariable String id) {
        var customer = http.getForObject(customerUrl + "/api/v1/customers/" + id, Object.class);
        var accounts = http.getForObject(accountUrl + "/api/v1/accounts?customerId=" + id, Object.class);
        return Map.of("customer", customer, "accounts", accounts);
    }
}
```

## Run via Docker (recommended)

From the repo root:

```
docker compose up --build
```

This brings up Postgres + all 8 services + the gateway.

## Run locally (without Docker)

Not recommended — you'd need all 8 services running locally. Just use docker compose.
