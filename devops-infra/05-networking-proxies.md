# 🐳 05 — Networking & Proxies

> 🟡 Intermediate | Prereq: 01 | ~8 min

Everything talks over the network. DNS resolves names, reverse proxies route traffic, TLS encrypts it. Master these three and you can debug 80% of connectivity issues.

---

## 5.1 DNS Resolution

```
User types "api.myapp.com"
  │
  ▼
DNS Resolver → Root DNS → .com TLD → myapp.com NS → api A record
  │
  ▼
Returns: 34.117.45.12
  │
  ▼
Browser connects to IP
```

| Record | Purpose | Example |
|--------|---------|---------|
| **A** | IPv4 address | `api → 34.117.45.12` |
| **AAAA** | IPv6 address | `api → 2607:f8b0::` |
| **CNAME** | Alias to another domain | `www → myapp.com` |
| **MX** | Mail server | `→ mail.google.com` |
| **TXT** | Arbitrary text (verification) | SPF, DKIM records |

## 5.2 Nginx Reverse Proxy

```nginx
# /etc/nginx/sites-available/myapp
server {
    listen 80;
    server_name api.myapp.com;
    return 301 https://$host$request_uri;  # force HTTPS
}

server {
    listen 443 ssl http2;
    server_name api.myapp.com;

    ssl_certificate     /etc/letsencrypt/live/api.myapp.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.myapp.com/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    limit_req zone=api burst=20 nodelay;
}
```

## 5.3 TLS Essentials

```
Client                    Server
  │──── ClientHello ───────▶│  (supported ciphers, TLS version)
  │◀─── ServerHello + Cert ─│  (chosen cipher, certificate)
  │──── Key Exchange ──────▶│  (encrypted session key)
  │◀────── Finished ────────│  (secure channel established)
  │══ Encrypted Traffic ════│

Let's Encrypt = free TLS certs, auto-renewable via certbot
Always use TLS 1.2 minimum (TLS 1.3 preferred)
```

## 5.4 Anti-Patterns

- **Exposing app directly** — always put nginx/load balancer in front
- **HTTP in production** — HTTPS everywhere; Let's Encrypt is free
- **No rate limiting** — one bad actor can overwhelm your API

## 5.5 ICIL Cross-Ref

Use with: `devops-infra/01` (Linux), `software-engineering/03` (API design)

## ⚡ Action Checklist
- [ ] DNS: A record points to server IP, CNAME for www → root
- [ ] Nginx reverse proxy in front of every application
- [ ] TLS via Let's Encrypt with auto-renewal cron job
- [ ] Rate limiting: 10 req/s per IP, burst 20
- [ ] All HTTP traffic redirected to HTTPS (301)
