# 📐 06 — Card Sorting & Tree Testing

> 🟡 Intermediate | Prereq: 01 | ~6 min

Card sorting = how users would organize content. Tree testing = can users find content in your IA? Both are essential validation tools — cheap, fast, high-impact.

---

## 6.1 Card Sorting Methods

| Method | What It Is | Sample Size | When |
|--------|-----------|-------------|------|
| **Open** | Users create their own categories + name them | 15-30 | New IA from scratch |
| **Closed** | Users sort into predefined categories | 30-50 | Validate existing IA |
| **Hybrid** | Predefined categories + users can add more | 20-30 | Refine existing IA |
| **Reverse** | Given hierarchy, find where item belongs | 30-50 | Test specific confusion |

---

## 6.2 Running a Card Sort

```
1. SELECT: 40-80 content items (cards) — representative sample
2. RECRUIT: 15-50 participants (target users, not colleagues)
3. RUN: Online tool (OptimalSort, UserZoom) or physical cards
4. ANALYZE: Dendrogram visualization + similarity matrix
5. APPLY: Group cards that 70%+ users placed together
```

---

## 6.3 Dendrogram Analysis

```
    ┌─── Laptop
  ┌─┤
  │ └─── Desktop         ← 80% of users grouped these together
──┤
  │ ┌─── Keyboard
  └─┤
    └─── Mouse           ← 75% grouped these together
```

**Rule**: Items clustering together at ≥ 70% agreement = keep in same category. Items scattered = labeling problem.

---

## 6.4 Tree Testing

| Step | Action |
|------|--------|
| 1. Build a text-only version of your IA tree |
| 2. Give users tasks: "Where would you find X?" |
| 3. Track: success rate, time, path taken, backtracking |
| 4. Target: > 80% success rate without backtracking |

```
Task: "Find the return policy"
User path: Home → Support → Returns ✅ (3s)
Task: "Change your email"
User path: Home → Account → ??? → ← Settings → Profile → Email ✅ (12s, 1 backtrack)
```

---

## 6.5 Tree Test Metrics

| Metric | Target | Red Flag |
|--------|--------|----------|
| **Success rate** | > 80% | < 60% |
| **Directness** (no backtrack) | > 70% | < 50% |
| **Time to complete** | < 10s avg | > 30s avg |
| **First-click correctness** | > 80% | < 60% |

---

## ⚡ Action Checklist

- [ ] Run 1 open card sort with 15 users for a new IA
- [ ] Run 1 tree test for your current IA — success rate > 80%?
- [ ] Fix categories where < 70% of users agree
- [ ] Every label that caused backtracking → rewrite
- [ ] Repeat after IA changes (before/after comparison)
