# 🧠 01 — Cognitive Architecture & Information Processing

> **Level: 🟢 Beginner** | Prerequisite: — | Est. reading: 9 min

How the brain processes UI — from sensory input to action. Understanding this model makes you design for real cognition, not assumptions.

---

## 1.1 The Information Processing Model

| Stage | What happens | UI Implication |
|-------|-------------|----------------|
| **Input** | Sensory receptors capture stimuli | Visual hierarchy guides eyes to what matters |
| **Perception** | Brain interprets raw data into patterns | Gestalt principles make groups recognizable |
| **Attention** | Filters what gets processed | Reduce clutter; one primary action per screen |
| **Encoding** | Info moved to working memory | Chunk content (4±1, Cowan) |
| **Storage** | Transferred to long-term memory | Repetition + patterns strengthen recall |
| **Retrieval** | Accessing stored knowledge | Recognition > Recall (icons > text commands) |
| **Response** | Motor action executed | Fitts's Law: larger, closer targets = faster clicks |

---

## 1.2 The Cognitive Processor

| Processor | Cycle Time | UX Rule |
|-----------|-----------|---------|
| **Perceptual** | ~100ms | Feedback within 100ms feels instant |
| **Cognitive** | ~70ms | Decision complexity scales linearly |
| **Motor** | ~70ms | Physical actions cost ~70ms each |

> **The 100ms Rule:** UI response under 100ms = perceived as instantaneous. 100ms–1s = noticeable but fluid. 1s+ = user loses flow.

---

## 1.3 Working Memory Constraints

| Limit | Value | Design Strategy |
|-------|-------|-----------------|
| **Capacity** | 4±1 chunks | Group nav items ≤5; progressive disclosure |
| **Duration** | ~18-30 sec (no rehearsal) | Don't make users remember across pages |
| **Interference** | New info pushes out old | Auto-save; confirm destructive actions |

### Chunking Examples
```
RAW: 0 8 0 1 2 3 4 5 6 7 8 9        → 12 separate items (overload)
CHUNKED: 0800-CALL-ME                → 1 item (recognizable)
```

---

## 1.4 Recognition vs Recall

| | Recognition | Recall |
|---|------------|--------|
| **Effort** | Low — just identify | High — must retrieve from memory |
| **UI Example** | Icon + label | Blank text field |
| **Error rate** | ~5% | ~40% |
| **Design Rule** | **Prefer recognition always** | Only use recall when necessary (passwords) |

```
✅ "Which of these is your address?" (dropdown from history)
❌ "Type your full address" (blank field — recall)
```

---

## 1.5 Hick's Law in Practice

> Decision time increases logarithmically with number of choices.

| # Options | Avg Response Time |
|-----------|-------------------|
| 2 | 480ms |
| 4 | 620ms |
| 8 | 760ms |
| 16 | 900ms |

**Strategies:** Categorize, progressive disclosure, smart defaults, search-as-you-type.

---

## 1.6 Cognitive Load Types

| Load | Source | Fix |
|------|--------|-----|
| **Intrinsic** | Task complexity itself | Simplify workflow; split into steps |
| **Extraneous** | Bad UI, clutter, distractions | Remove decoration; consistent layout |
| **Germane** | Learning + schema building | Onboarding tutorials; progressive complexity |

---

## ⚡ Action Checklist

- [ ] Audit one screen: count visual elements — aim <15 distinct items
- [ ] Test against 100ms rule: what's the slowest interaction?
- [ ] Convert 3 recall tasks to recognition tasks
- [ ] Apply chunking: group nav items into ≤5 clusters
- [ ] Remove one extraneous element per screen
