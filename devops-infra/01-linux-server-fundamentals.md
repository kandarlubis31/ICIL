# 🐳 01 — Linux Server Fundamentals

> 🟢 Beginner | Prereq: — | ~8 min

Every deployed application runs on Linux. Understanding the server OS is non-negotiable for DevOps. This covers the essentials: SSH, users, permissions, processes, and package management.

---

## 1.1 Core Commands

| Command | Purpose | Example |
|---------|---------|---------|
| `ssh` | Remote login | `ssh user@host -p 22` |
| `scp` | Copy files | `scp file.txt user@host:/path` |
| `systemctl` | Service control | `systemctl restart nginx` |
| `journalctl` | View logs | `journalctl -u nginx -f` |
| `ps aux` | Process list | `ps aux \| grep node` |
| `htop` | Interactive process monitor | `htop` |

## 1.2 File Permissions

```
-rwxr-xr--  1 user group  4096 Jul 15 app.js
 └┬┘└─┬─┘└─┬─┘
  │   │    └─ Others: read only
  │   └─ Group: read + execute
  └─ Owner: read + write + execute

chmod 755 file   → rwxr-xr-x
chmod 600 file   → rw-------
chown user:group file
```

## 1.3 Systemd Service Unit

```ini
# /etc/systemd/system/myapp.service
[Unit]
Description=My Node App
After=network.target

[Service]
Type=simple
User=appuser
WorkingDirectory=/opt/myapp
ExecStart=/usr/bin/node server.js
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

```bash
systemctl daemon-reload
systemctl enable --now myapp
systemctl status myapp
```

## 1.4 Anti-Patterns

- Running apps as `root` — always create dedicated service users
- `chmod 777` — never grant all permissions to everyone
- Ignoring `journalctl` — logs are your first debugging tool

## 1.5 ICIL Cross-Ref

Use with: `service-design/05` (handoff patterns), `improvement/02` (audit)

## ⚡ Action Checklist

- [ ] Create dedicated non-root user for each application
- [ ] Set up SSH key authentication (disable password login)
- [ ] Write a systemd service file for auto-restart on crash
- [ ] Configure `journalctl` log rotation (max size, retention)
- [ ] Run `htop` — understand every process consuming CPU/RAM
