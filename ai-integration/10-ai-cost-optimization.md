# 🤖 10 — AI Cost Optimization & Token Economics

> 🔴 Advanced | Prereq: 01, 04 | ~9 min

$100K+ monthly AI bills are the #1 production failure pattern in 2026. Cost optimization isn't a post-launch cleanup — it's architecture. Token budgeting, prompt caching, model routing, and batch processing can reduce costs by 70-90% without sacrificing quality.

---

## 10.1 The Cost Problem

```
TYPICAL BURN RATE (per 1M tokens):

  Model              Input/1M    Output/1M    Use Case
  ────────────────────────────────────────────────────
  gpt-4o-mini        $0.15       $0.60        Classification, extraction
  claude-3.5-haiku   $0.25       $1.25        Summarization, simple Q&A
  claude-3.5-sonnet  $3.00       $15.00       Code review, moderate reasoning
  gpt-4o             $2.50       $10.00       Complex reasoning, vision
  gemini-2.0-flash   $0.10       $0.40        High-volume, cost-sensitive
  claude-opus-4      $15.00      $75.00       Deep reasoning, architecture

COST MULTIPLIER: Opus-4 output = 125× more expensive than gemini-2.0-flash output
```

## 10.2 Model Routing Strategy

| Strategy | Description | Savings | Risk |
|----------|------------|---------|------|
| **Task-based** | Route by task type (extraction→mini, reasoning→sonnet) | 70-90% | Misrouting on edge cases |
| **Confidence escalation** | Small model first; escalate if low confidence | 60-80% | Escalation cascades under uncertain inputs |
| **Cascading** | Try cheap→mid→frontier sequentially | 50-70% | Added latency per tier |
| **Draft-then-refine** | Cheap model drafts, frontier polishes | 40-60% | Frontier may over-correct good drafts |

```ts
const ROUTING_TABLE = {
  classify:      { model: 'gpt-4o-mini',    maxTokens: 100 },
  extract:       { model: 'gpt-4o-mini',    maxTokens: 500 },
  summarize:     { model: 'claude-3.5-haiku', maxTokens: 1000 },
  translate:     { model: 'gpt-4o-mini',    maxTokens: 2000 },
  code_review:   { model: 'claude-3.5-sonnet', maxTokens: 4000 },
  architecture:  { model: 'claude-opus-4',  maxTokens: 8000 },
  debug_complex: { model: 'claude-opus-4',  maxTokens: 8000 },
};

function route(task: string): ModelConfig {
  const match = ROUTING_TABLE[task];
  if (!match) return { model: 'claude-3.5-sonnet', maxTokens: 2000 }; // safe default
  return match;
}
```

## 10.3 Prompt Caching

Both Anthropic and OpenAI support prompt caching — identical prefix text is computed once and reused:

```ts
// Anthropic: Cache system prompt + long documents
const response = await anthropic.messages.create({
  model: 'claude-3.5-sonnet',
  system: [
    { type: 'text', text: LONG_SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } }
  ],
  messages: [{ role: 'user', content: userQuery }]
});
// Cached system prompt: 90% cost reduction on input tokens

// OpenAI: Automatic caching for prompts > 1024 tokens (gpt-4o, gpt-4o-mini)
// Cached tokens billed at 50% discount — no code change needed
```

| Cache Type | Savings | Best For | Limits |
|-----------|---------|----------|--------|
| **Prompt caching** | 50-90% on input | Long system prompts, static docs | Min 1024-2048 tokens to qualify |
| **Semantic cache** | 100% on hit | Repeated/similar queries | Needs embedding + similarity threshold |
| **Tool result cache** | 100% on hit | Deterministic tool calls | Set TTL based on data freshness |

## 10.4 Token Budgeting Per Task

```ts
interface TokenBudget {
  maxInputTokens: number;   // hard cap on input
  maxOutputTokens: number;  // hard cap on generation
  maxCost: number;          // dollars — ultimate guard
}

const TASK_BUDGETS: Record<string, TokenBudget> = {
  classify:      { maxInputTokens: 500,   maxOutputTokens: 100,  maxCost: 0.001 },
  summarize:     { maxInputTokens: 8000,  maxOutputTokens: 1000, maxCost: 0.01 },
  code_review:   { maxInputTokens: 16000, maxOutputTokens: 4000, maxCost: 0.15 },
  architecture:  { maxInputTokens: 32000, maxOutputTokens: 8000, maxCost: 1.00 },
};

class CostGuard {
  spent = 0;

  async complete(model: string, prompt: string, budget: TokenBudget): Promise<string> {
    const estimatedCost = estimateCost(model, prompt, budget.maxOutputTokens);
    if (this.spent + estimatedCost > budget.maxCost) {
      throw new Error(`Cost cap exceeded: $${this.spent} + $${estimatedCost} > $${budget.maxCost}`);
    }

    const result = await llm.complete({ model, prompt, maxTokens: budget.maxOutputTokens });
    this.spent += result.usage.totalCost;
    return result.content;
  }
}
```

## 10.5 Batch Processing

```ts
// OpenAI Batch API — 50% discount, up to 24h turnaround
// Perfect for: classification, extraction, summarization (non-real-time)

const batch = await openai.batches.create({
  input_file_id: 'file-abc123', // JSONL with 50K prompts
  endpoint: '/v1/chat/completions',
  completion_window: '24h'
});

// Check status, download results when done
// Cost: $0.075/1M input (vs $0.15 real-time) → 50% savings
```

| Method | Cost vs Real-Time | Latency | Use When |
|--------|-------------------|---------|----------|
| **Real-time API** | 1× baseline | <2s | User-facing, interactive |
| **Batch API** | 0.5× | 1-24h | Bulk processing, backfills |
| **Fine-tuned small model** | 0.01-0.1× | <500ms | High-volume, narrow task |
| **Local model (Ollama)** | 0× (infra only) | Variable | Sensitive data, offline, extreme scale |

## 10.6 Cost Monitoring Dashboard

```ts
// Essential metrics to track
const costMetrics = {
  dailyTotalSpend: 0,        // alert if > $budget
  costPerTaskType: {},       // "classification": $0.002 avg, "reasoning": $0.85 avg
  costPerUser: {},           // detect abuse: one user driving 80% of costs
  modelDistribution: {},     // % of tokens per model tier (should be >60% cheap)
  cacheHitRate: 0,           // target >30%
  p95Latency: 0,             // user experience proxy
};
```

## 10.7 Anti-Patterns

- **Frontier model for classification** — using Opus to tag "bug" vs "feature". 100× overpriced.
- **No caching** — re-computing identical system prompts on every call. Prompt caching saves 90%.
- **No per-task budgets** — one runaway loop costs $50 before anyone notices.
- **Optimizing tokens, not tasks** — trimming context by 20% but adding 3 extra LLM calls = net cost increase.
- **Batch-compatible workloads in real-time** — processing 10K documents at $0.15/1M instead of $0.075/1M batch.

## 10.8 ICIL Cross-Ref

Builds on: `ai-integration/01` (prompts — prompt design affects cost), `ai-integration/04` (orchestration — loop costs)
Related: `agentic-engineering/05` (cost-aware planning — budget enforcement at agent level), `performance/02` (caching strategies), `performance/06` (profiling)

## ⚡ Action Checklist

- [ ] Audit your model distribution: what % of tokens go to frontier vs small models? Target >60% cheap.
- [ ] Implement task-based routing — classification, extraction, summarization never need frontier models.
- [ ] Enable prompt caching for all long system prompts (>2048 tokens). It's usually a single config flag.
- [ ] Set hard per-task budgets: maxCost, maxTokens, maxOutputTokens. Throw on exceed.
- [ ] Use batch API for any non-real-time bulk processing (50% discount).
- [ ] Track cost-per-task-type weekly; investigate any type exceeding 2× its historical baseline.
- [ ] Add semantic caching for repeated user queries (embedding-based, 0.95 similarity threshold).
