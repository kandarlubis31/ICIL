# 💬 04 — Voice UI & VUI Design

> **Level: 🟡 Intermediate** | Prerequisite: 01 | Est. reading time: 14 min

Voice is the most natural human interface — and the hardest to design well. Unlike visual interfaces where users can see options, scan content, and undo mistakes, voice is linear, ephemeral, and invisible. This course covers VUI design principles, wake words, turn-taking, confirmation strategies, earcons, and SSML for expressive speech.

---

## 4.1 The VUI Design Challenge

Voice interfaces strip away everything visual. All that remains is time:

```
GUI (Visual):                        VUI (Audio):
  ┌──────────────────┐               ⏱️ "Here are your options..."
  │ Visible options   │               │  (user must remember all options)
  │ Scannable content │               │  (content is heard once, then gone)
  │ Clickable buttons │               │  (user must verbalize their choice)
  └──────────────────┘               │  (no undo — spoken words are final)
                                      ▼
```

### The 3-5 Item Rule of VUI:

```
0-3 items:     User can comfortably hold in working memory
3-5 items:     Upper limit — requires chunking or repetition
5+ items:      User forgets the first option; trust erodes
```

> **Critical Rule**: Never present more than 3 options verbally without repetition. "You can check your balance, track an order, or speak to an agent." For 3-5 items, repeat the list. Beyond 5, break into categories: "For banking, say one. For orders, say two."

---

## 4.2 Wake Words & Session Management

| Concept | Design Decision | Rationale |
|---------|----------------|---------|
| **Wake word** | "Hey Google", "Alexa", "Hey Siri" | Short, phonetically distinct, low false-trigger rate |
| **Session timeout** | 8 seconds of silence = session ends | Gives user time to think; prevents ambient noise from triggering |
| **Re-prompt** | After 5s silence: "I didn't catch that. You can say..." | One reminder, then close gracefully |
| **Barge-in** | Allow user to interrupt system speech | Natural conversation allows interruption; don't force listening |

```javascript
// Voice session state machine
class VoiceSession {
  constructor() {
    this.state = 'IDLE';       // IDLE → LISTENING → PROCESSING → SPEAKING
    this.silenceTimer = null;
    this.maxSilenceSeconds = 8;
    this.repromptSeconds = 5;
  }

  onWakeWord() {
    this.state = 'LISTENING';
    this.playEarcon('listening_start');  // Audio feedback: "I'm listening"
    this.startSilenceTimer();
  }

  startSilenceTimer() {
    this.silenceTimer = setTimeout(() => {
      if (this.state === 'LISTENING') {
        this.reprompt();
      } else {
        this.endSession();  // 8s complete silence → end
      }
    }, this.repromptSeconds * 1000);
  }

  reprompt() {
    this.speak("I didn't catch that. You can ask about your balance, orders, or account.");
    // One more chance, then end
    setTimeout(() => { if (this.state === 'LISTENING') this.endSession(); }, 5000);
  }

  endSession() {
    this.speak("I'll be here if you need me.");
    this.state = 'IDLE';
    clearTimeout(this.silenceTimer);
  }
}
```

---

## 4.3 Confirmation Strategies

Voice has no "undo." Confirmations must balance certainty with verbosity:

| Strategy | When | Example | Cost |
|----------|------|---------|------|
| **Implicit confirmation** | High confidence (> 0.85), low-cost errors | "Playing your Discover Weekly playlist." | None |
| **Explicit confirmation** | Medium confidence, high-cost errors | "I heard 'transfer $500 to savings.' Is that correct?" | One extra turn |
| **Three-way confirmation** | Critical actions, high-cost errors | "To confirm: you want to DELETE your account. Say 'yes, delete' to proceed." | Two extra turns |
| **No confirmation** | System-requested info (user answering a question) | User: "6:30 PM" → Bot: "Booking at 6:30 PM. How many people?" | None |

```
ESCALATION BY COST-OF-ERROR:

  Low cost:  "Play music"          → Implicit: "Playing your Discover Weekly."
  Med cost:  "Order pizza"         → Explicit: "One large pepperoni pizza. Confirm?"
  High cost: "Delete my account"   → Three-way: "To delete your account, say... Delete my account."
  Critical:  "Transfer $10,000"    → PIN/voice biometrics + explicit: "Enter your PIN to confirm."
```

---

## 4.4 Earcons & Audio Cues

**Earcons** are short, distinctive sounds that communicate system states without words:

| Earcon | When | Sound Profile |
|--------|------|--------------|
| **Listening start** | Wake word detected, ready to listen | Rising chime (1-2 tones, ascending) |
| **Listening end** | Speech captured, processing | Descending chime (1-2 tones, descending) |
| **Success** | Action completed | Pleasant resolution chord (C major) |
| **Error** | Action failed, didn't understand | Gentle "failure" tone (minor, soft — NOT alarming) |
| **Notification** | New message, update, reminder | Short attention-getter (2-3 notes) |
| **Session end** | Conversation closing | Gentle fade-out or "goodbye" chime |

```css
/* Audio feedback pattern: pair earcons with visual cues for multi-device */
.earcon-indicator {
  width: 48px; height: 48px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.2s, transform 0.15s;
}
.earcon-indicator--idle       { background: #eee; }
.earcon-indicator--listening  { background: #4C78A8; animation: pulse 1.5s infinite; }
.earcon-indicator--processing { background: #F0A42B; animation: spin 1s linear infinite; }
.earcon-indicator--speaking   { background: #2E8B57; }
.earcon-indicator--error      { background: #D14343; }

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.7; }
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
```

---

## 4.5 SSML: Giving Voice Personality

**Speech Synthesis Markup Language (SSML)** controls how text-to-speech sounds:

```xml
<!-- SSML: Fine-grained control over speech output -->
<speak>
  <!-- Emphasis -->
  Your order <emphasis level="strong">has shipped!</emphasis>
  
  <!-- Pause for dramatic effect -->
  Your tracking number is <break time="500ms"/> 1Z-999-AA1.
  
  <!-- Prosody: pitch, rate, volume -->
  <prosody pitch="+10%" rate="slow" volume="loud">
    Important security notice:
  </prosody>
  We will never ask for your password over the phone.
  
  <!-- Say-as: interpret special formats correctly -->
  Your order total is <say-as interpret-as="currency">$47.50</say-as>.
  Tracking: <say-as interpret-as="characters">1Z999AA1</say-as>
  
  <!-- Audio: insert pre-recorded sounds -->
  <audio src="https://cdn.example.com/success-chime.mp3" />
  Your payment has been processed.
  
  <!-- Sub: alias for correct pronunciation -->
  Your appointment is with <sub alias="Doctor Smith">Dr. Jane Smythe</sub>.
</speak>
```

### SSML Best Practices:

| Element | Use | Don't Abuse |
|---------|-----|------------|
| `<break>` | Between sentences, after important numbers | Every sentence — sounds robotic |
| `<emphasis>` | Key call-to-action, important warnings | Every sentence — loses impact |
| `<prosody>` | Brand voice consistency, accessibility (slow for elderly) | Extreme pitch shifts — sounds unnatural |
| `<say-as>` | Dates, times, currencies, phone numbers, spelled-out codes | Unnecessary formatting |
| `<audio>` | Brand sonic logo, confirmation earcons, celebration | Long audio clips — bloats response time |

---

## Quick Summary

| Concept | Key Takeaway |
|---------|-------------|
| **VUI challenge** | Invisible, ephemeral, linear. Max 3-5 options verbally (3 safe, 5 with repetition). User must remember everything. |
| **Wake word + session** | 8s silence timeout. One re-prompt at 5s. Allow barge-in (interruption). |
| **Confirmations** | Implicit (low cost) → Explicit (medium) → Three-way (high cost). Match to error severity. |
| **Earcons** | Distinct audio cues for listening/processing/success/error. Pair with visual indicators on multi-modal. |
| **SSML** | `<break>`, `<emphasis>`, `<prosody>`, `<say-as>`, `<audio>`. Control delivery without annoying. |
