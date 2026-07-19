# 🛠️ 02 — Design Tokens Architecture

> **Level: 🟡 Intermediate** | Prerequisite: 01 | Est. reading time: 14 min

Design tokens are the atomic layer of a design system — the platform-agnostic representation of every visual design decision. A well-architected token system makes the difference between a fragile style guide and a scalable design language. This course covers token hierarchy, naming conventions, the W3C DTCG spec, and multi-platform output.

---

## 2.1 What Are Design Tokens?

**Jina Anne** (2014–2015, at Salesforce Lightning Design System) popularized the concept. A design token is a named, typed value that represents a design decision:

```
COLOR TOKEN EXAMPLE:
  --color-primary-500: #4C78A8
  
  NOT: "just a CSS variable"
  BUT: "a design decision encoded as data, consumed by ANY platform"
```

### Token ≠ CSS Variable:

| Aspect | CSS Custom Property | Design Token |
|--------|-------------------|--------------|
| **Scope** | CSS only | Platform-agnostic (CSS, iOS, Android, Figma, docs) |
| **Format** | `--key: value` | JSON/YAML, then transformed to platform-specific output |
| **Tooling** | Browser only | Style Dictionary, Tokens Studio, Specify, Knapsack |
| **Type safety** | None | Typed: color, dimension, duration, fontFamily, etc. |
| **Alias support** | `var(--other)` | First-class alias/reference resolution |

---

## 2.2 Token Tier Hierarchy

Every design system should have at least three tiers of tokens. Four is ideal for advanced systems.

```
TIER 1: GLOBAL TOKENS (Primitive / Base)
  │ Raw values. Named by what they   │
  │ ARE, not how they're used.       │
  │ --color-blue-500: #4C78A8        │
  │ --color-red-500: #E15759         │
  │ --space-4: 16px                  │
  │ --font-size-16: 1rem             │
              ↓ referenced by
TIER 2: SEMANTIC TOKENS (Alias / Purpose)
  │ Purpose-based names. Named by    │
  │ HOW they're used.                │
  │ --color-primary: {blue.500}      │
  │ --color-danger: {red.500}        │
  │ --space-md: {space.4}            │
  │ --font-size-body: {font-size.16} │
              ↓ referenced by
TIER 3: COMPONENT TOKENS
  │ Component-scoped tokens. Linked  │
  │ to a specific component.         │
  │ --button-primary-bg: {primary}   │
  │ --button-primary-text: {white}   │
  │ --card-padding: {space.4}        │
              ↓ optional
TIER 4: RECIPE TOKENS (Advanced)
  │ Composite tokens bundling        │
  │ multiple values for variant sets.│
  │ --button-primary: {              │
  │   bg: {primary},                 │
  │   text: {white},                 │
  │   border: {primary-700}          │
  │ }                                │
```

### Why Three Tiers Matter:

```
WITHOUT SEMANTIC LAYER (fragile):
  .card { background: var(--color-blue-500); }
  // "We're rebranding from blue to teal"
  // → Must find and replace EVERY --color-blue-500 reference in your codebase

WITH SEMANTIC LAYER (resilient):
  :root { --color-primary: var(--color-blue-500); }
  .card { background: var(--color-primary); }
  // "We're rebranding from blue to teal"
  // → Change ONE line:
  :root { --color-primary: var(--color-teal-500); }
  // Everything referencing --color-primary updates automatically
```

---

## 2.3 Token Naming Convention

The W3C Design Tokens Community Group (DTCG) has standardized a naming format:

```
FORMAT: namespace.group.category.item.variant.state

  --ds-color-background-primary-default
    │   │     │            │        └─ State: default, hover, active, disabled
    │   │     │            └─ Variant: primary, secondary, danger, ghost
    │   │     └─ Category: background, text, border, icon, surface
    │   └─ Group: color, space, font, radius, shadow, duration
    └─ Namespace: ds (design system), brand, product
```

### Practical Token Taxonomy:

```json
{
  "color": {
    "text": {
      "primary": { "$value": "{color.neutral.900}" },
      "secondary": { "$value": "{color.neutral.600}" },
      "disabled": { "$value": "{color.neutral.400}" },
      "inverse": { "$value": "{color.white}" },
      "link": { "$value": "{color.blue.600}" }
    },
    "background": {
      "page": { "$value": "{color.white}" },
      "surface": { "$value": "{color.neutral.50}" },
      "overlay": { "$value": "rgba(0, 0, 0, 0.5)" }
    },
    "border": {
      "default": { "$value": "{color.neutral.200}" },
      "focus": { "$value": "{color.blue.500}" }
    },
    "status": {
      "success": { "$value": "{color.green.600}" },
      "warning": { "$value": "{color.amber.500}" },
      "error": { "$value": "{color.red.600}" }
    }
  },
  "space": {
    "0": { "$value": "0px" },
    "1": { "$value": "4px" },
    "2": { "$value": "8px" },
    "3": { "$value": "12px" },
    "4": { "$value": "16px" },
    "5": { "$value": "24px" },
    "6": { "$value": "32px" },
    "8": { "$value": "48px" },
    "10": { "$value": "64px" }
  },
  "fontSize": {
    "xs": { "$value": "0.75rem" },
    "sm": { "$value": "0.875rem" },
    "base": { "$value": "1rem" },
    "lg": { "$value": "1.125rem" },
    "xl": { "$value": "1.25rem" },
    "2xl": { "$value": "1.5rem" },
    "3xl": { "$value": "1.875rem" },
    "4xl": { "$value": "2.25rem" }
  },
  "radius": {
    "none": { "$value": "0px" },
    "sm": { "$value": "4px" },
    "md": { "$value": "8px" },
    "lg": { "$value": "12px" },
    "full": { "$value": "9999px" }
  },
  "shadow": {
    "sm": { "$value": "0 1px 2px rgba(0,0,0,0.05)" },
    "md": { "$value": "0 4px 6px rgba(0,0,0,0.07)" },
    "lg": { "$value": "0 10px 25px rgba(0,0,0,0.1)" }
  }
}
```

---

## 2.4 Token Naming Conventions Comparison

| System | Pattern | Example | Pros | Cons |
|--------|---------|---------|------|------|
| **Salesforce (Lightning)** | `--prefix-category-variant-property` | `--lwc-colorBrandPrimary` | Mature, well-documented | CamelCase, verbose |
| **Material Design 3** | `md.sys.color.primary` | `md.sys.color.primary` | DTCG-aligned, dot notation | Deep nesting |
| **Tailwind** | `-` separator, utility-first | `bg-blue-500` | Familiar to devs, terse | Not semantic, color-tied |
| **Shopify Polaris** | `--p-category-property-variant` | `--p-color-bg-primary` | Clean, consistent | Flat structure |
| **Adobe Spectrum** | `--spectrum-global-color-` | `--spectrum-global-color-blue-500` | Comprehensive | Very verbose |

> **Recommendation**: Use `--ds-group-category-variant-state` with dot-path aliases for the W3C DTCG format. Keep names terse but descriptive.

---

## 2.5 Multi-Platform Token Output

Design tokens must output to every platform your product supports:

```
SOURCE OF TRUTH (token.json — W3C DTCG format)
          ├──→ CSS Custom Properties (.css)
          │     --ds-color-primary: #4C78A8;
          ├──→ SCSS Variables (.scss)  
          │     $ds-color-primary: #4C78A8;
          ├──→ JavaScript / TypeScript (.ts)
          │     export const colorPrimary = '#4C78A8';
          ├──→ iOS (Swift)
          │     static let colorPrimary = UIColor(hex: "#4C78A8")
          ├──→ Android (XML / Compose)
          │     <color name="ds_color_primary">#4C78A8</color>
          ├──→ Figma (via Tokens Studio plugin)
          │     Variable: color/primary = #4C78A8
          └──→ Documentation (Markdown / MDX)
                | Primary | `#4C78A8` | ![swatch](#4C78A8) |
```

### Style Dictionary — The Industry Standard Transformer:

```javascript
// build-tokens.js — Transform W3C DTCG tokens to all platform outputs
const StyleDictionary = require('style-dictionary');

const sd = StyleDictionary.extend({
  source: ['tokens/**/*.json'],                         // W3C DTCG token files
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'dist/css/',
      files: [{ destination: 'tokens.css', format: 'css/variables' }]
    },
    scss: {
      transformGroup: 'scss',
      buildPath: 'dist/scss/',
      files: [{ destination: 'tokens.scss', format: 'scss/variables' }]
    },
    js: {
      transformGroup: 'js',
      buildPath: 'dist/js/',
      files: [{ destination: 'tokens.js', format: 'javascript/es6' }]
    },
    ts: {
      transformGroup: 'js',
      buildPath: 'dist/ts/',
      files: [{
        destination: 'tokens.ts',
        format: 'typescript/es6-declarations'
      }]
    },
    figma: {
      transformGroup: 'figma',    // Custom transform for Tokens Studio format
      buildPath: 'dist/figma/',
      files: [{ destination: 'tokens.json', format: 'json/flat' }]
    }
  }
});

sd.buildAllPlatforms();
```

---

## 2.6 Token Anti-Patterns to Avoid

| Anti-Pattern | Why It's Bad | The Fix |
|-------------|-------------|---------|
| **One tier only** | No semantic layer = every rebrand requires 1000s of changes | Always use Global → Semantic → Component tiers |
| **Color by name** | `--blue-500` is not `blue-500` after rebrand | Use semantic names: `--color-primary` |
| **Magic numbers** | `padding: 13px` — where did 13 come from? | Use token: `padding: var(--ds-space-3)` |
| **Inconsistent scales** | 12px here, 14px there, 13px over there | Define a strict spacing scale: 4, 8, 12, 16, 24, 32, 48 |
| **Unused tokens** | Token file has 400 tokens; 200 are unused | Audit quarterly; remove unreferenced tokens |
| **Deep aliasing** | `a → b → c → d → e` (5 levels deep) | Max 2 levels of alias: component → semantic → global |

---

## Quick Summary

| Concept | Key Takeaway |
|---------|-------------|
| **Token definition** | Platform-agnostic, typed design decision. Not just CSS variables — the source of truth. |
| **Three tiers** | Global (raw values) → Semantic (purpose-named) → Component (scoped). Always all three. |
| **W3C DTCG** | Standardized token format. `{ "$value": "#4C78A8", "$type": "color" }` |
| **Naming** | `--ds-category-group-variant-state`. Terse, consistent, predictable. |
| **Style Dictionary** | De facto tool for transforming tokens → CSS/SCSS/JS/TS/Swift/Android/Figma. |
| **Anti-patterns** | One tier, color-by-name, magic numbers, deep aliasing. Audit quarterly. |
