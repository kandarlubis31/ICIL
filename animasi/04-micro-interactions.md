# ✨ 04 — Micro-interactions

> 🟡 Intermediate | Prereq: 01, 03 | ~4 min

Tiny functional animations that make interfaces feel responsive and alive. Button press, badge pop, pull-to-refresh — these define premium vs cheap.

---

## 4.1 Trigger → Rules → Feedback → Loops Model (Dan Saffer)

| Component | Definition | Example |
|-----------|-----------|---------|
| **Trigger** | What starts it | User clicks Like, system detects message |
| **Rules** | What happens | Increment count, toggle state |
| **Feedback** | What user sees/hears | Heart scales up, turns red, counter animates |
| **Loops** | Repeated behavior | Heart stays red; tapping again un-likes |

---

## 4.2 Five Essential Patterns

```css
/* Hover: card lifts */
.card { transition: transform 200ms ease-out, box-shadow 200ms ease-out; }
.card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.15); }

/* Press: button squishes */
.button:active { transform: scale(0.96); transition: transform 100ms ease-out; }

/* Swipe: notification slides out */
.notification.dismissed { transform: translateX(120%); opacity: 0; transition: all 250ms ease-in; }

/* Badge pop */
@keyframes badge-pop {
  0% { transform: scale(0); } 60% { transform: scale(1.3); } 100% { transform: scale(1); }
}
```

---

## 4.3 Like Button — Complete

```css
.like-btn:active { transform: scale(0.9); }
.heart-icon {
  transition: transform 300ms cubic-bezier(0.68,-0.55,0.27,1.55), fill 200ms ease-out;
}
.like-btn.liked .heart-icon { transform: scale(1.15); fill: #e74c3c; }
```

```html
<button class="like-btn" aria-label="Like" aria-pressed="false">
  <svg class="heart-icon">...</svg> <span class="like-count">42</span>
</button>
```

---

## 4.4 Quality Checklist

```
✅ Responds < 200ms?   ✅ Animation matches action? (press=squash, appear=grow)
✅ Accessible?          ✅ Consistent across product?
✅ Survives 1000+ uses without annoying?
```

| Problem | Fix |
|---------|-----|
| Too long (>400ms) | Trim to 150-250ms |
| Decorative only | Add functional purpose or remove |
| Visual noise (too many) | Animate only primary element |

---

## ⚡ Action Checklist
- [ ] All micro-interactions respond < 200ms
- [ ] Press = squash (scale < 1). Appear = grow (scale 0→1). Leave = fade+slide.
- [ ] Add `aria-pressed` for toggle buttons, `aria-label` for icon-only buttons
- [ ] Test: does animation feel annoying after 20 repetitions? If yes → shorten
