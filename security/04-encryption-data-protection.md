# 🔐 04 — Encryption & Data Protection

> 🟡 Intermediate | Prereq: 01 | ~9 min

Encryption protects data in transit (TLS) and at rest (disk/database). Secrets management keeps API keys out of source code. Get encryption wrong and the authentication system is irrelevant.

---

## 4.1 TLS — Encrypt Everything in Transit

```
ALWAYS:
  → HTTPS for all production traffic
  → TLS 1.2 minimum, TLS 1.3 preferred
  → Let's Encrypt (free, auto-renew)

NEVER:
  → Self-signed certs in production
  → Mixed content (HTTP resources on HTTPS page)
  → Expired certificates
```

```nginx
# Force HTTPS + modern TLS
server {
    listen 80;
    return 301 https://$host$request_uri;
}
server {
    listen 443 ssl http2;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
}
```

## 4.2 Hashing vs Encryption

| | Hash (one-way) | Encryption (two-way) |
|---|---------------|---------------------|
| Use | Passwords | Sensitive data you need to decrypt |
| Algorithm | bcrypt, argon2 | AES-256-GCM |
| Can reverse? | No | Yes (with key) |
| Salt/IV | Always salted | Always use random IV |

## 4.3 Secrets Management

```bash
# ❌ NEVER: hardcoded secrets
const API_KEY = "sk_live_abc123";  // ← COMMITTED TO GIT

# ✅ Use environment variables
const API_KEY = process.env.STRIPE_KEY;

# ✅ Use secret manager (production)
gcloud secrets versions access latest --secret=STRIPE_KEY
```

```ts
// Startup validation — fail fast if secrets missing
const requiredSecrets = ['DATABASE_URL', 'JWT_SECRET', 'STRIPE_KEY'];
for (const secret of requiredSecrets) {
  if (!process.env[secret]) {
    throw new Error(`Missing required secret: ${secret}`);
  }
}
```

## 4.4 Encrypting Sensitive Data at Rest

```ts
import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const KEY = Buffer.from(process.env.ENCRYPTION_KEY, 'hex'); // 32 bytes

function encrypt(text: string): { encrypted: string; iv: string; tag: string } {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);
  
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  return {
    encrypted,
    iv: iv.toString('hex'),
    tag: cipher.getAuthTag().toString('hex')
  };
}
```

## 4.5 Anti-Patterns

- **AES-256-CBC without authentication** — use GCM mode (authenticated encryption)
- **Hardcoded encryption keys** — store in KMS/secret manager, rotate quarterly
- **Encrypting passwords** — passwords should be HASHED (bcrypt), not encrypted

## 4.6 ICIL Cross-Ref

Use with: `security/02` (password hashing), `devops-infra/05` (TLS config)

## ⚡ Action Checklist
- [ ] All traffic over HTTPS (TLS 1.3); HTTP redirects to HTTPS
- [ ] Passwords hashed with bcrypt (cost ≥ 12); encryption keys in KMS
- [ ] Secrets never in code/config files — env vars or secret manager
- [ ] `.env` and `.env.*` in `.gitignore` — never committed
- [ ] Encryption key rotation plan documented and tested
