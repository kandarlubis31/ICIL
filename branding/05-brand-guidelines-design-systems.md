# 🏷️ 05 — Brand Guidelines & Design Systems

> 🟡 Intermediate | Prereq: 02, 04 | ~4 min

Brand guidelines = brand constitution. Transforms subjective decisions into objective rules anyone can follow.

---

## 5.1 Guideline Structure (12 Sections)

```
1. Introduction     2. Brand Strategy     3. Verbal Identity
4. Logo             5. Color              6. Typography
7. Imagery          8. Layout & Grid      9. Components
10. Applications    11. Accessibility     12. Appendix
```

> Consistent brand presentation can drive **up to 33% revenue increase** (Lucidpress/Marq, 2019). However, only ~30% of organizations consistently enforce their brand guidelines.

---

## 5.2 The "Do / Don't" Section — Critical

```
✅ DO                    ❌ DON'T
Clean backgrounds        Add drop shadows
Maintain clear space      Overlap elements
Approved colors only      Recolor arbitrarily
Scale proportionally      Stretch or skew
Monochrome on photos      Full-color on busy bg
```

```css
.brand-logo { width: auto; height: var(--logo-height, 40px); }  /* Scale proportionally */
.brand-logo svg { filter: none !important; }                   /* No shadows */
```

---

## 5.3 Design Tokens — Bridge to Code

```
BRAND GUIDELINES → DESIGN TOKENS (JSON) → CSS / Figma / Components
```

```json
{
  "color": { "primary": {"value": "#6366F1"} },
  "typography": { "font-heading": {"value": "Inter, sans-serif"} },
  "spacing": { "md": {"value": "16px"} },
  "motion": { "ease-standard": {"value": "cubic-bezier(0.4, 0, 0.2, 1)"} }
}
```

```css
:root {
  --brand-primary: #6366F1;
  --brand-font-heading: "Inter", sans-serif;
  --brand-spacing-md: 16px;
  --brand-ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## 5.4 Multi-Format Delivery

```
BRAND PORTAL (web) → primary reference
  ├── FIGMA LIBRARY → designers (auto-updates)
  ├── TOKENS.JSON → developers (npm package)
  ├── PDF EXPORT → print partners
  └── API → AI agents (machine-readable)
```

---

## 5.5 Governance & Versioning

| Role | Responsibility |
|------|---------------|
| Brand Steward | Final say, guideline updates |
| Designers | Create compliant work |
| Developers | Implement tokens correctly |
| Agencies | Follow guidelines, submit for review |

```
v1.0 = Initial    v2.0 = Major (new logo/color)    v1.1 = Minor (additions)    v1.0.1 = Patch (fixes)
```

### Quarterly Audit
```
Collect samples → Compare to guidelines → Score compliance → Report → Fix deviations → Evolve
```

---

## ⚡ Action Checklist
- [ ] Build Do/Don't section with explicit visual examples for logo, color, typography
- [ ] Implement design tokens as single source of truth (JSON → CSS + Figma)
- [ ] Multi-format delivery: web portal + Figma + tokens.json + PDF
- [ ] Quarterly brand audit: score every touchpoint 1-10
