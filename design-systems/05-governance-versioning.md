# 🛠️ 05 — Design System Governance & Versioning

> **Level: 🔴 Advanced** | Prerequisite: 01, 03 | Est. reading time: 14 min

A design system without governance is a suggestion box. Governance is what makes the system authoritative: who can change what, how changes are proposed and reviewed, and how the system evolves without breaking consumers. This course covers semantic versioning, contribution workflows, RFCs, and deprecation strategies.

---

## 5.1 Semantic Versioning for Design Systems

**SemVer** (MAJOR.MINOR.PATCH) applies to design systems — but "breaking change" means something different here:

```
DESIGN SYSTEM SEMVER:

  PATCH (1.0.0 → 1.0.1)    MINOR (1.0.0 → 1.1.0)       MAJOR (1.0.0 → 2.0.0)
  │ Bug fixes only    │    │ New features,         │    │ BREAKING CHANGES:    │
  │                   │    │ backward-compatible   │    │                      │
  │ • Fix token value │    │                       │    │ • Remove component   │
  │ • Fix a11y bug   │    │ • New component       │    │ • Remove prop        │
  │ • Fix CSS glitch │    │ • New variant         │    │ • Change prop type   │
  │                   │    │ • New token added     │    │ • Change default     │
  │ No consumer action │    │ • Deprecation warning │    │ • Visual breaking    │
  │ required          │    │   (not removal)       │    │   change to defaults │
                           │ Consumers should      │    │ Consumers MUST update │
                           │ test, but won't break │    │ their code to upgrade │
```

### What Counts as a BREAKING CHANGE in a Design System:

| Change | Is It Breaking? | Why |
|--------|----------------|-----|
| Remove a component | ✅ BREAKING | Import fails, app crashes |
| Remove a prop | ✅ BREAKING | TypeScript error, undefined behavior |
| Change a prop type (string → enum) | ✅ BREAKING | Compile error |
| Change a prop's default value | ✅ BREAKING | Visual regression without code change |
| Change visual appearance significantly | ⚠️ Possibly | If it breaks layout or user expectations |
| Add a new component | ✅ SAFE (minor) | No existing code affected |
| Add a new prop | ✅ SAFE (minor) | Existing code still works |
| Add a new variant | ✅ SAFE (minor) | Existing variants unchanged |
| Deprecate (but not remove) a prop | ✅ SAFE (minor) | Warning only; still works |
| Fix a visual bug | ✅ SAFE (patch) | Restoring intended behavior |

```javascript
// Automated breaking change detection in CI/CD
function detectBreakingChanges(oldAPI, newAPI) {
  const breaking = [];
  
  // Removed components
  for (const comp of Object.keys(oldAPI.components)) {
    if (!newAPI.components[comp]) breaking.push(`REMOVED: ${comp}`);
  }
  
  // Removed or changed props
  for (const [comp, props] of Object.entries(oldAPI.components)) {
    if (!newAPI.components[comp]) continue;
    for (const [prop, type] of Object.entries(props)) {
      if (!newAPI.components[comp][prop]) {
        breaking.push(`REMOVED PROP: ${comp}.${prop}`);
      } else if (newAPI.components[comp][prop] !== type) {
        breaking.push(`CHANGED TYPE: ${comp}.${prop} (${type} → ${newAPI.components[comp][prop]})`);
      }
    }
  }
  
  return breaking;
}
```

---

## 5.2 The Contribution Workflow

A healthy design system accepts contributions from product teams. But without a structured workflow, it becomes chaos:

```
CONTRIBUTION LIFECYCLE:

  │  PROPOSE │───▶│  REVIEW  │───▶│  BUILD   │───▶│ RELEASE  │───▶│  ADOPT   │
  Issue / RFC     DS team +         PR merged       Version         Teams
  filed with      stakeholders      + tests         published       upgrade
  use cases       review            pass            + changelog     + celebrate
```

### The RFC (Request for Comments) Template:

```markdown
# RFC: [Component Name]

## Problem
What user need is not being met by the current system?
_Source: 14 product teams have built custom date pickers this quarter._

## Proposed Solution
Add `<DatePicker>` to the design system.
- Single date, date range, and month picker variants
- Keyboard-navigable, WCAG 2.1 AA compliant
- Supports i18n (locale-aware formatting)

## API Design
\`\`\`tsx
<DatePicker
  mode="single" | "range" | "month"
  value={date}
  onChange={(date) => {}}
  minDate={new Date('2020-01-01')}
  maxDate={new Date('2030-12-31')}
  locale="en-US"
/>
\`\`\`

## Alternatives Considered
1. Use a third-party library (rejected: adds dependency, inconsistent look)
2. Extend native `<input type="date">` (rejected: limited styling, no range support)

## Migration Path
New component. No migration needed. Optional adoption.

## Timeline
Design: 1 sprint | Build: 1 sprint | Docs: 0.5 sprint | Total: 2.5 sprints
```

---

## 5.3 Governance Roles & Permissions

| Role | Who | Can Do |
|------|-----|--------|
| **Maintainer** | Design system team members | Merge PRs, publish releases, approve RFCs |
| **Contributor** | Any product team engineer/designer | Open issues, submit PRs, propose RFCs |
| **Reviewer** | Subject matter experts (a11y, i18n, performance) | Review RFCs in their domain before maintainer approval |
| **Consumer** | Everyone using the system | File bugs, request features, provide feedback |

---

## 5.4 Deprecation Strategy

Removing something is harder than adding it. The deprecation lifecycle gives consumers time to migrate:

```
DEPRECATION LIFECYCLE (minimum 2 major versions):

  v1.5.0: DEPRECATE — Console warning appears: "Button 'type' prop is deprecated. Use 'variant' instead. Will be removed in v3.0.0."
  
  v2.0.0: DEPRECATED — Still works, still warns. Changelog highlights migration path.
  
  v3.0.0: REMOVED — Breaking change. Consumers who ignored warnings must now migrate.
```

```typescript
// Deprecation utility: warns consumers without breaking them
function deprecated(propName: string, replacement: string, since: string, removeIn: string) {
  if (process.env.NODE_ENV === 'development') {
    console.warn(
      `[DS] "${propName}" is deprecated since v${since}. ` +
      `Use "${replacement}" instead. ` +
      `Will be removed in v${removeIn}.`
    );
  }
}

// Usage in component
function Button({ type, variant, ...props }: ButtonProps) {
  if (type) {
    deprecated('type', 'variant', '1.5.0', '3.0.0');
    // Map old prop to new prop so it still works
    variant = type === 'blue' ? 'primary' : type === 'red' ? 'danger' : 'secondary';
  }
  return <button className={`ds-button ds-button--${variant}`} {...props} />;
}
```

### Deprecation Checklist:

- [ ] Console warning with migration path and removal version
- [ ] Changelog entry: "Deprecated: X → Use Y instead"
- [ ] Documentation updated: old prop removed from examples, migration guide added
- [ ] Codemod prepared (optional but ideal): automated migration script
- [ ] Slack/email announcement to consumer teams
- [ ] Minimum 1 major version before removal

---

## 5.5 Changelog That Developers Actually Read

```markdown
# @acme/ds v2.3.0

## 🚨 Breaking Changes (v2.3.0)
- **Modal**: `title` prop renamed to `heading`. Update: find-and-replace `title={` → `heading={`.
- **Table**: `columns` prop now requires `accessor` instead of `key`. See migration guide.

## ✨ New
- **DatePicker**: New component for single date, date range, and month selection.
- **Button**: Added `loading` state with spinner animation.
- **Tokens**: Added `--ds-color-status-info` and `--ds-color-status-success`.

## 🔧 Fixed
- **Select**: Dropdown now closes on Escape key (a11y).
- **Tooltip**: No longer overflows viewport on edge placements.

## ⚠️ Deprecated
- **Button**: `type` prop deprecated. Use `variant` instead. Will be removed in v3.0.0.
- **Card**: `elevation` prop deprecated. Use `shadow` instead.

## 📦 Migration
See full migration guide: https://ds.acme.com/migrations/v2.3.0
```

---

## Quick Summary

| Concept | Key Takeaway |
|---------|-------------|
| **SemVer for DS** | MAJOR = breaking (remove component/prop, change type/default). MINOR = additions. PATCH = bug fixes. |
| **RFC process** | Problem → Proposed solution → API design → Alternatives → Migration path → Timeline. |
| **Governance roles** | Maintainer (merge/release), Contributor (submit), Reviewer (domain expert), Consumer (use/feedback). |
| **Deprecation** | 3-version lifecycle: Deprecate (warn) → Deprecated (still works) → Removed (breaking). At least 1 major version. |
| **Changelog** | Breaking first, then New, Fixed, Deprecated. Migration guide linked. Readable, not just commit logs. |
