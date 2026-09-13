# Domain Docs

How the engineering skills should consume this repo's domain documentation when
exploring the codebase.

**Layout: single-context.** One `CONTEXT.md` and one `docs/adr/` at the repo
root. There is no `CONTEXT-MAP.md` and there should not be one unless this repo
becomes a genuine multi-package monorepo.

## Before exploring, read these

- **`CONTEXT.md`** at the repo root.
- **`docs/adr/`**: read ADRs that touch the area you're about to work in.

If these files don't exist, **proceed silently**. Don't flag their absence;
don't suggest creating them upfront. The `/domain-modeling` skill (reached via
`/grill-with-docs` and `/improve-codebase-architecture`) creates them lazily
when terms or decisions actually get resolved.

Neither exists as of this writing. `CLAUDE.md` currently carries the
architectural facts that would otherwise live in `CONTEXT.md` — most of all
that `output: 'export'` means there is no server runtime. Read `CLAUDE.md`
until a `CONTEXT.md` exists.

## File structure

```
/
├── CLAUDE.md          ← architecture + gotchas, today's source of truth
├── CONTEXT.md         ← glossary, once /domain-modeling creates it
├── docs/
│   ├── adr/           ← e.g. 0001-static-export-over-ssr.md
│   └── agents/        ← this directory
├── app/               routes
├── components/ui/     presentational components
├── data/index.ts      site content
└── lib/               helpers
```

Note this repo has no `src/`, so the multi-context `src/<context>/docs/adr/`
convention does not apply.

## Use the glossary's vocabulary

When your output names a domain concept (in an issue title, a refactor
proposal, a hypothesis, a test name), use the term as defined in `CONTEXT.md`.
Don't drift to synonyms the glossary explicitly avoids.

If the concept you need isn't in the glossary yet, that's a signal: either
you're inventing language the project doesn't use (reconsider) or there's a
real gap (note it for `/domain-modeling`).

## Flag ADR conflicts

If your output contradicts an existing ADR, surface it explicitly rather than
silently overriding:

> _Contradicts ADR-0007 (event-sourced orders), but worth reopening because…_

The same applies to the decisions recorded in `CLAUDE.md` — several are
load-bearing and were arrived at the hard way (the ESLint 9 pin, the
non-memoized `lib/webgl.ts`, the ban on HTTP-probing the live site from CI).
Contradict them explicitly, with the reason, or not at all.
