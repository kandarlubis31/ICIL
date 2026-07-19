# 🎨 07 — Palette Generation Techniques

> 🔴 Advanced | Prereq: 02, 05 | ~6 min

Creating palettes = art + science. This covers manual, algorithmic, extraction, AI, and dark mode techniques.

---

## 7.1 Palette Anatomy

| Layer | % | Contents |
|-------|---|----------|
| **Neutrals** | 60% | Gray scale + near-neutrals (bg, text, surface) |
| **Primary** | 20% | Main brand color (identity, primary actions) |
| **Secondary** | 12% | Supporting color (variations, sections) |
| **Accent** | 8% | Highlight (CTAs, emphasis, urgency) |
| **Semantic** | — | Fixed: Success(green), Error(red), Warning(amber), Info(blue) |

Each hue: **5–13 level scale** (50=lightest → 900=darkest, 500=BASE).

---

## 7.2 Manual: Pick One → Build Out

1. Pick 1 base color (e.g. Blue #3B82F6)
2. Choose harmony scheme (analogous, complementary, etc.)
3. Generate harmonic colors
4. Adjust saturation/value (never use pure!)
5. Add neutrals (warm gray or cool gray)
6. Add semantic colors

```
PRIMARY:     #3B82F6 (Blue)     SECONDARY:   #8B5CF6 (Violet)
TERTIARY:    #06B6D4 (Cyan)     NEUTRAL-50:  #FAFAFA
NEUTRAL-900: #171717            SUCCESS:     #22C55E
ERROR:       #EF4444            WARNING:     #F59E0B
```

---

## 7.3 Extraction from Images

```
IMAGE → K-Means Clustering → Top N Colors → Refine → PALETTE
```

```python
from sklearn.cluster import KMeans
def extract_palette(image_path, n_colors=6):
    img = Image.open(image_path).convert('RGB')
    pixels = np.array(img).reshape(-1, 3)
    kmeans = KMeans(n_clusters=n_colors, n_init=10).fit(pixels)
    colors = kmeans.cluster_centers_.astype(int)
    return [f"#{r:02x}{g:02x}{b:02x}" for r,g,b in colors]
```

**Alt tools**: Color Thief (JS), Median Cut, Octree quantization.

---

## 7.4 Algorithmic Generation

```javascript
// Monochromatic scale
function monoScale(hue, sat, levels = 10) {
  return Array.from({length: levels}, (_, i) =>
    `hsl(${hue}, ${sat}%, ${95 - i * 8}%)`);
}

// Analogous triad
function analogous(h, s, l) {
  return [
    `hsl(${(h - 30 + 360) % 360}, ${s}%, ${l}%)`,
    `hsl(${h}, ${s}%, ${l}%)`,
    `hsl(${(h + 30) % 360}, ${s}%, ${l}%)`,
  ];
}
```

> ⚠️ Interpolate in OKLCH, not RGB — avoids "muddy middle."

```javascript
// OKLCH gradient (no muddy middle)
function oklchGradient(c1, c2, steps) {
  return Array.from({length: steps}, (_, i) => ({
    L: c1.L + (c2.L - c1.L) * (i / (steps - 1)),
    C: c1.C + (c2.C - c1.C) * (i / (steps - 1)),
    H: c1.H + shortestHueDiff(c1.H, c2.H) * (i / (steps - 1))
  }));
}
```

---

## 7.5 AI-Powered

| Tool | Strength |
|------|----------|
| **Huemint** | ML-based, contrast-aware |
| **Colormind** | Deep learning palette generator |
| **Khroma** | AI trained on your preferences |
| **Coolors** | Fast generation + lock colors |
| **Adobe Color** | Harmony rules + accessibility check |

Prompt template: `"Generate a color palette for [CONTEXT]. Style: [MOOD]. Include hex codes, WCAG AA, dark mode variant. Primary + Secondary + Accent + Neutral scale 50-900."`

---

## 7.6 Dark Mode Generation

Dark mode ≠ invert colors! Remap to lower brightness:

| Element | Light | Dark |
|---------|-------|------|
| Surface | #FFFFFF | #121212 or #1E1E1E |
| Elevated | Shadow | Brighter (#242424) |
| Body text | #1A1A1A | #E0E0E0 |
| Muted text | #767676 | #A0A0A0 |
| Primary | Normal sat | Reduced sat, increased brightness |

---

## ⚡ Action Checklist
- [ ] Generate 5-13 level scale per hue (50-900, 500=base)
- [ ] Interpolate in OKLCH for gradients (never RGB)
- [ ] Include semantic colors (success/error/warning/info) in every palette
- [ ] Test dark mode with reduced saturation + increased brightness on primaries
- [ ] Lock WCAG AA compliance before finalizing palette
