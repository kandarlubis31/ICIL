# 🔐 09 — Supply Chain & Dependency Security

> **Level: 🔴 Advanced** | Prerequisite: security/05 | ~10 min

Every dependency is a potential backdoor. SolarWinds (2020) → Log4Shell (2021) → xz utils (2024) — supply chain attacks grew 742% (2022-2024). This course covers SBOMs, SLSA framework, and practical hardening for Node.js, Python, and container supply chains.

---

## 9.1 The Attack Surface

```
┌──────────┐    ┌──────────┐    ┌──────────┐
│  Source  │───▶│  Build   │───▶│  Deploy  │
│  (git)   │    │  (CI/CD) │    │  (prod)  │
└────┬─────┘    └────┬─────┘    └────┬─────┘
     │               │               │
     ▼               ▼               ▼
┌──────────┐    ┌──────────┐    ┌──────────┐
│ Attacks: │    │ Attacks: │    │ Attacks: │
│• Repo    │    │• Build   │    │• Registry│
│  takeover│    │  injection│   │  poisoning│
│• Malici- │    │• Comprom-│    │• Dependency
│  ous PR  │    │  ised CI │    │  confusion│
│• Signed  │    │• Typo-   │    │• Artifact │
│  tag spoof│   │  squat   │    │  tamper  │
└──────────┘    └──────────┘    └──────────┘
```

| Attack Vector | Real Example | Impact |
|---------------|-------------|--------|
| **Dependency confusion** | Namespace hijacking (pip, npm private pkgs) | RCE on dev machines |
| **Typosquatting** | `electorn` vs `electron` (npm) | 10K+ downloads before detection |
| **Compromised maintainer** | xz utils (2024) — 2+ year infiltration | Backdoor in sshd |
| **Build pipeline injection** | SolarWinds (2020) — signed malware in updates | 18,000+ orgs breached |
| **Protestware** | node-ipc (2022) — wipes files based on geo-IP | Data destruction |
| **Expired domain takeover** | Maintainer email domain expires → attacker re-registers → password reset → publish malware | Full package control |

---

## 9.2 SBOM — Software Bill of Materials

**What it is:** A machine-readable inventory of every component, library, and dependency in your software — equivalent to a food ingredient label.

| Format | Ecosystem | Spec |
|--------|-----------|------|
| **SPDX** | Universal (Linux Foundation) | ISO/IEC 5962:2021 |
| **CycloneDX** | OWASP | v1.5 (2023) |
| **SWID** | Enterprise IT | ISO/IEC 19770-2 |

**Generate SBOM (Node.js):**
```bash
# CycloneDX (OWASP standard)
npx @cyclonedx/cyclonedx-npm --output-file sbom.json

# SPDX
npx spdx-sbom-generator -o sbom.spdx.json

# For containers
syft scan image:node:20-alpine -o cyclonedx-json > sbom.json
```

**SBOM contents:**
```json
{
  "components": [
    {
      "name": "express",
      "version": "4.21.0",
      "purl": "pkg:npm/express@4.21.0",
      "licenses": [{ "license": { "id": "MIT" } }],
      "hashes": [{ "alg": "SHA-256", "content": "abc123..." }]
    }
  ],
  "dependencies": [
    { "ref": "express@4.21.0", "dependsOn": ["accepts@1.3.8", "body-parser@1.20.3"] }
  ]
}
```

---

## 9.3 SLSA Framework (Supply-chain Levels for Software Artifacts)

| Level | Name | Requirements | Tooling |
|-------|------|-------------|---------|
| **L0** | None | No guarantees | — |
| **L1** | Build provenance | Automated build + provenance attestation | GitHub Actions + SLSA generator |
| **L2** | Hosted build + signed provenance | Build on hosted CI (not dev machine) + signed provenance | SLSA GitHub generator v1.5+ |
| **L3** | Hardened build + isolated | Hermetic builds, ephemeral env, non-falsifiable provenance | SLSA L3 builder + reusable workflows |
| **L4** | Two-person review + hermetic | Dual approval, fully reproducible builds | Nix + Bazel + SLSA L4 |

**Provenance example (in-toto attestation):**
```json
{
  "_type": "https://in-toto.io/Statement/v1",
  "subject": [{ "name": "app", "digest": { "sha256": "def456..." } }],
  "predicateType": "https://slsa.dev/provenance/v1",
  "predicate": {
    "builder": { "id": "https://github.com/slsa-framework/slsa-github-generator/.github/workflows/builder_docker-based_slsa3.yml@refs/tags/v1.9.0" },
    "buildType": "container",
    "materials": [{ "uri": "git+https://github.com/acme/app", "digest": { "sha1": "abc123..." } }]
  }
}
```

---

## 9.4 Practical Hardening

### Node.js / npm
```bash
# Audit + fix known vulns
npm audit fix

# Lockfile integrity
npm ci --strict-peer-deps  # production builds only

# Pin exact versions (no ranges)
# package.json: "express": "4.21.0" (not "^4.0.0")

# Check for compromised packages
npx is-my-node-vulnerable
npx socket security  # deep dependency analysis
```

### Python / pip
```bash
# Hash-checking mode
pip install --require-hashes -r requirements.txt

# Generate hashes
pip-compile --generate-hashes requirements.in

# Audit
pip-audit
safety check
```

### Container Images
```dockerfile
# Pin digests, not tags
FROM node:20-alpine@sha256:abc123def456...

# Multi-stage builds (minimize attack surface)
FROM node:20-alpine AS builder
COPY . .
RUN npm ci && npm run build

FROM node:20-alpine AS production
COPY --from=builder /app/dist ./dist
USER 1000  # non-root
```

### CI/CD Pipeline
```yaml
# github-actions.yml
jobs:
  verify-supply-chain:
    steps:
      - uses: slsa-framework/slsa-github-generator/.github/workflows/builder_docker-based_slsa3.yml@v1.9.0
      - run: npm audit --audit-level=high  # fail on high/critical
      - run: npx socket security --strict
      - run: syft scan . -o cyclonedx-json > sbom.json
      - uses: actions/upload-artifact@v4
        with: { name: sbom, path: sbom.json }
```

---

## 9.5 Dependency Confusion Defense

| Defense | How |
|---------|-----|
| **Scoped packages** | `@acme/private-lib` — npm scopes prevent confusion |
| **Registry proxy** | Verdaccio / Artifactory — internal registry only, no public fallback |
| **Package allowlists** | Only allow known-good packages in CI (socket.dev / Snyk policies) |
| **Hash pinning** | `npm ci` + `package-lock.json` committed — exact hashes |
| **Dependency review** | GitHub "Dependency Review" action on every PR |

---

## ⚡ Action Checklist

- [ ] Generate SBOM for every release (CycloneDX or SPDX) — store with build artifacts
- [ ] Implement SLSA L2 provenance at minimum (GitHub Actions + SLSA generator)
- [ ] Pin ALL dependencies: exact versions in lockfiles, container digests, no `latest` tags
- [ ] Run `npm audit` / `pip-audit` / `syft scan` in CI — fail on HIGH/CRITICAL
- [ ] Set up internal registry proxy — no direct public registry access from CI
- [ ] Review every new dependency: maintenance status, maintainer count, release frequency, known vulns
- [ ] Create an incident response plan for: "a critical dependency we use was compromised"

> **ICIL Cross-Ref:** security/01 (OWASP threat modeling), security/05 (Secure SDLC), devops-infra/03 (CI/CD pipelines), devops-infra/07 (IaC)
