# OSI — project context for Claude Code

> Project-specific context layered on top of the global standards in `~/.claude/CLAUDE.md`.

## What it does
A polished public website for Oman Space Initiative, a youth-led platform focused on strengthening Oman’s space-sector pipeline through awareness, education, and hands-on experience.

## Stack
node, ts

## Commands
```bash
npm ci
npm run dev
npm test
npm run build
```

## Conventions
- Conventional commits, one logical change each; secrets never hardcoded; external API calls via a service layer; errors normalized before the client.
- TypeScript: strict mode, zero `any`, interfaces in `types.ts` first, CSS variables only.

