# 🧪 06 — CI/CD Test Automation

> 🔴 Advanced | Prereq: 02,03,04 | ~8 min

Tests that only run on developer machines are useless. CI/CD automation runs every test on every push — catching regressions before they reach production. Flaky tests are the enemy.

---

## 6.1 Pipeline Test Strategy

```yaml
# .github/workflows/test.yml
name: Test Suite
on: [push, pull_request]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck

  unit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm test -- --coverage
      - uses: actions/upload-artifact@v4
        if: always()
        with: { name: coverage, path: coverage/ }

  e2e:
    runs-on: ubuntu-latest
    needs: unit
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test --retries=2
```

## 6.2 Flaky Test Management

```ts
// Detect flaky tests: repeat N times
describe('Flaky-prone: payment flow', () => {
  test.skip('marked flaky — investigating', async () => {
    // TODO: fix race condition in payment confirmation
  });
});

// CI retry with exponential backoff
// playwright.config.ts
export default {
  retries: process.env.CI ? 2 : 0,
  reporter: [['html'], ['junit', { outputFile: 'results.xml' }]]
};
```

## 6.3 Test Parallelization

```
CI STRATEGY:
  → Lint + typecheck: 30s (parallel job 1)
  → Unit tests: 2 min (parallel job 2, sharded by file)
  → E2E tests: 5 min (parallel job 3, sharded by spec)
  → Total: 5 min (not 7.5 min sequential)

SHARDING:
  npx playwright test --shard=1/3  # first third of tests
  npx playwright test --shard=2/3
  npx playwright test --shard=3/3
```

## 6.4 Anti-Patterns

- **Commenting out failing tests** — fix or `.skip` with a tracking issue
- **No test result artifacts** — upload coverage, screenshots, videos on failure
- **Tests depend on test order** — each test must set up its own state

## 6.5 ICIL Cross-Ref

Use with: `devops-infra/03` (CI/CD), `testing-qa/07` (quality metrics)

## ⚡ Action Checklist
- [ ] Full test suite runs on every push (lint + typecheck + unit + E2E)
- [ ] Flaky tests tracked in issue tracker; `.skip` with ticket number
- [ ] Test artifacts uploaded: coverage report, screenshots on failure
- [ ] E2E tests sharded (3-4 shards) for CI speed
- [ ] Pre-commit hook: lint + typecheck (not full suite — keep it fast)
