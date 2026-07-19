# 🔐 06 — AI-Specific Security

> 🔴 Advanced | Prereq: 01,03 | ~9 min

AI introduces unique attack vectors: prompt injection, model theft, data poisoning, and adversarial inputs. Traditional security controls don't cover these — you need AI-specific defenses.

---

## 6.1 AI Threat Landscape

```
PROMPT INJECTION    → Override system instructions via user input
JAILBREAKING        → Bypass content restrictions (DAN, "roleplay as...")
DATA LEAKAGE        → LLM reveals training data, PII, or system prompts
MODEL THEFT         → Extract model behavior via thousands of API calls
ADVERSARIAL INPUTS  → Crafted inputs that produce harmful outputs
```

## 6.2 Prompt Injection Defense

```ts
function sanitizeUserInput(input: string): string {
  const injectionPatterns = [
    /ignore (all |previous |above )?instructions?/gi,
    /you are now (a |an |the )?/gi,
    /new system prompt/gi,
    /\[system\]/gi,
    /DAN:/gi
  ];
  
  for (const pattern of injectionPatterns) {
    if (pattern.test(input)) {
      throw new SecurityError('Input blocked: potential prompt injection');
    }
  }
  
  // Delimit user content from system instructions
  return `<user_query>\n${input}\n</user_query>`;
}
```

## 6.3 Output Safety Filtering

```ts
async function safeComplete(prompt: string): Promise<{ content: string; flagged: boolean }> {
  const response = await llm.complete(prompt);
  
  // Content safety check
  const safety = await contentClassifier.classify(response);
  
  if (safety.categories.hate > 0.5 || 
      safety.categories.selfHarm > 0.5 ||
      safety.categories.sexual > 0.8) {
    return { 
      content: "I can't provide that response.", 
      flagged: true 
    };
  }
  
  // PII detection
  const pii = detectPII(response);
  if (pii.length > 0) {
    return {
      content: redactPII(response, pii),
      flagged: true
    };
  }
  
  return { content: response, flagged: false };
}
```

## 6.4 Defense in Depth

```
LAYER 1: INPUT      → Sanitize, detect injection patterns
LAYER 2: SYSTEM     → Hardened prompt, role boundaries
LAYER 3: LLM        → Model-level safety training
LAYER 4: OUTPUT     → Content classifier, PII scrub
LAYER 5: AUDIT      → Log all inputs/outputs for review
```

## 6.5 Anti-Patterns

- **Trusting model safety** — GPT-4 is safer but STILL jailbreakable
- **No input sanitization** — "it's just text" — text IS the attack vector
- **Logging raw LLM output** — may contain PII from training data

## 6.6 ICIL Cross-Ref

Use with: `ai-integration/06` (AI safety & guardrails), `security/03` (input validation)

## ⚡ Action Checklist
- [ ] Sanitize all user inputs before sending to LLM
- [ ] Run output through content classifier before showing to user
- [ ] Never expose raw system prompt in error messages
- [ ] Log all blocked inputs/outputs for security review
- [ ] Test defenses against known attacks (DAN, "ignore instructions", token smuggling)
