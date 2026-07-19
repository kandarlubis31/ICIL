# 🐳 02 — Containerization & Docker

> 🟡 Intermediate | Prereq: 01 | ~9 min

Containers package applications with all dependencies into isolated, reproducible units. Docker is the industry standard. Master the Dockerfile, docker-compose, and image optimization.

---

## 2.1 Docker Architecture

```
┌────────────────────────────────────────┐
│              DOCKER HOST               │
│  ┌──────────┐  ┌──────────┐           │
│  │Container A│  │Container B│           │
│  │ Node 20  │  │ Postgres │           │
│  │ :3000    │  │ :5432    │           │
│  └──────────┘  └──────────┘           │
│       │              │                 │
│  ┌────┴──────────────┴──────────────┐ │
│  │         DOCKER ENGINE            │ │
│  └──────────────────────────────────┘ │
└────────────────────────────────────────┘
```

## 2.2 Dockerfile Best Practices

```dockerfile
# Multi-stage build — separate build from runtime
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
USER node
EXPOSE 3000
CMD ["node", "dist/server.js"]
```

## 2.3 Docker Compose

```yaml
# docker-compose.yml
version: "3.8"
services:
  app:
    build: .
    ports: ["3000:3000"]
    environment:
      DATABASE_URL: postgres://user:pass@db:5432/mydb
    depends_on:
      db:
        condition: service_healthy
    restart: unless-stopped

  db:
    image: postgres:16-alpine
    volumes: ["pgdata:/var/lib/postgresql/data"]
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
    healthcheck:
      test: ["CMD", "pg_isready", "-U", "user"]
      interval: 10s
```

## 2.4 Anti-Patterns

- **Latest tag in production** — use explicit version tags (`node:20-alpine`, not `node:latest`)
- **Secrets in Dockerfile** — use `docker secrets` or env vars, never hardcode
- **One container = multiple processes** — one concern per container

## 2.5 ICIL Cross-Ref

Use with: `service-design/02` (blueprinting), `improvement/01` (methodology)

## ⚡ Action Checklist

- [ ] Use multi-stage builds to minimize image size
- [ ] Run as non-root user (`USER node`)
- [ ] `.dockerignore` excludes `node_modules`, `.git`, `dist`
- [ ] Health checks on all database/service containers
- [ ] Use named volumes for persistent data (not bind mounts)
