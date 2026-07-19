# ⚙️ 01 — Clean Code & SOLID Principles

> 🟢 Beginner | Prereq: — | ~9 min

Clean code = code that's readable, maintainable, and predictable. SOLID = 5 principles that make OOP code resilient to change. Together they form the foundation of professional software engineering.

---

## 1.1 Clean Code Rules

| Rule | Bad | Good |
|------|-----|------|
| Meaningful names | `d`, `data`, `tmp` | `invoiceTotal`, `customerEmail` |
| Small functions | 200-line monster | 5-15 lines, does ONE thing |
| No side effects | Function changes global state silently | Pure functions or explicit mutation |
| Avoid comments | Comment explains WHAT | Code is self-documenting; comments explain WHY |
| DRY | Copy-paste code blocks | Extract shared logic into functions/classes |

## 1.2 SOLID — 5 Principles

| Principle | Meaning | AI Agent Rule |
|-----------|---------|--------------|
| **S**RP | Single responsibility | One class = one reason to change |
| **O**CP | Open for extension, closed for modification | Add features via extension, not modification |
| **L**SP | Liskov substitution | Subclass must be usable wherever parent is expected |
| **I**SP | Interface segregation | Small focused interfaces > one fat interface |
| **D**IP | Dependency inversion | Depend on abstractions, not concretions |

## 1.3 Applying SOLID

```ts
// BEFORE: Violates SRP + DIP
class OrderService {
  processOrder(order: Order) {
    this.validate(order);           // validation
    this.saveToDB(order);           // persistence
    this.sendEmail(order);          // notification
  }
}

// AFTER: SRP + DIP applied
class OrderService {
  constructor(
    private validator: IValidator,
    private repo: IOrderRepo,
    private notifier: INotifier
  ) {}
  processOrder(order: Order) {
    this.validator.validate(order);
    this.repo.save(order);
    this.notifier.send(order);
  }
}
```

## 1.4 Anti-Patterns

- **God class** — one class does everything (violates SRP)
- **Shotgun surgery** — one change requires editing 10 files
- **Primitive obsession** — using strings/ints instead of domain types

## 1.5 ICIL Cross-Ref

Use with: `design-patterns/01` (UI patterns), `improvement/06` (iterative refinement)

## ⚡ Action Checklist

- [ ] Audit: any function > 20 lines? Split it
- [ ] Check: does every class have ONE reason to change?
- [ ] Verify: are dependencies injected, not created internally?
- [ ] Review: can you add a feature WITHOUT modifying existing code?
- [ ] Naming: would a junior dev understand every variable name?
