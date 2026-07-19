# 🔧 05 — Design System Extraction

> 🔴 Advanced | Prereq: 02, 03 | ~3 min

Extract design system from existing codebase → consolidate → tokens → scalable foundation.

---

## 5.1 Extraction Process

```
INVENTORY → ANALYZE → CONSOLIDATE → IMPLEMENT → DOCUMENT
```

### Red Flags (needs consolidation)
```
> 20 colors → no system (should be ~10-15)
> 8 font sizes → no type scale (should be 5-7)
Spacing not multiples of 4/8 → no spacing system
```

---

## 5.2 Scan + Consolidate Example

```javascript
// Scan CSS for all unique values
const colors = new Set(); const spacings = new Set();
// ... regex scan ...
// Output: 23 colors → consolidate to 11 (neuts + primary + error + success + warning)
// 15 spacing values → consolidate to 8 (4,8,12,16,24,32,48,64)
```

---

## 5.3 Token Output

```css
:root {
  --color-primary: #6366F1; --color-error: #EF4444; --color-success: #22C55E;
  --color-neutral-50: #F8FAFC; --color-neutral-600: #475569; --color-black: #0F172A;
  --text-xs: 0.75rem; --text-base: 1rem; --text-xl: 1.563rem; --text-3xl: 2.441rem;
  --space-1: 4px; --space-2: 8px; --space-4: 16px; --space-6: 24px; --space-12: 48px;
  --radius-sm: 4px; --radius-md: 8px; --radius-lg: 16px; --radius-full: 9999px;
  --z-dropdown: 100; --z-sticky: 200; --z-modal: 1000; --z-toast: 1100;
  --duration-fast: 150ms; --duration-normal: 300ms;
  --ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
  --bp-sm: 640px; --bp-md: 768px; --bp-lg: 1024px; --bp-xl: 1280px;
}
```

---

## 5.4 Migration Rules

| Rule | Detail |
|------|--------|
| Backup first | `git commit` before mass replace |
| One token type at a time | Colors → test → fonts → test → spacing → test |
| Context matters | "4px" in margin = `--space-1`, in border-radius = `--radius-sm` |
| Round to nearest token | 13px → 12px or 16px, document exceptions |
| Don't force it | If value truly unique, document as exception |

---

## ⚡ Action Checklist
- [ ] Scan codebase: count unique colors, font sizes, spacing values
- [ ] Consolidate: merge duplicates, round to 8px scale, define tokens
- [ ] Migrate one token type at a time with visual regression testing
