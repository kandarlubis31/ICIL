# 🔐 08 — Zero Trust Architecture & Identity

> **Level: 🔴 Advanced** | Prerequisite: security/01,02 | ~10 min

Zero Trust flips the perimeter model: "never trust, always verify." Every request — even from inside the network — must be authenticated, authorized, and continuously validated. Essential for AI agents accessing internal systems.

---

## 8.1 Core Principles (NIST SP 800-207)

| Principle | Traditional | Zero Trust |
|-----------|-------------|------------|
| Network | Trusted internal zone | No implicit trust |
| Access | Perimeter firewall | Per-session, per-resource |
| Auth | Once at login | Continuous every request |
| Visibility | Perimeter monitoring | End-to-end telemetry |
| Assumption | Inside = safe | Breach assumed |

**7 Tenets (NIST SP 800-207):**

| # | Tenet | Implementation |
|---|-------|---------------|
| 1 | All data sources & services are resources | Catalog everything: APIs, DBs, SaaS, IoT |
| 2 | All communication secured regardless of network location | mTLS everywhere, no cleartext internal traffic |
| 3 | Access per-session, least privilege | JWT with short TTL (5 min), scope-limited tokens |
| 4 | Dynamic policy — signals + risk-based | Device health, location, time, behavior anomalies |
| 5 | Continuous monitoring & integrity | All assets monitored, integrity verified |
| 6 | Strict enforcement — deny by default | Explicit allowlists, not blocklists |
| 7 | Collect as much telemetry as possible | Logs feed SIEM/SOAR for posture improvement |

---

## 8.2 Identity-Centric Architecture

```
┌─────────────────────────────────────────────────────┐
│                 POLICY ENGINE (PEP/PDP)              │
│  ┌──────────┐   ┌──────────┐   ┌────────────────┐  │
│  │ Subject  │──▶│ Policy   │──▶│ Policy         │  │
│  │ (user/   │   │ Enforce- │   │ Decision       │  │
│  │  agent)  │   │ ment Pt  │   │ Point          │  │
│  └──────────┘   └──────────┘   └───────┬────────┘  │
│                                        │            │
│                              ┌─────────▼─────────┐  │
│                              │  Trust Engine     │  │
│                              │  (risk scoring)   │  │
│                              └───────────────────┘  │
└─────────────────────────────────────────────────────┘
```

| Component | Role | Tool Example |
|-----------|------|-------------|
| **PEP** (Policy Enforcement Point) | Gateway that intercepts every request | Envoy, Istio, API Gateway |
| **PDP** (Policy Decision Point) | Evaluates policy rules against context | Open Policy Agent (OPA), Cedar |
| **PIP** (Policy Information Point) | External data for decisions (device, threat intel) | LDAP, MDM, SIEM |
| **IdP** (Identity Provider) | Issues short-lived, scoped credentials | Okta, Azure AD, WorkOS |

---

## 8.3 Microsegmentation

| Pattern | Description | When |
|---------|-------------|------|
| **Host-based** | Agent on each workload enforces rules | Legacy/bare-metal |
| **Network-based** | SDN policies between segments | Cloud-native |
| **Identity-based** | Per-workload identity (SPIFFE/SPIRE) | Kubernetes, service mesh |
| **Application-layer** | API-level auth per endpoint | Microservices |

**SPIFFE/SPIRE identity:**
```yaml
# Every workload gets a cryptographic identity
spiffe://acme.com/namespace/production/service/payment-api
# mTLS between all services — no IP-based trust
```

---

## 8.4 Continuous Verification

| Signal | Check | Weight |
|--------|-------|--------|
| Device posture | OS patch level, EDR running, disk encrypted | High |
| User behavior | Location anomaly, impossible travel, unusual hour | Medium |
| Session risk | Failed MFA attempts, new device, Tor exit node | High |
| Resource sensitivity | PII/PCI data = stricter policy | Critical |
| Agent identity | AI agent's allowed tool scope, budget remaining | New (2026) |

**Risk-based step-up:**
```js
if (riskScore > 0.7) {
  requireMFA();           // Step up auth
  limitScope('read');    // Reduce permissions
  shortenTTL('5min');   // Force re-auth soon
  alertSOC();           // Notify security team
}
```

---

## 8.5 Zero Trust for AI Agents

AI agents amplify ZT complexity — they act autonomously with tool access:

| Challenge | ZT Approach |
|-----------|------------|
| Agent has API keys with broad scope | Per-tool, per-call token issuance (no static keys) |
| Agent can exfiltrate data | Egress filtering, DLP on agent output streams |
| Agent context contains PII | Tokenize/redact before agent processing |
| Agent makes destructive calls | Human-in-the-loop approval above risk threshold |
| Multi-agent delegation | Each agent gets its own SPIFFE identity; A2A with mTLS |

---

## ⚡ Action Checklist

- [ ] Inventory all resources (APIs, DBs, services, SaaS) — if you can't list it, you can't protect it
- [ ] Deploy mTLS for all internal service-to-service communication
- [ ] Move from long-lived API keys → short-lived scoped tokens (OAuth2 with PKCE)
- [ ] Implement OPA/Cedar policies: deny by default, explicit allow
- [ ] Set up continuous device posture checks (OSQuery, osquery, CrowdStrike)
- [ ] For AI agents: issue SPIFFE identities, enforce per-call tool authorization
- [ ] Telemetry: all PEP decisions logged → SIEM for anomaly detection

> **ICIL Cross-Ref:** security/01 (OWASP + threat modeling), security/02 (Auth & Authorization), security/06 (AI Security), agentic-engineering/06 (Agent Safety & Sandboxing)
