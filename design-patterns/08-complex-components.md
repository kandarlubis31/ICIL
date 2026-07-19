# 🧩 08 — Complex Components

> 🔴 Advanced | Prereq: 01, 02 | ~4 min

Transfer lists, drag-and-drop, rich text editors, combo boxes, tree views, kanban.

---

## 8.1 Component Catalog

| Component | Best For | ❌ Avoid |
|-----------|----------|---------|
| **Transfer List** | Select + order from 10+ items, permissions | < 10 items (use checkboxes) |
| **Drag & Drop** | Visual reorder | When keyboard alternative not provided |
| **Rich Text Editor** | User needs formatting (bold, list, link) | Simple input (use textarea) |
| **Combo Box** | Searchable select 20+ items | < 20 items (use dropdown) |
| **Tree View** | Hierarchical data (folders, categories) | Flat data |
| **Timeline** | Sequential events (order tracking, logs) | Non-chronological data |
| **Kanban** | Workflow stages (project, CRM) | Simple to-do lists |
| **Split Button** | 1 default action + 2-3 variants | > 3 variants |

---

## 8.2 Drag & Drop — Accessibility Required

```javascript
<div ondrop="handleDrop(event)" ondragover="allowDrop(event)">
  <div draggable="true" ondragstart="handleDrag(event)">Item 1 ⋮⋮</div>
</div>
```

**Non-negotiable**: ALWAYS provide keyboard alternative (Move Up/Down buttons). Drag handle = ⋮⋮ icon. Highlight drop zone on hover.

---

## 8.3 Rich Text Editor Tools

TipTap, Quill, Slate, Lexical, ProseMirror.

---

## 8.4 Kanban Structure

```
TO DO          IN PROGRESS        DONE
[Card 1]       [Card 3]          [Card 5]
[Card 2]
```

Drag between columns. For: project management, CRM pipeline, sprint tracking.

---

## ⚡ Action Checklist
- [ ] Drag & drop: always provide keyboard alternative (move up/down)
- [ ] Combo box: use when 20+ options + user may need free-text input
- [ ] Transfer list: only for 10+ items — never below
- [ ] Rich text: TipTap or Slate for modern web, Quill for quick setup
- [ ] Kanban: 3-5 columns max, clear drag drop zones between columns
