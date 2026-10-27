# Security Policy

ICIL is a **read-only, offline knowledge base** plus a local MCP server. It ships
Markdown courses, a routing library (`campus-core.js`), a CLI
(`load-context.js`), and a stdio MCP server (`mcp-server.js`). It has no hosted
service, no database, and no network listener.

## Supported versions

| Version | Supported |
|---------|-----------|
| `27.1.x` | ✅ |
| `< 27.1` | ❌ (historical snapshots only) |

Security fixes land on the latest `27.1.x` line.

## Reporting a vulnerability

Please **do not open a public issue** for a security problem.

Use GitHub's private vulnerability reporting:

**https://github.com/kandarlubis31/ICIL/security/advisories/new**

Include:

- affected version or commit;
- the tool/function involved (`getCourseContent`, an MCP tool, the CLI, etc.);
- a minimal reproduction (prompt, file path, or JSON-RPC request);
- impact and any suggested fix.

You can expect an acknowledgement within **7 days** and a status update within
**30 days**. This is a volunteer-maintained project, so timelines are best-effort.

## Security model

| Property | Guarantee |
|----------|-----------|
| **File access** | `getCourseContent()` only reads `faculty/file.md` inside the repository root. Absolute paths, `..` traversal, non-`.md` files, root-level files, and symlinks resolving outside the root are rejected. |
| **Network** | The MCP server speaks JSON-RPC over **stdio only**. It opens no ports and makes no outbound requests. |
| **Write operations** | None. Every MCP tool is read-only; `export_course` returns rendered text and never writes files. |
| **Secrets** | No API keys, tokens, or credentials are required or stored. |
| **Dependencies** | Two runtime dependencies (`@modelcontextprotocol/sdk`, `zod`). CI runs `npm audit --omit=dev --audit-level=high`; the current baseline is **0 vulnerabilities**. |

### Prompt injection and untrusted content

Course files are **data**, not instructions. An agent that loads a course should
treat its contents as reference material, not as commands. ICIL does not
sanitize Markdown for adversarial prompt injection, because doing so would
corrupt legitimate technical content (code samples, quoted prompts, security
examples). If your threat model includes untrusted course files, review content
before adding it to the catalog.

Reports about prompt injection in **third-party content** are out of scope unless
they demonstrate a code-level escape (for example, reading a file outside the
campus root).

## Dependency policy

- Runtime dependencies stay within semver-compatible ranges.
- `npm ci` is the supported install path; `package-lock.json` is committed.
- A high or critical advisory in a runtime dependency blocks release.
- Dev-only advisories are tracked but do not block a release unless they affect
  the published tarball.

## Hardening checklist for contributors

- [ ] Never add an MCP tool that writes to disk or makes network calls without a
      separate security review.
- [ ] Keep `getCourseContent()` as the only file-reading entry point.
- [ ] Run `npm test`, `npm run mcp:smoke`, and `npm audit --omit=dev --audit-level=high`.
- [ ] When adding dependencies, check `npm audit` and the package's maintenance
      status before merging.
