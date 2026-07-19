# 🔐 01 — OWASP Top 10 & Threat Modeling

> 🟢 Beginner | Prereq: — | ~9 min

Security starts with understanding threats. OWASP Top 10 catalogues the most critical web vulnerabilities. Threat modeling (STRIDE) systematically identifies what can go wrong BEFORE writing code.

---

## 1.1 OWASP Top 10 (2021)

> ℹ️ **Status**: OWASP Top 10:2021 remains the current **official, finalized** version. A 2025 update is in data-collection phase (not yet released) — do not cite draft lists as final.

| # | Vulnerability | Impact | Defense |
|---|-------------|--------|---------|
| A01 | Broken Access Control | Data theft, privilege escalation | RBAC, deny-by-default |
| A02 | Cryptographic Failures | Data exposure | TLS, strong algorithms |
| A03 | Injection (SQL, XSS, CMD) | Data loss, RCE | Parameterized queries, sanitization |
| A04 | Insecure Design | Systemic vulnerability | Threat modeling, secure SDLC |
| A05 | Security Misconfiguration | Information disclosure | Harden defaults, disable debug |
| A06 | Vulnerable Components | Known exploits | `npm audit`, dependency scanning |
| A07 | Auth Failures | Account takeover | MFA, rate limiting, bcrypt |
| A08 | Software & Data Integrity | Supply chain attack | Signed commits, integrity checks |
| A09 | Logging & Monitoring Failures | Undetected breach | Centralized logging, alerting |
| A10 | SSRF | Internal network access | Allow-list URLs, network segmentation |

## 1.2 OWASP Top 10 for LLM Applications (v1.1)

> AI/LLM apps face threats the web Top 10 doesn't cover. OWASP maintains a **separate** list for LLM applications.

| # | Risk | Impact | Defense |
|---|------|--------|---------|
| LLM01 | Prompt Injection | Unauthorized actions, data breach | Input guardrails, system prompt isolation |
| LLM02 | Insecure Output Handling | XSS, downstream code execution | Validate/sanitize LLM output before rendering |
| LLM03 | Training Data Poisoning | Biased/malicious model behavior | Verify data provenance, model auditing |
| LLM04 | Model Denial of Service | Service disruption | Rate limiting, resource quotas |
| LLM05 | Supply Chain Vulnerabilities | Compromised via plugins/models | Vet plugins/models, signed models |
| LLM06 | Sensitive Info Disclosure | PII/proprietary data leak | Data minimization, PII filtering |
| LLM07 | Insecure Plugin Design | RCE via plugin vector | Auth + validation on all plugin calls |
| LLM08 | Excessive Agency | Unintended autonomous actions | Human-in-the-loop, least privilege |
| LLM09 | Overreliance | Faulty decisions, misinformation | Output verification, uncertainty labels |
| LLM10 | Model Theft | IP loss, competitive harm | Access controls, model encryption |

## 1.3 STRIDE Threat Model

```
S — Spoofing:     "Can someone pretend to be someone else?"
T — Tampering:     "Can data be modified in transit or storage?"
R — Repudiation:   "Can actions be denied?"
I — Info Disclosure:"Can sensitive data be leaked?"
D — Denial of Svc: "Can the service be overwhelmed?"
E — Elevation:     "Can a user gain unauthorized privileges?"
```

> 🔄 **Complementary frameworks**: Pair STRIDE with **PASTA** (risk-centric, attack simulation) or **MITRE ATT&CK** (adversary tactics). For AI systems, use **STRIDE-LM** extensions that add model-poisoning and prompt-injection categories.

---

## 1.4 Quick Threat Model Exercise

```
Feature: User uploads profile photo
  1. Spoofing:    Can attacker upload as another user? → Auth check
  2. Tampering:   Can uploaded file contain malware? → File type validation
  3. Repudiation: Can user deny uploading? → Audit log
  4. Info Disc:   Can other users view private photos? → Access control
  5. DoS:         Can 100GB upload crash server? → Size limit
  6. Elevation:   Can upload trigger RCE? → Sandbox processing
```

## 1.5 Anti-Patterns

- **"Security later"** — retrofitting security costs 30x more than building it in
- **Trusting user input** — ALL input is hostile until proven otherwise
- **Security through obscurity** — hidden ≠ secure

## 1.6 ICIL Cross-Ref

Use with: `software-engineering/03` (API input validation), `ai-integration/06` (AI safety), `agentic-engineering/06` (agent security — see §1.2 OWASP LLM Top 10)

## ⚡ Action Checklist
- [ ] Run STRIDE on every new feature before implementation
- [ ] Know OWASP Top 10 (web) — can you name all 10 from memory?
- [ ] For AI/LLM apps: cross-reference OWASP LLM Top 10 (prompt injection, excessive agency)
- [ ] Every input is validated, sanitized, and parameterized
- [ ] Security requirements defined BEFORE architecture decisions
- [ ] Run `npm audit` / `pip audit` weekly — not just before release
