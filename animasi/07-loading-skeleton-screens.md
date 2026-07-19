# ✨ 07 — Loading & Skeleton Screens

> 🟡 Intermediate | Prereq: 01, 03 | ~3 min

Users don't hate waiting — they hate *not knowing*. Skeleton screens reduce perceived wait by ~40%.

---

## 7.1 Spinner vs Skeleton vs Progress

| Type | When | Perceived Speed |
|------|------|----------------|
| **Spinner** | Short indeterminate (<2s) | 🟡 Medium |
| **Progress Bar** | Measurable (upload, download) | 🟢 Fast |
| **Skeleton Screen** | Content-heavy layouts | 🟢 **Fastest** — 2× faster than blank |

---

## 7.2 Skeleton Screen with Shimmer

```css
.skeleton {
  background: #e0e0e0; border-radius: 4px; overflow: hidden; position: relative;
}
.skeleton::after {
  content: ''; position: absolute; inset: 0; transform: translateX(-100%);
  background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%);
  animation: shimmer 1.5s infinite;
}
@keyframes shimmer { 100% { transform: translateX(100%); } }

.skeleton-image { width: 100%; height: 200px; border-radius: 8px; }
.skeleton-title { width: 70%; height: 20px; margin-top: 12px; }
.skeleton-text  { width: 100%; height: 14px; margin-top: 8px; }
.skeleton-text.short { width: 50%; }
```

**Shimmer > Pulse.** Users perceive shimmer as faster and more professional.

---

## 7.3 Progress Bar

```css
progress { width: 100%; height: 6px; border-radius: 3px; }
progress::-webkit-progress-value {
  background: linear-gradient(90deg, #3498db, #2ecc71); border-radius: 3px;
  transition: width 300ms ease-out;
}
```

> ⚠️ Never stall at 99% — more anxiety than no bar at all. Always reach 100%.

---

## 7.4 Button Loading State

```css
.spinner-sm {
  width: 16px; height: 16px; border: 2px solid white;
  border-top-color: transparent; border-radius: 50%;
  animation: spin 500ms linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
.btn.loading { pointer-events: none; opacity: 0.7; }
```

---

## 7.5 Staggered Content Arrival

```css
.card { opacity: 0; transform: translateY(10px); animation: content-arrive 300ms ease-out both; }
.card:nth-child(1) { animation-delay: 0ms; }
.card:nth-child(2) { animation-delay: 80ms; }
.card:nth-child(3) { animation-delay: 160ms; }
@keyframes content-arrive { to { opacity: 1; transform: translateY(0); } }
```

---

## ⚡ Action Checklist
- [ ] Content-heavy pages: skeleton screens (shimmer) — never just a spinner
- [ ] Progress bars for measurable tasks — never stall at 99%
- [ ] Button loading: disable + spinner + "Submitting..." text
- [ ] Stagger content arrival after initial load (80ms delays)
