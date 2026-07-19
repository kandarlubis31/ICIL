# 🤖 05 — Cost-Aware Planning & Economic Engineering

> 🔴 Advanced | Prereq: 01, 04 | ~9 min

Agents are the first software where **every execution costs variable money**. A bug in a traditional app wastes CPU cycles; a bug in an agent burns dollars on every loop iteration. Cost-aware planning — routing to the cheapest capable model, caching aggressively, and budgeting per task — is a production discipline, not an optimization afterthought.

---

## 5.1 The Tokenomics Problem

```
WITHOUT COST ENGINEERING:
  Agent loops 15 times × 50K tokens × $0.015/1K = $11.25 per task
  10K tasks/day = $112,500/day = $41M/year 💀

WITH COST ENGINEERING:
  Route 80% to small model ($0.0002/1K) = $0.15/task
  20% to frontier ($0.015/1K) = $4.50/task
  Weighted avg = $1.02/task → $3.7M/year ✅ (90% reduction)
```

## 5.2 Model Routing Strategies

| Strategy | How | Savings | Risk |
|-----------|-----|---------|------|
| **Task-based routing** | Extraction → small model; reasoning → frontier | 70-90% | Misclassification |
| **Confidence escalation** | Start small; if low confidence, escalate to frontier | 60-80% | Escalation cascades |
| **Cascading** | Try small → if fails, try medium → if fails, frontier | 50-70% | Latency increase |
| **Hybrid** | Small model drafts, frontier refines | 40-60% | Complexity |

```ts
// Task-based router — classify intent, route to cheapest capable model
const MODEL_ROUTING = {
  // Small/cheap model ($0.0002/1K tokens) — extraction, classification, formatting
  "fast": {
    model: "gpt-4o-mini",
    tasks: ["summarize", "extract_entities", "classify", "format_json", "translate"],
  },
  // Mid model ($0.003/1K) — moderate reasoning, code review
  "balanced": {
    model: "claude-3.5-sonnet",
    tasks: ["code_review", "explain", "refactor", "draft_email", "test_generation"],
  },
  // Frontier ($0.015/1K) — deep reasoning, complex planning, architecture
  "powerful": {
    model: "claude-opus-4",
    tasks: ["architecture", "debug_complex", "multi_step_planning", "creative_writing"],
  },
};

function routeModel(taskType: string): string {
  for (const [tier, config] of Object.entries(MODEL_ROUTING)) {
    if (config.tasks.includes(taskType)) return config.model;
  }
  return MODEL_ROUTING.balanced.model; // default to mid
}
```

## 5.3 Confidence Escalation Pattern

```ts
async function escalateIfNeeded(query: string): Promise<string> {
  // 1. Try cheap model first
  const cheapResult = await smallModel.complete(query);
  const confidence = await assessConfidence(cheapResult); // 0-1 score

  if (confidence > 0.85) return cheapResult; // good enough, save money

  // 2. Escalate to mid model with cheap result as context
  const midResult = await midModel.complete(
    `A weaker model produced this (confidence ${confidence}). Improve it.\n\n${cheapResult}`
  );
  const midConfidence = await assessConfidence(midResult);

  if (midConfidence > 0.85) return midResult;

  // 3. Final escalation to frontier
  return await frontierModel.complete(
    `Previous attempts (confidence ${midConfidence}):\n${midResult}\n\nProvide the best answer.`
  );
}
```

## 5.4 Caching to Eliminate Redundant Calls

| Cache Level | What | Hit Rate | TTL |
|-------------|------|----------|-----|
| **Exact match** | Same prompt → same response | 20-40% | Forever (deterministic) |
| **Semantic cache** | Similar prompt → reuse response | 30-50% | 1 hour |
| **Tool result cache** | Same tool+args → same result | 40-60% | Depends on data |
| **Embedding cache** | Pre-computed embeddings | 80%+ | Until source changes |

```ts
// Semantic cache — avoid re-calling LLM for similar prompts
const cache = new Map<string, { embedding: number[], response: string }>();

async function cachedComplete(prompt: string): Promise<string> {
  const promptEmbed = await embed(prompt);

  // Check for semantically similar cached prompts (> 0.95 similarity)
  for (const [cached, entry] of cache) {
    const sim = cosineSimilarity(promptEmbed, entry.embedding);
    if (sim > 0.95) {
      metrics.cacheHit("semantic");
      return entry.response; // skip LLM call entirely
    }
  }

  // Cache miss → call LLM
  const response = await llm.complete(prompt);
  cache.set(prompt, { embedding: promptEmbed, response });
  metrics.cacheMiss("semantic");
  return response;
}
```

## 5.5 Per-Task Budget Enforcement

```ts
interface BudgetConfig {
  maxTokens: number;
  maxCost: number;       // dollars
  maxSteps: number;
  maxDurationMs: number;
}

class BudgetGuard {
  spent = { tokens: 0, cost: 0, steps: 0, startTime: Date.now() };

  check(config: BudgetConfig): void {
    const elapsed = Date.now() - this.spent.startTime;
    if (this.spent.tokens > config.maxTokens)
      throw new BudgetExceededError(`Tokens: ${this.spent.tokens} > ${config.maxTokens}`);
    if (this.spent.cost > config.maxCost)
      throw new BudgetExceededError(`Cost: $${this.spent.cost} > $${config.maxCost}`);
    if (this.spent.steps > config.maxSteps)
      throw new BudgetExceededError(`Steps: ${this.spent.steps} > ${config.maxSteps}`);
    if (elapsed > config.maxDurationMs)
      throw new BudgetExceededError(`Time: ${elapsed}ms > ${config.maxDurationMs}ms`);
  }

  record(usage: { tokens: number; cost: number }) {
    this.spent.tokens += usage.tokens;
    this.spent.cost += usage.cost;
    this.spent.steps += 1;
  }
}

// Usage — hard stop when budget exceeded
const budget = new BudgetGuard();
const config = { maxTokens: 50_000, maxCost: 0.50, maxSteps: 15, maxDurationMs: 60_000 };

for (const step of agentSteps) {
  budget.record(await executeStep(step));
  budget.check(config); // throws if over budget → agent stops cleanly
}
```

## 5.6 Measuring Cost-per-Task (the real metric)

```
Cost-per-Task = Total LLM spend / Number of completed tasks

Track by task type:
  "bugfix":      avg $0.12/task   (3 LLM calls, 2 tool calls)
  "code_review": avg $0.04/task   (1 LLM call, small model)
  "feature":     avg $0.85/task   (8 LLM calls, frontier model)

Set alerts:
  costPerTask["bugfix"] > $0.25 → alert (investigate runaway loops)
  dailyTotalSpend > $50 → alert
```

## 5.7 Anti-Patterns

- **Frontier model for everything** — using Claude Opus for entity extraction. 50x overpriced.
- **No caching** — agent re-summarizes the same document 10 times in one session
- **No budget cap** — a single runaway task costs $50 before anyone notices
- **Optimizing tokens, not tasks** — reducing context by 10% but increasing steps by 50% = net loss
- **Ignoring latency cost** — 5 cascading models = 25s latency. Users abandon. Speed IS cost.

## 5.8 ICIL Cross-Ref

Builds on: `01` (runtimes — budget gate is a runtime primitive), `04` (observability — cost tracing)
Related: `ai-integration/05` (eval — cost is an eval dimension), `performance/06` (profiling — cost profiling)

## ⚡ Action Checklist

- [ ] Audit: what % of calls go to frontier vs small models? If > 30% → add routing
- [ ] Implement task-based routing: map task types to model tiers
- [ ] Add a semantic cache for repeated/similar prompts (> 0.95 similarity threshold)
- [ ] Set per-task budget: `maxCost`, `maxSteps`, `maxDuration` — hard-stop on exceed
- [ ] Track cost-per-task by type; alert when any type exceeds 2x its baseline
- [ ] Review weekly: which task type is most expensive? Can it route to a cheaper model?
