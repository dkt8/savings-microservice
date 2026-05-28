# Core Saving — Banking Microservices

A small banking demo built as a 1-day group homework. Two Spring Boot services
(product + account), a React/Vite frontend, Kong as the API gateway, and a
Grafana + Prometheus monitoring stack — all wired up with Docker Compose.

## Tech stack

- **Backend:** Java + Spring Boot, PostgreSQL 16 (one DB per service)
- **Frontend:** React + Vite
- **API gateway:** Kong
- **Monitoring:** Prometheus + Grafana
- **Orchestration:** Docker Compose (Kubernetes manifests also in `k8s/`)

## Quick start

```bash
git clone https://github.com/dkt8/savings-microservice.git
cd savings-microservice
docker compose up --build
```

First build takes a few minutes (npm install + Gradle build). Subsequent
runs are fast.

## Services

| Service | URL | What it is |
|---|---|---|
| **Frontend** | [http://localhost:3000](http://localhost:3000) | React UI — open this first |
| **Kong gateway** | [http://localhost:8000](http://localhost:8000) | Routes API calls to the right backend service |
| **Kong admin** | [http://localhost:8001](http://localhost:8001) | Kong configuration API |
| **Product service** | [http://localhost:8081](http://localhost:8081) | Saving products catalog |
| **Account service** | [http://localhost:8082](http://localhost:8082) | Customer savings accounts |
| **Product DB** | `localhost:5433` | PostgreSQL for product-service |
| **Account DB** | `localhost:5434` | PostgreSQL for account-service |
| **Grafana** | [http://localhost:3001](http://localhost:3001) | Monitoring dashboards |
| **Prometheus** | [http://localhost:9090](http://localhost:9090) | Metrics scraper |

The backend services return `404` at `/` — that's expected. Real endpoints
live under `/api/v1/...` and are reached through Kong on port `8000`.

## Repo layout

```
.
├── backend/
│   ├── accountservicebank/       Spring Boot — accounts
│   └── productservicebank/       Spring Boot — products
├── frontend/                     React + Vite UI
├── kong/                         Kong gateway config
├── monitoring/                   Prometheus + Grafana setup
├── k8s/                          Kubernetes manifests (alternative to compose)
├── docker-compose.yml            Brings the whole stack up
└── README.md                     You are here
```

## Stopping and cleaning up

```bash
# Stop containers, keep databases
docker compose down

# Stop containers AND wipe all DB data (start fresh next time)
docker compose down -v
```
