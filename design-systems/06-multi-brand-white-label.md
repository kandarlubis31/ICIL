# 🛠️ 06 — Multi-Brand & White-Label Systems

> **Level: 🔴 Advanced** | Prerequisite: 02, 03, 05 | Est. reading time: 13 min

One design system, multiple brands. This is the hardest scaling challenge in design systems — every token, component, and layout must support brand-specific overrides without forking the codebase. This course covers theming architecture, CSS custom property strategies, brand token layering, and white-label patterns.

---

## 6.1 The Multi-Brand Challenge

```
SINGLE-BRAND SYSTEM:                 MULTI-BRAND SYSTEM:
  One set of tokens                  Multiple brand layers on ONE codebase
  │ Brand A              │           │ Shared components (unchanged) │
  │ primary: #4C78A8     │           ├──────────────────────────────┤
  │ font: Inter          │           │ Brand A │ Brand B │ Brand C  │
  │ radius: 8px          │           │ #4C78A8 │ #E15759 │ #54A24B  │
  └─────────────────────┘           │ Inter   │ Roboto  │ Plex     │
                                     │ 8px     │ 4px     │ 0px      │
```

### The Architecture: Token Layering

```
TOKEN RESOLUTION ORDER (cascading like CSS):

  1. BASE TOKENS (default brand fallback)
     └── --ds-color-primary: #4C78A8;

  2. BRAND TOKENS (brand-specific overrides)
     └── [data-brand="acme"] { --ds-color-primary: #E15759; }

  3. COMPONENT TOKENS (always resolve to current brand)
     └── .ds-button--primary { background: var(--ds-color-primary); }
         ← This resolves to #E15759 for Acme, #4C78A8 for default
```

```css
/* Multi-brand architecture with CSS Custom Properties */
:root {
  /* BASE: Default brand (fallback for any unthemed brand) */
  --ds-color-primary: #4C78A8;
  --ds-color-primary-hover: #3D6A94;
  --ds-font-family: 'Inter', sans-serif;
  --ds-radius-md: 8px;
  --ds-space-4: 16px;
  --ds-shadow-md: 0 4px 6px rgba(0,0,0,0.07);
}

/* BRAND A: Acme Bank — conservative, blue, rounded */
[data-brand="acme"] {
  --ds-color-primary: #1A3B6B;
  --ds-color-primary-hover: #122A4F;
  --ds-font-family: 'Lexend', sans-serif;
  --ds-radius-md: 12px;
  --ds-shadow-md: 0 2px 8px rgba(26,59,107,0.1);
}

/* BRAND B: QuickMart — energetic, orange, sharp */
[data-brand="quickmart"] {
  --ds-color-primary: #F04A00;
  --ds-color-primary-hover: #CC3E00;
  --ds-font-family: 'DM Sans', sans-serif;
  --ds-radius-md: 4px;
  --ds-shadow-md: none;
}

/* BRAND C: ZenSpace — calm, green, soft */
[data-brand="zenspace"] {
  --ds-color-primary: #2E7D32;
  --ds-color-primary-hover: #1B5E20;
  --ds-font-family: 'Lora', serif;
  --ds-radius-md: 16px;
  --ds-shadow-md: 0 8px 30px rgba(46,125,50,0.08);
}
```

---

## 6.2 Brand Token Strategy

Not every token should vary by brand. Define which tokens are "brandable" and which are locked:

| Token Category | Brandable? | Rationale |
|---------------|-----------|-----------|
| **Color — Primary palette** | ✅ Yes | Core brand differentiation |
| **Color — Semantic** (success/warning/error) | 🔶 Sometimes | Danger red may vary subtly; success green is culturally flexible |
| **Font family** | ✅ Yes | Typography is core to brand identity |
| **Border radius** | ✅ Yes | Rounded vs sharp = distinct brand personality |
| **Spacing scale** | ❌ No | Consistency in density is a system value |
| **Font size scale** | ❌ No | Readability is universal |
| **Focus ring** | 🔶 Sometimes | Color may vary; thickness and offset should not |
| **Animation duration** | ❌ No | Consistent motion = consistent UX |
| **Breakpoints** | ❌ No | Responsive behavior is structural |
| **Shadow depth** | 🔶 Sometimes | Flat vs elevated aesthetic; keep structural shadows locked |

---

## 6.3 White-Label Architecture

A **white-label** system lets customers apply their own brand. This goes beyond internal multi-brand:

```
WHITE-LABEL FLOW:

  1. SYSTEM provides default theme
  2. CUSTOMER uploads brand config (JSON)
  3. JSON transforms to CSS custom properties
  4. Components inherit brand values via CSS variables
  5. Customer previews, iterates, publishes
```

```json
// Brand configuration uploaded by customer (self-serve theming)
{
  "brandId": "acme-corp",
  "brandName": "Acme Corporation",
  "theme": {
    "colors": {
      "primary": "#1A3B6B",
      "secondary": "#4A90D9",
      "background": "#FFFFFF",
      "surface": "#F5F7FA",
      "text": "#1A1A2E"
    },
    "typography": {
      "headingFont": "Lexend",
      "bodyFont": "Inter",
      "baseSize": 16
    },
    "shape": {
      "borderRadius": 12,
      "buttonShape": "rounded"
    },
    "logo": "https://cdn.acme.com/logo.svg"
  }
}
```

```javascript
// Theme engine: transforms customer config → CSS custom properties
function applyWhiteLabel(config) {
  const root = document.documentElement;
  
  // Colors
  Object.entries(config.theme.colors).forEach(([name, value]) => {
    root.style.setProperty(`--ds-color-${name}`, value);
    // Auto-generate hover (darken by 15%)
    root.style.setProperty(`--ds-color-${name}-hover`, darken(value, 0.85));
  });
  
  // Typography
  root.style.setProperty('--ds-font-family-heading', config.theme.typography.headingFont);
  root.style.setProperty('--ds-font-family-body', config.theme.typography.bodyFont);
  
  // Radius
  root.style.setProperty('--ds-radius-md', `${config.theme.shape.borderRadius}px`);
  
  // Set brand attribute for CSS selector targeting
  root.setAttribute('data-brand', config.brandId);
}
```

---

## 6.4 Theming Anti-Patterns

| Anti-Pattern | Why It Fails | The Fix |
|-------------|-------------|---------|
| **Per-brand CSS files** | `acme.css`, `quickmart.css` — duplication explodes with brands | CSS custom properties: one component file, injected brand layer |
| **Component-level theming** | `<Button brand="acme" variant="primary">` — every component knows about every brand | Components are brand-agnostic; only tokens vary |
| **Hardcoded brand values** | `if (brand === 'acme') return '#1A3B6B'` in component code | Tokens resolve via CSS variables, not JS |
| **No brand fallback** | Missing brand token = broken component | Every token has a base default value |
| **Too many brandable tokens** | 400 brandable tokens = impossible to theme consistently | 30-50 brandable tokens max: colors, fonts, radii |

---

## 6.5 Component Code: Brand-Agnostic by Design

```jsx
// ✅ Brand-agnostic component — works for ALL brands with zero changes
function Button({ variant = 'primary', size = 'md', children, ...props }) {
  return (
    <button
      className={`ds-button ds-button--${variant} ds-button--${size}`}
      {...props}
    >
      {children}
    </button>
  );
}

// ❌ Brand-aware component — breaks with every new brand
function BadButton({ brand, variant, size, children }) {
  const colors = {
    acme: { primary: '#1A3B6B', secondary: '#4A90D9' },
    quickmart: { primary: '#F04A00', secondary: '#FF6B35' },
    // Must update this map for EVERY new brand
  };
  // Anti-pattern: component knows about brands
  return <button style={{ background: colors[brand][variant] }}>{children}</button>;
}
```

---

## Quick Summary

| Concept | Key Takeaway |
|---------|-------------|
| **Architecture** | One codebase, brand layers via CSS custom properties. Components are brand-agnostic. |
| **Token layering** | Base tokens → Brand overrides via `[data-brand="X"]` → Component tokens resolve automatically. |
| **Brandable vs locked** | Colors, fonts, radii = brandable. Spacing, font sizes, breakpoints, durations = locked. |
| **White-label** | Customer uploads JSON → transforms to CSS variables → components inherit automatically. |
| **Component rule** | NEVER check `if (brand === 'X')` in component code. Tokens handle all variation. |
