# 📊 02 — Chart Selection Guide

> **Level: 🟢 Beginner** | Prerequisite: 01 | Est. reading time: 13 min

Choosing the right chart is the single most impactful decision in data visualization. The wrong chart obscures patterns, misleads viewers, or simply fails to communicate. This course is a practical decision framework: what to use, when, and — crucially — what to avoid.

---

## 2.1 The Chart Selection Decision Tree

Start with the question your data needs to answer. The chart follows the question.

```
WHAT DO YOU WANT TO SHOW?

  COMPARISON ──────┬── Items (few)       → Bar chart (horizontal)
  (rank, diff)     ├── Items (many)      → Table, lollipop chart
                   ├── Over time (few)   → Column chart, line
                   └── Over time (many)  → Line chart, small multiples

  RELATIONSHIP ────┬── Two variables     → Scatter plot
  (correlation)    ├── Three variables   → Bubble chart, scatter + color
                   └── Many variables    → Scatter matrix, parallel coordinates

  DISTRIBUTION ────┬── Single variable   → Histogram, density plot, box plot
  (spread, shape)  ├── Two variables     → 2D density, hexbin
                   └── By category       → Violin plot, grouped box plot

  COMPOSITION ─────┬── Static (parts)    → Stacked bar, pie (≤ 5 slices), treemap
  (parts of whole) ├── Over time         → Stacked area, streamgraph
                   └── Hierarchical      → Treemap, sunburst, icicle

  TREND ───────────┬── Continuous        → Line chart
  (over time)      ├── Cyclical          → Cycle plot, radar
                   └── Forecast          → Line + confidence band

  GEOSPATIAL ──────┬── Region values     → Choropleth
  (maps)           ├── Point locations   → Dot map, bubble map
                   └── Flows             → Flow map, origin-destination
```

---

## 2.2 Chart-by-Chart Guide

### Bar / Column Chart

| Aspect | Recommendation |
|--------|---------------|
| **Use when** | Comparing discrete categories, ranking, showing exact values |
| **Avoid when** | You have > 15 categories (use lollipop or table), continuous data (use histogram) |
| **Orientation** | Horizontal for long labels; vertical for time or natural sequence |
| **Baseline** | Must start at zero — truncating the axis distorts relative size |
| **Sorting** | Sort by value, not alphabetically (unless the categories ARE the answer) |

```html
<!-- Horizontal bar: best for category labels > 8 characters -->
<svg viewBox="0 0 500 280">
  <g transform="translate(120, 20)">  <!-- Offset for labels -->
    <rect y="0"   width="340" height="30" fill="#4C78A8" rx="3" />
    <rect y="50"  width="260" height="30" fill="#4C78A8" rx="3" />
    <rect y="100" width="410" height="30" fill="#E15759" rx="3" />  <!-- Highlighted -->
    <rect y="150" width="180" height="30" fill="#4C78A8" rx="3" />
    <rect y="200" width="120" height="30" fill="#4C78A8" rx="3" />
  </g>
  <!-- Labels left-aligned, right of bar -->
  <text x="115" y="41"  text-anchor="end" font-size="13">Desktop</text>
  <text x="115" y="91"  text-anchor="end" font-size="13">Tablet</text>
  <text x="115" y="141" text-anchor="end" font-size="13" font-weight="700" fill="#E15759">Mobile</text>
  <text x="115" y="191" text-anchor="end" font-size="13">Email</text>
  <text x="115" y="241" text-anchor="end" font-size="13">SMS</text>
</svg>
```

> **Critical**: Baseline ALWAYS at zero for bar charts. A truncated Y-axis exaggerates differences and misleads viewers. The "lie factor" (size of effect in graphic / size of effect in data) should be ~1.0.

### Line Chart

| Aspect | Recommendation |
|--------|---------------|
| **Use when** | Continuous time series, showing trends, comparing multiple series |
| **Avoid when** | Categorical x-axis (use column/bar), sparse data points (use dot plot) |
| **Y-axis** | Does NOT need to start at zero — focus on the range of variation |
| **Slope** | Aspect ratio affects perceived slope — aim for 45° average (banking to 45°) |
| **Multiple lines** | Max 4-5 lines; use direct labeling (not legend); highlight key line |

```html
<!-- Line chart: aspect ratio optimized with banking to 45° -->
<svg viewBox="0 0 600 250">
  <!-- Grid -->
  <g stroke="#eee" stroke-width="0.5">
    <line x1="60" y1="200" x2="560" y2="200" />
    <line x1="60" y1="150" x2="560" y2="150" />
    <line x1="60" y1="100" x2="560" y2="100" />
    <line x1="60" y1="50"  x2="560" y2="50"  />
  </g>
  <!-- Line (SVG polyline with smooth rendering) -->
  <polyline points="80,180 160,160 240,130 320,140 400,110 480,80 560,60"
            fill="none" stroke="#4C78A8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
  <!-- Highlight area: last 3 points emphasized -->
  <polyline points="320,140 400,110 480,80 560,60"
            fill="none" stroke="#E15759" stroke-width="3.5" stroke-linecap="round" />
  <!-- Dots on data points -->
  <circle cx="80" cy="180" r="4" fill="#4C78A8" />
  <circle cx="160" cy="160" r="4" fill="#4C78A8" />
  <circle cx="240" cy="130" r="4" fill="#4C78A8" />
  <circle cx="320" cy="140" r="5" fill="#E15759" />
  <circle cx="400" cy="110" r="5" fill="#E15759" />
  <circle cx="480" cy="80"  r="5" fill="#E15759" />
  <circle cx="560" cy="60"  r="5" fill="#E15759" />
</svg>
```

### Scatter Plot

| Aspect | Recommendation |
|--------|---------------|
| **Use when** | Examining relationship between two quantitative variables |
| **Avoid when** | < 30 data points (use table), one variable is categorical (use grouped bar) |
| **Trend line** | Add loess/linear regression line with R² value |
| **Overplotting** | For 10K+ points, use opacity (0.1-0.3), hexbin, or contour density |

### Pie Chart / Donut Chart

| Aspect | Recommendation |
|--------|---------------|
| **Use when** | Showing parts of a whole with ≤ 5 categories and large differences |
| **Avoid when** | > 5 slices, similar values (hard to compare angles), time comparison (use stacked bar) |
| **Alternative** | Stacked bar chart or treemap almost always better |

> **Controversial truth**: Pie charts have legitimate uses for 2-3 categories with clearly different proportions (e.g., "Yes 78% / No 22%"). But for everything else, use a bar chart.

### Area Chart & Stacked Area

| Aspect | Recommendation |
|--------|---------------|
| **Use when** | Showing volume/magnitude over time, part-to-whole composition changing over time |
| **Avoid when** | Individual series trend is important (occlusion: top series blocks view of lower ones) |
| **Baseline** | Stacked area: zero baseline mandatory; Overlapping area: use transparency |

### Heatmap

| Aspect | Recommendation |
|--------|---------------|
| **Use when** | Matrix of values (time × category), correlation matrix, dense grid data |
| **Avoid when** | Precision needed (hard to read exact values), few data points (use bar chart) |
| **Color** | Sequential single-hue or multi-hue perceptually uniform scale |

### Additional Chart Types Quick Reference:

| Chart | Best Use | Max Categories | Key Pitfall |
|-------|----------|---------------|-------------|
| **Treemap** | Hierarchical part-to-whole | 20+ nodes | Hard to compare non-adjacent rectangles |
| **Bubble chart** | 3-variable relationship | 30 bubbles | Area is poorly perceived; use size carefully |
| **Radar / Spider** | Multi-variable profile | 10 axes max | Order of axes distorts shape; use parallel coordinates |
| **Sankey** | Flow / transfer between stages | Many nodes | Node ordering affects readability |
| **Choropleth** | Regional values on a map | Many regions | Area bias: large regions dominate visually |
| **Box plot** | Distribution summary | Side-by-side categories | Hide bimodal distributions; supplement with violin |
| **Waterfall** | Sequential +/− changes | Financial / inventory | Bridge between start and end values |

---

## 2.3 Common Chart Mistakes (and Fixes)

| Mistake | Why It Fails | The Fix |
|---------|-------------|---------|
| **Dual-axis chart** | Two unrelated Y-axes create false correlations | Small multiples, indexed to 100, or two separate charts |
| **3D pie chart** | Perspective distortion exaggerates front slices 2× | Flat bar chart — always |
| **Rainbow colormap (jet)** | Perceptually non-uniform; creates false boundaries | Viridis, magma, plasma, or sequential single-hue |
| **Truncated Y-axis** | Lie factor > 2; exaggerates small differences | Full axis OR clearly labeled break with zigzag |
| **Pie with 10+ slices** | Angles become indistinguishable | Top 5 + "Other" grouped bar |
| **Stacked bar with 6+ series** | Only bottom series is readable; rest float at different baselines | Small multiples or line chart |

---

## 2.4 The Chart Selection Algorithm

```javascript
/**
 * Recommend chart types based on data characteristics.
 * Returns ranked suggestions — top result is best fit.
 */
function recommendChart(xType, yType, nCategories, nPoints, purpose) {
  // xType, yType: 'nominal' | 'ordinal' | 'quantitative' | 'temporal'
  
  if (purpose === 'comparison' && xType === 'nominal') {
    if (nCategories <= 15) return ['bar_chart_horizontal', 'bar_chart_vertical', 'lollipop'];
    return ['lollipop', 'table', 'bar_chart_horizontal'];
  }
  
  if (purpose === 'trend' && xType === 'temporal') {
    if (nPoints < 15) return ['column_chart', 'line_chart', 'dot_plot'];
    return ['line_chart', 'area_chart'];
  }
  
  if (purpose === 'relationship' && xType === 'quantitative' && yType === 'quantitative') {
    if (nPoints > 5000) return ['hexbin', 'contour', 'scatter_alpha'];
    return ['scatter_plot', 'scatter_with_trendline'];
  }
  
  if (purpose === 'distribution') {
    if (nPoints < 50) return ['strip_plot', 'dot_plot'];
    return ['histogram', 'box_plot', 'violin_plot'];
  }
  
  if (purpose === 'composition') {
    if (nCategories <= 5) return ['stacked_bar', 'donut', 'treemap'];
    return ['treemap', 'stacked_bar_top5'];
  }
  
  return ['bar_chart']; // Safe default
}
```

---

## Quick Summary

| Concept | Key Takeaway |
|---------|-------------|
| **Decision tree** | Start with the question: Comparison → Bar, Trend → Line, Relationship → Scatter, Distribution → Histogram, Composition → Stacked/treemap |
| **Bar chart** | Zero baseline mandatory; horizontal for long labels; sort by value |
| **Line chart** | For continuous time series; zero baseline optional; max 4-5 lines |
| **Pie chart** | Only for ≤ 5 slices with clearly different proportions; otherwise use bar |
| **Scatter plot** | Two quantitative variables; use opacity for overplotting |
| **Never** | Dual-axis charts, 3D effects, rainbow colormap, truncated bar chart axes |
| **When in doubt** | Bar chart is the safest default — position on common scale, most accurate |
