# 🔐 05 — Secure SDLC & Dependency Security

> 🟡 Intermediate | Prereq: 01 | ~9 min

Security isn't a checkbox at the end — it's baked into every phase of development. Secure SDLC shifts security left. Dependency scanning prevents supply chain attacks.

---

## 5.1 Shift-Left Security

```
REQUIREMENTS → DESIGN → DEVELOP → TEST → DEPLOY → MONITOR
     │            │        │        │       │         │
     ├─Threat     ├─Secure  ├─SAST   ├─DAST  ├─Secret  ├─IDS
     │ model      │ design  │ lint   │ scan   │ scan    │ alerts
```

## 5.2 Dependency Scanning

```bash
# npm — audit dependencies
npm audit
npm audit fix       # auto-fix minor issues

# Check for known vulnerabilities
npx snyk test       # Snyk: deeper analysis
npm audit --json | grep -E '"severity":"(high|critical)"'

# GitHub Dependabot: auto-PRs for vulnerable deps
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 5
```

## 5.3 SAST — Static Analysis

```json
// .eslintrc.json — security rules
{
  "extends": ["plugin:security/recommended"],
  "rules": {
    "no-eval": "error",
    "security/detect-object-injection": "warn",
    "security/detect-non-literal-fs-filename": "error",
    "security/detect-child-process": "warn"
  }
}
```

## 5.4 Git Security Hygiene

```bash
# .gitignore — NEVER commit these
.env
*.pem
*.key
credentials.json
secrets/

# Scan for accidentally committed secrets
git secrets --scan-history

# If you accidentally commit a secret:
# 1. ROTATE the secret immediately (revoke + regenerate)
# 2. git filter-branch or BFG to purge from history
# 3. Force push + notify team
```

## 5.5 CI/CD Security Gates

```yaml
# GitHub Actions security job
security:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - run: npm ci
    - run: npm audit --audit-level=high  # fail on high/critical
    - run: npm run lint:security          # SAST linting
    - run: npx snyk test --severity-threshold=high
```

## 5.6 Anti-Patterns

- **"npm audit shows 50 warnings, ignore"** — triage them: 1 critical > 50 low
- **Reacting instead of preventing** — Dependabot auto-PRs > manual fix after breach
- **Secrets in `.env.example`** — template only; never commit real values

## 5.7 ICIL Cross-Ref

Use with: `devops-infra/03` (CI/CD), `security/07` (incident response)

## ⚡ Action Checklist
- [ ] Dependabot or Renovate enabled with weekly schedule
- [ ] `npm audit --audit-level=high` in CI — fails build on high/critical
- [ ] SAST linting in pre-commit hook (eslint-plugin-security)
- [ ] `.gitignore` blocks all secret file patterns (.env, *.pem, credentials.*)
- [ ] Run `git secrets --scan` before every release
