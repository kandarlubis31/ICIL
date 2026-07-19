# 💬 02 — Intent Mapping & NLU Design

> **Level: 🟡 Intermediate** | Prerequisite: 01 | Est. reading time: 14 min

Natural Language Understanding (NLU) is the engine of conversational UI — it translates raw user language into structured meaning. This course covers the architecture of intents and entities, training data strategy, confidence thresholds, and fallback design. Whether you're using traditional NLU (Dialogflow, Rasa, Lex) or modern LLM-based function calling (OpenAI, Anthropic), these principles apply.

---

## 2.1 Intents, Entities, and Utterances

The three pillars of NLU:

```
USER SAYS: "Book me a table for 4 at La Piazza tomorrow at 7pm"
                    ↓ NLU Engine
STRUCTURED MEANING:
  {
    "intent": "book_restaurant",          ← WHAT the user wants to do
    "entities": {                          ← DETAILS that qualify the intent
      "party_size": "4",                  ← number
      "restaurant": "La Piazza",          ← @restaurant entity
      "date": "2026-07-16",              ← @sys.date
      "time": "19:00"                     ← @sys.time
    },
    "confidence": 0.94                     ← How sure the NLU is
  }
```

| Component | Definition | Example |
|-----------|-----------|---------|
| **Intent** | The user's goal — a verb | `book_restaurant`, `check_balance`, `cancel_order` |
| **Entity** | A key piece of information — a noun | `@restaurant`, `@date`, `@amount`, `@product_name` |
| **Utterance** | A real example of how users phrase an intent | "Book me a table", "Reserve a spot", "I want dinner at..." |
| **Context** | Session memory that carries across turns | `order_id`, `previous_intent`, `authenticated_user` |

### Intent Naming Conventions:

```
# Good intent names: verb_noun, specific, unambiguous
  book_restaurant     ✓  Clear action + target
  check_order_status  ✓  Specific, scoped
  transfer_funds      ✓  Distinct, not confused with other intents

# Bad intent names:
  help                ✗  Too broad — what kind of help?
  default             ✗  Reserved word, ambiguous
  yes                 ✗  Not an intent — "yes" is a confirmation in context
```

---

## 2.2 Training Data Strategy

NLU is only as good as its training data. Each intent needs diverse, realistic utterances:

### The 10× Rule:

```
MINIMUM: 10-15 utterances per intent
GOOD:    30-50 utterances per intent  
GREAT:   50-100 utterances per intent (with variety)

NOT just volume — VARIETY:
  "Book a table"                 ← Direct imperative
  "I want to reserve a spot"     ← Declarative
  "Can I get dinner at..."       ← Interrogative
  "Looking for a restaurant"     ← Fragment / telegraphic
  "book me something italian"    ← Slang / informal
  "reserve a tbl for 4 pls"      ← Abbreviated / typo
  "i need a fukin table now"     ← Frustrated / emotional
```

### The Sampling Strategy:

```javascript
// Ensure training data covers diverse phrasings
const utteranceVariety = {
  imperative:   ['Book a table', 'Reserve a spot', 'Make a reservation'],
  declarative:  ['I want to book a table', 'I need a reservation', "I'd like to reserve"],
  interrogative: ['Can I book a table?', 'Is it possible to reserve?', 'How do I make a reservation?'],
  fragment:     ['table booking', 'reservation please', 'dinner reservation'],
  emotional:    ['I REALLY need a table', 'please just book something', 'any table available???'],
};

// For EACH intent, collect utterances that vary across:
// - Formality (formal → casual)
// - Length (verbose → telegraphic)
// - Emotion (neutral → frustrated)
// - Typos and abbreviations (real user input is messy)
```

---

## 2.3 Entity Design

Entities extract structured data from unstructured language:

| Entity Type | What It Captures | Examples |
|------------|-----------------|----------|
| **System entities** | Built-in: dates, times, numbers, emails, phone numbers | `@sys.date`, `@sys.time`, `@sys.number`, `@sys.email` |
| **Custom entities** | Domain-specific: product names, account types, city lists | `@product`, `@account_type`, `@city` |
| **Regex entities** | Pattern-matched: order IDs, tracking numbers, codes | `ORD-[0-9]{6}` for order IDs |
| **Composite entities** | Combinations: "large pepperoni pizza" → {size: large, topping: pepperoni, item: pizza} |
| **List entities** | Enumerated values with synonyms | `@payment_method: credit card, cc, visa, mastercard` |

```json
// Entity definition with synonyms
{
  "entity": "@coffee_size",
  "values": [
    { "canonical": "small",  "synonyms": ["sm", "sml", "short", "small one"] },
    { "canonical": "medium", "synonyms": ["med", "md", "regular", "normal"] },
    { "canonical": "large",  "synonyms": ["lg", "lrg", "big", "tall", "venti"] }
  ]
}
```

### Entity Extraction Pattern:

```
USER: "Transfer $250 to my savings account"

EXTRACTION:
  intent: transfer_money
  @amount: 250                          (system number entity)
  @account_type: savings                (custom entity with synonyms)
  @direction: to                        (key directional word)

MISSING ENTITIES → Ask follow-up:
  @from_account: NOT FOUND → "Which account should I transfer from?"
```

---

## 2.4 Confidence Thresholds & Routing

NLU returns a confidence score (0.0-1.0). What you DO with that score determines the user experience:

| Confidence | Action | UX |
|-----------|--------|-----|
| **> 0.85** | Execute directly | Seamless — user never knows about confidence |
| **0.60-0.85** | Confirm: "Did you mean X?" | Light friction — protects against wrong execution |
| **0.40-0.60** | Disambiguate: "I heard X or Y. Which?" | Higher friction — user clarifies intent |
| **< 0.40** | Fallback: "I didn't understand. Can you rephrase?" | Full friction — ask user to try again |
| **< 0.20** | Escalate to human or offer menu | Give up gracefully — don't loop |

```javascript
// Confidence routing logic
function routeIntent(nluResult) {
  const { intent, confidence, entities } = nluResult;

  if (confidence >= 0.85) {
    return { action: 'EXECUTE', intent, entities };
  }

  if (confidence >= 0.60) {
    return {
      action: 'CONFIRM',
      message: `Did you mean "${intent.name}"?`,
      intent,
      entities
    };
  }

  if (confidence >= 0.40) {
    const alternatives = getTopIntents(3); // Top 3 alternative intent matches
    return {
      action: 'DISAMBIGUATE',
      message: 'I\'m not sure. Did you want to:',
      options: alternatives
    };
  }

  // < 0.40: FALLBACK
  return {
    action: 'FALLBACK',
    message: 'I didn\'t quite get that. You can ask me to book a table, check your balance, or track an order.'
  };
}
```

---

## 2.5 Context & Slot Filling

Conversation isn't isolated turns. Context carries across turns:

```javascript
// Context-aware slot filling: track what's been collected
class ConversationContext {
  constructor() {
    this.slots = {};      // Collected entities across turns
    this.currentIntent = null;
    this.missingSlots = []; // What we still need to ask
  }

  fillSlot(entity, value) {
    this.slots[entity] = value;
    this.missingSlots = this.missingSlots.filter(s => s !== entity);
  }

  isComplete() {
    return this.missingSlots.length === 0;
  }

  nextPrompt() {
    if (this.missingSlots.length === 0) return null;
    const slot = this.missingSlots[0];
    const prompts = {
      party_size: 'How many people?',
      date: 'What date?',
      time: 'What time?',
      restaurant: 'Which restaurant?'
    };
    return prompts[slot] || `What ${slot.replace('_', ' ')}?`;
  }
}

// Usage:
// TURN 1: User: "Book a table" → intent=book, missingSlots=[party_size,date,time]
// TURN 2: Bot: "How many people?" → User: "4"
// TURN 3: Bot: "What date?" → User: "Tomorrow"
// TURN 4: Bot: "What time?" → User: "7pm"
// TURN 5: Bot: "Booking a table for 4 tomorrow at 7pm. Confirm?"
```

---

## Quick Summary

| Concept | Key Takeaway |
|---------|-------------|
| **Intent** | The user's goal (verb). Name as `verb_noun`. 30-50 diverse utterances per intent. |
| **Entity** | The details (noun). System entities for dates/numbers; custom entities with synonyms for domains. |
| **Confidence** | > 0.85 = execute. 0.60-0.85 = confirm. 0.40-0.60 = disambiguate. < 0.40 = fallback. |
| **Context** | Track slots across turns. Fill missing slots with follow-up prompts until complete. |
| **Training** | Variety matters more than volume. Cover imperatives, declaratives, fragments, emotions, and typos. |
