# 💬 05 — Error Recovery in Conversation

> **Level: 🟡 Intermediate** | Prerequisite: 01, 02 | Est. reading time: 12 min

Errors are inevitable in conversation — users misspeak, NLU misunderstands, and systems reach their limits. The difference between a great conversational experience and a terrible one is not error prevention, but error recovery. This course covers the full recovery toolkit: no-match, no-input, disambiguation, escalation, and the art of graceful degradation.

---

## 5.1 The Error Taxonomy

Conversational errors fall into distinct categories. Each needs a different recovery strategy:

| Error Type | What Happens | Frequency | Severity |
|-----------|-------------|-----------|----------|
| **No-match** | NLU confidence below threshold | 5-15% of turns | Medium |
| **No-input** | User says nothing (silence timeout) | 3-8% of turns | Low |
| **Misrecognition** | System heard wrong intent/entity | 2-5% of turns | High |
| **Out-of-scope** | User asks something the system can't do | 10-20% of turns | Medium |
| **System failure** | Backend error, timeout, service down | < 1% of turns | Critical |

---

## 5.2 The No-Match Recovery Ladder

Don't just repeat "I didn't understand." Escalate the help with each attempt:

```
ATTEMPT 1: Generic re-prompt
  "I didn't quite catch that. Could you rephrase?"
  
ATTEMPT 2: Specific guidance + examples
  "I can help with orders, returns, and account questions. 
   For example, try 'Where is my order?'"
  
ATTEMPT 3: Offer quick-reply buttons (chat) / numbered menu (voice)
  "Here are some things I can help with:
   1. Track an order
   2. Start a return
   3. Check your balance
   Which would you like?"
  
ATTEMPT 4: Escalate to human or structured fallback
  "Let me connect you with a support agent who can help."
```

```javascript
// No-match recovery ladder implementation
class ErrorRecovery {
  constructor() {
    this.consecutiveErrors = 0;
    this.maxRetries = 3;
  }

  handleNoMatch(userInput) {
    this.consecutiveErrors++;
    
    if (this.consecutiveErrors === 1) {
      return { action: 'REPROMPT', message: "I didn't quite catch that. Could you rephrase?" };
    }
    
    if (this.consecutiveErrors === 2) {
      return {
        action: 'GUIDE',
        message: "I can help with orders, returns, and account questions.",
        examples: ['Where is my order?', 'I want to return an item', 'Check my balance']
      };
    }
    
    if (this.consecutiveErrors === 3) {
      return {
        action: 'ESCALATE',
        message: "Let me connect you with a support agent who can help right away."
      };
    }
  }

  resetOnSuccess() {
    this.consecutiveErrors = 0;  // Reset counter on successful understanding
  }
}
```

---

## 5.3 Misrecognition: The Most Dangerous Error

Misrecognition is worse than no-match — the system thinks it understood, but got it wrong:

```
USER: "Transfer $50 to savings"
NLU:  intent=transfer_funds, amount=50, to_account=savings    ✅ Correct

USER: "Transfer $500 to savings"
NLU:  intent=transfer_funds, amount=500, to_account=savings   ✅ Correct

USER: "Transfer fifty dollars to savings"
NLU:  intent=transfer_funds, amount=15, to_account=savings    ❌ "Fifty" → "15"
      → System transfers $15 instead of $50 — user's trust is destroyed
```

### Defense-in-Depth Against Misrecognition:

| Layer | Strategy | Example |
|-------|----------|---------|
| **Pre-execution** | Confirm high-cost actions | "I heard 'transfer $500 to savings.' Is that correct?" |
| **Pre-execution** | Echo back key entities | "Transferring FIFTY dollars — not fifteen — to savings. Confirm?" |
| **Post-execution** | Immediate undo window | "Transfer complete. Reply 'undo' within 30 seconds to reverse." |
| **Post-execution** | Receipt / confirmation message | "✅ Transferred $50.00 to Savings (ref: TXN-8842). Not you? Reply 'dispute'." |

---

## 5.4 Out-of-Scope: Graceful Boundaries

When users ask for something the system can't do, don't just say "I can't do that":

```
BAD:
  User: "Can you file my taxes?"
  Bot:  "I'm sorry, I can't do that."
  → Dead end. User abandons.

GOOD:
  User: "Can you file my taxes?"
  Bot:  "I can't file taxes, but I can help with tax-related questions:
         • Explain tax documents you've received
         • Find your tax forms in your account
         • Connect you with a tax specialist
         Would any of those help?"
  → Acknowledges limitation, offers adjacent value, keeps conversation alive.
```

```javascript
// Out-of-scope handler: acknowledge limitation + offer adjacent value
function handleOutOfScope(userIntent, systemCapabilities) {
  // Find the closest capability the user might have meant
  const adjacentCapability = findNearest(userIntent, systemCapabilities);
  
  return {
    acknowledgment: `I can't ${userIntent.action}, but I can help with ${adjacentCapability.name}.`,
    adjacentOptions: adjacentCapability.relatedActions.slice(0, 3),
    escapeHatch: 'Or I can connect you with a specialist.'
  };
}
```

---

## 5.5 Graceful Degradation Under System Failure

When the backend fails, the user should never see "Error 500":

```
SYSTEM FAILURE → GRACEFUL DEGRADATION:

  Backend timeout (3s)  →  "This is taking longer than expected. One moment..."
  Backend timeout (8s)  →  "I'm having trouble connecting. Can we try again in a moment?"
  Backend down          →  "I'm running into a technical issue right now. 
                            You can try again in a few minutes, or I can notify a 
                            support agent to follow up with you."
```

```css
/* Error states in chat UI: transparent, never alarming */
.chat-message--error {
  background: #FFF3F0; border-left: 3px solid #F0A42B;
}
.chat-message--error .chat-error-icon { color: #F0A42B; }
.chat-message--critical {
  background: #FFEBEE; border-left: 3px solid #D14343;
}
```

---

## Quick Summary

| Concept | Key Takeaway |
|---------|-------------|
| **Error types** | No-match, no-input, misrecognition, out-of-scope, system failure. Each needs a different recovery. |
| **Recovery ladder** | Attempt 1: re-prompt → 2: guide + examples → 3: structured options → 4: escalate to human. |
| **Misrecognition** | Worst error. Confirm high-cost actions. Echo key entities back. Always provide undo window. |
| **Out-of-scope** | Don't say "I can't." Say "I can't do X, but I CAN help with Y and Z." |
| **System failure** | Never show raw errors. Degrade gracefully: "Taking longer..." → "Try again soon" → "Agent will follow up." |
