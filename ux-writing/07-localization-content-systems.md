# ✍️ 07 — Localization & Content Design Systems

> 🔴 Advanced | Prereq: 01 | ~4 min

Localization ≠ translation — it's cultural adaptation. Content design system = "design system" for words.

---

## 7.1 Localization vs Translation

| | Translation | Localization |
|---|------------|-------------|
| Focus | Words | Meaning + culture |
| Example | "Submit" → "Kirim" | "Like" → different per platform & culture |
| Unit | String by string | Context & flow |
| Goal | Understood | Feels natural |

---

## 7.2 Localization Rules

| # | Rule | Why |
|---|------|-----|
| 1 | Allow 30-50% text expansion | "Buy Now"(8) → "Jetzt kaufen"(13) in German (+62%) |
| 2 | Use placeholders, not concatenation | `"You have {count} messages."` not `"You have " + count + " messages."` |
| 3 | Avoid idioms & metaphors | "Hit the ground running" = untranslatable |
| 4 | Support RTL (Arabic, Hebrew, Urdu) | Layout mirrors: [Contact]...[Logo] |
| 5 | Avoid culture-specific icons | 🖐️ "thumbs up" = offensive in some Middle East regions |

---

## 7.3 Content Design System Architecture

```
├── PRINCIPLES: Voice chart + Tone mapping (per situation)
├── COMPONENTS: Buttons, Errors, Empty, Notifications, Forms
├── GLOSSARY: Standardized terminology + forbidden terms
└── LOCALIZATION: Locale rules + translation memory
```

### Glossary Example

| Term | Use | Don't Use |
|------|-----|-----------|
| Account | User account | ID, Profile |
| Order | Purchase order | Purchase, Booking |
| Cart | Shopping cart | Bag, Trolley |
| Wishlist | Saved items | Favorites, Bookmarks |

---

## ⚡ Action Checklist
- [ ] Design UI with 30-50% text expansion room for all labels/buttons
- [ ] Use `{placeholder}` syntax — never string concatenation
- [ ] Audit copy for idioms ("break a leg", "hit the ground running") → replace
- [ ] Test RTL layout if targeting Arabic/Hebrew/Urdu markets
- [ ] Build a glossary: 1 approved term per concept, document forbidden alternatives
