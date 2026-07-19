# 🤖 04 — Agent Observability & Evaluation

> 🔴 Advanced | Prereq: 01 | ~9 min

Traditional logging doesn't work for agents. An agent makes 50 autonomous decisions across 10 tool calls — you can't debug it with `console.log`. You need **tracing**: structured, nested spans that reconstruct the full reasoning + action tree. And you need **evaluation** that catches regressions before production.

---

## 4.1 Logging vs Tracing

| | Logging | Agent Tracing |
|---|---------|---------------|
| **Granularity** | One event per line | Nested parent-child spans |
| **Context** | Isolated events | Full call tree with causality |
| **Reconstruction** | Hard — correlate timestamps | Easy — span hierarchy shows flow |
| **Tools** | `winston`, `console` | LangSmith, Langfuse, Braintrust, Phoenix |

```
TRACE (nested spans):
└── agent.run (12.4s, $0.03)
    ├── llm.plan (2.1s) "Search for auth bug, then fix"
    ├── tool.search_codebase (0.8s)
    │   └── result: 3 files matched "login race"
    ├── llm.decide (1.5s) "Read auth.test.ts line 42"
    ├── tool.read_file (0.1s)
    ├── llm.reason (3.2s) "Race condition: getConnection not awaited"
    ├── tool.edit_file (0.3s) "Added await at line 42"
    └── llm.verify (4.4s) "Run test to confirm fix"
        └── tool.run_test (3.9s) ✓ passed
```

## 4.2 Instrumenting an Agent (OpenTelemetry-style)

```ts
// Minimal tracer — wraps every agent step in a span
class Tracer {
  spans: Span[] = [];
  
  startSpan(name: string, parent?: string): string {
    const id = crypto.randomUUID();
    this.spans.push({
      id, name, parent,
      startTime: Date.now(),
      attributes: {},
    });
    return id;
  }
  
  endSpan(id: string, attributes: Record<string, any>) {
    const span = this.spans.find(s => s.id === id);
    if (span) {
      span.endTime = Date.now();
      span.attributes = attributes; // input, output, tokens, cost
    }
  }
}

// Usage — every LLM call and tool call gets a span
async function tracedAgentStep(task: string, tracer: Tracer, parentId?: string) {
  const spanId = tracer.startSpan("llm.step", parentId);
  const result = await llm.complete(task);
  tracer.endSpan(spanId, {
    input: task,
    output: result,
    tokens: result.usage.totalTokens,
    cost: result.usage.totalTokens * 0.00001,
  });
  return result;
}
```

## 4.3 What to Capture Per Span

| Attribute | Why | Example |
|-----------|-----|---------|
| `input` | Reproduce the exact call | `"Fix the login test"` |
| `output` | See what the model produced | `"I'll search for auth tests..."` |
| `tokens` | Cost attribution | `{ input: 1200, output: 450 }` |
| `cost` | FinOps tracking | `$0.003` |
| `tool_name` | Which tool was called | `read_file` |
| `tool_args` | Exact invocation | `{ path: "auth.test.ts" }` |
| `tool_result` | What came back | `"test fails on line 42..."` |
| `error` | Failure details | `"File not found: ..." ` |
| `latency_ms` | Performance bottleneck | `3200` |

## 4.4 Evaluation: Offline vs Online

| | Offline Eval | Online Eval |
|---|-------------|-------------|
| **When** | Before deploy (CI/CD) | In production |
| **Data** | Curated test set | Live traffic sampling |
| **Purpose** | Catch regressions | Detect drift, monitor quality |
| **Method** | Run N cases, score | Sample 1% of traffic, LLM-as-judge |

## 4.5 Building an Eval Dataset

```ts
// Convert production traces into eval cases — the best dataset is your own traffic
interface EvalCase {
  id: string;
  input: string;
  expectedBehavior: string;  // not exact answer — behavior description
  toolsUsed: string[];        // which tools should/shouldn't be called
  maxSteps: number;           // expected complexity
  tags: string[];             // ["auth", "bugfix", "regression"]
}

// Example: a production trace that went well → save as eval case
const evalCase: EvalCase = {
  id: "auth-race-fix-001",
  input: "Fix the flaky login test",
  expectedBehavior: "Identifies race condition, adds await, runs test to verify",
  toolsUsed: ["search_codebase", "read_file", "edit_file", "run_test"],
  maxSteps: 8,
  tags: ["bugfix", "auth", "ci"],
};
```

> **Agent-as-Judge:** For multi-step agents, don't eval just the final answer. Eval the *trajectory*: did it take reasonable steps? Did it call the right tools? Did it avoid unnecessary actions?

## 4.6 CI/CD Eval Gate

```yaml
# .github/workflows/agent-eval.yml
name: Agent Evaluation Gate
on: [pull_request]
jobs:
  eval:
    steps:
      - run: npm run agent-eval  # runs eval suite
      - name: Check threshold
        run: |
          SCORE=$(cat eval-results.json | jq '.overallScore')
          if (( $(echo "$SCORE < 0.8" | bc -l) )); then
            echo "❌ Agent eval score $SCORE below 0.8 threshold"
            exit 1
          fi
          echo "✅ Agent eval score $SCORE passes"
```

## 4.7 Anti-Patterns

- **`console.log` debugging** — can't reconstruct a 50-step agent run from flat logs
- **Eval the final answer only** — a lucky guess passes; a good process with a minor error fails
- **No production sampling** — you're blind to drift until a user complains
- **Static eval set** — never updated. Your agent evolves but eval tests the old behavior
- **No cost tracing** — $500 surprise bill because nobody tracked per-span cost

## 4.8 ICIL Cross-Ref

Builds on: `01` (runtimes — tracing is a runtime feature)
Related: `ai-integration/05` (LLM eval — single-call evaluation), `testing-qa/06` (CI/CD test automation), `performance/06` (profiling — tracing is agent profiling)

## ⚡ Action Checklist

- [ ] Instrument every LLM + tool call as a nested span (input, output, tokens, cost, latency)
- [ ] Pick a tracing backend: Langfuse (open-source) or Braintrust (managed)
- [ ] Build an eval set from 20+ production traces — tag by task type
- [ ] Eval the **trajectory** (steps + tools), not just the final answer
- [ ] Add a CI eval gate: block deploys if score drops below threshold
- [ ] Sample 1% of production traffic for online drift detection
