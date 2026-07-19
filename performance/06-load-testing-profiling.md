# ⚡ 06 — Load Testing & Profiling

> 🔴 Advanced | Prereq: 03,04 | ~9 min

Load testing finds system limits. Profiling finds code hotspots. Together they turn "the app is slow" into "the orders query does a full table scan at 200 concurrent users."

---

## 6.1 Profiling — Find the Bottleneck

```bash
# Node.js — built-in CPU profiler
node --cpu-prof --cpu-prof-interval=100 server.js
# Generates: CPU.${timestamp}.cpuprofile
# Open in Chrome DevTools → Performance → Load profile

# Flamegraph visualization
npx 0x server.js        # Auto-opens flamegraph in browser
node --prof server.js    # V8 sampling profiler
node --prof-process isolate-*.log > processed.txt
```

## 6.2 Load Testing with k6

```js
import http from 'k6/http';
import { check } from 'k6';

export const options = {
  scenarios: {
    ramp_test: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '30s', target: 100 },  // ramp to 100 users
        { duration: '2m',  target: 100 },  // steady state
        { duration: '30s', target: 0 },    // ramp down
      ],
    },
  },
  thresholds: {
    http_req_duration: ['p(95)<500', 'p(99)<1000'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  // Simulate realistic user: browse → view product → search
  const products = http.get('https://api.myapp.com/products?page=1');
  check(products, { 'products OK': (r) => r.status === 200 });
  
  const search = http.get('https://api.myapp.com/products?q=laptop');
  check(search, { 'search OK': (r) => r.status === 200 });
}
```

## 6.3 Interpreting Results

```
HEALTHY:
  P95 < 500ms, P99 < 1000ms
  Error rate < 1%
  CPU < 70%, no OOM

UNHEALTHY:
  P95 spikes at 200 VUs → bottleneck found
  Error rate climbs → connection pool exhausted
  Response time increases linearly → DB index missing
```

## 6.4 Anti-Patterns

- **Testing from localhost** — network latency = 0; test from cloud VM
- **Only testing happy path** — 50% of real traffic hits cache misses, errors, edge cases
- **No profiling before optimizing** — you'll optimize the wrong thing

## 6.5 ICIL Cross-Ref

Use with: `performance/03` (backend), `performance/04` (database), `testing-qa/05` (load testing)

## ⚡ Action Checklist
- [ ] Run CPU profiler on production-like traffic; identify top 3 hotspots
- [ ] Load test to find breaking point (when does P95 exceed 500ms?)
- [ ] Monitor infrastructure during tests (CPU, memory, DB connections)
- [ ] Document: "App handles X req/s at P95 < 500ms with Y users"
- [ ] Test after every major database query or infrastructure change
