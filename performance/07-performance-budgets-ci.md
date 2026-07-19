# ⚡ 07 — Performance Budgets & CI

> 🔴 Advanced | Prereq: 01,06 | ~8 min

A performance budget is a contract: "this page loads in under 3 seconds on 3G." CI enforces it. Cross the budget → build fails. No more silent performance regressions.

---

## 7.1 Setting a Performance Budget

```
EXAMPLE BUDGET:
  LCP      < 2.5s
  TBT      < 200ms
  CLS      < 0.1
  JS size  < 200KB (per route)
  CSS size < 50KB
  Image    < 100KB (hero), < 20KB (thumbnails)

BASELINE: Measure current state → set budget 20% better → improve → tighten
```

## 7.2 Lighthouse CI

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse
on: [pull_request]

jobs:
  lhci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run build
      - run: |
          npx @lhci/cli autorun --config=.lighthouserc.js
```

```js
// .lighthouserc.js
module.exports = {
  ci: {
    collect: { url: ['http://localhost:3000/', 'http://localhost:3000/pricing'] },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'total-blocking-time': ['error', { maxNumericValue: 200 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }]
      }
    },
    upload: { target: 'temporary-public-storage' }
  }
};
```

## 7.3 Bundle Size Monitoring

```bash
# Webpack bundle analyzer
npm run build -- --analyze

# Bundlewatch: fail CI on size increase
# .bundlewatch.config.js
module.exports = {
  files: [
    { path: './dist/**/*.js', maxSize: '200KB' },
    { path: './dist/**/*.css', maxSize: '50KB' }
  ]
};
```

## 7.4 Performance Regression Workflow

```
1. CI runs Lighthouse on PR
2. LCP > 2.5s? → PR BLOCKED
3. Developer investigates:
   → Check bundle analyzer: new dependency added 150KB?
   → Check image: 4MB hero added without optimization?
4. Fix the regression
5. Re-run CI → green → merge
```

## 7.5 Anti-Patterns

- **Budget without enforcement** — "we should be fast" = meaningless; CI must block regressions
- **Unrealistic budgets** — LCP < 100ms on a rich app = impossible; budget what's achievable
- **Checking performance only before release** — by then it's too late

## 7.6 ICIL Cross-Ref

Use with: `performance/01` (Core Web Vitals), `devops-infra/03` (CI/CD)

## ⚡ Action Checklist
- [ ] Performance budget defined and documented (LCP, TBT, CLS, bundle size)
- [ ] Lighthouse CI runs on every PR; fails build on budget violation
- [ ] Bundle size monitored; alert on > 10% increase
- [ ] Budget reviewed and tightened quarterly
- [ ] Performance leaderboard visible to entire team
