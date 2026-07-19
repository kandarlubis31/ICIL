# 🐳 06 — Monitoring & Logging

> 🔴 Advanced | Prereq: 04 | ~9 min

You can't fix what you can't see. Monitoring tracks system health; logging tells you what happened. Together they turn "it's down" into "CPU spiked at 14:32 due to N+1 query on orders table."

---

## 6.1 The Three Pillars

| Pillar | Tool | Answers |
|--------|------|---------|
| **Metrics** | Prometheus + Grafana | "How many? How fast? How full?" |
| **Logs** | Structured JSON logs | "What happened and when?" |
| **Traces** | OpenTelemetry | "Where did this request go?" |

## 6.2 Structured Logging

```ts
// BAD: Unstructured, unsearchable
console.log('Order created: ' + orderId);

// GOOD: Structured JSON, searchable in Cloud Logging/ELK
console.log(JSON.stringify({
  level: 'info',
  event: 'order.created',
  orderId: 'ord_123',
  customerId: 'cus_456',
  amount: 150.00,
  duration: 234,  // ms
  traceId: 'abc-123-def'
}));

// Production log levels
// ERROR: something broke, needs attention NOW
// WARN:  retry succeeded, rate limit hit, degraded but working
// INFO:  normal operations (order created, user signed up)
// DEBUG: detailed for debugging (disable in production)
```

## 6.3 Prometheus Metrics

```ts
import { Counter, Histogram } from 'prom-client';

// Counter: only goes up (requests, errors)
const ordersTotal = new Counter({
  name: 'orders_total',
  help: 'Total orders created',
  labelNames: ['status']
});

// Histogram: distribution (latency, payload size)
const orderDuration = new Histogram({
  name: 'order_creation_duration_seconds',
  help: 'Time to create an order',
  buckets: [0.1, 0.5, 1, 2, 5, 10]
});

// In your handler
const end = orderDuration.startTimer();
try {
  await createOrder(req.body);
  ordersTotal.inc({ status: 'success' });
} catch (e) {
  ordersTotal.inc({ status: 'error' });
  throw e;
} finally {
  end();
}
```

## 6.4 Alerting Rules

```
CRITICAL (page on-call immediately):
  → Error rate > 5% for 5 minutes
  → API latency P95 > 2s for 5 minutes
  → Disk > 90% full

WARNING (slack notification):
  → Memory > 80%
  → 4xx rate > 10% (possible abuse)
  → Certificate expires in < 7 days
```

## 6.5 Anti-Patterns

- **No dashboards** — flying blind; build at least: request rate, error rate, latency
- **Logging PII** — never log passwords, tokens, emails in plaintext
- **Alert fatigue** — if every alert is ignored, none are real

## 6.6 ICIL Cross-Ref

Use with: `devops-infra/01` (systemd/journalctl), `improvement/02` (audit)

## ⚡ Action Checklist
- [ ] All logs are structured JSON with traceId for correlation
- [ ] Three core metrics: request rate, error rate, P95 latency
- [ ] Dashboard shows last 24h with 5min granularity
- [ ] Alerts: critical pages on-call, warnings go to Slack
- [ ] Never log passwords, tokens, or PII in plaintext
