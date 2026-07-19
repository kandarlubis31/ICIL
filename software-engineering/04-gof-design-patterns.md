# ⚙️ 04 — Design Patterns (GoF)

> 🟡 Intermediate | Prereq: 01 | ~9 min

The Gang of Four patterns are battle-tested solutions to recurring OOP problems. Not dogma — tooling. Master the 6 most common patterns and when NOT to use them.

---

## 4.1 The 6 Essential Patterns

| Pattern | Problem | Solution | Example |
|---------|---------|----------|---------|
| **Strategy** | Multiple algorithms, chosen at runtime | Encapsulate each algorithm in a class | Payment methods, sorting |
| **Observer** | One change → notify many | Subject maintains subscriber list | Event emitters, state management |
| **Factory** | Complex object creation | Delegate creation to factory method | DB connections, UI components |
| **Singleton** | Exactly one instance | Private constructor + static getter | Logger, config, DB pool |
| **Adapter** | Incompatible interfaces | Wrapper that translates calls | Legacy API wrappers |
| **Decorator** | Add behavior without subclassing | Wrap object in decorator class | Middleware, logging wrappers |

## 4.2 When NOT to Use Patterns

```
If the code is:
  → Simple (< 3 classes involved)     → DON'T use a pattern
  → One-time use / prototype           → DON'T use a pattern
  → Already solved by language feature → DON'T use a pattern

Example: Singleton in Node.js = just use module caching (require caches automatically)
```

## 4.3 Strategy + Factory Combo

```ts
// Strategy: different payment methods
interface PaymentStrategy {
  pay(amount: number): Promise<PaymentResult>;
}

class StripePayment implements PaymentStrategy {
  async pay(amount: number) { /* Stripe API */ }
}
class PayPalPayment implements PaymentStrategy {
  async pay(amount: number) { /* PayPal API */ }
}

// Factory: create the right strategy
function createPayment(method: 'stripe' | 'paypal'): PaymentStrategy {
  const strategies = { stripe: StripePayment, paypal: PayPalPayment };
  return new strategies[method]();
}

// Usage
const payment = createPayment('stripe');
await payment.pay(150.00);
```

## 4.4 Anti-Patterns

- **Pattern obsession** — forcing a pattern where a simple function suffices
- **Singleton abuse** — treating singleton as global variable (hidden coupling)
- **Inheritance over composition** — extends is fragile; prefer delegation

## 4.5 ICIL Cross-Ref

Use with: `design-patterns/01` (UI patterns), `strategic-design/05` (systems thinking)

## ⚡ Action Checklist
- [ ] Identify: which pattern solves this problem, not "which pattern can I use?"
- [ ] Favor composition over inheritance (Decorator > subclass explosion)
- [ ] Factory when creation logic is complex or conditional
- [ ] Strategy when you need to swap algorithms at runtime
- [ ] Skip Singleton in Node.js — module system handles it natively
