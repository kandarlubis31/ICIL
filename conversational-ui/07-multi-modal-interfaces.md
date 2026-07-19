# 💬 07 — Multi-Modal Conversational Interfaces

> **Level: 🔴 Advanced** | Prerequisite: 03, 04, 05 | Est. reading time: 13 min

The future of conversation is not voice-only or chat-only — it's multi-modal. Users speak, tap, read, and glance across phones, smart displays, watches, and cars. This course covers the principles of multi-modal design: when to speak vs when to show, progressive disclosure across modalities, and device adaptation strategies.

---

## 7.1 The Multi-Modal Principle

Different modalities serve different cognitive needs. Multi-modal design lets users move seamlessly between them:

```
MODALITY STRENGTHS:

  VOICE (speech)         VISUAL (screen)          TACTILE (touch/gesture)
  │ Fast input    │      │ Persistent    │         │ Precise       │
  │ Hands-free    │      │ Scannable     │         │ Private       │
  │ Natural       │      │ Comparable    │         │ Confirmatory  │
  │ Expressive    │      │ Detail-rich   │         │ Quick-select  │
       BEST FOR:              BEST FOR:               BEST FOR:
  • Open-ended queries   • Comparing options      • Confirming actions
  • Complex commands     • Browsing results       • Selecting from list
  • Hands-busy contexts  • Reading details        • Private data entry
  • Emotional expression • Reviewing history      • Fine adjustments
```

### The Golden Rule of Multi-Modal:

```
SPEAK for commands and questions.
SHOW for information and options.
TOUCH for selection and confirmation.

  User: "Find Italian restaurants near me"        ← VOICE: natural query
  Screen: Shows 5 restaurant cards with ratings    ← VISUAL: scannable results
  User: Taps the second restaurant                ← TOUCH: precise selection
  Screen: Shows details; bot speaks: "La Piazza —  ⚡ MULTI-MODAL
           4.7 stars, 0.8 km away. Want to book?"
  User: "Book a table for 7pm"                    ← VOICE: natural command
  Screen: Shows confirmation card                 ← VISUAL: persistent receipt
```

---

## 7.2 When to Speak, When to Show

| Information Type | Speak (Voice) | Show (Screen) | Why |
|-----------------|---------------|---------------|-----|
| **Simple yes/no** | ✅ "Is that correct?" | ✅ Confirm card | Both work; voice is faster |
| **3-option choice** | ✅ "Say 1, 2, or 3" | ✅ List with buttons | Screen avoids memory burden |
| **10-item list** | ❌ Impossible to remember | ✅ Scrollable list | Voice memory limit is ~3 items |
| **Complex data (table)** | ❌ "Row 1: $452, Row 2..." | ✅ Interactive table | Tables are inherently visual |
| **Map / location** | ❌ "It's 300m northeast of..." | ✅ Map with pin | Spatial info belongs on screen |
| **Emotional reassurance** | ✅ Tone of voice carries empathy | 🟡 Text + emoji helps | Voice prosody conveys emotion better |
| **Receipt / confirmation** | ✅ "Order confirmed" | ✅ Persistent receipt card | Both: voice for immediate, screen for reference |

```html
<!-- Multi-modal response: voice reads summary, screen shows detail -->
<div class="multi-modal-response">
  <!-- Screen shows persistent detail -->
  <div class="mm-visual">
    <div class="restaurant-card">
      <h3>🍝 La Piazza</h3>
      <p>⭐ 4.7 · Italian · 0.8 km</p>
      <p class="mm-highlight">Table for 4 · Today 7:00 PM</p>
      <div class="mm-actions">
        <button class="btn-primary">Confirm Booking</button>
        <button class="btn-secondary">Change Time</button>
      </div>
    </div>
  </div>
  
  <!-- Voice speaks the summary -->
  <!-- SSML: "La Piazza — 4.7 stars, 0.8 kilometers away. 
             I've booked a table for 4 at 7 PM. 
             <break time='300ms'/> 
             Would you like to confirm?" -->
</div>
```

---

## 7.3 Progressive Disclosure in Multi-Modal

Don't show everything at once. Reveal detail progressively as the conversation deepens:

```
LEVEL 1 (Voice summary + Screen card):
  "I found 3 Italian restaurants near you."
  Screen: 3 cards with name, rating, distance, cuisine

LEVEL 2 (Tap a card → expands):
  Screen: Full details — hours, price range, popular dishes, photos
  Voice: "La Piazza is open until 10 PM. Average price: $$."

LEVEL 3 (Deep interaction):
  Screen: Table booking form with date picker, time slots, party size
  Voice: "How many people? And what time would you prefer?"
  
  User: "4 people at 7pm"
  Screen: Form auto-fills from voice input
```

```css
/* Progressive card: compact → expanded on tap */
.mm-card { padding: 16px; border-radius: 12px; border: 1px solid #eee; cursor: pointer; }
.mm-card--compact { max-height: 80px; overflow: hidden; transition: max-height 0.3s ease; }
.mm-card--expanded { max-height: 400px; }
.mm-card__preview { display: flex; gap: 12px; align-items: center; }
.mm-card__detail { margin-top: 12px; padding-top: 12px; border-top: 1px solid #eee; }
```

---

## 7.4 Device Adaptation

Multi-modal experiences span devices with very different capabilities:

| Device | Primary Modalities | Design Implication |
|--------|-------------------|-------------------|
| **Smart Display** | Voice + large screen (touch) | Rich visual + voice. Cards, images, maps. |
| **Phone (mobile)** | Touch + small screen + voice | Compact cards. Voice for input, screen for output. |
| **Smart Watch** | Glance + voice + haptic | Ultra-minimal: 1-2 lines of text. Voice primary. |
| **Smart Speaker** | Voice only (no screen) | Everything must be spoken. No visual fallback. |
| **Car (infotainment)** | Voice primary + minimal screen | Minimal visual (eyes on road). Audio + glanceable screen. |
| **Desktop web** | Chat window + full screen | Rich chat UI with cards, carousels, persistent history. |

```javascript
// Device-capability-aware response builder
function buildResponse(intentResult, deviceCapabilities) {
  const response = { voice: null, visual: null, haptic: null };

  // Voice: always available as fallback
  response.voice = buildSSML(intentResult);

  // Visual: only if device has a screen
  if (deviceCapabilities.hasScreen) {
    if (deviceCapabilities.screenSize === 'large') {
      response.visual = buildRichCard(intentResult);      // Full card with image
    } else if (deviceCapabilities.screenSize === 'small') {
      response.visual = buildCompactCard(intentResult);    // Compact card
    } else if (deviceCapabilities.screenSize === 'glance') {
      response.visual = buildOneLine(intentResult);        // Watch: one line only
    }
  }

  // Haptic: for confirmation on watch/phone
  if (deviceCapabilities.hasHaptic && intentResult.action === 'confirm') {
    response.haptic = 'success';
  }

  return response;
}
```

---

## 7.5 Conversation Continuity Across Devices

Users start on one device, continue on another. The conversation must follow:

```
SCENARIO: Multi-device conversation continuity

  PHONE:   User: "Find a coffee shop" → Bot shows 5 options
  PHONE:   User taps "Blue Bottle" → Bot shows details
  CAR:     User gets in car → Phone session transfers to car display
  CAR:     Bot (voice): "You were looking at Blue Bottle. Want directions?"
  CAR:     User: "Yes" → Car navigation starts
  WATCH:   Arriving: haptic tap → "Blue Bottle is 100m ahead, on your right"
```

---

## Quick Summary

| Concept | Key Takeaway |
|---------|-------------|
| **Multi-modal principle** | Voice for commands, screen for information, touch for selection. Combine for seamless flow. |
| **Speak vs Show** | Simple choices = voice. Lists > 3 = screen. Maps/tables = screen. Emotional = voice tone. |
| **Progressive disclosure** | Voice summary → tap expands → deep interaction. Don't flood the screen at level 1. |
| **Device adaptation** | Smart display = rich. Phone = compact. Watch = glance. Speaker = voice-only. Adapt per device. |
| **Continuity** | Conversation state follows the user across devices. Phone → Car → Watch seamlessly. |
