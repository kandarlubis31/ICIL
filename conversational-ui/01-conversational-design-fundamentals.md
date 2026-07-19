# 💬 01 — Conversational Design Fundamentals

> **Level: 🟢 Beginner** | Prerequisite: — | Est. reading time: 13 min

Conversational UI is not a GUI made of words. It's a fundamentally different interaction paradigm — one based on turn-taking, context, and cooperative communication. This course covers the principles of conversational design, the chat vs voice distinction, Grice's maxims applied to UI, and when conversation is (and isn't) the right choice.

---

## 1.1 What Is Conversational UI?

Conversational UI lets users interact with software through natural language — typed or spoken. It's the interface pattern behind chatbots, voice assistants, and messaging-based apps.

```
GUI PARADIGM:                        CONVERSATIONAL PARADIGM:
  User sees options                  User expresses intent
  → Clicks a button                  → Types or speaks
  → System responds visually         → System responds in language
  → User clicks next thing           → User replies naturally

  Structured, discoverable           Flexible, invisible
```

### The Core Shift:

| Concept | GUI | Conversational UI |
|---------|-----|-------------------|
| **Discovery** | Visual: menus, buttons, icons | Linguistic: "What can you do?" |
| **Navigation** | Spatial: click paths, tabs | Temporal: turn-by-turn, context stack |
| **Error handling** | Validation messages, disabled states | Repair dialogue: "I didn't understand. Did you mean X?" |
| **State** | Visible: loading spinners, progress bars | Invisible: "One moment..." then silence (dangerous) |
| **Affordances** | Visual: button looks clickable | Linguistic: "You can ask me to..." |

> **Key Insight**: Conversation is invisible. Good conversational design makes the invisible feel natural. Bad conversational design makes it feel broken.

---

## 1.2 Grice's Maxims for Conversational UI

**Paul Grice** (1975) identified four cooperative principles that govern human conversation. They apply directly to conversational UI:

| Maxim | Meaning | In Conversational UI |
|-------|---------|---------------------|
| **Quantity** | Say enough, but not too much | Don't dump 5 paragraphs. Don't give 1-word answers. |
| **Quality** | Be truthful | Don't claim "I can do anything." Be honest about limitations. |
| **Relation** | Be relevant | Every response must relate to the user's last turn. Stay on topic. |
| **Manner** | Be clear, brief, orderly | No jargon. No nested clauses. One idea per turn. |

```
VIOLATION (Quantity — too much):
  User: "What's the weather?"
  Bot:  "The weather in Jakarta today is 32°C with 78% humidity, 
         wind speed 12 km/h from the southwest, UV index 8, 
         pollen count moderate, sunrise at 5:47 AM, sunset at 6:12 PM, 
         and the forecast for tomorrow is..."
  → Information overload. User asked one question.

COMPLIANCE (Quantity — just right):
  User: "What's the weather?"
  Bot:  "32°C and sunny in Jakarta today. ☀️"
  → Answers the question. Offers a natural next step: "Want the 5-day forecast?"
```

---

## 1.3 Chat vs Voice: The Critical Distinction

Chat and voice are BOTH conversational — but they demand different design:

| Dimension | Chat (Text) | Voice (Speech) |
|-----------|------------|----------------|
| **Speed** | Reading: 250 WPM (user-controlled) | Listening: 150 WPM (system-controlled, linear) |
| **Persistence** | Messages stay on screen — scrollable history | Ephemeral — heard once, gone immediately |
| **Complexity** | Can show lists, cards, options, links | Linear audio only; complex info must be simplified verbally |
| **Privacy** | Semi-private (screen visible to others nearby) | Public (anyone nearby hears the response) |
| **Input effort** | Typing = high effort, precise | Speaking = low effort, imprecise (accents, noise) |
| **Rich content** | Images, carousels, buttons, links, code blocks | Audio-only; screen on smart displays adds visual layer |
| **Error display** | Show understanding: "I think you meant..." | Must verbalize: "I heard X. Is that correct?" |

```
CHAT DESIGN RULE:                      VOICE DESIGN RULE:
  "Show, don't just tell."             "Tell, don't show."
  Use rich messages, buttons, cards.    Use short, clear spoken language.
  Leverage visual persistence.          Assume the user can't re-read.
```

---

## 1.4 When to Use Conversational UI (and When NOT To)

Conversational UI is not a universal solution. It's a specialized tool:

### ✅ USE Conversational UI When:

| Context | Why |
|---------|-----|
| **Hands-free / eyes-free** | Driving, cooking, exercising → voice is the only option |
| **Simple, frequent tasks** | "Set a timer for 10 minutes" → faster than opening an app |
| **High emotional context** | Mental health support, customer complaints → conversation feels human |
| **Triage / routing** | "What's your issue?" → route to right department faster than menus |
| **Discovery is the problem** | Users don't know what they need; conversation helps them articulate it |

### ❌ AVOID Conversational UI When:

| Context | Why | Better Alternative |
|---------|-----|-------------------|
| **Comparing options** | "List 15 hotels and I'll pick" → impossible verbally | GUI: grid, filters, map |
| **Complex data entry** | Dictating a 50-field form → painful | GUI: form with autocomplete |
| **Precision tasks** | "Set opacity to 47.3%" → voice is imprecise | GUI: slider, numeric input |
| **Browsing / serendipity** | Conversation is linear; browsing is non-linear | GUI: feed, grid, search |
| **Privacy-critical** | Speaking a password or bank details in public | GUI: masked input fields |

```javascript
// Decision helper: should this feature use conversational UI?
function shouldUseConversational(task) {
  if (task.handsFreeRequired) return { answer: true, mode: 'voice' };
  if (task.complexity === 'high') return { answer: false, reason: 'Use GUI for complex data' };
  if (task.emotionalContext) return { answer: true, mode: 'chat' };
  if (task.frequency === 'daily' && task.steps <= 2) return { answer: true, mode: 'voice' };
  if (task.requiresComparison) return { answer: false, reason: 'Comparison needs spatial layout' };
  return { answer: false, reason: 'GUI is more efficient for this task' };
}
```

---

## 1.5 The Cooperative Conversation Flow

Every conversational turn follows a rhythm. Breaking it creates friction:

```
IDEAL CONVERSATION FLOW:

  USER TURN                SYSTEM TURN
  │ Express  │───────────▶│ 1. ACKNOWLEDGE (implicitly)  │
  │ intent   │            │    Show you understood       │
  └──────────┘            │ 2. PROCESS                   │
       ▲                  │    Execute the intent        │
       │                  │ 3. RESPOND                   │
       │                  │    Give the answer clearly   │
       │                  │ 4. OFFER NEXT STEP           │
       │                  │    "Would you like to...?"   │
               (user replies or confirms)
```

```html
<!-- Chat UI implementing the cooperative flow -->
<div class="chat-message chat-message--bot">
  <!-- Step 1: Acknowledge (echo key info back to the user) -->
  <p>Got it — you want a <strong>vegan Italian restaurant</strong> near downtown.</p>
  
  <!-- Step 2+3: Process + Respond with result -->
  <div class="chat-card">
    <h4>🌿 Green Pasta House</h4>
    <p>⭐ 4.7 (230 reviews) · 0.8 km · Vegan Italian</p>
    <p>"Best vegan carbonara in the city"</p>
  </div>
  
  <!-- Step 4: Offer next step -->
  <p>Want me to book a table or show 2 more options?</p>
  <div class="chat-quick-replies">
    <button>Book a table</button>
    <button>Show more</button>
    <button>Change filters</button>
  </div>
</div>
```

---

## Quick Summary

| Concept | Key Takeaway |
|---------|-------------|
| **Conversational paradigm** | Language-based, turn-taking, invisible state. Not GUI-with-words. |
| **Grice's Maxims** | Quantity (enough, not too much), Quality (truthful), Relation (relevant), Manner (clear). |
| **Chat vs Voice** | Chat = visual persistence, rich content. Voice = linear audio, ephemeral, hands-free. |
| **When to use** | Hands-free, simple tasks, emotional context, triage. NOT for comparison, complex data, browsing. |
| **Cooperative flow** | Acknowledge → Process → Respond → Offer next step. Every turn follows this rhythm. |
