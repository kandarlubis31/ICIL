# 🔐 03 — API & Input Security

> 🟡 Intermediate | Prereq: 01 | ~9 min

APIs are the #1 attack surface. Every endpoint that accepts input is a potential vulnerability. Rate limiting, input validation, and CORS are your first line of defense.

---

## 3.1 Input Validation — Never Trust User Input

```ts
import { z } from 'zod';

const CreateOrderSchema = z.object({
  productId: z.number().int().positive(),
  quantity: z.number().int().min(1).max(100),
  coupon: z.string().max(20).regex(/^[A-Z0-9]+$/).optional(),
  email: z.string().email().max(255)
});

function createOrder(req: Request, res: Response) {
  const result = CreateOrderSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(422).json({ 
      error: 'Validation failed', 
      details: result.error.flatten() 
    });
  }
  // result.data is now typed and validated
  const order = await orderService.create(result.data);
  res.status(201).json({ data: order });
}
```

## 3.2 SQL Injection Defense

```ts
// ❌ VULNERABLE: string concatenation
await db.query(`SELECT * FROM users WHERE email = '${email}'`);
// Attacker input: ' OR '1'='1' -- 
// Results in: SELECT * FROM users WHERE email = '' OR '1'='1' --' ← ALL users

// ✅ SAFE: parameterized query
await db.query('SELECT * FROM users WHERE email = $1', [email]);

// ✅ SAFE: ORM
await db.user.findUnique({ where: { email } });
```

## 3.3 Rate Limiting

```ts
import rateLimit from 'express-rate-limit';

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                   // 100 requests per window
  standardHeaders: true,
  message: { error: 'Too many requests, try again later' }
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // 5 login attempts per 15 min
  skipSuccessfulRequests: true // only count failures
});

app.use('/api/', apiLimiter);
app.use('/auth/login', authLimiter);
```

## 3.4 CORS Configuration

```ts
const allowedOrigins = [
  'https://myapp.com',
  'https://staging.myapp.com'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400 // 24h preflight cache
}));
```

## 3.5 Anti-Patterns

- **`Access-Control-Allow-Origin: *` with credentials** — never combine wildcard CORS with cookies
- **Trusting Content-Type alone** — validate actual content, not just headers
- **No request size limit** — `body-parser` default is 100KB; large uploads need explicit limit

## 3.6 ICIL Cross-Ref

Use with: `software-engineering/03` (API design), `security/02` (auth)

## ⚡ Action Checklist
- [ ] All inputs validated with schema (Zod/Yup/Joi) — never raw `req.body`
- [ ] Every DB query uses parameterized statements or ORM
- [ ] Rate limiting on all auth endpoints (5/15min) + API (100/15min)
- [ ] CORS: explicit origin allowlist, never wildcard with credentials
- [ ] Request size limit set: 1MB for JSON, 10MB for file uploads
