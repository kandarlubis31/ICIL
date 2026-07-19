# 🔤 04 — Readability & Legibility

> 🟡 Intermediate | Prereq: 01 | ~3 min

**Readability** = how easy to read long text. **Legibility** = how easy to recognize individual letters. Both must be optimized.

| | Readability | Legibility |
|---|------------|-----------|
| Focus | Paragraph, page | Letter, word |
| Question | "Comfortable to read?" | "Is the shape clear?" |
| Influenced by | Layout, spacing, contrast | Typeface design, size |
| Fail | 200 chars/line | I, l, 1 look identical |

---

## 4.1 Line Length (Measure)

**Golden rule: 45-90 chars/line.**

| Context | Chars/Line |
|---------|-----------|
| Desktop body | 60-75 |
| Mobile body | 35-50 |
| WCAG AAA (1.4.8) | Max 80 |

---

## 4.2 Font Size Minimums

| Element | Min Size |
|---------|----------|
| Mobile body | **16px (1rem)** ← NEVER below (iOS zooms on <16px inputs!) |
| Desktop body | 16-20px |
| Heading | ≥ 1.5× body |
| Caption | 12-14px |

---

## 4.3 Contrast (WCAG)

| Level | Normal Text | Large Text (≥18pt / ≥14pt bold) |
|-------|------------|--------------------------------|
| AA | **4.5:1** | 3:1 |
| AAA | 7:1 | 4.5:1 |

```
#000 on #FFF = 21:1 ✅  |  #333 on #FFF = 12.6:1 ✅
#666 on #FFF = 5.7:1 ✅  |  #999 on #FFF = 2.8:1 ❌
```

> Don't use pure #000 on #FFF for body — 21:1 fatigues eyes. Use dark gray (#333).

---

## 4.4 Text Alignment

| Alignment | Web? | Why |
|-----------|------|-----|
| Left-aligned | ✅ BEST | Easy line-start finding |
| Justified | ❌ NEVER | Uneven word spacing, "rivers of white" |
| Centered (body) | ❌ | Different start points per line = hard read |

---

## ⚡ Action Checklist
- [ ] Body text: 60-75 chars/line on desktop, 35-50 on mobile
- [ ] Mobile body ≥ 16px (1rem) — mandatory for iOS
- [ ] Body text contrast ≥ 4.5:1 (AA), use dark gray not pure black
- [ ] Left-align all body text — never justify
