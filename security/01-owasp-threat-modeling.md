# 🔐 01 — OWASP Top 10 & Threat Modeling

> 🟢 Beginner | Prereq: — | ~9 min

Security starts with understanding threats. OWASP Top 10 catalogues the most critical web vulnerabilities. Threat modeling (STRIDE) systematically identifies what can go wrong BEFORE writing code.

---

## 1.1 OWASP Top 10 (2021 historical edition)

> ℹ️ **Edition note (reviewed 2026-08-01)**: This table preserves the OWASP Top 10:2021 taxonomy for continuity with the examples below. OWASP's official project page now identifies **Top 10:2025** as the most current released version. Re-check the official edition before using this table as a current risk ranking.

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

> **Edition note (reviewed 2026-08-01)**: This course uses OWASP's v1.1 taxonomy as a teaching snapshot. The OWASP project page labels v1.1 as archived and links to the current GenAI/LLM Top 10 project; verify the current edition before treating these labels as a live ranking.
>
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

> 🔄 **Complementary frameworks**: Pair STRIDE with **PASTA** (risk-centric, attack simulation) or **MITRE ATT&CK** (adversary tactics). For AI systems, map threats to a current AI-security framework; any STRIDE-LM extension should be treated as a proposed adaptation, not as an OWASP standard, until its source and scope are verified.

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

- **"Security later"** — delaying security increases remediation risk and cost; quantify the impact for your own project rather than relying on an unsourced universal multiplier
- **Trusting user input** — ALL input is hostile until proven otherwise
- **Security through obscurity** — hidden ≠ secure

## 1.6 Sources / Verification Notes

- [OWASP Top 10 project](https://owasp.org/www-project-top-ten/) — official page reviewed 2026-08-01; lists Top 10:2025 as the current released edition and links historical editions.
- [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/) — official project page reviewed 2026-08-01; v1.1 is presented as archived and the page points to the current GenAI/LLM project.
- [Microsoft STRIDE threat modeling guidance](https://learn.microsoft.com/en-us/azure/security/develop/threat-modeling-tool-threats) — framework reference; examples in this course remain instructional.

## 1.7 ICIL Cross-Ref

Use with: `software-engineering/03` (API input validation), `ai-integration/06` (AI safety), `agentic-engineering/06` (agent security — see §1.2 OWASP LLM Top 10)

## ⚡ Action Checklist
- [ ] Run STRIDE on every new feature before implementation
- [ ] Know OWASP Top 10 (web) — can you name all 10 from memory?
- [ ] For AI/LLM apps: cross-reference OWASP LLM Top 10 (prompt injection, excessive agency)
- [ ] Every input is validated, sanitized, and parameterized
- [ ] Security requirements defined BEFORE architecture decisions
- [ ] Run `npm audit` / `pip audit` weekly — not just before release
