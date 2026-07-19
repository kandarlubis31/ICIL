# 🏷️ 03 — Logo Design Principles

> 🟡 Intermediate | Prereq: 02 | ~3 min

Great logo = simple, memorable, timeless, versatile, appropriate.

---

## 3.1 Five Principles

| Principle | Test | Failure |
|-----------|------|---------|
| **Simple** | Can someone sketch from memory? | Overly detailed |
| **Memorable** | Recall after 3 seconds? | Generic shapes |
| **Timeless** | Work in 20 years? | Trendy gradients, dated fonts |
| **Versatile** | Work B&W, 16px, embroidered? | Complex gradients, fine lines |
| **Appropriate** | Fit industry + audience? | Playful mascot for law firm |

> Paul Rand: "A logo derives meaning from the quality of the thing it symbolizes, not the other way around."

---

## 3.2 Concept Sources

| Source | Method | Example |
|--------|--------|---------|
| Literal | Direct visual | Apple = apple |
| Metaphorical | Symbolic | Nike swoosh = motion |
| Typographic | Letterform manipulation | FedEx arrow |
| Abstract | Geometric | Pepsi circle |
| Cultural | Heritage reference | Starbucks siren |

**Concept funnel**: 50 ideas → 20 sketches → 8 digital → 3 finalists → **THE ONE**

> First 10 ideas = clichés. Ideas 20-40 = originality.

---

## 3.3 Scalability — Favicon to Billboard

| Size | Context | Test |
|------|---------|------|
| 16×16px | Favicon | Recognizable? |
| 48×48px | Social avatar | Balanced? |
| 200px | Website header | Crisp? |
| 1000px+ | Billboard | No pixelation? |

> Print logo at 1cm. Illegible = too complex. Show at 16px. Unrecognizable = simplify.

---

## 3.4 Monochrome Test

```
1. Black on white → 2. White on black → 3. Single brand color → 4. Full color → 5. On photography
```

> If logo only works in full color → it fails. Color enhances, doesn't carry.

```css
.logo svg { color: var(--brand-primary); }
.logo svg path { fill: currentColor; }
.dark .logo svg { color: white; }
```

---

## 3.5 Logo Animation

| Type | Duration | Feel |
|------|----------|------|
| Draw-on | 800-1200ms | Craftsmanship |
| Morph | 600-800ms | Transformation |
| Reveal | 400-600ms | Confidence |

> Logo animation ≤ 1 second. It's a signature, not a performance.

---

## ⚡ Action Checklist
- [ ] Test logo at 5 sizes: 16px, 48px, 200px, 1000px — works at all?
- [ ] Monochrome test: black on white, white on black, on photography
- [ ] Generate 50+ concepts before choosing — push past the first 10 clichés
- [ ] Define clear space zone: height of lowercase 'x' around all sides
