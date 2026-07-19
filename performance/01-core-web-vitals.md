# ⚡ 01 — Core Web Vitals & Frontend Perf

> 🟢 Beginner | Prereq: — | ~9 min

Google's Core Web Vitals measure real-user experience: loading (LCP), interactivity (INP), and visual stability (CLS). Poor scores = poor UX + lower SEO ranking.

---

## 1.1 The Three Vitals

| Metric | Measures | Good | Poor |
|--------|----------|------|------|
| **LCP** (Largest Contentful Paint) | Loading speed | < 2.5s | > 4.0s |
| **INP** (Interaction to Next Paint) | Responsiveness | < 200ms | > 500ms |
| **CLS** (Cumulative Layout Shift) | Visual stability | < 0.1 | > 0.25 |

## 1.2 Common Vitals Killers

```
LCP SLOW?               INP SLOW?               CLS HIGH?
  → Large images          → Long JS tasks         → Images without dimensions
  → Slow server           → Synchronous layout    → Dynamic ads/content
  → Render-blocking JS    → Heavy event handlers  → Web fonts (FOUT/FOIT)
  → No CDN                → No code splitting     → Animations without transforms
```

## 1.3 Quick Wins

```html
<!-- BEFORE: slow LCP -->
<img src="hero-4000px.jpg">

<!-- AFTER: responsive + lazy + dimensions -->
<img 
  srcset="hero-800.jpg 800w, hero-1600.jpg 1600w"
  sizes="(max-width: 600px) 800px, 1600px"
  src="hero-1600.jpg"
  width="1600" height="900"
  loading="lazy"
  decoding="async"
>

<!-- BEFORE: CLS shift from font swap -->
<!-- AFTER: reserve space with font-display + size-adjust -->
<style>
@font-face {
  font-family: 'Custom';
  src: url('/font.woff2') format('woff2');
  font-display: swap;
  size-adjust: 105%; /* prevents layout shift */
}
</style>
```

## 1.4 Measuring Vitals — Lab vs Field

> ⚠️ **Critical**: Lighthouse = **lab data** (simulated, single device). Core Web Vitals ranking uses **field data** (real users, 75th percentile). Use BOTH:

| Tool | Data Type | Best For |
|------|-----------|----------|
| **PageSpeed Insights** | Field + Lab | Real-user CrUX data + Lighthouse audit in one report |
| **Google Search Console** | Field | Track field CWV over time across all pages |
| **Lighthouse CLI / DevTools** | Lab | Local debugging, CI regression, synthetic testing |
| **web-vitals JS library** | Field (RUM) | Collect real-user metrics in your own analytics |

```bash
# CLI audit (lab data — good for CI/local debugging)
npx lighthouse https://mysite.com --view --preset=desktop

# CI check (fail build if below threshold)
npx lighthouse https://mysite.com \
  --chrome-flags="--headless" \
  --output=json \
  --only-categories=performance

# Field data (real-user) — check PageSpeed Insights:
# https://pagespeed.web.dev/analysis?url=https://mysite.com
```

## 1.5 Anti-Patterns

- **Optimizing without measuring** — run Lighthouse FIRST, then fix top issues
- **Desktop-only testing** — 70% of traffic is mobile; test on 3G throttling
- **Third-party bloat** — every analytics/tracking script costs 100-500ms

## 1.6 ICIL Cross-Ref

Use with: `devops-infra/06` (monitoring), `data-viz/04` (dashboard performance)

## ⚡ Action Checklist
- [ ] Run **PageSpeed Insights** for field data (real-user CrUX) — not just Lighthouse
- [ ] Lab targets: LCP < 2.5s, INP < 200ms, CLS < 0.1 (at 75th percentile)
- [ ] All images have explicit width/height attributes
- [ ] Fonts use `font-display: swap` with `size-adjust`
- [ ] JS is split (dynamic imports) — no single bundle > 200KB
- [ ] Test on mobile 3G throttling; that's your real user
