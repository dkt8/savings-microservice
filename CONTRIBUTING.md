# Contributing — How to add your service

This monorepo is set up so each teammate can add a Spring Boot service without
stepping on each other's work. Two reference services already exist
(`accountservicebank`, `productservicebank`) — copy their shape.

## Port allocation

To avoid collisions, claim the next free port from each column before you
start. Update this table in your PR.

| Owner | Service folder | Backend host port | Postgres host port | Kong path |
|---|---|---|---|---|
| _(approved)_ | `backend/productservicebank` | `8081` | `5433` | `/api/v1/products` |
| _(approved)_ | `backend/accountservicebank` | `8082` | `5434` | `/api/v1/accounts` |
| _claim me_ | `backend/_______` | `8083` | `5435` | `/api/v1/_____` |
| _claim me_ | `backend/_______` | `8084` | `5436` | `/api/v1/_____` |
| _claim me_ | `backend/_______` | `8085` | `5437` | `/api/v1/_____` |

Reserved ports (don't use): `3000` (frontend), `3001` (Grafana), `5432`,
`8000-8001` (Kong), `8443-8444` (Kong TLS), `9090` (Prometheus).

Each Spring service runs on **port 8080 inside its container** — Kong always
talks to `8080`. The host port (`8081`, `8082`, …) is just for direct access
from your laptop during development.

## Conventions (match what's there)

- **Service folder name:** lowercase, no separators, ends in `bank`.
  Example: `interestservicebank`, `customerservicebank`.
- **Java package root:** `<servicename>.com.example.<servicenamebank>`.
  (Yes it's a little unusual — match the existing pattern to keep imports
  predictable across the repo.)
- **API path prefix:** `/api/v1/<resource>` (plural, kebab-case).
- **Endpoints return 404 at `/`** — that's expected; real endpoints live
  under `/api/v1/...` and are routed by Kong on port `8000`.

## Step-by-step: add a backend service

1. **Claim a row in the port table** above (commit that change first).
2. **Copy a reference service** as a starting point:
   ```bash
   cp -R backend/productservicebank backend/<yourservicebank>
   ```
3. **Rename the Java package** under `src/main/java/...` to match your
   service name, and update `application.yml` / `application.properties` to
   point at your database name. The Spring port stays `8080`.
4. **Add your service + database to [docker-compose.yml](docker-compose.yml)** —
   mirror the `product-service` + `product-db` blocks, swapping the names
   and the host ports you claimed.
5. **Add a Kong route** in [kong/kong.yml](kong/kong.yml) — copy the
   `product-service` block, point the `url:` at your container, and set
   `paths:` to your `/api/v1/...` prefix.
6. **Bring it up:**
   ```bash
   docker compose up -d --build <your-service> <your-db> kong
   ```
7. **Smoke test through Kong:**
   ```bash
   curl http://localhost:8000/api/v1/<your-resource>
   ```

## Step-by-step: add a frontend tab

The frontend is React + Vite + Ant Design.

1. **Create a page** at `frontend/src/pages/<YourFeature>Page.jsx` — model it
   on `DashboardPage.jsx` or `ReadmePage.jsx`.
2. **Add a route** in [frontend/src/App.jsx](frontend/src/App.jsx):
   ```jsx
   <Route path="your-path" element={<YourFeaturePage />} />
   ```
3. **Add a sidebar item** in [frontend/src/layouts/MainLayout.jsx](frontend/src/layouts/MainLayout.jsx)
   following the existing pattern (pick an icon from `@ant-design/icons`).
4. **Rebuild the container** to see your changes (Vite builds at image-build
   time, served by nginx):
   ```bash
   docker compose up -d --build frontend
   ```
5. **Call your backend** via Kong: `fetch('/api/v1/your-resource')` —
   *not* `http://localhost:8081/...`. Going through Kong is what makes CORS
   work and what the frontend will use in production.

## Git workflow

- **Don't push directly to `main`.** Open a PR from a feature branch
  (`yourname/feature-x`). Lets the rest of the team see what's changing.
- **Run it locally first** — `docker compose up --build` should succeed
  before you push.
- **If you commit secrets by accident**, tell the team immediately — don't
  just rewrite history quietly. `.env` is gitignored; keep secrets out.

## Things that are NOT yours to change

- Files under another teammate's service folder — that's their territory.
- `kong/kong.yml` outside your own service block — coordinate before
  reordering or changing CORS rules.
- The Postgres + monitoring blocks in `docker-compose.yml` (other than
  adding your own DB).
