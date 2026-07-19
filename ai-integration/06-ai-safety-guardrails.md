# 🤖 06 — AI Safety & Guardrails

> 🔴 Advanced | Prereq: 01,04 | ~9 min

AI safety isn't optional — it's infrastructure. Guardrails prevent harmful outputs, prompt injection, and data leakage. Every AI system in production needs defense in depth.

---

## 6.1 Threat Model

```
ATTACK VECTORS:
  Prompt Injection  → User overrides system instructions
  Jailbreaking      → User bypasses content restrictions
  Data Leakage      → LLM reveals training data or secrets
  Hallucination     → LLM fabricates confident-sounding falsehoods
  Toxicity          → LLM generates harmful/discriminatory content

DEFENSE LAYERS:
  Input Filter → Content classifier → System prompt hardening → Output filter
```

## 6.2 Prompt Injection Defense

```ts
function sanitizeUserInput(input: string): string {
  // 1. Strip system-level directives
  const blocked = [
    /ignore (all |previous |above )?instructions?/gi,
    /you are now/gi,
    /new system prompt/gi,
    /\[system\]/gi
  ];
  
  for (const pattern of blocked) {
    if (pattern.test(input)) {
      throw new Error('Input blocked: potential prompt injection');
    }
  }
  
  // 2. Delimit user content clearly
  return `<user_input>\n${input}\n</user_input>`;
}
```

## 6.3 Output Guardrails

```ts
async function safeComplete(prompt: string): Promise<string> {
  const response = await llm.complete(prompt);
  
  // Content safety check
  const safety = await contentClassifier.classify(response);
  if (safety.toxic || safety.hate || safety.selfHarm) {
    return "I can't provide that response. Please rephrase your question.";
  }
  
  // Factuality check (for RAG responses)
  if (response.includes('[CITATION:')) {
    const citations = extractCitations(response);
    for (const cite of citations) {
      const exists = await sourceExists(cite.url);
      if (!exists) return "Response contained unverifiable citation — blocked.";
    }
  }
  
  return response;
}
```

## 6.4 Safety Architecture

```
USER INPUT
    │
    ▼
┌─────────────┐
│ INPUT GUARD  │  ← Block injection, sanitize (NeMo Guardrails, regex)
└──────┬──────┘
       ▼
┌─────────────┐
│ SYSTEM PROMPT│  ← Hardened instructions, Constitutional principles
└──────┬──────┘
       ▼
┌─────────────┐
│     LLM     │
└──────┬──────┘
       ▼
┌─────────────┐
│ OUTPUT GUARD │  ← Toxicity check, PII scrub, factuality
└──────┬──────┘
       ▼
  CLEAN RESPONSE
```

**Key frameworks**: NVIDIA NeMo Guardrails (runtime defense), Anthropic Constitutional AI (training-time alignment), content classifiers (OpenAI Moderation API, Perspective API).

## 6.5 Anti-Patterns

- **Trusting user input** — always sanitize; users WILL try injection
- **No output filtering** — even with safe prompts, LLMs can produce unsafe outputs
- **Logging raw LLM output** — may contain PII from training data

## 6.6 ICIL Cross-Ref

Use with: `ai-integration/01` (prompt hardening), `software-engineering/03` (input validation)

## ⚡ Action Checklist
- [ ] Sanitize user input: strip system-level directives, delimit clearly
- [ ] Run content classifier on output before showing to user
- [ ] Never expose raw LLM output without filtering
- [ ] Log all blocked inputs/outputs for security review
- [ ] Test guardrails with known attack patterns (DAN, "ignore instructions")
