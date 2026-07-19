# 🗄️ 07 — Security & Backup

> 🔴 Advanced | Prereq: 01,04 | ~9 min

Database security and backup are the last line of defense. A compromised or lost database means business failure. Encryption, access control, and disaster recovery are non-negotiable.

---

## 7.1 Database Security Layers

```
┌────────────────────────────────────┐
│ NETWORK: firewall, VPC, no public  │
├────────────────────────────────────┤
│ ACCESS: least privilege, RBAC      │
├────────────────────────────────────┤
│ DATA: encryption at rest + transit │
├────────────────────────────────────┤
│ AUDIT: query logging, anomaly det  │
├────────────────────────────────────┤
│ BACKUP: automated, encrypted, off-site│
└────────────────────────────────────┘
```

## 7.2 Access Control

```sql
-- NEVER: GRANT ALL on everything
-- ALWAYS: least privilege per role

-- Read-only analyst
CREATE ROLE analyst WITH LOGIN PASSWORD 'secure_pass';
GRANT CONNECT ON DATABASE mydb TO analyst;
GRANT USAGE ON SCHEMA public TO analyst;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO analyst;

-- Application role (CRUD, no DDL)
CREATE ROLE app WITH LOGIN PASSWORD 'app_pass';
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO app;
-- No CREATE/ALTER/DROP — app can't change schema

-- Admin role (full access, use sparingly)
CREATE ROLE admin WITH LOGIN PASSWORD 'admin_pass' SUPERUSER;
```

## 7.3 Backup Strategy

```bash
# Full backup (daily)
pg_dump mydb | gzip > backup_$(date +%Y%m%d).sql.gz

# Continuous backup (WAL archiving for point-in-time recovery)
# postgresql.conf:
wal_level = replica
archive_mode = on
archive_command = 'gzip < %p > /backups/wal/%f.gz'

# Restore to point in time
pg_restore -d mydb backup.sql
# Or: restore + replay WAL to specific timestamp

# Encrypt backup before storing
gpg --encrypt --recipient dba@company.com backup.sql.gz
```

## 7.4 Backup Rules

| Rule | Why |
|------|-----|
| **3-2-1 rule** | 3 copies, 2 media, 1 off-site |
| **Automated daily** | Manual backups WILL be forgotten |
| **Test restore monthly** | Untested backup = no backup |
| **Encrypt backups** | Backup contains all customer data |
| **Retention policy** | Daily × 30, Weekly × 12, Monthly × forever |

## 7.5 Anti-Patterns

- **Public database port** — never expose 5432/3306 to internet; VPC + VPN only
- **`GRANT ALL` habit** — start with nothing, add only what's needed
- **"We'll back up later"** — day 1 = backup configured

## 7.6 ICIL Cross-Ref

Use with: `devops-infra/04` (cloud), `database-management/04` (migrations)

## ⚡ Action Checklist
- [ ] Database NEVER exposed to public internet (VPC + VPN/SSH tunnel)
- [ ] Application role has no DDL permissions (SELECT/INSERT/UPDATE/DELETE only)
- [ ] Automated daily backups with 30-day retention
- [ ] Test restore process monthly — timed, documented, verified
- [ ] Encryption: data at rest (disk encryption) + in transit (TLS) + backups (GPG)
