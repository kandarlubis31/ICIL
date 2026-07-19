# 🧪 07 — Quality Metrics & Strategy

> 🔴 Advanced | Prereq: 01,06 | ~8 min

Quality isn't subjective — it's measurable. Code coverage, mutation testing, bug density, and flakiness rate tell you exactly how healthy your test suite is.

---

## 7.1 Key Quality Metrics

| Metric | What It Measures | Good Target |
|--------|-----------------|-------------|
| **Line Coverage** | % of lines executed by tests | ≥ 80% |
| **Branch Coverage** | % of if/else branches tested | ≥ 75% |
| **Mutation Score** | % of mutants killed | ≥ 60% |
| **Flakiness Rate** | % of tests that pass/fail randomly | < 1% |
| **Bug Escape Rate** | Bugs found in prod vs caught in testing | < 10% |

## 7.2 Mutation Testing

```bash
# Stryker: "mutates" your code, checks if tests catch it
npx stryker run

# Example: Stryker changes `x > 0` to `x >= 0`
# If tests still pass → tests aren't thorough enough
# If test fails → "mutant killed" = test is effective
```

## 7.3 Coverage ≠ Quality

```
100% COVERAGE CAN STILL MISS:
  → No assertion on the result (test runs code but doesn't check output)
  → Missing edge cases (test covers x=5, but what about x=0, x=-1?)
  → Integration bugs (unit tests pass, app broken together)

COVERAGE TELLS YOU: "what code is executed"
QUALITY TELLS YOU: "does it work correctly"
```

## 7.4 Quality Dashboard

```ts
// Collect metrics across all test types
const qualityReport = {
  coverage: { lines: 82.3, branches: 76.1 },
  mutation: { score: 64, killed: 128, survived: 72 },
  flakiness: { rate: 0.8, flakyTests: ['payment-flow', 'search-filters'] },
  performance: { unitTime: '2.1s', e2eTime: '5.3s' },
  bugs: { escaped: 2, caught: 18 }
};
// Track trends, not just absolute numbers
```

## 7.5 Anti-Patterns

- **Coverage as a target** — 80% with no assertions = worthless; coverage is a symptom, not a goal
- **No bug tracking** — if you don't know what escaped, you can't improve
- **Ignoring flaky tests** — flaky test today = team ignores CI failures tomorrow

## 7.6 ICIL Cross-Ref

Use with: `testing-qa/06` (CI/CD), `improvement/03` (heuristic evaluation)

## ⚡ Action Checklist
- [ ] Track: coverage %, mutation score, flakiness rate, bug escape rate
- [ ] Run Stryker (mutation testing) monthly; fix test gaps
- [ ] Every escaped bug → retrospective + new test case
- [ ] Dashboard visible to entire team; trends over time
- [ ] Flaky test rate < 1% — escalate if above
