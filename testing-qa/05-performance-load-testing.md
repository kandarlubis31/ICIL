# 🧪 05 — Performance & Load Testing

> 🟡 Intermediate | Prereq: 01 | ~8 min

Load testing answers: "How many users can my app handle before it breaks?" It's not optional — it's the only way to catch capacity issues before your users do.

---

## 5.1 Load Test Types

| Type | Question | Tool |
|------|----------|------|
| **Load** | Normal traffic, is it stable? | k6, artillery |
| **Stress** | At what point does it break? | k6 (ramping VUs) |
| **Soak** | Does it degrade over hours? | k6 (long duration) |
| **Spike** | Can it handle sudden bursts? | k6 (abrupt ramp) |

## 5.2 k6 Load Test

```js
// load-test.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 50 },   // ramp to 50 users
    { duration: '3m', target: 50 },   // stay at 50
    { duration: '1m', target: 0 },    // ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% requests < 500ms
    http_req_failed: ['rate<0.01'],   // < 1% error rate
  },
};

export default function () {
  const res = http.get('https://api.myapp.com/products');
  check(res, { 'status 200': (r) => r.status === 200 });
  sleep(1);
}
```

```bash
k6 run load-test.js
# Output: checks, thresholds, P95 latency, error rate
```

## 5.3 Key Metrics

```
REQUESTS:
  → P50/P95/P99 latency (not average!)
  → Requests per second (RPS)
  → Error rate (should be < 1%)

INFRASTRUCTURE (during test):
  → CPU usage, memory, DB connections
  → Queue depth, thread pool exhaustion
  → GC pauses (Node.js: --trace-gc)
```

## 5.4 Anti-Patterns

- **Testing from localhost** — network latency = 0ms; test from cloud to cloud
- **One run = confident** — run 3+ times; variance is real
- **No infrastructure monitoring** — latency spike + no CPU spike = network issue, not code

## 5.5 ICIL Cross-Ref

Use with: `performance/06` (load testing), `devops-infra/06` (monitoring)

## ⚡ Action Checklist
- [ ] Run load test before every major release (staging env)
- [ ] Set thresholds: P95 < 500ms, error rate < 1%
- [ ] Monitor infrastructure during tests (CPU, memory, DB connections)
- [ ] Test from production-like environment (not localhost)
- [ ] Document max capacity: "App handles 200 req/s at P95 < 500ms"
