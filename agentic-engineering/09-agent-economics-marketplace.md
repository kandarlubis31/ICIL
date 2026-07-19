# 🤖 09 — Agent Economics & Marketplace Patterns

> 🔴 Advanced | Prereq: 01, 05, 08 | ~9 min

As agents become products, not just infrastructure, agent economics emerge: pricing models, marketplaces, SLAs, and quality-of-service guarantees. This course covers how to price, package, and operate agents as commercial services.

---

## 9.1 The Agent-as-a-Service (AaaS) Landscape

```
       ┌─────────────────────────────────────────────┐
       │            AGENT MARKETPLACE                 │
       │                                              │
       │  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
       │  │Code Review│  │Security  │  │ Research │   │
       │  │  Agent   │  │  Agent   │  │  Agent   │   │
       │  │ $0.05/PR │  │$50/month │  │$0.50/task│   │
       │  └──────────┘  └──────────┘  └──────────┘   │
       │                                              │
       │  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
       │  │   Data   │  │   Docs   │  │  Testing │   │
       │  │ Pipeline │  │  Writer  │  │  Agent   │   │
       │  │$200/month│  │$0.10/page│  │$100/month│   │
       │  └──────────┘  └──────────┘  └──────────┘   │
       └─────────────────────────────────────────────┘
```

## 9.2 Pricing Models

| Model | How It Works | Best For | Risk |
|-------|-------------|----------|------|
| **Per-task** | $0.05 per code review, $0.01 per classification | Predictable, single-action agents | Revenue fluctuates with usage |
| **Subscription** | $50/month for unlimited code reviews (fair use) | High-volume, enterprise | Abuse without rate limits |
| **Tiered** | Basic $10/mo (100 tasks), Pro $50/mo (500), Enterprise custom | Standard SaaS play | Tier boundaries need data |
| **Outcome-based** | $10 per bug found, 5% of cost savings identified | High-value, measurable outcomes | Attribution is hard |
| **Freemium** | Free for 50 tasks/month, then paid | Developer adoption play | Free tier must convert |
| **Token-cost-plus** | LLM cost × 1.5-3× markup | Transparent, low margin | Race to bottom on cost |

```ts
// Hybrid pricing: subscription + overage
interface PricingPlan {
  name: string;
  monthlyFee: number;         // base subscription
  includedTasks: number;      // tasks included in base
  overagePerTask: number;     // cost per task beyond included
  maxConcurrency: number;     // QoS: max parallel tasks
  prioritySupport: boolean;
}

const plans: PricingPlan[] = [
  { name: 'Starter', monthlyFee: 0,    includedTasks: 50,   overagePerTask: 0.10, maxConcurrency: 1,  prioritySupport: false },
  { name: 'Pro',     monthlyFee: 49,   includedTasks: 500,  overagePerTask: 0.05, maxConcurrency: 5,  prioritySupport: false },
  { name: 'Team',    monthlyFee: 199,  includedTasks: 2000, overagePerTask: 0.03, maxConcurrency: 20, prioritySupport: true },
];
```

## 9.3 Quality-of-Service Guarantees

| SLA Metric | Typical Value | How to Enforce |
|-----------|--------------|----------------|
| **Availability** | 99.5% (Starter), 99.9% (Pro), 99.95% (Enterprise) | Redundant agent instances, health checks |
| **Latency (p95)** | <30s per task (standard), <5s (premium routing) | Model tier routing, caching, queue priority |
| **Success rate** | >95% task completion without error | Eval gate before deploy, automated rollback |
| **Accuracy** | >90% on benchmark eval set | Continuous eval, regression testing |
| **Token budget** | Hard cap per task (varies by plan) | BudgetGuard from course 05 |

```ts
// SLA enforcement with automatic credit
class SLAMonitor {
  async track(taskId: string, plan: PricingPlan) {
    const task = await this.getTask(taskId);
    const latency = task.completedAt - task.startedAt;

    if (latency > plan.latencySla) {
      await this.issueCredit(task.customerId, task.cost * 0.10); // 10% credit for SLA miss
      metrics.increment('sla_violation', { plan: plan.name });
    }
  }
}
```

## 9.4 Agent Marketplace Architecture

```
┌─────────────────────────────────────────────────┐
│              MARKETPLACE PLATFORM                │
│                                                  │
│  PUBLISHERS:              CONSUMERS:             │
│  ┌──────────┐            ┌──────────┐            │
│  │ Register │            │ Discover │            │
│  │ Agent    │──[A2A]────►│ Agents   │            │
│  │ Set Price│            │ Compare  │            │
│  │ Publish  │            │ Purchase │            │
│  └──────────┘            └──────────┘            │
│                                                  │
│  PLATFORM SERVICES:                              │
│  ├── Identity & Auth (agent URNs, API keys)      │
│  ├── Billing & Metering (per-task, subscription) │
│  ├── Discovery & Search (capability-based)       │
│  ├── Reputation & Reviews (buyer feedback)       │
│  ├── SLA Monitoring (latency, uptime, accuracy)  │
│  └── Dispute Resolution (task re-runs, refunds)  │
└─────────────────────────────────────────────────┘
```

## 9.5 Agent Reputation Systems

```ts
interface AgentReputation {
  agentId: string;
  ratings: {
    accuracy: number;       // 1-5, from buyer reviews
    speed: number;          // 1-5
    reliability: number;    // 1-5 (does it complete tasks?)
    value: number;          // 1-5 (worth the price?)
  };
  metrics: {
    tasksCompleted: number;
    successRate: number;         // tasks without error / total
    averageLatencyMs: number;
    slaViolationRate: number;    // % of tasks exceeding SLA
    disputeRate: number;         // % of tasks disputed by buyer
  };
  verified: boolean;           // marketplace-verified identity
}

// Reputation decay — recent performance matters more
function weightedScore(reputation: AgentReputation): number {
  const recent = reputation.metrics.successRate; // weight: 0.7
  const lifetime = reputation.ratings.accuracy / 5; // weight: 0.3
  return recent * 0.7 + lifetime * 0.3;
}
```

## 9.6 Cost Structures for Agent Publishers

```
TOTAL COST PER TASK = LLM Cost + Infra Cost + Overhead

  LLM Cost:     $0.02 (gpt-4o-mini, 5 calls × 4K tokens)
  Infra Cost:   $0.005 (serverless function, database queries)
  Overhead:     $0.005 (monitoring, logging, support allocation)
  ─────────────────────────────────────────────────
  TOTAL COST:   $0.03 per task

  PRICING:      $0.05 per task (1.67× markup, 40% margin)
                $0.10 per task (3.3× markup, 70% margin — premium positioning)

  BREAKEVEN (subscription): 300 tasks/month × $0.03 = $9.00 cost
                            Pro plan at $49/month → breakeven at 185 tasks
```

## 9.7 Anti-Patterns

- **No usage metering** — agent runs with no per-customer tracking. Can't bill accurately.
- **Unlimited plans without rate limits** — one customer runs 50K tasks on a $49 plan → $1,500 cost.
- **No SLA monitoring** — promising 99.9% uptime with no measurement. SLA violations go undetected.
- **Selling at LLM cost** — $0.02/task pricing with no margin for infra, support, or platform fees.
- **Ignoring token cost volatility** — model prices change. Hardcode price → margin evaporates on model update.

## 9.8 ICIL Cross-Ref

Builds on: `agentic-engineering/01` (runtimes), `agentic-engineering/05` (cost-aware planning), `agentic-engineering/08` (A2A — marketplace discovery uses A2A)
Related: `ai-integration/10` (cost optimization — the publisher's side), `strategic-design/03` (pricing strategy), `service-design/07` (service metrics — SLA patterns)

## ⚡ Action Checklist

- [ ] Choose a pricing model: per-task for predictable, subscription for high-volume, hybrid for flexibility
- [ ] Meter every agent interaction by customer ID — you can't bill what you don't measure
- [ ] Set hard rate limits per plan tier (tasks/day, concurrency, token budget)
- [ ] Define SLAs: availability %, p95 latency, success rate. Monitor and auto-credit on violation.
- [ ] Calculate your true cost per task: LLM + infra + overhead. Price at minimum 1.5× cost.
- [ ] Publish Agent Cards with pricing, SLA, and capability info for marketplace discovery
- [ ] Implement reputation tracking — buyer ratings + objective metrics (success rate, latency)
