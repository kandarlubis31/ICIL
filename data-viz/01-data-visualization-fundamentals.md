# 📊 01 — Data Visualization Fundamentals & Visual Encoding

> **Level: 🟢 Beginner** | Prerequisite: — | Est. reading time: 14 min

Data visualization is not decoration. It's a precision instrument for human cognition — translating abstract numbers into visual patterns the brain can process in milliseconds. This course covers the foundational theory: the Grammar of Graphics, visual encoding channels, preattentive processing, and data type mapping.

---

## 1.1 Why Visualize? The Cognitive Case

The human visual system is the highest-bandwidth channel into the brain. We process visual information ~60,000× faster than text.

```
COGNITIVE BANDWIDTH COMPARISON:
  Reading a table of numbers  →  Serial, slow, working-memory bottleneck
  Seeing a well-designed chart →  Parallel, preattentive, pattern-matching
```

### The Three Functions of Data Visualization (Tufte):

| Function | Description | Example |
|----------|-------------|---------|
| **Record** | Preserve information for inspection | Time-series line chart — see every data point |
| **Analyze** | Reveal patterns, outliers, relationships | Scatter plot — see correlation instantly |
| **Communicate** | Tell a story, make a point | Annotated bar chart — "Revenue grew 40% in Q4" |

> **Key Insight**: A visualization succeeds when it lets the viewer *see* the data, not *read* it.

---

## 1.2 The Grammar of Graphics

**Leland Wilkinson** (1999, *The Grammar of Graphics*) proposed that every statistical graphic can be decomposed into independent components. This became the foundation of **ggplot2** (R), **Vega-Lite**, and modern declarative charting.

```
THE GRAMMAR OF GRAPHICS — Seven Layers:

  1. DATA         →  The raw values (CSV, JSON, database rows)
  2. AESTHETICS   →  Mapping data variables → visual properties (x, y, color, size)
  3. GEOMETRIES   →  The visual marks (point, line, bar, area, polygon)
  4. STATISTICS   →  Transformations (bin, aggregate, smooth, stack)
  5. SCALES       →  How data values map to visual values (linear, log, ordinal)
  6. COORDINATES  →  The plotting space (cartesian, polar, geographic)
  7. FACETS       →  Small multiples (split by category into sub-charts)
```

### Declarative vs Imperative Charting:

```javascript
// IMPERATIVE (Canvas API) — you control pixels:
const ctx = canvas.getContext('2d');
ctx.fillStyle = '#4C78A8';
data.forEach((d, i) => ctx.fillRect(i * 40, 300 - d.value, 30, d.value));

// DECLARATIVE (Vega-Lite / Grammar of Graphics) — you describe the mapping:
const spec = {
  mark: 'bar',
  encoding: {
    x: { field: 'category', type: 'nominal' },
    y: { field: 'value',    type: 'quantitative' },
    color: { field: 'region', type: 'nominal' }
  }
};
// The rendering engine handles layout, axes, color, and scaling
```

> **Design Lesson**: Prefer declarative over imperative for standard charts. Declarative specs are easier to audit, resize, and make accessible.

---

## 1.3 Marks & Channels (Visual Encoding)

**Jacques Bertin** (1967, *Sémiologie Graphique*) identified the fundamental visual variables that encode data. **Tamara Munzner** (2014) refined them into **marks** (geometric primitives) and **channels** (how marks vary).

### Marks — What You Draw:

| Mark | Description | Best For |
|------|-------------|----------|
| **Point** | Zero-dimensional location | Scatter plots, dot plots |
| **Line** | Connected 1D path | Time series, trends, paths |
| **Area** | Filled 2D region | Volume, cumulative, stacked |
| **Bar** | Aligned rectangle with length encoding | Comparisons, rankings |
| **Text** | Direct label | Annotations, table lookups |
| **Glyph** | Compound mark (icon + value) | Maps, complex encodings |

### Channels — How Marks Vary:

| Channel | Perceptual Accuracy | Best Data Type | Example |
|---------|-------------------|----------------|---------|
| **Position (common scale)** | 🟢 Excellent | Quantitative | Bar height, scatter x/y |
| **Position (unaligned)** | 🟡 Good | Quantitative | Pie slice angle |
| **Length** | 🟢 Excellent | Quantitative | Bar length |
| **Angle / Slope** | 🟡 Fair | Quantitative | Pie chart, slope graph |
| **Area** | 🔴 Poor | Quantitative | Bubble chart, circle packing |
| **Volume** | 🔴 Very Poor | Quantitative | 3D bars — avoid! |
| **Color Hue** | 🟡 Fair | Categorical | Different categories |
| **Color Luminance** | 🟡 Good | Ordinal / Sequential | Heatmap, choropleth |
| **Shape** | 🔴 Poor | Categorical | Scatter plot categories |
| **Size** | 🟡 Fair | Quantitative | Bubble size, line weight |

> **Critical Rule**: Match channel to data type. **Position** on a common scale is the most accurate — use it for your most important variable.

### Channel Ranking (Cleveland & McGill, 1984):

```
MOST ACCURATE  →  Position (common scale)
                  Position (non-aligned)
                  Length
                  Angle / Slope
                  Area
LEAST ACCURATE →  Volume / Color / Density
```

---

## 1.4 Preattentive Processing in Data Viz

**Preattentive features** are visual properties the brain detects in < 200ms — before conscious attention. Use them to guide the viewer's eye to what matters.

| Feature | Speed | Usage |
|---------|-------|-------|
| **Color pop** | < 100ms | Highlight outliers, call attention to key values |
| **Orientation** | < 150ms | Distinguish line categories |
| **Size** | < 150ms | Show magnitude |
| **Enclosure** | < 150ms | Group related items |
| **Position** | < 200ms | Primary encoding (X, Y) |
| **Motion** | Instant | Animate changes, draw attention |

```css
/* Preattentive highlighting with a single color channel */
.chart-bar { fill: #6C8EBF; }             /* Neutral bars */
.chart-bar.highlight { fill: #E15759; }    /* Only one bar gets the red — instant pop */

/* Avoid: multiple colors competing for attention */
/* .chart-bar.color1 { fill: #E15759; }   ← Too many highlights = no highlight */
/* .chart-bar.color2 { fill: #F28E2B; } */
/* .chart-bar.color3 { fill: #4E79A7; } */
```

```html
<!-- Annotation + preattentive highlight: viewer sees the key insight instantly -->
<div class="chart-container">
  <svg viewBox="0 0 600 300">
    <!-- 11 neutral bars -->
    <rect x="20" y="200" width="40" height="80"  fill="#B0B0B0" />
    <!-- ... more neutral bars ... -->
    <!-- 1 highlighted bar (the outlier) -->
    <rect x="460" y="80" width="40" height="200" fill="#E15759" rx="4" />
    <!-- Callout annotation -->
    <line x1="480" y1="75" x2="480" y2="40" stroke="#E15759" stroke-width="1.5" />
    <text x="480" y="30" text-anchor="middle" font-size="11" fill="#E15759" font-weight="600">
      +210% YoY
    </text>
  </svg>
</div>
```

---

## 1.5 Data Types → Visual Mapping

Different data types demand different visual encodings. Mis-mapping causes confusion.

| Data Type | Description | Good Encodings | Bad Encodings |
|-----------|-------------|---------------|---------------|
| **Nominal** (categorical) | Unordered labels | Color hue, shape, position (grouped) | Size, luminance (implies order) |
| **Ordinal** | Ordered categories | Color luminance, position, size | Color hue (no natural order) |
| **Quantitative** (interval/ratio) | Numeric values | Position, length, area | Shape, hue (hard to compare) |
| **Temporal** | Time-based | Position on time axis, line | Angle (misleading for cycles) |
| **Geospatial** | Location data | Position on map projection | Pie charts on maps (distortion) |

### Practical Data Type Detection:

```javascript
// Determine data type for automatic chart recommendations
function detectDataType(values) {
  const unique = [...new Set(values)];
  
  // Few unique values → likely categorical (nominal or ordinal)
  if (unique.length <= 12) {
    const isNumeric = unique.every(v => !isNaN(Number(v)));
    return isNumeric ? 'ordinal' : 'nominal';
  }
  
  // Many numeric values → quantitative
  if (values.every(v => !isNaN(Number(v)))) return 'quantitative';
  
  // Date strings → temporal
  if (values.every(v => !isNaN(Date.parse(v)))) return 'temporal';
  
  return 'nominal';
}
```

---

## 1.6 Data-Ink Ratio (Tufte's Principle)

**Edward Tufte** (1983, *The Visual Display of Quantitative Information*) introduced the **data-ink ratio**:

```
data-ink ratio = ink used for data / total ink used in the graphic

HIGH data-ink ratio = efficient, clean, purposeful
LOW  data-ink ratio = cluttered, decorative, "chart junk"
```

### Chart Junk to Eliminate:

| Element | Remove if... | But Keep if... |
|---------|-------------|----------------|
| Gridlines | Every single tick has a gridline | Only major intervals for reference |
| 3D effects | Always remove — they distort perception | — Never. 3D pie charts = lie factor > 1.5× |
| Heavy borders | Frame competes with data | Thin border for print or isolation |
| Decorative icons | Competing with data encoding | Part of brand identity (minimal) |
| Redundant labels | Value shown in bar AND label AND axis | One precise representation is enough |
| Background fill | Chart on colored background | Transparency for overlay on images |

```css
/* High data-ink ratio chart styling */
.chart-gridline { stroke: #eee; stroke-width: 0.5; stroke-dasharray: 2 2; }
.chart-axis-line { stroke: #333; stroke-width: 1; }
.chart-bar { fill: #4C78A8; stroke: none; }               /* No bar borders */
.chart-label { font-size: 11px; fill: #555; }              /* Subtle, not shouting */

/* Anti-pattern: Low data-ink ratio */
.overstyled-bar {
  fill: linear-gradient(#4C78A8, #2E5A88);                 /* Gradient = noise */
  stroke: #1A3A5C; stroke-width: 2;                        /* Heavy border */
  filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.3));       /* 3D shadow = chart junk */
}
```

---

## Quick Summary

| Concept | Key Takeaway |
|---------|-------------|
| **Why visualize** | Visual system is 60,000× faster than reading — exploit preattentive processing |
| **Grammar of Graphics** | Decompose charts into data, aesthetics, geometries, scales, coordinates, facets |
| **Marks & Channels** | Points/lines/bars = marks; position/color/size = channels; position is most accurate |
| **Preattentive features** | Color pop, size, and position are detected in < 200ms — use to guide attention |
| **Data types** | Map nominal → hue, ordinal → luminance, quantitative → position |
| **Data-ink ratio** | Maximize data representation, eliminate chart junk, never use 3D effects |
| **Channel ranking** | Position > Length > Angle > Area > Color/Volume (Cleveland & McGill) |
