# 🛠️ 04 — Figma Workflows & Design-to-Code

> **Level: 🟡 Intermediate** | Prerequisite: 02 | Est. reading time: 13 min

Figma is the de facto design tool for digital products. But Figma files rot without disciplined workflows connecting them to the codebase. This course covers Figma variables & styles, design token synchronization, Dev Mode, the plugin ecosystem, and patterns for keeping design and code in sync.

---

## 4.1 Figma Variables → Design Tokens

Figma Variables (June 2023) finally brought proper design token support. But they need to flow bidirectionally with code:

```
THE IDEAL FLOW:

  CODE (Source of Truth)              FIGMA (Design Canvas)
  │ tokens/color.json   │────sync───▶│ Figma Variables     │
  │ tokens/space.json   │            │ color/primary/500   │
  │ tokens/font.json    │            │ space/4             │
  └─────────────────────┘            │ fontSize/base       │
           │ build                            │
           ▼                                  ▼
  │ dist/css/tokens.css │            │ Components use      │
  │ dist/js/tokens.ts   │            │ variables directly  │
  │ Component code      │            │ (no hardcoded hex)  │
```

### Figma Variable Scoping:

| Variable Type | Maps to Token | Figma Scope |
|--------------|---------------|-------------|
| **Color** | `--ds-color-*` | Fill, stroke, text fill |
| **Number** | `--ds-space-*`, `--ds-radius-*` | Corner radius, padding, gap |
| **String** | `--ds-font-family` | Font family |
| **Boolean** | Toggle states | Visibility, enable/disable |

```json
// Tokens Studio for Figma — token JSON that syncs bidirectionally
{
  "color": {
    "primary": {
      "500": {
        "value": "#4C78A8",
        "type": "color",
        "description": "Primary brand color — main actions, links"
      }
    }
  },
  "spacing": {
    "4": {
      "value": "16px",
      "type": "spacing"
    }
  }
}
```

---

## 4.2 The Design-to-Code Pipeline

### Route 1: Manual Handoff (Current State for Most Teams)

```
Designer builds in Figma → Shares link → Dev inspects → Dev writes code
  PROBLEMS:
  • Values get rounded: Figma says 13.5px → dev types 14px
  • Colors drift: #4C78A8 in Figma, #4B7AA9 in code
  • Spacing inconsistencies: "looks about right" vs token values
```

### Route 2: Dev Mode + Code Connect (Recommended)

```
1. DESIGNER: Builds with Figma Variables (not raw hex values)
2. FIGMA DEV MODE: Inspects component → shows token name, not raw value
   "color/primary/500" (not "#4C78A8")
3. FIGMA PLUGIN: Code Connect maps Figma component → code component
   <Button variant="primary"> in Figma → import { Button } from '@ds/react'
4. DEVELOPER: Copies component code directly from Figma
```

### Route 3: Automated Sync (Advanced)

```
Tokens JSON (Git) → CI/CD → Style Dictionary builds platforms
                              ├──→ CSS/JS/TS to npm
                              ├──→ Figma Variables via Tokens Studio Sync
                              ├──→ Documentation site rebuild
                              └──→ Slack notification: "Tokens updated in v2.3.0"
```

---

## 4.3 Figma Component Architecture

Structure your Figma library to mirror your code component hierarchy:

```
FIGMA FILE STRUCTURE:                    CODE STRUCTURE:
│ 📁 Foundations          │              │ @ds/tokens             │
│   ├ Colors              │              │   color.css            │
│   ├ Typography          │              │   space.css            │
│   ├ Spacing             │              │   typography.css       │
│   └ Shadows             │              └────────────────────────┘
│ 📁 Atoms                │              │ @ds/react              │
│   ├ Button              │              │   Button.tsx           │
│   ├ Input               │              │   Input.tsx            │
│   ├ Icon                │              │   Icon.tsx             │
│   └ Text                │              │   Text.tsx             │
│ 📁 Molecules            │              ┌────────────────────────┐
│   ├ FormField           │              │   FormField.tsx        │
│   ├ SearchBar           │              │   SearchBar.tsx        │
│   └ DataRow             │              │   DataRow.tsx          │
│ 📁 Organisms            │
│   ├ Navbar              │
│   ├ DataTable           │
│   └ Modal               │
```

### Figma Component Properties → Code Props:

```
FIGMA COMPONENT PROPERTIES must match CODE PROPS:

  Figma: Button
    ├── variant: primary | secondary | danger | ghost   ← matches code props
    ├── size: sm | md | lg
    ├── iconLeft: true/false
    ├── iconRight: true/false
    ├── state: default | hover | active | focus | disabled | loading
    └── label: text

  Code: <Button variant="primary" size="md" iconLeft={<Icon/>}>
```

---

## 4.4 Essential Figma Plugins for Design Systems

| Plugin | Purpose | Must-Have? |
|--------|---------|-----------|
| **Tokens Studio** | Sync design tokens with Figma Variables. Supports W3C DTCG, GitHub sync. | ✅ Yes |
| **Figma to Code** (Dev Mode) | Inspect components, copy as JSX/HTML/CSS. Code Connect for component mapping. | ✅ Yes |
| **Design Lint** | Find missing styles, inconsistent spacing, detached components. | 🟡 Highly recommended |
| **Stark** | Accessibility checker: contrast, colorblind simulation, focus order. | 🟡 Highly recommended |
| **EightShapes Specs** | Auto-generate redline specs from components. | 🔵 Optional |
| **Automator** | Batch operations: rename layers, apply styles, generate variants. | 🔵 Optional |
| **Contrast** | Quick WCAG contrast check between any two layers. | 🟡 Highly recommended |

---

## 4.5 Design Handoff Checklist

Before handing off a component to development, verify:

| # | Check | Tool |
|---|-------|------|
| 1 | All colors use Figma Variables (not raw hex) | Variables panel |
| 2 | All text uses Text Styles (not manual overrides) | Text panel |
| 3 | Auto-layout is used for ALL frames | Inspect → Auto layout |
| 4 | Component has all variants defined as properties | Component properties |
| 5 | All states (hover, active, focus, disabled, loading) designed | Variant panel |
| 6 | Component name matches code component name | `Button` = `Button.tsx` |
| 7 | Responsive variants designed (or annotation for behavior) | Separate frames |
| 8 | Accessibility: contrast check passed | Stark plugin |
| 9 | Edge cases: empty state, long text, RTL | Separate frames |
| 10 | Dev Mode: Code Connect mapping is set up | Dev Mode panel |

---

## Quick Summary

| Concept | Key Takeaway |
|---------|-------------|
| **Figma Variables** | Map directly to design tokens. Never use raw hex in Figma components. |
| **Design-to-code** | Dev Mode + Code Connect = developer sees `<Button variant="primary">`, not raw CSS. |
| **File structure** | Mirror code: Foundations → Atoms → Molecules → Organisms. |
| **Tokens Studio** | Bidirectional sync: GitHub JSON ↔ Figma Variables. The essential plugin. |
| **Handoff checklist** | 10 checks before handoff. Variables, styles, auto-layout, states, a11y, edge cases. |
