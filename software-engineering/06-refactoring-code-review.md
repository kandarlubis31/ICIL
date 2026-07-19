# ⚙️ 06 — Refactoring & Code Review

> 🟡 Intermediate | Prereq: 01,05 | ~9 min

Refactoring = changing code structure without changing behavior. Code review = the last line of defense before bugs reach production. Together they form the continuous improvement cycle.

---

## 6.1 Code Smells → Refactoring

| Smell | Symptom | Refactoring |
|-------|---------|-------------|
| **Long function** | > 20 lines, does multiple things | Extract function |
| **Long parameter list** | > 4 params | Introduce parameter object |
| **Duplicate code** | Same logic in 2+ places | Extract shared function |
| **Feature envy** | Method uses another class's data more than its own | Move method |
| **Switch statements** | Type-checking with if/switch | Replace with polymorphism |
| **Magic numbers** | `if (status === 3)` | Replace with named constant |

## 6.2 Safe Refactoring Process

```
1. WRITE TESTS (if none exist) ← NEVER refactor without tests
2. MAKE ONE SMALL CHANGE
3. RUN TESTS → GREEN? Continue. RED? Revert.
4. COMMIT
5. REPEAT until clean
```

```ts
// BEFORE: God function with magic numbers
function processOrder(order: any) {
  if (order.type === 1) {         // ← magic number
    // 50 lines of type-1 logic...
  } else if (order.type === 2) {  // ← magic number
    // 50 lines of type-2 logic...
  }
}

// AFTER: Polymorphism + constants
enum OrderType { STANDARD = 1, EXPRESS = 2 }

interface OrderProcessor {
  process(order: Order): void;
}

class StandardOrderProcessor implements OrderProcessor {
  process(order: Order) { /* type-1 logic */ }
}

class ExpressOrderProcessor implements OrderProcessor {
  process(order: Order) { /* type-2 logic */ }
}

const processors = new Map<OrderType, OrderProcessor>([
  [OrderType.STANDARD, new StandardOrderProcessor()],
  [OrderType.EXPRESS, new ExpressOrderProcessor()]
]);
```

## 6.3 Code Review Checklist

```
[ ] Does it work? (logic correct, edge cases handled)
[ ] Is it secure? (input validation, auth, no secrets exposed)
[ ] Is it tested? (tests cover new code + edge cases)
[ ] Is it readable? (clear names, no magic numbers)
[ ] Is it simple? (could a junior dev understand it?)
[ ] No duplication? (DRY — extract shared logic)
[ ] No dead code? (commented-out blocks, unused imports)
```

## 6.4 Anti-Patterns

- **"Rewrite everything"** — incremental refactoring > big bang rewrite
- **Refactoring without tests** — you WILL break something
- **Nitpicking in reviews** — focus on logic, security, architecture; not formatting

## 6.5 ICIL Cross-Ref

Use with: `software-engineering/01` (clean code), `improvement/06` (iterative)

## ⚡ Action Checklist
- [ ] Write tests before refactoring (if tests don't exist)
- [ ] One refactoring per commit — atomic, reversible
- [ ] Run full test suite after each change
- [ ] Code review: check logic + security first, style second
- [ ] Use automated formatters (Prettier) to eliminate style debates
