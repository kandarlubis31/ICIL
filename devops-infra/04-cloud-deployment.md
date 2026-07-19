# 🐳 04 — Cloud Deployment

> 🟡 Intermediate | Prereq: 02 | ~9 min

The cloud is the default deployment target. Whether AWS, GCP, or Azure, the patterns are consistent: compute, storage, managed services, and scaling.

---

## 4.1 Cloud Service Categories

| Category | AWS | GCP | Purpose |
|----------|-----|-----|---------|
| **Compute** | EC2, Lambda | Compute Engine, Cloud Run | Run application code |
| **Storage** | S3 | Cloud Storage | Files, images, static assets |
| **Database** | RDS, DynamoDB | Cloud SQL, Firestore | Managed databases |
| **CDN** | CloudFront | Cloud CDN | Global content delivery |
| **Secrets** | Secrets Manager | Secret Manager | API keys, credentials |
| **DNS** | Route 53 | Cloud DNS | Domain management |

## 4.2 Deployment Models

```
SERVERLESS (Cloud Run, Lambda):
  → Best for: APIs, event-driven, variable traffic
  → Scales to zero (no cost when idle)
  → Stateless only (use external DB/cache)

CONTAINER (ECS, GKE):
  → Best for: Microservices, consistent environments
  → Always running (some cost even idle)
  → Full control over runtime

VM (EC2, Compute Engine):
  → Best for: Legacy apps, full OS control
  → Most management overhead
  → Use only when containers/serverless won't work
```

## 4.3 Cloud Run Deployment

```bash
# Build and push to container registry
gcloud builds submit --tag gcr.io/myproject/myapp:v1

# Deploy to Cloud Run (serverless)
gcloud run deploy myapp \
  --image gcr.io/myproject/myapp:v1 \
  --region us-central1 \
  --allow-unauthenticated \
  --memory 512Mi \
  --min-instances 0 \
  --max-instances 10 \
  --set-env-vars DATABASE_URL=secret://db-url

# Get the URL
gcloud run services describe myapp --format='value(status.url)'
```

## 4.4 Anti-Patterns

- **Hardcoded IPs** — use DNS/service discovery; IPs change
- **Secrets in env vars** — use secret manager, not plaintext env
- **No autoscaling** — configure min/max instances based on traffic patterns

## 4.5 ICIL Cross-Ref

Use with: `devops-infra/02` (Docker), `devops-infra/05` (networking)

## ⚡ Action Checklist
- [ ] Start with serverless (Cloud Run) — simplest, scales to zero
- [ ] All secrets in secret manager, referenced by env var name
- [ ] Set autoscaling: min 0, max based on load testing
- [ ] Health check endpoint: `GET /health` returns 200
- [ ] Infrastructure deployed via IaC, not manual console clicks
