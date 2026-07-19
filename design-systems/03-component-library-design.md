# 🛠️ 03 — Component Library Design

> **Level: 🟡 Intermediate** | Prerequisite: 01, 02 | Est. reading time: 14 min

Components are the most visible layer of a design system. But a great component library is defined by what users *don't* see: the API design, the variant system, the composition model, and the documentation that makes everything discoverable. This course covers how to design components that teams actually want to use.

---

## 3.1 Component API Design Principles

A component API is the contract between the library and its consumers. Get it wrong and every usage feels like a workaround.

| Principle | Good API | Bad API |
|-----------|----------|---------|
| **Predictable** | `<Button variant="primary" size="md">` | `<Button type="blue-big">` |
| **Composable** | `<Card><Card.Header/><Card.Body/></Card>` | `<Card title="" body="" footer=""/>` (props overload) |
| **Degrade gracefully** | Missing `icon` prop → renders without icon | Missing `icon` prop → crashes |
| **Minimal surface area** | 5 props that cover 95% of use cases | 47 props including `customPaddingBottomLeft` |
| **Consistent across components** | All components use `size="sm|md|lg"` | Button uses `size`, Input uses `dimension`, Card uses `scale` |

### The Props Interface:

```typescript
// Good component API — minimal, predictable, type-safe
interface ButtonProps {
  /** Visual variant — defaults to 'primary' */
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  /** Size — defaults to 'md' */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the button is in a loading state */
  loading?: boolean;
  /** Icon to display before the label */
  iconLeft?: React.ReactNode;
  /** Icon to display after the label */
  iconRight?: React.ReactNode;
  /** Disables the button */
  disabled?: boolean;
  /** Button label */
  children: React.ReactNode;
  /** Click handler */
  onClick?: () => void;
}

// BAD: Inconsistent, overloaded, confusing
interface BadButtonProps {
  color?: string;           // 'blue', 'red', '#4C78A8'? Which? How?
  big?: boolean;            // boolean for size = only two sizes, not extensible
  small?: boolean;          // conflicts with big — what if both true?
  text?: string;            // Is this the label? Or a tooltip?
  icon?: string;            // String path? React node? URL?
  customClass?: string;     // Escape hatch becomes the main pattern
}
```

---

## 3.2 Variant & State Matrix

Every component has variants (intentional alternatives) and states (system/user-triggered conditions):

```
BUTTON VARIANT × STATE MATRIX:

                │ Default │ Hover  │ Active │ Focus  │ Disabled │ Loading │
  Primary       │  ✓      │  ✓     │  ✓     │  ✓     │  ✓       │  ✓      │
  Secondary     │  ✓      │  ✓     │  ✓     │  ✓     │  ✓       │  ✓      │
  Danger        │  ✓      │  ✓     │  ✓     │  ✓     │  ✓       │  ✓      │
  Ghost         │  ✓      │  ✓     │  ✓     │  ✓     │  ✓       │  ✓      │
  Link          │  ✓      │  ✓     │  ✓     │  ✓     │  ✓       │  ✗      │
  Every intersection marked ✓ must be designed and implemented.
  Marked ✗ = explicitly unsupported (Link variant doesn't support loading).
```

```css
/* Variant + State: one CSS architecture */
.ds-button {
  /* Base: shared across ALL variants */
  display: inline-flex; align-items: center; gap: var(--ds-space-2);
  font-family: var(--ds-font-family); font-weight: 600;
  border-radius: var(--ds-radius-md); cursor: pointer;
  transition: background 0.15s, box-shadow 0.15s;
  
  /* Size variants */
  &.ds-button--sm { padding: var(--ds-space-1) var(--ds-space-3); font-size: var(--ds-font-size-sm); }
  &.ds-button--md { padding: var(--ds-space-2) var(--ds-space-4); font-size: var(--ds-font-size-base); }
  &.ds-button--lg { padding: var(--ds-space-3) var(--ds-space-6); font-size: var(--ds-font-size-lg); }
  
  /* Color variants */
  &.ds-button--primary { background: var(--ds-color-primary); color: white; }
  &.ds-button--primary:hover { background: var(--ds-color-primary-600); }
  &.ds-button--secondary { background: transparent; color: var(--ds-color-primary); border: 1px solid var(--ds-color-primary); }
  &.ds-button--danger { background: var(--ds-color-danger); color: white; }
  
  /* States */
  &:focus-visible { outline: 2px solid var(--ds-color-focus); outline-offset: 2px; }
  &:disabled { opacity: 0.4; cursor: not-allowed; }
  
  /* Loading */
  &.ds-button--loading { position: relative; color: transparent; }
  &.ds-button--loading::after {
    content: ''; position: absolute; width: 16px; height: 16px;
    border: 2px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }
}
@keyframes spin { to { transform: rotate(360deg); } }
```

---

## 3.3 Composition Patterns

Two dominant patterns for composing complex components:

### Pattern 1: Compound Components (React/Vue)

```jsx
// Compound: the parent manages state; children are dumb layout pieces
<Card>
  <Card.Header>
    <Card.Title>Revenue Overview</Card.Title>
    <Card.Actions><Button variant="ghost">Export</Button></Card.Actions>
  </Card.Header>
  <Card.Body>
    <Chart data={revenueData} />
  </Card.Body>
  <Card.Footer>
    <Text size="sm" color="secondary">Updated 5 minutes ago</Text>
  </Card.Footer>
</Card>
```

### Pattern 2: Slot Pattern (Web Components / Framework-agnostic)

```html
<!-- Slot: named slots for content injection — works in any framework -->
<ds-card>
  <img slot="media" src="chart.png" alt="Revenue chart" />
  <h3 slot="title">Revenue Overview</h3>
  <p slot="description">Monthly revenue trends across all regions</p>
  <ds-button slot="actions" variant="primary">View Details</ds-button>
</ds-card>
```

```javascript
// Slot-based component with Shadow DOM
class DsCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>/* encapsulated styles */</style>
      <div class="card">
        <div class="card__media"><slot name="media"></slot></div>
        <div class="card__header"><slot name="title"></slot><slot name="description"></slot></div>
        <div class="card__actions"><slot name="actions"></slot></div>
      </div>
    `;
  }
}
customElements.define('ds-card', DsCard);
```

---

## 3.4 The Documentation Layer

A component without documentation is not a component — it's source code. Every component needs:

```markdown
# Button

Buttons trigger actions. Use for submitting forms, opening modals, 
or navigating between pages.

## When to use
- Submitting a form
- Triggering an immediate action (delete, save, send)
- Navigating to a new page or view

## When NOT to use
- Navigating within the same page (use `<Link>`)
- Toggling state (use `<Toggle>` or `<Switch>`)

## Variants

| Variant | Usage |
|---------|-------|
| Primary | Main call-to-action. One per page section. |
| Secondary | Alternative action. Pairs with Primary. |
| Danger | Destructive actions: delete, remove, reset. |
| Ghost | Low-emphasis actions in dense UIs. |
| Link | Actions that look like text links. |

## Live Preview
<Playground>
  <Button variant="primary">Save Changes</Button>
  <Button variant="secondary">Cancel</Button>
  <Button variant="danger" iconLeft={<TrashIcon/>}>Delete</Button>
</Playground>

## Accessibility
- Focusable via keyboard (Tab)
- Activates on Enter and Space
- Uses `role="button"` or native `<button>` element
- Loading state announces to screen readers via `aria-busy="true"`
```

---

## 3.5 Choosing a Component Library Strategy

| Strategy | Best For | Framework | Example |
|----------|----------|-----------|---------|
| **CSS-only** | Framework-agnostic, simplest | Any | Tailwind UI, Flowbite |
| **Headless primitives** | Custom design, full a11y | React/Vue/Svelte | Radix UI, Headless UI, Ark UI |
| **Full component library** | Ready-to-use, opinionated | Framework-specific | MUI, Ant Design, Chakra UI |
| **Copy-paste** | Maximum control, no dependency | Any | shadcn/ui |
| **Web Components** | Framework-agnostic, encapsulated | Any (native) | Shoelace, Spectrum Web Components |

> **Recommendation**: Headless primitives (Radix/Ark) + custom tokens + Tailwind = the sweet spot for most teams. Full accessibility without design lock-in.

---

## Quick Summary

| Concept | Key Takeaway |
|---------|-------------|
| **API design** | Predictable, composable, minimal surface area. `size="sm|md|lg"` across all components. |
| **Variant × State matrix** | Map every intersection. Missing state = broken component at runtime. |
| **Composition** | Compound components (React) or slots (Web Components). Not props overload. |
| **Documentation** | When to use, when NOT to use, variants table, live playground, accessibility notes. |
| **Strategy** | Headless primitives (a11y built-in) + custom tokens (brand freedom) = best balance. |
