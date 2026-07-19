# 🖥️ 02 — CLI Design Patterns

> 🟡 Intermediate | Prereq: 01 | ~7 min

CLI is the highest-bandwidth developer interface. A well-designed CLI feels like an extension of thought. Bad CLI = abandoned tool.

---

## 2.1 CLI Anatomy

```
$ tool [global-flags] <command> [subcommand] [args] [--flags]

$ icil search "color theory" --faculty warna --json
  │    │      │               │         │       │
  │    │      arg              │         │       flag
  │    │                      flag       │
  │    command                          value
  program
```

---

## 2.2 Command Naming Conventions

| Rule | Good | Bad |
|------|------|-----|
| Verb-noun pattern | `create-user` | `userCreate` |
| Consistent prefixes | `list`, `get`, `create`, `delete` | Mix of `show`, `fetch`, `add`, `remove` |
| No abbreviations | `deploy-production` | `deploy-prod` |
| Hyphenated | `add-ssh-key` | `addSshKey` or `add_ssh_key` |
| Single responsibility | `git commit` not `git commit-and-push` | Combined actions |

---

## 2.3 --help Standards

```
USAGE: icil <command> [options]

COMMANDS:
  search <query>    Search campus courses
  list              List all faculties
  print <faculty>   Print all courses in a faculty

OPTIONS:
  --json            Output as JSON (for programmatic use)
  --faculty <slug>  Filter by faculty
  --help            Show this help
  --version         Show version

EXAMPLES:
  icil search "color theory"
  icil list --json
  icil print warna
```

---

## 2.4 Output Design

| Pattern | Use When | Example |
|---------|----------|---------|
| **Plain text** | Simple status | `✓ Deployed 3 files (1.2s)` |
| **Table** | Comparison, lists | `ls -la` style |
| **JSON** (`--json`) | Pipe to jq, scripts | `icil list --json \| jq '.'` |
| **Progress bar** | Long ops > 3s | `[====>     ] 45%  uploading...` |
| **Color** | Errors (red), success (green) | `✗ Error:` vs `✓ Done:` |

---

## 2.5 Exit Codes

| Code | Meaning | When |
|------|---------|------|
| `0` | Success | Everything worked |
| `1` | General error | Catch-all failure |
| `2` | Misuse | Wrong flag, missing arg |
| `126` | Permission denied | Can't execute |
| `127` | Not found | Command doesn't exist |

---

## 2.6 CLI Design Standards

- POSIX conventions: `--version`, `--help`, `--`, short/long flags
- **[clig.dev](https://clig.dev/)** — modern CLI design guide (human-first, discoverable)
- GNU Coding Standards — comprehensive but verbose; POSIX subset preferred
- 12 Factor App: config via environment variables, not flags for secrets

---

## ⚡ Action Checklist

- [ ] Every command: consistent verb-noun naming
- [ ] `--help` includes USAGE + COMMANDS + OPTIONS + EXAMPLES
- [ ] `--json` flag on every command for programmatic use
- [ ] Exit codes: 0=success, 1=error, 2=misuse
- [ ] Test CLI with: `tool --help`, `tool --version`, `tool nonsense`
