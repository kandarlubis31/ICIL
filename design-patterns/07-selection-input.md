# 🧩 07 — Selection & Input Patterns

> 🟡 Intermediate | Prereq: — | ~3 min

Radio, checkbox, toggle, dropdown, slider — each has rules. Wrong control = frustration.

---

## 7.1 Radio vs Checkbox vs Toggle

| | Radio | Checkbox | Toggle |
|---|-------|----------|--------|
| Selection | Exactly 1 | 0, 1, or many | Binary on/off |
| Apply | On form submit | On form submit | **Immediately** |
| Options | 2-6 visible | Any count | 1 (itself) |

---

## 7.2 Rules Per Control

### Radio Buttons
```html
<fieldset>
  <legend>Plan</legend>
  <label><input type="radio" name="plan" value="basic" checked> Basic</label>
  <label><input type="radio" name="plan" value="pro"> Pro</label>
</fieldset>
```
✅ Always default selected  |  ✅ 2-6 options  |  ✅ Vertical > horizontal  |  > 6 → use dropdown

### Checkboxes
✅ Positive wording ("Send newsletter")  |  ❌ NEVER pre-check marketing consent (illegal under GDPR)

### Toggle
✅ Immediate effect (no save click)  |  ✅ Binary state only  |  ❌ Don't use inside forms (use checkbox instead)

### Dropdown
✅ 6+ options (< 6 → radio)  |  ✅ Add search for 20+ options  |  ❌ Never for < 5 options

---

## 7.3 Decision Matrix

| Need | Control |
|------|---------|
| Pick 1 of 2-6 | **Radio buttons** |
| Pick 1 of 7+ | **Dropdown** (with search if 20+) |
| Pick 0-N | **Checkboxes** |
| On/Off immediate | **Toggle switch** |
| Numeric range | **Slider + text input** |

---

## ⚡ Action Checklist
- [ ] Radio: always default selected, vertical layout, 2-6 options
- [ ] Toggle: immediate effect — never inside forms requiring submit
- [ ] Dropdown: 6+ options only, add search at 20+
- [ ] Checkboxes: positive wording, never pre-check marketing consent
