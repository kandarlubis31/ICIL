# 🤖 08 — Agent-to-Agent Protocols & Interoperability

> 🔴 Advanced | Prereq: 01, 03 | ~9 min

In 2026, agents don't live in isolation — they're composed into agent meshes spanning multiple frameworks and organizations. Agent-to-Agent (A2A) protocols standardize discovery, capability negotiation, task delegation, and result exchange between agents — regardless of what framework built them.

---

## 8.1 The Interoperability Problem

```
WITHOUT A2A:
  LangGraph agent ──??──► CrewAI agent   (different protocols)
  AutoGen agent   ──??──► Anthropic agent (different tool formats)
  Custom agent    ──??──► OpenAI agent    (different auth, different schemas)

WITH A2A:
  Agent (any framework) ──[A2A Protocol]──► Agent (any framework)
  → Standardized: discovery, capability cards, task delegation, result format
```

## 8.2 Google A2A Protocol (April 2025)

Google's Agent-to-Agent protocol is the leading open standard. Agents publish **Agent Cards** — JSON manifests describing what they can do:

```json
{
  "agentCard": {
    "name": "CodeReviewAgent",
    "description": "Reviews pull requests for bugs, style, and security issues",
    "version": "2.1.0",
    "capabilities": {
      "streaming": true,
      "pushNotifications": true
    },
    "skills": [
      {
        "id": "code_review",
        "description": "Perform a thorough code review of a GitHub PR",
        "inputSchema": {
          "type": "object",
          "properties": {
            "repoUrl": { "type": "string" },
            "prNumber": { "type": "number" },
            "focusAreas": { "type": "array", "items": { "enum": ["bugs", "style", "security", "performance"] } }
          },
          "required": ["repoUrl", "prNumber"]
        },
        "outputSchema": {
          "type": "object",
          "properties": {
            "summary": { "type": "string" },
            "issues": { "type": "array" },
            "score": { "type": "number", "minimum": 0, "maximum": 100 }
          }
        }
      }
    ],
    "endpoints": {
      "task": "https://agent.company.com/a2a/task",
      "status": "https://agent.company.com/a2a/status/{taskId}",
      "cancel": "https://agent.company.com/a2a/cancel/{taskId}"
    },
    "authentication": {
      "type": "bearerToken",
      "description": "API key required. Register at developer.company.com"
    }
  }
}
```

## 8.3 Agent Discovery Flow

```ts
// 1. DISCOVER: Find agents that can handle a task
async function discoverAgents(need: string): Promise<AgentCard[]> {
  // Option A: Local registry (known agents)
  const local = REGISTRY.filter(agent =>
    agent.skills.some(s => s.description.includes(need))
  );

  // Option B: DNS-based discovery (A2A spec — well-known endpoint)
  const dnsResult = await fetch(`https://agent.company.com/.well-known/agent.json`);
  const discovered = await dnsResult.json();

  // Option C: Marketplace / Agent Directory (centralized)
  const marketplaceResults = await marketplace.search({ capability: need });

  return [...local, discovered, ...marketplaceResults];
}

// 2. NEGOTIATE: Select best agent for the task
function selectAgent(cards: AgentCard[], task: Task): AgentCard {
  return cards
    .filter(c => c.skills.some(s => s.id === task.requiredSkill))
    .sort((a, b) => {
      // Prefer: highest version, matching auth type, lowest latency SLA
      return compareVersions(b.version, a.version);
    })[0];
}

// 3. DELEGATE: Send task via A2A protocol
async function delegateTask(agent: AgentCard, skill: string, input: any) {
  const response = await fetch(agent.endpoints.task, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${AGENT_API_KEY}`,
    },
    body: JSON.stringify({
      skill,       // which capability to invoke
      input,       // task parameters (matches skill's inputSchema)
      callbackUrl: 'https://my-agent.com/a2a/callback/{taskId}', // async result
      priority: 'normal',
      idempotencyKey: crypto.randomUUID(),
    }),
  });

  const { taskId } = await response.json();
  return taskId; // poll status endpoint or wait for callback
}
```

## 8.4 A2A vs MCP — Two Complementary Standards

| Protocol | Purpose | Direction | Example |
|----------|---------|-----------|---------|
| **MCP** (Anthropic) | Agent ↔ Tool/Resource | Agent calls tools | Agent calls search_database, read_file |
| **A2A** (Google) | Agent ↔ Agent | Agents delegate to each other | CodeReviewAgent delegates to SecurityAuditAgent |
| **MCP Interconnect** | Cross-runtime MCP | Agent uses tools from another runtime | LangGraph agent uses CrewAI agent's tools |

> **Rule of thumb**: MCP = agents using tools. A2A = agents delegating to agents. An agent can use BOTH — call MCP tools directly AND delegate complex subtasks via A2A.

## 8.5 Cross-Framework Communication

```ts
// Example: LangGraph agent delegates to CrewAI agent via A2A
async function crossFrameworkDelegation() {
  // LangGraph supervisor discovers CrewAI research agent
  const researchAgent = await discoverAgents('deep research');

  // Delegate via A2A protocol — no framework coupling
  const taskId = await delegateTask(researchAgent, 'deep_research', {
    topic: 'Impact of AI agents on software engineering in 2026',
    depth: 'comprehensive',
    sources: ['arxiv', 'techcrunch', 'academic journals'],
  });

  // Poll for completion (or use webhook callback)
  const result = await pollForResult(taskId, { maxWaitMs: 300_000 });

  // Result is framework-agnostic — structured JSON
  return result.output; // { report: string, citations: [], confidence: 0.92 }
}
```

## 8.6 Agent Identity & Trust

```ts
// Agents authenticate as themselves — never borrow human credentials
interface AgentIdentity {
  agentId: string;              // globally unique: "urn:agent:code-reviewer-prod"
  publicKey: string;            // for signed task verification
  attestedCapabilities: string[]; // cryptographically verified skills
  reputation: {                 // from marketplace/registry
    tasksCompleted: number;
    successRate: number;
    averageLatencyMs: number;
  };
}
```

## 8.7 Anti-Patterns

- **Framework lock-in** — building agents that only talk to agents from the same framework. Use A2A.
- **No capability cards** — agents with no discoverable manifest. Other agents can't find or use them.
- **Raw context transfer** — passing full message histories between agents. Use structured task/result.
- **No idempotency** — retrying a failed task delegation creates duplicate work. Always include `idempotencyKey`.
- **Hardcoded agent URLs** — brittle. Use DNS-based discovery (`.well-known/agent.json`) or registries.

## 8.8 ICIL Cross-Ref

Builds on: `agentic-engineering/01` (runtimes — A2A is a runtime primitive), `agentic-engineering/03` (multi-agent — A2A standardizes handoffs)
Related: `ai-integration/07` (MCP — complementary protocol for tool integration), `service-design/05` (AI-human handoff — same delegation patterns), `software-engineering/03` (API design — Agent Cards = API specs for agents)

## ⚡ Action Checklist

- [ ] Publish an Agent Card for every production agent — make it discoverable
- [ ] Implement the `.well-known/agent.json` endpoint for DNS-based agent discovery
- [ ] Use structured task delegation (A2A), NOT raw context transfer between agents
- [ ] Always include `idempotencyKey` in task delegation to prevent duplicate work
- [ ] Register agents with unique identities (URN) — never borrow human credentials
- [ ] Monitor cross-agent metrics: delegation success rate, latency, cost-per-delegation
