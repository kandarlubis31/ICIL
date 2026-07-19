# 🤖 07 — Agent Productionization & Lifecycle

> 🔴 Advanced | Prereq: 01, 04, 06 | ~9 min

Building an agent that works in a demo is easy. Running it in production for months — across model updates, prompt changes, and evolving tool sets — is a different discipline. **Agent lifecycle management**: versioning behavior, managing non-human identity, deploying safely, and catching regressions before users do.

---

## 7.1 The Agent = Prompt + Tools + Memory

```
AN AGENT IS NOT JUST A PROMPT. It's a bundle:
┌─────────────────────────────────┐
│ AGENT DEFINITION (versioned)     │
│ ├── system_prompt    (v2.3)      │  ← changes break behavior
│ ├── tool_set         (v1.8)      │  ← adding/removing tools changes behavior
│ ├── memory_schema    (v1.2)      │  ← schema changes break stored memory
│ └── model_config     (claude-4)  │  ← model swaps change everything
└─────────────────────────────────┘

→ Version the BUNDLE, not just the prompt. A prompt change with
   the wrong tool set is a regression.
```

## 7.2 Versioning Agent Behavior

```ts
interface AgentVersion {
  version: string;          // semver: major.breaking, minor.additive, patch.fix
  systemPrompt: string;     // hash for change detection
  tools: string[];          // tool names + versions
  memorySchema: object;     // backward-compat check
  model: string;            // "claude-opus-4", "gpt-4o"
  evalScore: number;        // must pass before deploy
  changelog: string;        // what changed and why
}

// Every change to the agent bundle = new version
const agentV2_3_0: AgentVersion = {
  version: "2.3.0",
  systemPrompt: hash("You are a code review agent..."),
  tools: ["search_code", "read_file", "edit_file:1.4", "run_tests:2.1"],
  memorySchema: { version: "1.2", fields: ["taskHistory", "preferences"] },
  model: "claude-opus-4",
  evalScore: 0.87,  // from CI eval gate
  changelog: "Added run_tests tool; tightened system prompt on test scope",
};
```

## 7.3 Semantic Versioning for Agents

| Change Type | Bump | Example |
|-------------|------|---------|
| **Breaking** (behavior changes) | Major (2.0 → 3.0) | New system prompt, removed tool, memory schema break |
| **Additive** (new capability) | Minor (2.0 → 2.1) | Added a tool, expanded memory schema (backward-compat) |
| **Fix** (quality improvement) | Patch (2.0 → 2.0.1) | Prompt wording tweak that improves eval score |

> **Critical:** Model swaps are ALWAYS a major version bump. "Same prompt, new model" produces different behavior — your eval suite is the only way to measure how different.

## 7.4 Non-Human Identity Management

Agents are not users — they need their own identity, auth, and access controls:

```ts
// Agent identity — separate from human users
interface AgentIdentity {
  agentId: string;          // "code-reviewer-prod"
  displayName: string;      // shows in audit logs, PRs, emails
  credentials: {            // scoped, rotated, never shared with humans
    apiKey: string;         // scoped to agent's required permissions only
    oauthScopes: string[];  // ["repo:read", "pr:write"] — least privilege
  };
  owner: string;            // human team responsible for this agent
  environment: string;      // "production" | "staging" | "development"
  rateLimits: {             // per-agent, not per-user
    requestsPerMinute: number;
    dailyCostCap: number;
  };
}

// Agents authenticate as themselves — never borrow human credentials
const agentAuth = {
  // ✅ Agent uses its own scoped API key
  headers: { "Authorization": `Bearer ${agentIdentity.credentials.apiKey}` },
  // Audit trail shows: "action by agent:code-reviewer-prod, not by user:john"
};
```

## 7.5 Deployment Strategies

| Strategy | How | When |
|----------|-----|------|
| **Shadow mode** | New agent runs alongside old; outputs compared, not shipped | Model swap, major prompt change |
| **Canary** | 5% traffic → new agent, 95% → old; monitor metrics | Minor version, new tool |
| **Blue/Green** | Run two versions; instant rollback switch | Any change with risk |
| **Ring deployment** | Internal → staging → 1% → 10% → 100% | High-stakes production agents |

```ts
// Canary deployment with automatic rollback
async function canaryDeploy(newVersion: AgentVersion, oldVersion: AgentVersion) {
  const canaryTraffic = 0.05; // 5% to new
  const metrics = startMetricsCollection();

  for (let hour = 0; hour < 24; hour++) {
    const newScore = await evaluateLiveTraffic(newVersion, canaryTraffic);
    const oldScore = await evaluateLiveTraffic(oldVersion, 1 - canaryTraffic);

    // Auto-rollback if new version degrades
    if (newScore.successRate < oldScore.successRate * 0.95) {
      alert(`Canary rollback: new version success rate ${newScore.successRate} < 95% of old`);
      return rollback(oldVersion);
    }

    // Ramp up if healthy
    if (newScore.successRate >= oldScore.successRate) {
      rampUp(canaryTraffic + 0.05);
    }
  }

  return promoteToFull(newVersion); // 24h stable → 100% traffic
}
```

## 7.6 Behavioral Regression Testing in CI

```yaml
# .github/workflows/agent-regression.yml
name: Agent Behavioral Regression
on: [pull_request]
jobs:
  regression:
    steps:
      - name: Run eval suite
        run: npm run agent-eval -- --suite=regression

      - name: Compare to baseline
        run: |
          NEW_SCORE=$(cat eval-results.json | jq '.overallScore')
          BASELINE=$(cat eval-baseline.json | jq '.overallScore')
          DEGRADATION=$(echo "$BASELINE - $NEW_SCORE" | bc)

          if (( $(echo "$DEGRADATION > 0.05" | bc -l) )); then
            echo "❌ Regression detected: score dropped by $DEGRADATION"
            echo "Baseline: $BASELINE → New: $NEW_SCORE"
            exit 1
          fi

      - name: Update baseline on main
        if: github.ref == 'refs/heads/main'
        run: cp eval-results.json eval-baseline.json
```

## 7.7 The Agent Lifecycle Checklist (Production Readiness)

```
PRE-PRODUCTION:
  [ ] Agent versioned (prompt + tools + memory + model as a bundle)
  [ ] Eval suite: 50+ cases, trajectory-scored, CI-gated
  [ ] Non-human identity: scoped API key, least-privilege OAuth
  [ ] Cost budget: per-task cap + daily cap + alerting
  [ ] Safety: tools classified, irreversible gated, sandbox in place
  [ ] Observability: full tracing, cost-per-task dashboard
  [ ] Rollback plan: blue/green or canary with auto-rollback

POST-PRODUCTION (ongoing):
  [ ] Weekly: review cost-per-task trends, eval drift
  [ ] Monthly: update eval set from new production traces
  [ ] On model release: run full eval suite before adopting
  [ ] Quarterly: audit tool access scopes (remove unused)
  [ ] On incident: post-mortem → new eval cases → prevent recurrence
```

## 7.8 Anti-Patterns

- **Versioning prompt only** — "I changed the prompt" but didn't version tools/memory → silent break
- **Human credentials for agents** — agent uses John's API key. John leaves. Agent breaks.
- **No rollback** — deployed new agent, it's worse, but you can't revert (no blue/green)
- **Eval set never updated** — testing 6-month-old behavior while agent has evolved
- **Model swap without eval** — "Claude 4.1 is out, let's switch!" → behavior changes, no one checked
- **No cost monitoring** — agent runs fine for 3 months, then a usage spike = $10K bill

## 7.9 ICIL Cross-Ref

Builds on: `01` (runtimes), `04` (observability/eval), `05` (cost budgets), `06` (safety)
Related: `ai-integration/05` (LLM eval — single-call), `devops-infra/03` (CI/CD pipelines), `testing-qa/06` (CI test automation), `security/02` (auth — non-human identity)

## ⚡ Action Checklist

- [ ] Version your agent as a bundle: prompt hash + tool set + memory schema + model
- [ ] Model swaps = major version bump; run full eval suite before adopting
- [ ] Create a non-human identity for each production agent (scoped key, least privilege)
- [ ] Set up canary or blue/green deployment with automatic rollback on eval degradation
- [ ] Add behavioral regression CI gate: block PRs if eval score drops > 5% from baseline
- [ ] Monthly: add new production traces to eval set; quarterly: audit tool scopes
- [ ] Run the full Production Readiness Checklist before any agent hits live traffic
