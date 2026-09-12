# portfolio-main

Next.js 15 static portfolio for chetcarter.com. Deployed to Hostinger.

## Commands

```bash
npm run dev       # localhost:3000
npm run build     # static export -> out/
npm run lint      # eslint .  (NOT `next lint` — deprecated in 15, removed in 16)
npx tsc --noEmit  # typecheck
```

`npm start` is inert. `output: 'export'` means there is no server to start.

## Architecture

`output: 'export'` in `next.config.mjs` is the most consequential fact about
this repo. Every route prerenders to static HTML; there is no server runtime.
Consequences:

- No `next/image` optimization — `sharp` is in the tree but never invoked.
- No instrumentation file. Sentry warns about the missing one on every build,
  which is suppressed at the top of `next.config.mjs` rather than satisfied
  with a file that could never execute.
- No API routes, middleware, or server actions.

```
app/             routes
components/ui/   presentational components
data/index.ts    site content (projects, testimonials, nav)
lib/             helpers
```

## Deploy

Merge to `main` → CI (lint, typecheck, build) → Deploy workflow → `rsync` over
SSH to Hostinger. There is no FTP path and one should not be added: SSH keys,
`--delete-after` pruning, host-key pinning and a web-root guard all already
exist, and a second write path to one document root invites drift.

Manual run: Actions → Deploy. It takes a `dry_run` input that previews changes
without uploading.

Deploys are verified by comparing `out/index.html`'s checksum against the
server's, over the same SSH connection that did the upload. **Never gate CI on
an HTTP probe of the live site.** Hostinger's CDN answers GitHub runner IPs
with 403 regardless of the site's health; that check already failed one
perfectly healthy deploy while browsers were served 200 throughout.

## Gotchas

- **ESLint is pinned to a deprecated 9.x on purpose.** 10.x is blocked by
  `eslint-plugin-react` (latest release still caps its eslint peer at `^9.7`)
  and by Next's vendored babel parser. Read issue #29 before attempting the
  upgrade — the full diagnosis is there.
- **Lint baseline is exactly 18 warnings, 0 errors.** When changing lint
  config, verify the same *set* — file, line, column, rule, severity — not the
  same count. All 18 are warnings, so a config that silently lost every
  error-level rule produces identical output.
- **`lib/webgl.ts` is deliberately not memoized.** WebGL availability is a live
  property of the device, not a fact about the browser. Caching it lets a later
  caller mount a `<Canvas>` into an exhausted device and reintroduces
  JAVASCRIPT-NEXTJS-7, the site's top Sentry issue.
- **Sentry only reports production traffic.** `instrumentation-client.ts` drops
  events from local hosts and events whose stack contains no first-party
  frames. Most of the issue list was once `next dev` and browser extensions.
- **Sentry releases are created only in the deploy build.** CI builds the same
  code but never ships it, so it must not mint releases —
  `SENTRY_AUTH_TOKEN` is passed to the deploy build alone.
  `sentry.shared.mjs` is the single source for the org and project slugs; do
  not hardcode them anywhere else.

## Branch protection on `main`

Squash merges only, linear history required, the `ci` check must pass, and
review threads must be resolved before merge. A PR that merges at a stale head
can silently drop commits pushed after review — verify what actually landed.
