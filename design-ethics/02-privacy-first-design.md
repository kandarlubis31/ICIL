# ⚖️ 02 — Privacy-First Design & Data Minimization

> **Level: 🟡 Intermediate** | Prerequisite: 01 | ~10 min

Privacy isn't a compliance checkbox — it's a design constraint as fundamental as performance. Collect less data, be transparent about what you keep, and give users genuine control.

---

## 2.1 Cavoukian's 7 Principles (Privacy by Design)

| # | Principle | Implementation |
|---|-----------|---------------|
| 1 | **Proactive, not reactive** | Privacy risk assessment BEFORE first line of code |
| 2 | **Privacy as default** | Opt-IN for data sharing, not opt-out |
| 3 | **Privacy embedded into design** | Not a bolt-on — core architecture decision |
| 4 | **Full functionality (positive-sum)** | Privacy AND features — not a trade-off |
| 5 | **End-to-end security** | Encryption at rest, in transit, in processing |
| 6 | **Visibility & transparency** | Users can SEE what data you have |
| 7 | **Respect for user privacy** | User-centric — their data, their control |

---

## 2.2 Data Minimization Patterns

| Pattern | Bad | Good |
|---------|-----|------|
| **Sign-up** | Require phone + address + DOB | Email only. Ask for more LATER when needed |
| **Analytics** | Full IP + user agent + device fingerprint | Anonymized session hash, aggregated only |
| **Personalization** | Track every click, store forever | On-device processing (no server upload) |
| **Location** | Continuous background tracking | "While using app" only, coarse (city-level) |
| **AI Training** | Train on all user data by default | Explicit opt-in, local fine-tuning only |

**Data Retention Table:**
```
Data Type          Keep For        Then
─────────────────────────────────────────
Session logs       30 days         Auto-delete
Support tickets    1 year          Anonymize
Payment records    7 years (legal) Archive (encrypted)
Behavioral data    90 days         Aggregate only
Deleted account    Immediate       Hard delete all PII
```

---

## 2.3 Consent That Actually Works

| Anti-Pattern | Privacy-First Alternative |
|-------------|--------------------------|
| Pre-ticked checkboxes | All unchecked by default |
| "Accept All" prominent, "Reject All" hidden | Equal visual weight, same number of clicks |
| Legitimate interest as catch-all | Specific purpose per data type |
| Cookie wall (accept or leave) | Essential cookies only without consent |
| 47-page privacy policy | Layered notice: 1-paragraph summary → details on demand |

```html
<!-- ❌ Dark pattern consent -->
<button class="primary">Accept All</button>
<a href="#" class="dim">Manage preferences</a> (47 toggles)

<!-- ✅ Privacy-first consent -->
<button class="secondary">Accept All</button>
<button class="secondary">Reject All</button>
<button class="primary">Customize</button> (3 categories, all OFF)
```

---

## 2.4 GDPR & Global Privacy Landscape

| Regulation | Jurisdiction | Key Requirement |
|-----------|-------------|----------------|
| **GDPR** | EU/EEA | Consent, right to erasure, DPO, 72h breach notification |
| **CCPA/CPRA** | California | Right to know, delete, opt-out of sale |
| **LGPD** | Brazil | Similar to GDPR, applies to any data processed in Brazil |
| **PIPEDA** | Canada | Consent + "reasonable purpose" limitation |
| **EU AI Act** | EU (2026) | Risk-tiered AI regulation, transparency for AI-generated content |

---

## ⚡ Action Checklist

- [ ] Map every piece of data you collect → WHY you need it → when you delete it
- [ ] Implement "Reject All" with equal prominence to "Accept All" (one click, not 47 toggles)
- [ ] Set up automated data retention: 30-day session logs, 90-day behavioral data, immediate PII deletion on account close
- [ ] Add a privacy dashboard: users can see, export, and delete their data

> **ICIL Cross-Ref:** security/04 (Encryption & Data Protection), security/07 (Incident Response & Compliance), ux-psikologi/06 (Dark Patterns)
