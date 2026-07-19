# ⚖️ 06 — Sustainability in Digital Design

> **Level: 🟡 Intermediate** | Prerequisite: 01 | ~8 min

The internet produces ~3.7% of global greenhouse emissions — on par with the aviation industry. Every design decision has a carbon cost: images, video autoplay, unnecessary animations, and data-heavy features add up. Sustainable design is good UX: faster, lighter, cheaper to run.

---

## 6.1 The Carbon Cost of Digital Products

| Element | Carbon Impact | Optimization |
|---------|--------------|-------------|
| **1MB image** | ~0.5g CO2 per load | WebP/AVIF, lazy load, srcset, 2x max |
| **Auto-play video** | 5-50MB per session | Click-to-play, no autoplay, compressed |
| **Custom font (5 weights)** | 500KB+ per visit | System font stack, subset, 2 weights max, font-display: swap |
| **Tracking scripts (10)** | 1-2MB per page | Remove unused tags, server-side analytics |
| **Dark mode** | 30% less energy on OLED | System dark mode detection + manual toggle |
| **Infinite scroll** | Continuous data loading | Pagination, "load more" button |

**Website Carbon Calculator:** Estimate at websitecarbon.com or digitalbeacon.co.

---

## 6.2 Sustainable UX Patterns

| Pattern | High Carbon | Low Carbon |
|---------|------------|-----------|
| **Search** | Return 500 results with full previews | Return top 20, paginated, text-only |
| **Images** | 4000px hero image loading on mobile | Responsive images, max 2x display size |
| **Video** | Auto-play background video on homepage | Static image + click-to-play, compressed |
| **Animations** | Continuous CSS/JS animations in background | prefers-reduced-motion, pause when not visible |
| **Data refresh** | Polling every 5 seconds | WebSocket push or 30-second polling |
| **Navigation** | Full-page reloads between pages | SPA with code splitting, preload critical paths |

---

## 6.3 Green Hosting & Infrastructure

| Factor | Impact | Action |
|--------|--------|--------|
| **Data center location** | Carbon intensity varies 10x by region | Choose regions powered by renewables (The Green Web Foundation directory) |
| **CDN** | Edge caching reduces origin traffic | Cache static assets aggressively (1 year TTL) |
| **Compute** | Serverless scales to zero | Use serverless for sporadic workloads, not always-on |
| **Storage** | Retained logs, analytics, backups | Auto-delete logs after 30 days, archive cold data |

---

## 6.4 Measuring & Communicating

| Metric | Tool |
|--------|------|
| **Page weight** | Lighthouse, WebPageTest, Size Limit |
| **CO2 per page view** | Website Carbon, Ecograder, Digital Beacon |
| **Green hosting check** | The Green Web Foundation |
| **Design system carbon budget** | Set a per-page CO2 budget in CI |

**Sustainable design statement (example):**
> "We offset our digital carbon through Gold Standard projects. Our average page emits 0.22g CO2 (industry avg: 1.76g). We review our carbon budget quarterly."

---

## ⚡ Action Checklist

- [ ] Measure your homepage carbon — websitecarbon.com or digitalbeacon.co
- [ ] Set a page weight budget: 500KB homepage, 100KB critical path
- [ ] Convert all images to WebP/AVIF with responsive srcset
- [ ] Switch auto-play videos to click-to-play
- [ ] Check your host on The Green Web Foundation directory

> **ICIL Cross-Ref:** performance/05 (Network & Asset Optimization), performance/07 (Performance Budgets & CI), mobile-ux/07 (Responsive Design)
