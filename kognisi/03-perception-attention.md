# 🧠 03 — Perception & Attention

> **Level: 🟡 Intermediate** | Prerequisite: 01 | Est. reading: 9 min

Users miss things. Constantly. Not because they're careless — because their brains are designed to filter. This course covers the mechanisms and how to design around them.

---

## 3.1 Attention Types

| Type | Mechanism | UX Implication |
|------|-----------|---------------|
| **Selective** | Focus on one thing, ignore rest | Make primary CTA the loudest element |
| **Divided** | Split across multiple stimuli | Never require true multitasking |
| **Sustained** | Long-term focus on one task | Save progress; allow resume |
| **Alternating** | Rapid switching between tasks | Minimize context-switching cost |

---

## 3.2 Inattentional Blindness

> Failing to notice visible objects when attention is focused elsewhere.

| Trigger | Fix |
|---------|-----|
| User focused on form → misses error banner | Inline validation; animate near error field |
| User scanning nav → misses promo below | Don't place critical info outside scan path |
| Modal appears → user ignores page behind | Dim backdrop; trap focus |

```
The invisible gorilla test:
People count basketball passes → miss a man in a gorilla suit.
Same in UI — users miss what they're not looking for.
```

---

## 3.3 Change Blindness

> Failing to notice changes when there's a visual interruption.

| Cause | Prevention |
|-------|-----------|
| Page reload | Persistent UI state; skeleton screens |
| Animation during transition | Animate the specific element changing, not full page |
| Multiple simultaneous updates | Update sequentially with 200ms gaps |

---

## 3.4 Banner Blindness

Users ignore anything that looks like an ad. Affects:
- Hero banners (scroll past immediately)
- Right-rail promos (peripheral vision ignores)
- Pop-up overlays (close reflexively)

**Fix:** Content-first layouts, in-content CTAs, contextual nudges.

---

## 3.5 Preattentive Processing

| Attribute | Processing Speed | Best For |
|-----------|-----------------|----------|
| **Color** | <10ms | Highlighting errors, new items |
| **Size** | <10ms | Establishing hierarchy |
| **Motion** | <10ms | Drawing attention to changes |
| **Orientation** | <10ms | Distinguishing groups |
| **Shape** | ~20ms | Differentiating categories |
| **Position** | ~30ms | Conveying relationships |

### Preattentive vs Attentive

| Task | Preattentive (instant) | Attentive (requires scanning) |
|------|----------------------|------------------------------|
| Find red dot among blue | ✅ | — |
| Count red dots among blue | — | ✅ (must scan each) |
| "Is there a red?" | ✅ | — |
| "How many reds?" | — | ✅ |

---

## 3.6 Visual Scanning Patterns

| Pattern | When Users Do It | Design Strategy |
|---------|-----------------|-----------------|
| **F-pattern** | Reading text-heavy pages | Place key info along F axis (left + top) |
| **Z-pattern** | Scanning image-heavy pages | Place CTA at bottom-right of Z |
| **Layer-cake** | Scanning headings | Write scannable headings; bolding key terms |

---

## ⚡ Action Checklist

- [ ] Test: show your UI for 5 seconds, hide it — what do users remember?
- [ ] Remove one "banner-like" element users probably ignore
- [ ] Apply preattentive attributes: color/size/motion for the 3 most critical elements
- [ ] Check F-pattern: do key CTAs fall along the F axis?
