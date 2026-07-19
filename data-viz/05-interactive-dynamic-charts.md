# 📊 05 — Interactive & Dynamic Charts

> **Level: 🟡 Intermediate** | Prerequisite: 01, 02 | Est. reading time: 13 min

Static charts answer "what happened." Interactive charts answer "why" and "what if." This course covers the essential interaction patterns that transform data visualization from a passive display into an exploration tool.

---

## 5.1 The Interaction Mandate (Shneiderman)

**Ben Shneiderman** (1996) articulated the visual information-seeking mantra:

```
OVERVIEW FIRST →  "Overview first, zoom and filter, then details on demand."
  Overview:      See the whole dataset at once
  Zoom:          Focus on a region of interest
  Filter:        Remove uninteresting items
  Details:       Get specifics on a selected item
  Relate:        View relationships between items
  History:       Undo/redo exploration steps
  Extract:       Save or export the current view
```

---

## 5.2 Tooltip Design

The tooltip is the most-used interaction in data visualization. Done poorly, it's annoying. Done well, it's indispensable.

| Do | Don't |
|----|-------|
| Show meaningful data (value + label + context) | Show raw X,Y coordinates |
| Position near cursor (but not covering data) | Cover the data point being inspected |
| Appear fast (< 200ms delay) | Lag or appear with long delay |
| Include units and formatting | Show unformatted numbers ("0.3749283") |
| Provide comparison ("14% above average") | Show only raw value |

```html
<!-- Tooltip positioned relative to chart point -->
<div class="chart-tooltip" role="tooltip" aria-live="polite">
  <div class="tooltip-date">March 15, 2026</div>
  <div class="tooltip-value">$847,200</div>
  <div class="tooltip-context positive">▲ 14.3% above target</div>
</div>
```

```css
.chart-tooltip {
  position: absolute;
  pointer-events: none;          /* Don't block mouse events */
  background: rgba(30, 30, 30, 0.92);
  color: #fff;
  padding: 10px 14px;
  border-radius: 6px;
  font-size: 13px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  z-index: 100;
  opacity: 0;
  transition: opacity 0.15s ease;
  max-width: 240px;
}

.chart-tooltip.visible { opacity: 1; }

.tooltip-value { font-size: 18px; font-weight: 700; margin: 4px 0; }
.tooltip-context { font-size: 12px; opacity: 0.85; }
```

---

## 5.3 Brushing & Linking

**Brushing** = selecting a subset of data by dragging on one chart.
**Linking** = the same selection highlights related data in other charts.

This is the most powerful analytical interaction pattern — it reveals multi-dimensional relationships.

```javascript
// Brushing & Linking pattern concept
class BrushLinkController {
  constructor() {
    this.selection = null;        // Current brush selection: { xMin, xMax, yMin, yMax }
    this.linkedCharts = [];       // Charts that respond to the selection
  }

  onBrush(selection) {
    this.selection = selection;
    // Highlight brushed points in ALL linked charts
    this.linkedCharts.forEach(chart => chart.highlight(this.selection));
  }

  onBrushEnd() {
    // Optionally filter to selection on mouse-up
    this.linkedCharts.forEach(chart => chart.filterTo(this.selection));
  }
}

// Usage: scatter plot brushes → line chart highlights same date range
//         bar chart click selects category → map highlights matching regions
```

### Brushing Visual Design:

```css
/* The brush overlay: a semi-transparent rectangle */
.brush-overlay {
  fill: none;
  pointer-events: all;           /* Capture mouse for brushing */
}

.brush-selection {
  fill: rgba(76, 120, 168, 0.15);
  stroke: #4C78A8;
  stroke-width: 2;
  stroke-dasharray: 4 2;
}

/* Highlighted points in linked charts */
.point-brushed { opacity: 1; stroke: #E15759; stroke-width: 2; }
.point-dimmed   { opacity: 0.15; }
```

---

## 5.4 Zoom & Pan

Zoom and pan let the viewer focus on a region of interest without losing context.

| Pattern | How | Best For |
|---------|-----|----------|
| **Scroll to zoom** | Mouse wheel → zoom in/out | Timelines, maps, dense scatter plots |
| **Pinch to zoom** | Two-finger gesture on touch | Mobile data exploration |
| **Box zoom** | Click-drag to draw zoom rectangle | Precise region selection |
| **Pan (drag)** | Click-drag on empty chart area | Navigating large datasets |
| **Reset button** | One-click return to overview | Essential — never leave the viewer "lost in zoom" |

```html
<!-- Zoom controls: always visible, always accessible -->
<div class="zoom-controls">
  <button class="zoom-btn" aria-label="Zoom in"  title="Zoom in">+</button>
  <button class="zoom-btn" aria-label="Zoom out" title="Zoom out">−</button>
  <button class="zoom-btn" aria-label="Reset zoom" title="Reset view">⟲</button>
</div>
```

---

## 5.5 Animation for Understanding (Not Decoration)

Animation in data visualization must serve cognition, not aesthetics.

| Animation Type | Purpose | Duration |
|---------------|---------|----------|
| **Transition on filter** | Show how data changes when filtering | 300-500ms |
| **Enter/exit of new data** | Guide attention to what appeared/disappeared | 200-400ms |
| **Sort animation** | Preserve object constancy when reordering | 300-600ms |
| **Real-time update** | Streaming data — animate new points smoothly | 100-200ms per tick |
| **Annotation reveal** | Staged narrative — one insight at a time | 400-800ms per stage |

```css
/* Chart transitions: smooth filter changes */
.chart-bar {
  transition: y 0.3s ease, height 0.3s ease, fill 0.2s ease;
}

/* Enter animation: bars grow from baseline */
.chart-bar.enter {
  animation: barGrow 0.4s ease-out;
}

@keyframes barGrow {
  from { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
  to   { transform: scaleY(1); transform-origin: bottom; opacity: 1; }
}

/* Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  .chart-bar { transition: none; }
  .chart-bar.enter { animation: none; }
}
```

---

## 5.6 Real-Time / Streaming Data

Real-time dashboards present unique UX challenges:

| Challenge | Solution |
|-----------|----------|
| **Flickering updates** | Smooth transition, not jump cuts |
| **Alert fatigue** | Threshold-based alerts, not every change |
| **Scroll-off / data loss** | Fixed window (last N minutes) or paginated history |
| **Lag perception** | Show "Live" indicator + last update timestamp |
| **Animation overload** | Batch updates; animate only visible viewport |

```javascript
// Real-time chart update with smooth animation
class RealTimeChart {
  constructor(maxPoints = 60) {
    this.data = [];
    this.maxPoints = maxPoints;       // Show last 60 seconds
  }

  pushDataPoint(value) {
    const now = Date.now();
    this.data.push({ time: now, value });
    
    // Trim old data beyond window
    const cutoff = now - (this.maxPoints * 1000);
    this.data = this.data.filter(d => d.time >= cutoff);
    
    // Animate: transition old points left, new point enters right
    this.render({ animate: true });
  }
}
```

---

## Quick Summary

| Concept | Key Takeaway |
|---------|-------------|
| **Shneiderman's mantra** | Overview → zoom/filter → details-on-demand. Every interactive chart should follow this. |
| **Tooltips** | Fast (<200ms), near cursor, meaningful context. Never cover the data point. |
| **Brushing & Linking** | Select in one chart → highlight in all linked charts. Most powerful analytical pattern. |
| **Zoom & Pan** | Always provide a reset button. Scroll-to-zoom + pinch-to-zoom. |
| **Animation** | Serve cognition, not decoration. Respect `prefers-reduced-motion`. |
| **Real-time** | Smooth transitions, time-window management, "Live" indicator with timestamp. |
