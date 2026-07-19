# 🐳 03 — CI/CD Pipelines

> 🟡 Intermediate | Prereq: 02 | ~8 min

CI/CD automates testing, building, and deploying code. A well-designed pipeline catches bugs before production and makes deployments boring (not stressful).

---

## 3.1 CI/CD Flow

```
PUSH → BUILD → TEST → SCAN → DEPLOY STAGING → E2E TEST → DEPLOY PROD
  │       │       │       │          │             │           │
  └─GitHub└─Docker └─Jest  └─SAST    └─Cloud Run   └─Playwright└─Prod URL
          build    unit    lint       staging env    smoke tests  live
```

## 3.2 GitHub Actions Pipeline

```yaml
# .github/workflows/deploy.yml
name: Build & Deploy
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci
      - run: npm run lint
      - run: npm test -- --coverage
      - run: npm run build

  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - id: auth
        uses: google-github-actions/auth@v2
        with: { credentials_json: '${{ secrets.GCP_SA_KEY }}' }
      - run: gcloud run deploy myapp --image gcr.io/proj/myapp:${{ github.sha }}
```

## 3.3 Pipeline Design Rules

| Rule | Why |
|------|-----|
| **Fast feedback** | Tests run < 5 min (parallelize if slower) |
| **Immutable artifacts** | Build once, promote (don't rebuild per env) |
| **Secrets in vault** | Never in code; use GitHub Secrets / Vault |
| **Rollback ready** | Every deploy has a one-click rollback path |

## 3.4 Anti-Patterns

- **Snowflake servers** — manually configured; unreproducible. Use IaC + CI/CD
- **Deploy Friday 5PM** — never deploy before leaving; deploy Tuesday morning
- **No staging env** — testing only on dev's machine is not testing

## 3.5 ICIL Cross-Ref

Use with: `devops-infra/02` (Docker), `improvement/06` (iterative refinement)

## ⚡ Action Checklist
- [ ] CI triggers on every PR push; CD triggers on main merge
- [ ] Lint + test + build run in parallel where possible
- [ ] Secrets never in workflow files — use `${{ secrets.NAME }}`
- [ ] Staging environment mirrors production config
- [ ] Rollback documented and tested (not just "we'll figure it out")
