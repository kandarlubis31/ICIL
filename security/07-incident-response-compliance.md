# 🔐 07 — Incident Response & Compliance

> 🔴 Advanced | Prereq: 01,05 | ~8 min

Security isn't prevention-only — incidents WILL happen. A practiced response plan, proper audit logging, and compliance (GDPR/SOC2) turn a breach from catastrophe into controlled recovery.

---

## 7.1 Incident Response Plan

```
DETECT → CONTAIN → ERADICATE → RECOVER → POST-MORTEM

DETECT (minutes):
  → Alert fires (error rate spike, unusual access pattern)
  → On-call engineer acknowledges within 5 min

CONTAIN (hour 1):
  → Isolate affected systems (revoke keys, block IPs, take server offline)
  → Stop the bleeding FIRST, investigate later

ERADICATE (hours):
  → Find root cause (how did they get in?)
  → Patch vulnerability, rotate all secrets

RECOVER (hours-days):
  → Restore from clean backup
  → Bring systems back online gradually

POST-MORTEM (week after):
  → Blameless: what happened, not who
  → Action items with owners and deadlines
```

## 7.2 Audit Logging

```ts
// Log every security-relevant event
const auditLog = {
  timestamp: new Date().toISOString(),
  event: 'user.login.failed',      // what happened
  actor: { id: null, ip: req.ip }, // who (null = unknown)
  target: { type: 'user', email }, // on what
  outcome: 'failure',              // result
  metadata: { reason: 'invalid_password', attempt: 3 }
};

// NEVER log: passwords, tokens, full credit card numbers
// ALWAYS log: event type, actor IP, timestamp, outcome
```

## 7.3 Compliance Quick Reference

| Regulation | Scope | Key Requirements |
|-----------|-------|-----------------|
| **GDPR** | EU user data | Consent, right to delete, breach notification (72h) |
| **SOC 2** | Service orgs | Security, availability, confidentiality controls |
| **PCI DSS** | Card payments | Never store CVV, encrypt PAN, annual audit |
| **HIPAA** | Healthcare (US) | PHI encryption, access controls, audit trails |

## 7.4 Post-Mortem Template

```
TITLE: [YYYY-MM-DD] Brief incident description
TIMELINE:
  → 14:32 Alert fired (error rate > 5%)
  → 14:37 On-call acknowledged
  → 14:45 Root cause identified (regression in order validation)
  → 15:10 Fix deployed, monitoring confirmed recovery

ROOT CAUSE: Deploy v2.3.1 removed input validation on order quantity
IMPACT: 8% of orders failed for 38 minutes (~200 affected orders)
FIXES:
  → Re-add validation with test coverage
  → Add canary deploy (5% traffic, monitor 10 min before full rollout)
  → Alert threshold tightened: error > 2% → page on-call
```

## 7.5 Anti-Patterns

- **No runbook** — "we'll figure it out during the incident" = extended downtime
- **Blaming individuals** — systems fail, not people; focus on process improvement
- **No post-mortem** — incident without post-mortem = guarantee it'll happen again

## 7.6 ICIL Cross-Ref

Use with: `devops-infra/06` (monitoring), `security/05` (secure SDLC)

## ⚡ Action Checklist
- [ ] Incident response runbook documented (who to call, what to do first)
- [ ] Audit logging enabled on all auth, payment, and admin events
- [ ] GDPR: user data export + deletion flows implemented and tested
- [ ] Post-mortem template ready; every P1 incident gets one
- [ ] Disaster recovery tested annually (restore from backup, verify integrity)
