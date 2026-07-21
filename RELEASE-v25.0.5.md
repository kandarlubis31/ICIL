# 🎓 ICIL v25.0.5 — Release Notes

> **July 22, 2026** | 216 courses · 29 faculties · 10 MCP tools | CI All Green

---

## 🎯 Phase 1 LOW Keyword Tightening (35 dropped, 8 tightened)

Tightened LOW-tier "any" keywords across 6 false-positive-heavy faculties:

| Faculty | Dropped | Tightened |
|---------|---------|-----------|
| **design-patterns** | `control`, `output`, `focus` | `input`→MEDIUM[07], `interaction`+`interaksi`→MEDIUM[01,06,07] |
| **dx** | `developer`, `tool` | — |
| **strategic-design** | `think`, `decide`, `choose`, `goal`, `vision`, `mission`, `leadership`, `product`, `experiment` | `strategic`→MEDIUM[01,03], `planning`+`prioritize`+`roadmap`→MEDIUM[04], `validate`→MEDIUM[01,02] |
| **conversational-ui** | `talk`, `speak`, `listen`, `message`, `reply`, `respond`, `session`, `turn`, `interactive`, `assistant` | — |
| **design-systems** | `shared`, `reusable`, `consistent`, `konsisten`, `library` | — |
| **improvement** | `bagus`, `quality`, `kualitas`, `standard`, `standar` | — |

**Eval impact**: P@3 71.6%→72.8% (+1.2%), CROSS-FACULTY 130→129

---

## 📊 Data Integrity

- **17 same-faculty duplicate keywords** removed (keywords appearing in both HIGH and MEDIUM/LOW tiers)
- All **216 course files + 29 READMEs** validated on disk — 0 missing
- All **prerequisite references** validated — 0 broken cross-refs
- **Version sync**: `index.json` + `package.json` → 25.0.5

---

## 📈 README — Eval Progress Charts

- **Mermaid `xychart-beta`**: P@3 + R@3 dual-line chart (v24.1.0 → v25.0.5)
- **MRR line chart** (0.731 → 0.922)
- **Tree counts fixed**: 5 faculties with stale `(7 courses)` → actual (8-10)
- **Version badge**: v25.0.4 → v25.0.5

---

## 🔧 Code Quality

- **eval/ legacy cleanup**: 7 files moved to `archive/eval-legacy/` (eval-prompts.json era, pre-v24.1)
- **`package.json`** description synced to current metrics (72.8%/94.4%/0.922)
- **`.npmignore`** created — safety net for npm publishing

---

## 📝 Documentation Sync

6 meta files synced to v25.0.5:
- `CHANGELOG.md` — new v25.0.5 entry
- `AGENTS.md`, `CONTEXT.md`, `CAMPUS-OVERVIEW.md`, `PROGRESS-REPORT.md`, `README.md` — version bumps

---

## 🏗️ Infrastructure

- **`.github/workflows/ci.yml`**: Node version matrix [18, 20, 22]
- **`AUDIT-PLAN.md`**: 86-item final audit checklist, 61/86 (71%) complete
- **npm**: 252 files · 462KB compressed · 0 vulnerabilities

---

## 📊 Eval Baseline

```
P@3=72.8% | R@3=94.4% | MRR=0.922 | 0 DUPLICATE HIGH | 129 CROSS-FACULTY
ALL CHECKS PASSED — Exit 0
```

---

**Full Changelog**: [CHANGELOG.md](./CHANGELOG.md) — v1.0.0 (July 7, 2026) → v25.0.5 (July 22, 2026)

*ICIL — Intelligence Campus Interactive Library. Built by Mas Aul 🔥*
