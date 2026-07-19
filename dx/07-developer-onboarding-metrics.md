# 🖥️ 07 — Developer Onboarding & Metrics

> 🟡 Intermediate | Prereq: 01 | ~6 min

Onboarding = the first 15 minutes. Those 15 minutes determine whether a developer stays or leaves forever. Measure it. Optimize it.

---

## 7.1 The Onboarding Funnel

```
Visitor → Signup → First API Call → First Working Integration → Production
 100%      60%         35%                 20%                    8%
```

| Drop-off Point | Common Cause | Fix |
|---------------|--------------|-----|
| Visitor → Signup | Unclear value prop | Hero: 1-line value + code example |
| Signup → First Call | Complex auth | Copy-paste curl with embedded test key |
| First Call → Integration | No SDK / bad docs | SDK quickstart < 5 min |
| Integration → Production | Unclear pricing, no support | Transparent pricing, chat widget |

---

## 7.2 Friction Logging

> A "friction log" is a minute-by-minute diary of a new developer trying your product.

```
00:00 — Landed on docs page. Looks clean.
01:30 — Clicked "Quickstart". Scrolling...
03:45 — Copied curl example. Got 401. Hmm, need API key.
05:20 — Found API key page. Need to create account first.
07:10 — Account created. Where's my key?
08:00 — Found it in Settings → Developer. Hidden deep.
10:30 — Finally got a 200! But took way too long.
```

**Run 5 friction logs per quarter.** Fix the top 3 friction points each time.

---

## 7.3 Developer Journey Map

| Phase | Time Target | Success Metric |
|-------|------------|----------------|
| **Discover** | — | Page views, click-through to docs |
| **Evaluate** | < 5 min | 200 from first curl |
| **Integrate** | < 1 day | First working integration |
| **Build** | < 1 week | Feature shipped using API |
| **Scale** | < 1 month | Production deployment |

---

## 7.4 Developer Surveys

| Survey | When | Key Question |
|--------|------|-------------|
| **Onboarding** | Day 7 | "What was the hardest part?" |
| **NPS** | Quarterly | "Would you recommend us to another dev?" |
| **Churn** | On cancellation | "Why are you leaving?" |
| **Feature** | Post-launch | "Does this solve your problem?" |

---

## 7.5 The DX Dashboard

```
┌─────────────────────────────────────────────┐
│ DX HEALTH                           Q3 2026 │
├──────────────┬──────────┬──────────┬─────────┤
│ TTFHW        │ API Err% │ SDK NPS  │ Tickets │
│  3.2 min ▼   │  0.4% ▼  │  72 ▲    │ 0.08 ▼  │
├──────────────┴──────────┴──────────┴─────────┤
│ ONBOARDING FUNNEL:                           │
│ Visitor ████████████ 100%                    │
│ Signup  ██████ 60%                           │
│ 1st Call ██████ 35%  ← Fix: auth too complex │
│ Prod    █ 8%                                 │
└─────────────────────────────────────────────┘
```

---

## ⚡ Action Checklist

- [ ] Measure TTFHW — how long from landing to first 200 OK?
- [ ] Run 1 friction log with a new developer (don't help them)
- [ ] Survey active developers: "What's your #1 frustration?"
- [ ] Build a simple DX dashboard: 4 metrics, 1 page
- [ ] Fix the biggest drop-off in your onboarding funnel this sprint
