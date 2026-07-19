# 🔐 02 — Authentication & Authorization

> 🟡 Intermediate | Prereq: 01 | ~9 min

Auth is the gatekeeper. Authentication = "who are you?" Authorization = "what can you do?" Get either wrong and everything behind them is exposed.

---

## 2.1 Auth Patterns

| Pattern | How | Best For |
|---------|-----|----------|
| **Session + Cookie** | Server stores session, client sends cookie | Traditional web apps |
| **JWT** | Stateless token with claims | APIs, microservices |
| **OAuth 2.0 / OIDC** | Delegate auth to provider (Google, GitHub) | Social login, SSO |
| **API Key** | Secret key in header | Server-to-server, simple |

## 2.2 Password Storage — NEVER Plaintext

```ts
import bcrypt from 'bcrypt';

// REGISTER: hash with salt
const SALT_ROUNDS = 12;
const hashedPassword = await bcrypt.hash(userPassword, SALT_ROUNDS);
// Store hashedPassword in DB, NEVER raw password

// LOGIN: compare hash
const user = await db.user.findByEmail(email);
const isMatch = await bcrypt.compare(inputPassword, user.hashedPassword);
if (!isMatch) throw new AuthError('Invalid credentials');

// NEVER: SHA256, MD5, or plaintext — all broken for passwords
```

## 2.3 JWT Best Practices

```ts
import jwt from 'jsonwebtoken';

// Sign (set short expiry)
const token = jwt.sign(
  { userId: user.id, role: user.role },
  process.env.JWT_SECRET,  // ≥ 256-bit random string
  { expiresIn: '15m' }     // SHORT: 15 min access token
);

// Verify
try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
} catch (e) {
  if (e.name === 'TokenExpiredError') return res.status(401).json({ error: 'Token expired' });
  return res.status(401).json({ error: 'Invalid token' });
}

// NEVER: hardcode secret, store in env + rotate regularly
// NEVER: store sensitive data in JWT payload (it's base64, not encrypted)
```

## 2.4 Authorization — RBAC

```
ROLES:
  admin    → CRUD everything
  editor   → CRUD own content + read all
  viewer   → READ only

MIDDLEWARE:
function requireRole(...roles: string[]) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
}

app.delete('/users/:id', requireRole('admin'), deleteUser);
```

## 2.5 Anti-Patterns

- **Rolling your own crypto** — use bcrypt, not homemade hash
- **JWTs with no expiry** — stolen token = forever access
- **Auth in frontend only** — client-side checks are cosmetic; enforce on server

## 2.6 ICIL Cross-Ref

Use with: `security/03` (API security), `devops-infra/05` (TLS)

## ⚡ Action Checklist
- [ ] Passwords hashed with bcrypt (cost ≥ 12), never plaintext
- [ ] JWT expiry ≤ 15 min (access) + refresh token (24h, stored in httpOnly cookie)
- [ ] Every endpoint checks auth middleware (deny-by-default)
- [ ] RBAC: roles enforced server-side, never client-side only
- [ ] Rate limit login attempts (5 failures → 15 min lockout)
