# ⚙️ 07 — Project Structure & Dependency Injection

> 🔴 Advanced | Prereq: 02,04 | ~9 min

Monorepo or polyrepo? How do you organize a codebase that scales past 100 files? And how do you wire dependencies without creating spaghetti? This covers the structural decisions that keep codebases maintainable.

---

## 7.1 Monorepo vs Polyrepo

| | Monorepo | Polyrepo |
|---|----------|----------|
| **Code sharing** | Easy (same repo) | Package registry needed |
| **Atomic changes** | One commit across packages | Multiple PRs, coordinated |
| **CI complexity** | Needs smart diff-based builds | Simple per-repo CI |
| **Best for** | Tightly coupled teams | Independent microservices |

```
Monorepo structure:
packages/
├── shared/          # @myorg/shared — types, utils
├── api/             # @myorg/api — backend
├── web/             # @myorg/web — frontend
├── workers/         # @myorg/workers — background jobs
├── eslint-config/   # @myorg/eslint-config
└── tsconfig/        # @myorg/tsconfig — base TS config
```

## 7.2 Dependency Injection Container

```ts
// Without DI: hardcoded dependencies
class OrderService {
  constructor() {
    this.db = new PostgresClient();     // ← hardcoded
    this.mailer = new SendGridMailer(); // ← hardcoded
    this.logger = new ConsoleLogger();  // ← hardcoded
  }
}

// With DI: inject dependencies
interface Container {
  db: Database;
  mailer: Mailer;
  logger: Logger;
}

class OrderService {
  constructor(private deps: Pick<Container, 'db' | 'mailer' | 'logger'>) {}
  
  async createOrder(data: OrderInput) {
    this.deps.logger.info('Creating order', { data });
    const order = await this.deps.db.orders.create(data);
    await this.deps.mailer.sendConfirmation(order.customerEmail, order.id);
    return order;
  }
}

// Wire up at application boundary
const container: Container = {
  db: new PostgresClient(process.env.DATABASE_URL),
  mailer: new SendGridMailer(process.env.SENDGRID_KEY),
  logger: new PinoLogger()
};

// Testing: swap real deps for mocks
const testContainer = {
  db: new MockDatabase(),
  mailer: new MockMailer(),
  logger: new NoopLogger()
};
```

## 7.3 File Naming Conventions

```
✅ order.service.ts         ← feature.type.ts
✅ create-order.handler.ts  ← action.type.ts
✅ user.repository.ts       ← entity.type.ts
❌ orders.ts                ← too vague
❌ utils/helpers.ts         ← dumping ground
❌ index.ts everywhere      ← bad for IDE navigation
```

## 7.4 Anti-Patterns

- **`utils/helpers.ts`** — dumping ground that grows forever; categorize by domain
- **Circular dependencies** — A imports B, B imports A; use dependency inversion
- **`new X()` in constructors** — hardcodes implementation; always inject

## 7.5 ICIL Cross-Ref

Use with: `software-engineering/01` (SOLID), `software-engineering/02` (architecture)

## ⚡ Action Checklist
- [ ] Monorepo for < 5 teams; polyrepo for independent microservices
- [ ] Every dependency is injected, never created with `new` inside a class
- [ ] Shared code in `packages/shared`, imported as `@myorg/shared`
- [ ] File naming: `{feature}.{type}.ts` — consistent, IDE-friendly
- [ ] No circular imports — run `madge --circular src/` in CI
