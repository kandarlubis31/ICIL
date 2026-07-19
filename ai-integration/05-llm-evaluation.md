# 🤖 05 — LLM Evaluation & Testing

> 🔴 Advanced | Prereq: 01,04 | ~9 min

LLMs are non-deterministic — traditional unit tests fail. You need evaluation frameworks that measure accuracy, hallucination rate, and consistency. Eval is the hardest problem in LLM engineering.

---

## 5.1 Evaluation Dimensions

| Dimension | What It Measures | Method |
|-----------|-----------------|--------|
| **Accuracy** | Correct answer? | Human review, reference matching |
| **Hallucination** | Fabricated facts? | Factual grounding check |
| **Consistency** | Same input → same quality? | Repeated runs, variance analysis |
| **Latency** | Response time | P50/P95/P99 timing |
| **Safety** | Harmful output? | Content classifiers |
| **Format** | Correct structure? | JSON schema validation |

## 5.2 LLM-as-Judge Pattern

```ts
async function evaluateResponse(query: string, response: string, reference?: string) {
  const judgePrompt = `Evaluate this AI response on a scale of 0-10:

User Query: "${query}"
AI Response: "${response}"
${reference ? `Reference Answer: "${reference}"` : ''}

Rate each dimension (0-10):
- Accuracy: Is the answer factually correct?
- Completeness: Does it fully address the query?
- Clarity: Is it well-structured and easy to understand?
- Hallucination: 0 = contains fabrications, 10 = fully grounded

Output JSON: { accuracy: number, completeness: number, clarity: number, hallucination: number, overall: number, explanation: string }`;

  const result = await llm.complete(judgePrompt);
  return JSON.parse(result);
}
```

## 5.3 Evaluation Pipeline

```ts
const testCases = [
  { query: "What is 2+2?", reference: "4" },
  { query: "Who wrote Hamlet?", reference: "William Shakespeare" },
  // ... hundreds of test cases
];

let totalScore = 0;
for (const tc of testCases) {
  const response = await myLLM.complete(tc.query);
  const score = await evaluateResponse(tc.query, response, tc.reference);
  totalScore += score.overall;
}

const avgScore = totalScore / testCases.length;
console.log(`Average score across ${testCases.length} cases: ${avgScore}/10`);

// Fails if score drops below threshold
if (avgScore < 7.0) throw new Error('Eval below threshold — investigate');
```

## 5.4 Hallucination Detection

```
RED FLAGS:
  → "As an AI..." or "I don't have access to..." — model is guessing
  → Numbers/dates that don't match source material
  → Confident tone + verifiably wrong facts
  → Citations that don't exist

MITIGATION:
  → RAG: ground responses in retrieved documents
  → Factuality check: verify key claims against source
  → Low confidence → "I don't know" instead of guessing
```

## 5.5 Evaluation Frameworks

| Framework | Focus | Best For |
|-----------|-------|----------|
| **RAGAS** | RAG-specific (faithfulness, relevance) | Retrieval pipelines |
| **DeepEval** | Unit-testing LLMs, CI/CD integration | Regression testing |
| **MLflow Eval** | Experiment tracking + eval dashboard | Team workflows |
| **LangSmith** | Tracing + annotation + eval | LangChain ecosystems |

## 5.6 Anti-Patterns

- **Testing 5 cases and calling it done** — need 100+ diverse test cases
- **Human eval only** — expensive; use LLM-as-judge + framework metrics
- **No regression testing** — prompt change improves one case, breaks ten others

## 5.7 ICIL Cross-Ref

Use with: `ai-integration/02` (RAG grounding), `software-engineering/05` (testing)

## ⚡ Action Checklist
- [ ] Build eval set of 100+ diverse test cases with references
- [ ] Use LLM-as-judge for automated scoring; human review for calibration
- [ ] Track hallucination rate per prompt version
- [ ] Set minimum accuracy threshold (e.g., 7/10); fail CI if below
- [ ] Re-run full eval suite on every prompt change
