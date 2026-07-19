# 🔧 06 — Iterative Refinement Process

> 🟡 Intermediate | Prereq: 01, 03 | ~3 min

Improvement = cycles. Improve → test → evaluate → commit or revert. One change per iteration.

---

## 6.1 The Refinement Loop

```
IMPROVE (1 targeted change) → TEST (4 checks) → EVALUATE (pass?)
  → YES: COMMIT & NEXT  |  NO: REVERT & RETRY
```

---

## 6.2 Four-Check Protocol

| Check | Verify |
|-------|--------|
| **Visual** | Looks right? 320/768/1280? Dark mode? |
| **Functional** | Feature works? Task completable? No console errors? |
| **Accessibility** | Keyboard works? SR correct? Contrast passes? |
| **Regression** | Anything else broken? Adjacent components? |

> ALL 4 ✅ → COMMIT. ANY ❌ → REVERT.

---

## 6.3 Change Log Format

```
Iter 1: Added skip link → aksesibilitas/04 → ✅ COMMITTED
Iter 2: Fixed contrast #999→#555 → warna/06 → ✅ COMMITTED
Iter 3: Body 14px→16px → tipografi/04 → ❌ REVERTED (card overflow at 768px)
Iter 3b: Body 14px→16px + reduced card padding → ✅ COMMITTED
```

---

## 6.4 Common Regressions

| Change | Possible Regression | Prevention |
|--------|---------------------|------------|
| Font size ↑ | Layout overflow | Test all breakpoints |
| Color change | Adjacent contrast breaks | Re-check all pairs |
| Animation added | Performance drop | `prefers-reduced-motion` |
| Spacing added | Content below fold | Test viewport heights |
| z-index change | Stacking broken | Use z-index scale |

---

## 6.5 Compound Effect

```
20 iterative safe 1% improvements = ~25% total improvement, zero regressions
vs 1 big risky change = hidden regressions, hard to debug
```

### Stop When:
- All critical + important issues fixed
- Diminishing returns (each iteration adds less)
- Product meets success criteria

---

## ⚡ Action Checklist
- [ ] One change per iteration — never batch unrelated fixes
- [ ] Run 4-check protocol on every change before committing
- [ ] Log every iteration: what changed + why + faculty + result
- [ ] Revert immediately on regression, retry with adjusted approach
