# 💬 03 — Chatbot UX Patterns

> **Level: 🟡 Intermediate** | Prerequisite: 01, 02 | Est. reading time: 13 min

The chat interface is the visible layer of conversational design. A well-designed chatbot feels natural; a poorly designed one feels robotic. This course covers the essential UX patterns: greetings, quick replies, typing indicators, rich messages, carousels, and human handoff.

---

## 3.1 The Onboarding Turn

The first 3 turns determine whether users continue or abandon. Don't waste them:

```
BAD OPENING:                          GOOD OPENING:
  Bot: "Hello! I'm HelperBot.         Bot: "👋 I can help you track orders,
        How can I help you?"                check balances, or find stores.
                                            What do you need?"
  → Vague. User doesn't know          → Sets expectations. Gives concrete
    what the bot can do.                  options. Scaffolds the first turn.
```

### The Greeting Pattern:

| Element | Purpose | Example |
|---------|---------|---------|
| **Warm acknowledgment** | Humanize the interaction | "👋 Hey there!" |
| **Capability statement** | Set accurate expectations | "I can help with orders, returns, and account questions." |
| **Scaffolded first turn** | Reduce "what do I type" anxiety | Quick reply buttons with top 3 intents |
| **Escape hatch** | Always offer a way out | "Or type 'human' to speak with an agent." |

```html
<!-- Chat greeting with scaffolded options -->
<div class="chat-greeting">
  <div class="chat-message chat-message--bot">
    <p>👋 Welcome to ShopHelp! I can assist with:</p>
    <ul>
      <li>📦 Tracking your order</li>
      <li>🔄 Returns & exchanges</li>
      <li>💳 Billing questions</li>
    </ul>
    <p>What brings you here today?</p>
  </div>
  
  <div class="chat-quick-replies">
    <button>📦 Track order</button>
    <button>🔄 Return item</button>
    <button>💳 Billing help</button>
    <button>👤 Speak to agent</button>
  </div>
</div>
```

---

## 3.2 Quick Replies & Suggestion Chips

Quick replies reduce typing friction AND guide users toward valid inputs:

| Pattern | When to Use | Example |
|---------|------------|---------|
| **Intent suggestions** | After greeting — guide initial action | "Track order", "Return item", "Check balance" |
| **Confirmation** | After system action — confirm or adjust | "Yes, that's right", "Change date", "Cancel" |
| **Disambiguation** | When intent is unclear | "Track by order number", "Track by email" |
| **Next steps** | After completing a task — continue | "Check another order", "Something else", "Done" |

```css
.chat-quick-replies {
  display: flex; flex-wrap: wrap; gap: 8px; padding: 8px 0;
}
.chat-quick-reply {
  padding: 8px 16px; border: 1px solid #ccc; border-radius: 20px;
  background: #fff; font-size: 14px; cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
}
.chat-quick-reply:hover, .chat-quick-reply:focus-visible {
  background: #f0f4ff; border-color: #4C78A8;
}
.chat-quick-reply:active {
  background: #4C78A8; color: #fff; transform: scale(0.97);
}
```

---

## 3.3 Typing Indicators & Perceived Performance

Silence is the enemy of conversation. A typing indicator bridges the gap between user message and bot response:

```
USER TYPES → [SEND] → TYPING INDICATOR (dots) → BOT RESPONSE

WITHOUT INDICATOR:
  User sends → 2 seconds of silence → Bot responds
  → "Is it broken? Did my message go through?"

WITH INDICATOR:
  User sends → "..." typing dots appear → Bot responds
  → "It's thinking. This feels normal."
```

```css
/* Typing indicator: three bouncing dots */
.typing-indicator {
  display: flex; align-items: center; gap: 4px; padding: 12px 16px;
}
.typing-dot {
  width: 8px; height: 8px; border-radius: 50%; background: #999;
  animation: bounce 1.4s infinite ease-in-out both;
}
.typing-dot:nth-child(1) { animation-delay: -0.32s; }
.typing-dot:nth-child(2) { animation-delay: -0.16s; }
.typing-dot:nth-child(3) { animation-delay: 0s; }

@keyframes bounce {
  0%, 80%, 100% { transform: scale(0); opacity: 0.3; }
  40% { transform: scale(1); opacity: 1; }
}
```

### Perceived Performance Tactics:

| Tactic | How | Effect |
|--------|-----|--------|
| **Instant typing indicator** | Show dots within 100ms of user sending | Feels responsive even if backend takes 2s |
| **Progressive response** | Send partial response immediately; stream the rest | "Got your order — looking it up... 📦 Your package is in transit." |
| **Skeleton cards** | Show card skeleton, fill content async | Visual placeholder reduces perceived wait |
| **Pre-fetch** | Predict next likely intent, pre-warm the backend | Response feels instant |

---

## 3.4 Rich Messages: Cards, Carousels, & Media

Plain text is the foundation. Rich messages add depth:

| Rich Message Type | Use Case | When NOT to Use |
|------------------|----------|----------------|
| **Card** | Detailed info with image, title, description, action buttons | Simple yes/no answers |
| **Carousel** | Browse multiple items horizontally | Mobile accessibility (swipe can be hard) |
| **Image / GIF** | Visual confirmation, product photos, emotion | Critical info that must be read (add alt text) |
| **Button list** | 2-4 clear actions on a card | More than 4 buttons (use quick replies) |
| **Receipt / Invoice** | Structured transaction summary | Unstructured info (use text) |
| **Map** | Location-based results | Text-only interfaces (fallback to address) |

```html
<!-- Rich product card in chat -->
<div class="chat-card">
  <img src="product.jpg" alt="Wireless Headphones" class="chat-card__image" />
  <div class="chat-card__body">
    <h4>🎧 Wireless Headphones Pro</h4>
    <p class="chat-card__price">$129.99 <s>$179.99</s> <span class="badge">27% off</span></p>
    <p class="chat-card__meta">⭐ 4.8 · 2,340 reviews · In Stock</p>
  </div>
  <div class="chat-card__actions">
    <button class="btn-primary">Add to Cart</button>
    <button class="btn-secondary">More Details</button>
  </div>
</div>
```

```css
.chat-card {
  max-width: 300px; background: #fff; border-radius: 12px; overflow: hidden;
  border: 1px solid #eee; box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}
.chat-card__image { width: 100%; height: 180px; object-fit: cover; }
.chat-card__body { padding: 12px 16px; }
.chat-card__price { font-size: 20px; font-weight: 700; color: #2E8B57; }
.chat-card__price s { font-size: 14px; color: #999; font-weight: 400; }
.chat-card__actions { display: flex; gap: 8px; padding: 0 16px 16px; }
```

---

## 3.5 Human Handoff

Every chatbot needs an escape hatch. Handoff must be seamless:

```
HANDOFF TRIGGERS:
  • User explicitly asks: "I want to talk to a human"
  • NLU confidence < 0.2 for 3 consecutive turns
  • Sentiment detection: frustration score > threshold
  • Specific intents: cancel_subscription, report_fraud, complaint
```

```html
<!-- Handoff transition: bot → human agent -->
<div class="chat-message chat-message--system">
  <p>🔁 Connecting you to a support agent...</p>
</div>
<div class="chat-message chat-message--agent">
  <div class="agent-badge">👤 Sarah from Support</div>
  <p>Hi! I see you're having trouble with your order #ORD-48291. Let me help.</p>
</div>
```

### Handoff Checklist:

- [ ] **Context transfer**: Agent sees full conversation history and collected slots
- [ ] **No repetition**: User doesn't have to re-explain their issue
- [ ] **Transition message**: "Connecting you to an agent..." (not just silence)
- [ ] **Expected wait time**: If queue exists, tell the user: "Estimated wait: ~3 minutes"
- [ ] **Async fallback**: "We'll email you when an agent is available" for long queues

---

## Quick Summary

| Concept | Key Takeaway |
|---------|-------------|
| **Greeting** | Capability statement + scaffolded first turn + escape hatch. Don't say "How can I help?" — give options. |
| **Quick replies** | Reduce typing friction. Use at greeting, confirmation, disambiguation, and next steps. |
| **Typing indicator** | Show within 100ms. Bridge silence with bouncing dots. Stream partial responses. |
| **Rich messages** | Cards for detail, carousels for browsing, images for emotion. Always provide text fallback. |
| **Human handoff** | Context transfers seamlessly. "Connecting to agent..." with wait time. Never make users repeat. |
