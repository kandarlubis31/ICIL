# ♿ 01 — WCAG Foundations

> 🟢 Beginner | Prereq: — | ~4 min

Web accessibility = legal requirement + moral imperative + good business. WCAG = the standard.

---

## 1.1 Why It Matters

| Perspective | Impact |
|------------|--------|
| Human | 1.3B people (16%) live with disability |
| Legal | ADA (US), EAA (EU enforced June 2025) — lawsuits ↑300% since 2018 |
| Business | $13T disability market globally |
| SEO | Accessible sites rank better |
| Quality | Curb cut effect — accessibility benefits ALL users |

---

## 1.2 POUR — Four Principles

| Principle | Key Concern | Example |
|-----------|------------|---------|
| **Perceivable** | Users must sense content | Alt text, captions, contrast, resizable text |
| **Operable** | Users must interact | Keyboard-only, no time limits, no seizures |
| **Understandable** | Users must comprehend | Clear labels, consistent nav, helpful errors |
| **Robust** | Works with assistive tech | Valid HTML, proper ARIA, screen reader compatible |

---

## 1.3 Conformance Levels

| Level | Requirement | Target |
|-------|-------------|--------|
| **A** | Minimum — removes major barriers | Legal minimum |
| **AA** | Standard — removes most barriers | **Target for all projects** ⭐ |
| **AAA** | Highest — maximum accessibility | Optional, not always achievable |

| Criterion | A | AA | AAA |
|-----------|---|---|-----|-----|
| Normal text contrast | 3:1 | **4.5:1** | 7:1 |
| Large text contrast | 3:1 | **3:1** | 4.5:1 |
| Keyboard access | ✅ All | ✅ All | ✅ All + no trap |

---

## 1.4 Legal Frameworks

| Law | Region | Scope |
|-----|--------|-------|
| ADA | USA | Public accommodations |
| Section 508 | USA Federal | Government sites |
| **EAA** | **EU** | **Private sector digital products (June 2025!)** |
| UK Equality Act | UK | Service providers |
| AODA | Ontario, Canada | Public + large private |

---

## 1.5 Shift-Left Approach

```
DESIGN → BUILD → TEST → LAUNCH
  │        │       │       │
Consider   Use     Test    Monitor
a11y in    semantic with    and
wireframes HTML     screen  maintain
                    readers
```

| Phase | Cost to Fix |
|-------|------------|
| Design | $ |
| Build | $$ |
| Test | $$$ |
| Post-launch | **$$$$$** (lawsuits $10K-$100K+) |

> Automated tools catch ~30% of issues. Manual keyboard + screen reader testing = essential.

---

## 1.6 10-Second Check

```
Tab through page → visible focus indicator? → images have alt? → contrast ≥4.5:1?
→ heading structure logical? → resize 200% without break? → form labels? → <main> element?
```

---

## ⚡ Action Checklist
- [ ] Target WCAG 2.2 AA for all new projects
- [ ] Run automated axe/WAVE scan + manual keyboard test + screen reader test
- [ ] One `<main>` per page, one `<h1>`, logical heading hierarchy
- [ ] All text contrast ≥ 4.5:1 (AA minimum)
