# 🔧 03 — Heuristic Evaluation

> 🟡 Intermediate | Prereq: 02 | ~4 min

Structured expert review against 10 usability principles. Fastest way to find UX problems without user testing.

---

## 3.1 Nielsen's 10 Heuristics — Quick Reference

| # | Heuristic | Core Check |
|---|-----------|-----------|
| H1 | **Visibility of status** | Loading states, confirmations, breadcrumbs? |
| H2 | **Match real world** | Plain language, familiar metaphors, no jargon? |
| H3 | **User control** | Cancel, undo, back, ESC close — always available? |
| H4 | **Consistency** | Same term = same meaning everywhere. Same style = same behavior. |
| H5 | **Error prevention** | Dropdowns, date pickers, confirm destructive, inline validate |
| H6 | **Recognition > Recall** | Options visible, form data retained, search history shown |
| H7 | **Flexibility** | Keyboard shortcuts, Cmd+K, batch ops, customization? |
| H8 | **Aesthetic & minimal** | Only essential elements, progressive disclosure, whitespace |
| H9 | **Error recovery** | Plain language, specific problem, suggested solution |
| H10 | **Help** | Tooltips, inline help, contextual docs, guided onboarding |

---

## 3.2 Severity Rating

| Rating | Label | Example |
|--------|-------|---------|
| 0 | Not a problem | Skip |
| 1 | Cosmetic | Inconsistent hover animation |
| 2 | Minor | Confusing label (easy workaround) |
| 3 | Major | No undo on delete (frequent) |
| **4** | **Catastrophic** | **Form can't submit (blocks task)** |

```
Severity = Frequency × Impact × Persistence
```

---

## 3.3 AI Agent Evaluation Process

```
1. Scan interface → 2. Evaluate H1-H10 → 3. Compile findings with severity + faculty
→ 4. Prioritize (severity 4 first) → 5. Reference campus for fixes
```

### Extended Checks

| Framework | Check | Faculty |
|-----------|-------|---------|
| Fitts's Law | Important buttons large + close? | `ux-psikologi/03` |
| Hick's Law | Too many choices? | `ux-psikologi/03` |
| Gestalt | Proximity/Similarity/Closure working? | `ux-psikologi/04` |
| Cognitive | Choice paralysis? Anchoring? Dark patterns? | `ux-psikologi/02,06` |

---

## ⚡ Action Checklist
- [ ] Evaluate against all 10 heuristics, rate severity 0-4
- [ ] Fix severity 4 first (blocks task completion)
- [ ] Reference campus faculty for each fix
