# 📊 06 — Data Storytelling & Narrative

> **Level: 🔴 Advanced** | Prerequisite: 01, 02, 04 | Est. reading time: 14 min

A chart shows data. A story makes it matter. Data storytelling is the practice of building a narrative around quantitative evidence — not to manipulate, but to illuminate. This course covers narrative structures, annotation layers, scrollytelling patterns, and the ethics of data narrative.

---

## 6.1 Why Storytelling? Data Alone Doesn't Persuade

**Chip & Dan Heath** (*Made to Stick*, 2007) identified why stories work: they're simple, unexpected, concrete, credible, emotional, and... stories.

| Information Format | Viewer Response |
|-------------------|-----------------|
| Raw data table | "Interesting..." (scrolls past) |
| Well-designed chart | "I see the pattern" |
| Chart + narrative | "I understand WHY it matters — and what to DO" |

> **Key Insight**: A dashboard answers "what." A data story answers "so what."

---

## 6.2 Narrative Structures for Data

### The Martini Glass (Segel & Heer, 2010):

```
│  Author-driven narrative            │  ← "Here's what happened..."
│  (guided path through the data)     │
│  │Step1│──▶│Step2│──▶│Step3│        │     ┃┃  (narrow stem =
│  └─────┘   └─────┘   └─────┘       │     ┃┃   guided path)
│              ▼                      │
│  Reader-driven exploration          │  ← "...now explore on your own"
│  (free interaction with the data)   │
│  │    Interactive chart     │       │     \  /  (wide bowl =
│  │    Filter, zoom, drill   │       │      \/    free exploration)
```

### Alternative Narrative Structures:

| Structure | Pattern | Best For |
|-----------|---------|----------|
| **Martini Glass** | Guided → Free exploration | Data articles, interactive reports |
| **Interactive Slideshow** | Discrete steps with navigation | Presentations, annual reports |
| **Drill-Down Story** | Overview → Click to reveal layers | Complex reports, investigative journalism |
| **Scrollytelling** | Narrative unfolds as user scrolls | Long-form data journalism |

---

## 6.3 The Annotation Layer

Annotations transform a chart from "here's some data" to "here's the insight." Every data story needs at least 3 annotations:

| Annotation Type | Purpose | Visual Style |
|----------------|---------|-------------|
| **Headline** | State the key finding in plain language | Bold, top of chart, 1 sentence max |
| **Callout** | Point to specific data points with explanation | Line + text, contrasting color |
| **Context Note** | Explain caveats: "Excluding one-time charges" | Small, muted, footnote position |
| **Trend Line** | Show overall direction amid noise | Dashed line, annotated with slope or R² |
| **Reference Band** | Show "normal range" or target zone | Semi-transparent band, labeled |

```html
<!-- Annotated chart: headline + callouts + reference band -->
<div class="story-chart">
  <h2 class="chart-headline">
    Revenue grew 40% in Q4 — but profitability tells a different story
  </h2>
  
  <svg viewBox="0 0 700 300">
    <!-- Reference band: target zone -->
    <rect x="60" y="40" width="600" height="180" fill="#E8F5E9" opacity="0.5" />
    <text x="620" y="55" font-size="11" fill="#2E7D32">Target range</text>
    
    <!-- Main line -->
    <polyline points="80,220 160,200 240,180 320,190 400,170 480,140 560,130 640,100"
              fill="none" stroke="#4C78A8" stroke-width="2.5" />
    
    <!-- Callout: peak -->
    <circle cx="320" cy="190" r="6" fill="#E15759" />
    <line x1="320" y1="185" x2="320" y2="130" stroke="#E15759" stroke-width="1.5" />
    <text x="325" y="125" font-size="12" fill="#E15759" font-weight="600">
      Market launch (temporary boost)
    </text>
  </svg>
  
  <p class="chart-context-note">
    * Excluding one-time Q2 restructuring charge of $3.2M. Full methodology at /methods.
  </p>
</div>
```

```css
.chart-headline {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 12px;
  line-height: 1.4;
}

.chart-context-note {
  font-size: 11px;
  color: #888;
  margin-top: 8px;
  font-style: italic;
}
```

---

## 6.4 Scrollytelling Pattern

Scrollytelling is the modern data journalism pattern: as the user scrolls, the narrative advances and the chart updates. It creates a movie-like experience from static data.

```html
<!-- Scrollytelling structure: scroll triggers → chart updates -->
<div class="scrolly-container">
  <!-- Sticky chart: stays in view while user scrolls through text -->
  <div class="sticky-chart">
    <div id="chart-stage">
      <!-- Chart updates here based on scroll position -->
    </div>
  </div>
  
  <!-- Scroll-triggered narrative steps -->
  <div class="narrative-steps">
    <div class="step" data-step="1">
      <h3>2019: The calm before the storm</h3>
      <p>Revenue sat at $12M, growing 5% year-over-year. Nothing suggested what was coming.</p>
    </div>
    <div class="step" data-step="2">
      <h3>2020: The crash — and the pivot</h3>
      <p>Revenue dropped 60% in six weeks. But the pivot to digital saved the company.</p>
    </div>
    <div class="step" data-step="3">
      <h3>2021-2023: The hockey stick</h3>
      <p>The digital-first strategy compounded: 200% growth over three years.</p>
    </div>
  </div>
</div>
```

```css
.scrolly-container {
  display: flex;
  gap: 40px;
}

.sticky-chart {
  position: sticky;
  top: 20px;
  flex: 0 0 55%;
  height: 80vh;
}

.narrative-steps {
  flex: 0 0 40%;
  padding-top: 40vh;           /* Space before first step triggers */
}

.step {
  min-height: 60vh;            /* Each step fills most of the viewport */
  padding: 20px;
  opacity: 0.3;
  transition: opacity 0.4s ease;
}

.step.active {
  opacity: 1;
  border-left: 3px solid #4C78A8;
  padding-left: 17px;
}
```

```javascript
// Scroll trigger: activate steps and update chart as user scrolls
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const step = entry.target.dataset.step;
      // Deactivate all steps, activate current
      document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
      entry.target.classList.add('active');
      // Update chart to show data for this step
      updateChartForStep(step);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.step').forEach(step => observer.observe(step));
```

---

## 6.5 Data Storytelling Ethics

| Principle | Meaning |
|-----------|---------|
| **Don't hide uncertainty** | Show error bars, confidence intervals. "We're 80% confident" is more honest than a single number. |
| **Baseline integrity** | Bar charts must start at zero. Line charts can be zoomed — but disclose it. |
| **Cherry-picking** | Don't show only the time range that supports your narrative. Show full context or disclose the window. |
| **Correlation ≠ Causation** | Label correlation findings clearly. "Associated with" ≠ "Caused by." |
| **Annotate anomalies** | If a data point is an outlier, explain why. Don't let viewers draw wrong conclusions. |
| **Data source transparency** | Always cite the source, date, and methodology. Every chart needs a footnote. |

---

## Quick Summary

| Concept | Key Takeaway |
|---------|-------------|
| **Why story** | Charts show data. Stories make data matter. "Here's what happened" → "Here's why it matters." |
| **Martini Glass** | Start with guided narrative, then open up for free exploration. |
| **Annotations** | Every story-chart needs: headline, callouts, context notes. 3 annotations minimum. |
| **Scrollytelling** | Scroll triggers → chart updates. Sticky chart + narrative steps. Movie-like experience. |
| **Ethics** | Show uncertainty, disclose baselines, cite sources, distinguish correlation from causation. |
