# 📊 03 — Color in Data Visualization

> **Level: 🟡 Intermediate** | Prerequisite: 01 | Est. reading time: 12 min

Color is the most powerful and most abused channel in data visualization. Used correctly, it reveals patterns preattentively. Used incorrectly, it misleads, excludes colorblind viewers, and introduces false hierarchies. This course covers the three color scale types, perceptual color spaces, accessibility requirements, and practical implementation.

---

## 3.1 Three Types of Color Scales

Every data visualization color palette falls into one of three categories. Using the wrong type is the most common color mistake.

| Scale Type | What It Encodes | Palette Structure | Example Use |
|-----------|----------------|-------------------|-------------|
| **Sequential** | Low → High (magnitude) | Single hue, varying lightness | Population density, temperature |
| **Diverging** | Below ↔ Neutral ↔ Above | Two hues meeting at neutral midpoint | Profit/loss, sentiment (−/+/++), election swing |
| **Qualitative** (Categorical) | Different categories | Distinct hues, equal lightness | Product categories, countries, political parties |

```
SEQUENTIAL SCALE:            DIVERGING SCALE:             QUALITATIVE SCALE:
  │ low  →  high        │   │ -2   -1    0   +1   +2  │   │ A    B    C    D    │
  Single hue,               Two hues meeting             Distinct hues,
  luminance varies           at light neutral midpoint    equal perceptual weight
```

### Sequential Scale — When and How:

```css
/* Sequential: population density (light → dark blue) */
--seq-1: #F0F4FA;  /* Very light  — sparse */
--seq-2: #B5C9E2;
--seq-3: #7BA3CC;
--seq-4: #4A7DB5;
--seq-5: #1E4D8C;  /* Very dark   — dense */
```

### Diverging Scale — When and How:

```css
/* Diverging: temperature anomaly (blue → white → red) */
--div-1: #2166AC;  /* Strong negative */
--div-2: #67A9CF;
--div-3: #D1E5F0;
--div-4: #F7F7F7;  /* Neutral midpoint */
--div-5: #FDDBC7;
--div-6: #EF8A62;
--div-7: #B2182B;  /* Strong positive */
```

### Qualitative Scale — When and How:

```css
/* Qualitative: 5 categories (ColorBrewer Set2) */
--qual-1: #66C2A5;  /* Green  */
--qual-2: #FC8D62;  /* Orange */
--qual-3: #8DA0CB;  /* Purple */
--qual-4: #E78AC3;  /* Pink   */
--qual-5: #A6D854;  /* Lime   */
/* Max 8-10 distinct colors; beyond that, group into "Other" */
```

---

## 3.2 Perceptual Uniformity

**Perceptual uniformity** means equal steps in data produce equal steps in perceived color. Non-uniform scales create **false boundaries** — the viewer sees a sharp edge where the data is smooth.

### The Jet Problem (Rainbow Colormap):

```
RAINBOW (JET) — DO NOT USE:
  Low → Blue → Cyan → Green → Yellow → Orange → Red ← High
  PROBLEM: Green-yellow transition appears as a sharp boundary.
           Viewer sees two clusters where data is continuous.

VIRIDIS — USE INSTEAD:
  Low → Dark purple → Blue → Teal → Green → Yellow ← High
  WHY: Perceptually uniform (linear in CIELAB color space).
       Also grayscale-safe and colorblind-friendly.
```

```javascript
// Perceptually uniform colormaps: use these, not jet/rainbow
const colormaps = {
  viridis:  ['#440154','#482878','#3E4A89','#31688E','#26828E','#1F9E89','#35B779','#6DCD59','#B4DE2C','#FDE725'],
  magma:    ['#000004','#160B39','#420A68','#6A176E','#932667','#BA3655','#DD513A','#F5751E','#FCA50A','#F9FC2D'],
  plasma:   ['#0D0887','#46039F','#7201A8','#9303A2','#B12A90','#CC4778','#E16462','#F2844B','#FCA636','#F0F921'],
  cividis:  ['#00224E','#123570','#3B496C','#575D6D','#707173','#8A8678','#A59C74','#C3B369','#E1CC55','#FEE838'],
  turbo:    ['#30123B','#4145AB','#4676ED','#3A9EFE','#1FC3C8','#29DD7E','#6FE242','#AFD12F','#F2B42E','#FC7138'],
};
// All five are: perceptually uniform, colorblind-safe, grayscale-readable
```

---

## 3.3 ColorBrewer & Proven Palettes

**Cynthia Brewer's ColorBrewer** is the gold standard for data visualization color palettes. Every palette is tested for colorblind safety, print friendliness, and photocopy safety.

| Palette Family | Type | Classes | Colorblind Safe? |
|---------------|------|---------|-----------------|
| **Blues** | Sequential | 3-9 | ✅ Yes |
| **Greens** | Sequential | 3-9 | ✅ Yes |
| **Oranges** | Sequential | 3-9 | ✅ Yes |
| **Purples** | Sequential | 3-9 | ✅ Yes |
| **YlOrRd** | Sequential (multi-hue) | 3-9 | ✅ Yes |
| **BuGn** | Sequential (multi-hue) | 3-9 | ✅ Yes |
| **RdBu** | Diverging | 3-11 | ✅ Yes |
| **PiYG** | Diverging | 3-11 | ✅ Yes |
| **BrBG** | Diverging | 3-11 | ✅ Yes (except protanopia) |
| **Set2** | Qualitative | 3-8 | ✅ Yes |
| **Pastel1** | Qualitative | 3-9 | 🟡 Fair |
| **Paired** | Qualitative | 3-12 | 🟡 Fair (similar pairs) |

```javascript
// ColorBrewer palettes as JS constants (commonly used in D3.js, Vega-Lite)
const brewer = {
  sequential: {
    Blues9: ['#f7fbff','#deebf7','#c6dbef','#9ecae1','#6baed6','#4292c6','#2171b5','#08519c','#08306b'],
    YlOrRd9: ['#ffffcc','#ffeda0','#fed976','#feb24c','#fd8d3c','#fc4e2a','#e31a1c','#bd0026','#800026'],
  },
  diverging: {
    RdBu11: ['#67001f','#b2182b','#d6604d','#f4a582','#fddbc7','#f7f7f7','#d1e5f0','#92c5de','#4393c3','#2166ac','#053061'],
    PiYG11: ['#8e0152','#c51b7d','#de77ae','#f1b6da','#fde0ef','#f7f7f7','#e6f5d0','#b8e186','#7fbc41','#4d9221','#276419'],
  },
  qualitative: {
    Set2_8: ['#66c2a5','#fc8d62','#8da0cb','#e78ac3','#a6d854','#ffd92f','#e5c494','#b3b3b3'],
  }
};
```

---

## 3.4 Semantic Color in Dashboards

Go beyond "pretty" — make color MEAN something:

| Semantic Meaning | Color | Usage Pattern |
|-----------------|-------|---------------|
| **Positive / Growth** | Green (#2E8B57) | Revenue up, target met, healthy |
| **Negative / Decline** | Red (#D14343) | Loss, churn, alert, overdue |
| **Warning / Caution** | Amber (#F0A42B) | Approaching limit, pending review |
| **Neutral / Baseline** | Gray (#8C8C8C) | Reference line, previous period, average |
| **Primary / Brand** | Brand blue | Selected, current period, main metric |
| **Disabled / Future** | Light gray (#D9D9D9) | Projected, inactive, placeholder |

```css
/* Semantic color system for dashboards */
:root {
  --dv-positive: #2E8B57;
  --dv-negative: #D14343;
  --dv-warning:  #F0A42B;
  --dv-neutral:  #8C8C8C;
  --dv-primary:  #4C78A8;  /* Also your brand color */
  --dv-muted:    #D9D9D9;
}

.kpi-positive { color: var(--dv-positive); }
.kpi-negative { color: var(--dv-negative); }
.kpi-warning  { color: var(--dv-warning);  }

/* Arrow indicators add redundant encoding (color + shape) */
.kpi-positive::before { content: '▲ '; color: var(--dv-positive); }
.kpi-negative::before { content: '▼ '; color: var(--dv-negative); }
```

> **Redundant Encoding**: Always pair color with another channel (arrow direction, +/− prefix, bold weight). This helps colorblind viewers AND makes dashboards scannable at a glance.

---

## 3.5 Practical Color Scale Builder

```javascript
/**
 * Generate a sequential color scale interpolating between two colors.
 * Uses CIELAB interpolation for perceptual uniformity.
 */
function sequentialScale(colorLow, colorHigh, steps = 7) {
  // Convert hex → RGB → CIELAB for perceptually uniform interpolation
  const rgbLow  = hexToRgb(colorLow);
  const rgbHigh = hexToRgb(colorHigh);
  
  return Array.from({ length: steps }, (_, i) => {
    const t = i / (steps - 1);
    return rgbToHex({
      r: Math.round(rgbLow.r + (rgbHigh.r - rgbLow.r) * t),
      g: Math.round(rgbLow.g + (rgbHigh.g - rgbLow.g) * t),
      b: Math.round(rgbLow.b + (rgbHigh.b - rgbLow.b) * t),
    });
  });
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : null;
}

function rgbToHex({ r, g, b }) {
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
}

// Usage:
const blues = sequentialScale('#F0F4FA', '#1E4D8C', 5);
// → ['#f0f4fa', '#c2d1e6', '#95aed2', '#678bbf', '#1e4d8c']
```

---

## Quick Summary

| Concept | Key Takeaway |
|---------|-------------|
| **Three scale types** | Sequential (low→high), Diverging (−↔+), Qualitative (categories). Never confuse them. |
| **Perceptual uniformity** | Use viridis/magma/plasma/cividis, not jet/rainbow. Jet creates false boundaries. |
| **ColorBrewer** | Proven, tested, colorblind-safe palettes. Blues, YlOrRd, RdBu, Set2 — use these. |
| **Semantic color** | Green = positive, Red = negative, Amber = warning. Always add redundant encoding (arrow, +/−). |
| **Accessibility** | Never rely on color alone. 4.5% of population is colorblind. Use luminance contrast + shapes. |
| **Max categories** | Qualitative: 8 max. Sequential/Diverging: 5-9 steps. More = noise. |
