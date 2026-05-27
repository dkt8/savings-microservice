# Banking Microservices — 1-day Homework

Monorepo for the 8-service banking demo. Each teammate owns one service, all run together via Docker Compose, and the `api-gateway` service demonstrates **API Composition** (the "API composite" pattern from class).

## Tech stack

- **Java 25**
- **Spring Boot 3.5.x** (with Hibernate via `spring-boot-starter-data-jpa`)
- **Gradle 9**
- **PostgreSQL 16** (one shared container, one database per service)
- **Docker / Docker Compose**

## Prerequisites

Everyone needs **Docker Desktop** installed. That's it.

- Mac: <https://www.docker.com/products/docker-desktop/>
- Windows: same link — install Docker Desktop for Windows (uses WSL2 under the hood).

You do **not** need Java, Gradle, or Postgres installed locally. Docker handles all of that.

## Quick start

```
git clone <repo-url>
cd saving-product-service
docker compose up --build
```

That brings up Postgres + all 8 services + the api-gateway. First build takes a few minutes. Subsequent runs are fast.

To bring up just one service while you're developing:

```
docker compose up postgres customer-service --build
```

## Repo layout

```
saving-product-service/
├── docker-compose.yml          # brings up everything
├── init-db.sql                 # creates 8 databases on first postgres startup
├── README.md                   # you are here
├── .gitignore
├── .gitattributes              # forces LF line endings (Mac/Windows safe)
└── services/
    ├── auth-service/                  port 8081, db auth_db
    ├── customer-service/              port 8082, db customer_db
    ├── product-service/               port 8083, db product_db
    ├── account-service/               port 8084, db account_db
    ├── transaction-service/           port 8085, db transaction_db
    ├── savings-contract-service/      port 8086, db contract_db
    ├── interest-calculation-service/  port 8087, db interest_db
    ├── saving-lifecycle-service/      port 8088, db lifecycle_db
    └── api-gateway/                   port 8080, no db (composite)
```

Each service folder has its own `README.md`, `build.gradle`, `Dockerfile`, and `application.yml`. The Spring Boot bootstrap class is also pre-written — you just need to add your entities, repositories, and controllers.

## Service ownership

Fill this in as you assign teammates:

| Service | Owner | Port | DB |
|---------|-------|------|----|
| auth-service | TBD | 8081 | auth_db |
| customer-service | TBD | 8082 | customer_db |
| product-service | TBD | 8083 | product_db |
| account-service | TBD | 8084 | account_db |
| transaction-service | TBD | 8085 | transaction_db |
| savings-contract-service | TBD | 8086 | contract_db |
| interest-calculation-service | TBD | 8087 | interest_db |
| saving-lifecycle-service | TBD | 8088 | lifecycle_db |
| api-gateway | TBD | 8080 | — |

## How each teammate works

1. Pick your service folder under `services/`.
2. Read its `README.md` for port, DB name, and package layout.
3. Add JPA entities to `entity/`, repositories to `repository/`, REST controllers to `controller/`. Optionally a `service/` folder for business logic.
4. Test locally with `docker compose up postgres <your-service> --build`.
5. Document the endpoints you exposed in your service's README so others (and the api-gateway) know how to call you.

**Do not edit other people's service folders.** If you need data from another service, call its HTTP API.

## The "API composite" pattern (for the demo)

In microservices, data is spread across services. The front-end can't hit one service to get a full picture — it needs data from several. **API Composition** solves this: one service (the `api-gateway` here) calls multiple downstream services and merges results.

For the demo, the gateway should expose at least one composite endpoint, e.g.:

```
GET http://localhost:8080/api/v1/composite/customer-overview/{customerId}
```

That call should internally fan out to `customer-service`, `account-service`, and `transaction-service`, then return one merged JSON. See [services/api-gateway/README.md](services/api-gateway/README.md) for a code skeleton.

## Inter-service URLs

When one service needs to call another, use the docker-compose service name as hostname (not `localhost`):

```
http://customer-service:8082/api/v1/customers/123
http://account-service:8084/api/v1/accounts/456
```

`localhost` only works from your laptop hitting the exposed port (e.g. testing with curl/Postman from outside Docker).

## Common commands

```
docker compose up --build                     # bring everything up
docker compose up postgres customer-service   # only specific services
docker compose down                           # stop everything
docker compose down -v                        # stop AND wipe the database
docker compose logs -f customer-service       # tail one service's logs
docker compose build customer-service         # rebuild after a code change
```

## Troubleshooting

- **"Port already in use"**: another process owns 8080-8088 or 5432. Stop it, or change the host-side port in `docker-compose.yml`.
- **Postgres database doesn't exist**: `docker compose down -v` to wipe the volume, then `docker compose up` to re-run `init-db.sql`.
- **Windows line ending errors in Docker build**: should be prevented by `.gitattributes`. If you still hit it, run `git config --global core.autocrlf input` and re-clone.
- **Spring Boot fails to start with "Failed to determine a suitable driver class"**: postgres isn't ready yet. The compose file has a healthcheck, so it should wait — but if you're running outside compose, start postgres first.
