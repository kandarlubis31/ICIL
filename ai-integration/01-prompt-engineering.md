# 🤖 01 — Prompt Engineering Fundamentals

> 🟢 Beginner | Prereq: — | ~9 min

Prompt engineering = the craft of instructing LLMs to produce reliable, structured outputs. It's the primary interface between AI agents and language models — every call to an LLM is a prompt design decision.

---

## 1.1 Core Techniques

| Technique | How | When |
|-----------|-----|------|
| **Zero-shot** | Just ask directly | Simple, well-known tasks |
| **Few-shot** | Provide 2-5 examples in prompt | Output format matters, edge cases |
| **Chain-of-Thought** | Add "Let's think step by step" | Reasoning, math, multi-step |
| **Tree-of-Thought** | Explore multiple reasoning branches | Complex decisions, creative tasks |
| **ReAct** | Reason → Act → Observe loop | Tool use, multi-step agents |
| **Structured output** | Specify JSON/Markdown format | Programmatic consumption |
| **Role assignment** | "You are a senior engineer..." | Domain-specific quality |

## 1.2 System vs User Prompt

```
┌─────────────────────────────────────────┐
│ SYSTEM PROMPT (persistent, sets rules)   │
│ "You are a PostgreSQL expert. Always     │
│  include EXPLAIN analysis. Never use     │
│  SELECT *. Prefer CTEs over subqueries." │
├─────────────────────────────────────────┤
│ USER PROMPT (task-specific)              │
│ "Optimize this query for 10M rows..."    │
└─────────────────────────────────────────┘
```

## 1.3 Prompt Template Pattern

```ts
function buildPrompt(context: {
  role: string; domain: string; examples: string[]; task: string
}): { system: string; user: string } {
  return {
    system: `You are a ${context.role} specializing in ${context.domain}.
Rules:
- Output valid JSON only
- If unsure, flag with "UNCERTAIN:" prefix
- Reference specific documentation when possible`,

    user: `Examples:\n${context.examples.map((e,i) =>
      `--- Example ${i+1} ---\n${e}`).join('\n')}
      
Task: ${context.task}

Think step-by-step, then output JSON.`
  };
}
```

## 1.4 Anti-Patterns

- **Over-prompting** — 3 pages of instructions when 5 bullets suffice
- **Ambiguous format** — "output the data" (what format? CSV? JSON? Table?)
- **No fallback** — prompt breaks entirely on edge case instead of graceful degradation

## 1.5 ICIL Cross-Ref

Use with: `ux-writing/01` (microcopy clarity), `strategic-design/05` (first principles)

## ⚡ Action Checklist

- [ ] System prompt sets clear boundaries, user prompt gives the task
- [ ] Include 2-3 diverse examples if output format is non-trivial
- [ ] Specify output schema: "Respond in JSON: { answer: string, confidence: 0-1 }"
- [ ] Add handling instruction: "If unsure, respond with NEEDS_CLARIFICATION"
- [ ] Test prompt with 5 varied inputs before considering it stable
