# 📊 07 — Accessibility in Data Visualization

> **Level: 🔴 Advanced** | Prerequisite: 01, 03 | Est. reading time: 14 min

Data visualization accessibility is not optional — it's a legal requirement (ADA, EAA, Section 508) and a design obligation. This course covers colorblind-safe design, screen reader patterns, keyboard navigation, alt text for charts, and accessible alternatives to visual-only encodings.

---

## 7.1 The Accessibility Gap in Data Viz

| Barrier | Affected Users | % of Population |
|---------|---------------|----------------|
| **Color vision deficiency (CVD)** | Red-green colorblind (~8% M, 0.5% F) | ~4.5% |
| **Low vision** | Difficulty perceiving small text, thin lines, subtle differences | ~3% |
| **Blindness** | Cannot see charts at all — need text alternatives | ~0.5% |
| **Cognitive** | Difficulty interpreting complex, cluttered charts | ~5% |
| **Motor** | Cannot use mouse for interactive charts — keyboard-only | ~2% |

> **Key Insight**: Accessible data visualization is BETTER data visualization — for everyone. Clear labels, strong contrast, and keyboard navigation benefit all users.

---

## 7.2 Colorblind-Safe Chart Design

### The Four Types of Color Vision Deficiency:

| Type | Confusion | Prevalence |
|------|-----------|------------|
| **Deuteranopia** (green-blind) | Red ↔ Green | ~6% of males |
| **Protanopia** (red-blind) | Red ↔ Green | ~2% of males |
| **Tritanopia** (blue-blind) | Blue ↔ Yellow | < 0.01% |
| **Monochromacy** (no color) | All colors → grayscale | < 0.001% |

### Design Rules for Colorblind Safety:

| Rule | Implementation |
|------|---------------|
| **Never rely on color alone** | Add pattern, texture, shape, or direct labels |
| **Red + Green = forbidden pair** | Use Blue + Orange instead for categorical distinction |
| **Use proven palettes** | ColorBrewer "colorblind safe" palettes, viridis, cividis |
| **Add direct labels** | Label lines and segments directly; don't rely on a legend |
| **Test in grayscale** | If your chart works in black & white, it works for CVD |

```css
/* Colorblind-safe categorical palette (Blue-Orange, not Red-Green) */
.cat-blue    { fill: #4C78A8; }  /* Blue */
.cat-orange  { fill: #F28E2B; }  /* Orange */
.cat-teal    { fill: #54A24B; }  /* Green-yellow (distinguishable from red) */
.cat-red     { fill: #E15759; }  /* Red — pair with BLUE, not green */

/* Pattern fallback: add texture when color alone may fail */
.chart-bar { fill: #4C78A8; }
.chart-bar.patterned {
  fill: url(#hatch-pattern);      /* SVG pattern overlay */
  fill-opacity: 0.4;             /* Let pattern show through */
}
```

```html
<!-- SVG pattern for texture encoding (redundant with color) -->
<svg>
  <defs>
    <pattern id="hatch" width="6" height="6" patternTransform="rotate(45)"
             patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="0" y2="6" stroke="#fff" stroke-width="3" opacity="0.6" />
    </pattern>
    <pattern id="dots" width="6" height="6" patternUnits="userSpaceOnUse">
      <circle cx="3" cy="3" r="1.5" fill="#fff" opacity="0.6" />
    </pattern>
  </defs>
</svg>
```

---

## 7.3 Direct Labeling (No Legend Dependency)

Legends force colorblind viewers to match colors across distance. Direct labeling eliminates the problem:

```html
<!-- BAD: Color-dependent legend -->
<svg>
  <rect fill="#4C78A8" /> <text>Revenue</text>
  <rect fill="#E15759" /> <text>Cost</text>
  <!-- Legend requires matching distant colors → fails for CVD -->
</svg>

<!-- GOOD: Directly labeled lines -->
<svg viewBox="0 0 600 300">
  <!-- Revenue line -->
  <polyline points="60,200 160,170 260,140 360,130 460,100 560,80"
            fill="none" stroke="#4C78A8" stroke-width="2.5" />
  <text x="560" y="75" font-size="12" font-weight="600" fill="#4C78A8">Revenue</text>
  
  <!-- Cost line -->
  <polyline points="60,180 160,175 260,165 360,160 460,155 560,150"
            fill="none" stroke="#E15759" stroke-width="2.5" stroke-dasharray="6 3" />
  <text x="560" y="145" font-size="12" font-weight="600" fill="#E15759">Cost</text>
</svg>
```

---

## 7.4 Alt Text for Charts

Charts are images to screen readers. Every chart needs a text alternative that conveys the INSIGHT, not the raw data.

```html
<!-- Chart with screen reader accessible description -->
<figure role="figure" aria-label="Revenue growth over time">
  
  <!-- The chart SVG -->
  <svg role="img" aria-labelledby="chart-title chart-desc" viewBox="0 0 600 300">
    <title id="chart-title">Monthly Revenue: Jan 2025 – Dec 2025</title>
    <desc id="chart-desc">
      Revenue increased from $8.2M in January to $14.7M in December 2025, 
      with a temporary dip to $7.1M in June during the product migration. 
      Overall annual growth was 79%.
    </desc>
    <!-- ... chart elements ... -->
  </svg>
  
  <figcaption>
    <strong>Monthly Revenue, 2025</strong><br>
    Revenue grew 79% over 12 months, from $8.2M to $14.7M. June dip due to planned migration.
  </figcaption>
</figure>
```

### Alt Text Formula for Charts:

```
ALT TEXT = Chart Type + Main Finding + Key Data Point + Context

  "Bar chart showing monthly revenue grew 79% in 2025, from $8.2M in 
   January to $14.7M in December, with a temporary dip to $7.1M in June 
   during the product migration."
```

| Component | Example |
|-----------|---------|
| **Chart type** | "Bar chart showing..." |
| **Main finding** | "...revenue grew 79% in 2025..." |
| **Key data point** | "...from $8.2M to $14.7M..." |
| **Context/anomaly** | "...with a June dip during migration." |

### Data Table Alternative:

For screen reader users, provide the underlying data as an accessible HTML table. This gives full data access that alt text can't:

```html
<!-- Hidden data table for screen readers → gives full data access -->
<table class="sr-only" aria-hidden="false">
  <caption>Monthly Revenue 2025</caption>
  <thead>
    <tr><th>Month</th><th>Revenue</th></tr>
  </thead>
  <tbody>
    <tr><td>January</td><td>$8.2M</td></tr>
    <tr><td>February</td><td>$8.7M</td></tr>
    <!-- ... all 12 months ... -->
    <tr><td>December</td><td>$14.7M</td></tr>
  </tbody>
</table>
```

```css
/* Screen-reader-only: visually hidden but accessible to SR */
.sr-only {
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  white-space: nowrap;
  border: 0;
}
```

---

## 7.5 Keyboard-Navigable Charts

Interactive charts must be operable without a mouse:

```html
<!-- Chart with keyboard-navigable data points -->
<svg role="img" aria-label="Revenue chart">
  <!-- Each data point is focusable and has an accessible name -->
  <g role="button" tabindex="0"
     aria-label="January: $8.2M revenue, 12% above target"
     onclick="showDetail(0)" onkeydown="if(event.key==='Enter')showDetail(0)">
    <circle cx="80" cy="200" r="12" fill="transparent" />  <!-- Invisible hit area -->
    <circle cx="80" cy="200" r="5" fill="#4C78A8" />       <!-- Visible point -->
  </g>
  
  <g role="button" tabindex="0"
     aria-label="February: $8.7M revenue, 8% above target"
     onclick="showDetail(1)" onkeydown="if(event.key==='Enter')showDetail(1)">
    <circle cx="140" cy="180" r="12" fill="transparent" />
    <circle cx="140" cy="180" r="5" fill="#4C78A8" />
  </g>
  <!-- ... -->
</svg>
```

```css
/* Keyboard focus styles for chart points */
[role="button"]:focus-visible {
  outline: 3px solid #4C78A8;
  outline-offset: 2px;
}

/* Skip-to-content: bypass chart navigation */
.chart-skip-link {
  position: absolute;
  top: -100px;
  left: 0;
}
.chart-skip-link:focus {
  top: 0;
}
```

---

## 7.6 Sonification & Non-Visual Alternatives

For users who cannot see charts at all, sonification maps data to sound:

| Sonification Type | Mapping | Best For |
|------------------|---------|----------|
| **Pitch mapping** | Higher value → higher pitch | Single-series data |
| **Tempo mapping** | Faster changes → faster rhythm | Time-series trends |
| **Panning** | Left/right audio channel → categories | Two-category comparison |
| **Timbre** | Different instruments → different series | Multi-series data |

```javascript
// Simple sonification: map values to pitches using Web Audio API
function sonifyData(dataPoints) {
  const audioCtx = new AudioContext();
  const minVal = Math.min(...dataPoints);
  const maxVal = Math.max(...dataPoints);
  
  dataPoints.forEach((value, i) => {
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    // Map value to frequency: 200Hz (low) → 800Hz (high)
    const normalized = (value - minVal) / (maxVal - minVal);
    oscillator.frequency.value = 200 + normalized * 600;
    
    gainNode.gain.value = 0.1;
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.start(audioCtx.currentTime + i * 0.15);
    oscillator.stop(audioCtx.currentTime + i * 0.15 + 0.1);
  });
}
```

---

## 7.7 Testing Checklist

Run this checklist before shipping any data visualization:

| # | Test | Tool / Method |
|---|------|--------------|
| 1 | **Grayscale test** | Screenshot → desaturate. Is every insight still visible? |
| 2 | **Colorblind simulation** | Chrome DevTools → Rendering → Emulate vision deficiencies |
| 3 | **Screen reader test** | NVDA / VoiceOver: can it read the alt text and data table? |
| 4 | **Keyboard navigation** | Tab through every interactive element. Can you reach everything? |
| 5 | **Contrast check** | Text labels ≥ 4.5:1; large text ≥ 3:1; chart elements ≥ 3:1 |
| 6 | **Zoom test** | Browser zoom to 200%. Does layout break? |
| 7 | **Touch target size** | Interactive points ≥ 44×44 CSS pixels |
| 8 | **Reduced motion** | Enable `prefers-reduced-motion`. Do animations disable? |

---

## Quick Summary

| Concept | Key Takeaway |
|---------|-------------|
| **Colorblind safety** | Never rely on color alone. Use patterns, direct labels, and Blue-Orange (not Red-Green). |
| **Alt text** | Chart type + Main finding + Key data point + Context. Always provide a data table alternative. |
| **Keyboard navigation** | Every interactive data point = focusable. Tab through; Enter to select. Skip-to-content link. |
| **Direct labeling** | Label chart elements directly; don't use a legend. Colorblind users can't match distant colors. |
| **Sonification** | Map data to pitch/tempo/panning as a non-visual alternative for blind users. |
| **Testing** | Grayscale test, colorblind simulation, screen reader check, keyboard nav, contrast, zoom, touch targets. |
