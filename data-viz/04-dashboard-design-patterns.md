# 📊 04 — Dashboard Design Patterns

> **Level: 🟡 Intermediate** | Prerequisite: 02 | Est. reading time: 13 min

A dashboard is not a collection of charts. It's a decision-support tool: the right information, at the right time, organized so patterns jump out and actions follow naturally. This course covers dashboard types, layout patterns, KPI design, and responsive strategies.

---

## 4.1 Three Types of Dashboards

Not all dashboards serve the same purpose. Confusing the types produces dashboards that please nobody.

| Type | User | Timeframe | Update Frequency | Primary Goal |
|------|------|-----------|-----------------|-------------|
| **Operational** | Front-line operators | Now (seconds-minutes) | Real-time / streaming | Alert, monitor, react |
| **Analytical** | Analysts, managers | This week/month (hours-days) | Hourly / daily | Explore, drill-down, compare |
| **Strategic** | Executives | This quarter/year (weeks-months) | Weekly / monthly | Track goals, spot trends, decide |

```
OPERATIONAL:                    ANALYTICAL:                    STRATEGIC:
│ 🔴 3 ALERTS             │    │ Revenue by Region (Q3)  │    │ 📊 Annual Revenue       │
│ ████████████████░░ 82%  │    │ ████░░░░  ██████░░  ██░░│    │ $24.8M ▲ 12% vs Target  │
│ ██████████████████░ 94% │    │ ████████  ████████  ████│    │                         │
│ ████████░░░░░░░░░░░ 38% │    │ [Filters: Region ▼]    │    │ 📈 YoY Trend            │
│ [Acknowledge]          │    │ [Date Range: Q3 2026  ▼]│    │ ╱▔▔▔╲    ╱╲            │
  Glanceable, actionable        Interactive, explorable        └─────────────────────────┘
  (30 sec scan)                  (5-30 min session)               Summarized, contextual
```

---

## 4.2 Dashboard Layout Patterns

### The Golden Layout (for most dashboards):

```
│  HEADER: Title, Date Range Picker, Global Filters    │
│   KPI #1     │   KPI #2     │   KPI #3     │  KPI #4 │  ← Top row: summary metrics
│   $12.4M ▲   │   8.3% ▼     │   94.2% ◉    │  1,247   │
│   MAIN CHART (2/3 width)   │   CONTEXT (1/3 width)  │  ← Middle row: primary viz
│   [Line / Bar / Area]      │   [Pie / Table / List] │
│   DETAIL TABLE / DRILL-DOWN (full width)             │  ← Bottom row: details
│   │ Row 1  │        │        │        │        │    │
```

### Dashboard Grid System:

```css
/* Dashboard Grid — CSS Grid for data presentation */
.dashboard {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  gap: 16px;
  padding: 24px;
}

/* KPI cards span 1 column each (4 across) */
.kpi-card { grid-column: span 1; }

/* Main chart spans 3 columns */
.main-chart { grid-column: span 3; min-height: 400px; }

/* Context panel spans 1 column */
.context-panel { grid-column: span 1; }

/* Detail table spans full width */
.detail-table { grid-column: 1 / -1; }

/* Responsive: collapse to single column on mobile */
@media (max-width: 768px) {
  .dashboard { grid-template-columns: 1fr; }
  .kpi-card { grid-column: span 1; }
  .main-chart { grid-column: span 1; min-height: 300px; }
  .context-panel { grid-column: span 1; }
}
```

---

## 4.3 KPI Card Design

KPI (Key Performance Indicator) cards are the most-viewed element on any dashboard. Make them scannable:

```html
<!-- KPI Card: the atomic unit of dashboard design -->
<div class="kpi-card">
  <div class="kpi-label">Monthly Revenue</div>
  <div class="kpi-value">$12.4M</div>
  <div class="kpi-change positive">
    <span class="kpi-arrow">▲</span> 12.3%
    <span class="kpi-context">vs last month</span>
  </div>
  <div class="kpi-sparkline">
    <!-- Mini sparkline showing trend (no axes needed) -->
    <svg width="100%" height="40">
      <polyline points="0,30 20,28 40,25 60,22 80,15 100,10"
                fill="none" stroke="currentColor" stroke-width="2"/>
    </svg>
  </div>
</div>
```

```css
.kpi-card {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
  border: 1px solid #eee;
}

.kpi-label { font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 0.5px; }
.kpi-value { font-size: 28px; font-weight: 700; color: #1a1a1a; margin: 4px 0; }

.kpi-change { font-size: 13px; font-weight: 600; }
.kpi-change.positive { color: #2E8B57; }
.kpi-change.negative { color: #D14343; }

.kpi-context { font-weight: 400; color: #888; }
.kpi-sparkline { margin-top: 12px; opacity: 0.7; }
```

### KPI Best Practices:

| Do | Don't |
|----|-------|
| Show value + comparison + trend (sparkline) | Show raw value alone — "12,847" means nothing |
| Use color to encode direction (▲ green, ▼ red) | Use color as the ONLY indicator (add arrow and number) |
| Provide context: "vs target," "vs last month" | Leave the viewer guessing what's "good" |
| Limit to 4-6 KPIs per dashboard | Flood with 20 metrics — that's a report, not a dashboard |

---

## 4.4 Filters & Interactivity

Filters transform a static dashboard into an exploration tool:

| Filter Pattern | Best For | Avoid When |
|---------------|----------|------------|
| **Date range picker** | Time-series dashboards | Data is non-temporal |
| **Dropdown (single select)** | Few categories (< 20) | Too many options (use search) |
| **Multi-select checkboxes** | Filtering by multiple tags/labels | Too many selected = no filter effect |
| **Toggle segments** | 2-5 mutually exclusive views | More than 5 options (use dropdown) |
| **Search-as-you-type** | Large category lists (> 20) | Small lists (dropdown is faster) |
| **Global vs Local filters** | Global: affects all charts; Local: per-chart | Mixing them confusingly |

```html
<!-- Dashboard filter bar -->
<div class="filter-bar">
  <div class="filter-group">
    <label for="date-range">Period</label>
    <select id="date-range">
      <option>Last 7 days</option>
      <option selected>Last 30 days</option>
      <option>Last quarter</option>
      <option>Custom range...</option>
    </select>
  </div>
  
  <div class="filter-group">
    <label>Region</label>
    <div class="chip-group">
      <button class="chip active">All</button>
      <button class="chip">NA</button>
      <button class="chip">EU</button>
      <button class="chip">APAC</button>
      <button class="chip">LATAM</button>
    </div>
  </div>
  
  <button class="btn-reset">Reset filters</button>
</div>
```

---

## 4.5 Drill-Down: Progressive Disclosure of Data

Don't cram everything into one view. Use progressive disclosure:

```
LEVEL 1 (Overview):     KPI Cards + Main Trend Chart
       ▼ Click on a KPI or chart segment
LEVEL 2 (Category):     Breakdown by category (bar chart)
       ▼ Click on a category bar
LEVEL 3 (Detail):       Table with individual records
```

```javascript
// Drill-down pattern: click to descend, breadcrumb to ascend
function drillDown(currentLevel, selectedItem) {
  // currentLevel: 'overview' | 'category' | 'detail'
  // selectedItem: the chart element clicked
  
  if (currentLevel === 'overview') {
    renderCategoryBreakdown(selectedItem.category);
  } else if (currentLevel === 'category') {
    renderDetailTable(selectedItem.category, selectedItem.subcategory);
  }
}

function drillUp() {
  // Breadcrumb click → go back one level
  const prevLevel = drillStack.pop();
  renderLevel(prevLevel);
}
```

---

## 4.6 Responsive Dashboard Strategy

Dashboards MUST work on mobile. But not by shrinking charts:

| Screen | Strategy | Layout |
|--------|----------|--------|
| **Desktop (≥ 1280px)** | Full dashboard: KPIs row + main chart + context | 4-col grid |
| **Tablet (768-1279px)** | KPIs + main chart; context moves below | 2-col grid |
| **Phone (< 768px)** | KPIs stacked vertically; each chart becomes a full-width card; detail table becomes card list | 1-col stack |

```css
/* Responsive dashboard — content-first mobile strategy */
@media (max-width: 768px) {
  .kpi-row { grid-template-columns: 1fr 1fr; }  /* 2 KPIs per row */
  .main-chart { min-height: 250px; }             /* Shorter chart on mobile */
  .detail-table { display: none; }               /* Hide table on mobile */
  .detail-cards { display: block; }              /* Show card-based alternative */
  
  /* Simplify chart: fewer data points, larger touch targets */
  .chart-tooltip { display: none; }              /* No hover tooltips on touch */
  .chart-tap-info { display: block; }            /* Show on tap instead */
}
```

---

## Quick Summary

| Concept | Key Takeaway |
|---------|-------------|
| **Three dashboard types** | Operational (real-time alerting), Analytical (exploration), Strategic (trend tracking). Different users, different refresh rates. |
| **Golden layout** | KPIs top → Main chart + Context middle → Detail table bottom |
| **KPI cards** | Value + comparison (▲▼) + sparkline + context label. 4-6 max per dashboard. |
| **Filters** | Date range, dropdowns, chip toggles. Global filters affect everything; local are per-chart. |
| **Drill-down** | Overview → Category breakdown → Detail records. Breadcrumb for navigation back up. |
| **Responsive** | Mobile: stack KPIs, simplify charts, replace tables with cards, tap-to-reveal instead of hover. |
