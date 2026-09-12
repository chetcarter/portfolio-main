# portfolio-main

Next.js 15 static portfolio for chetcarter.com. Deployed to Hostinger.

## Commands

```bash
npm run dev       # localhost:3000
npm run build     # static export -> out/
npm run lint      # eslint .  (NOT `next lint` — deprecated in 15, removed in 16)
npx tsc --noEmit  # typecheck
```

`npm start` does not work here — `next start` refuses an `output: 'export'`
build and exits. To preview the production build, serve `out/` statically:
`npx serve@latest out`, or the `static-export` entry in `.claude/launch.json`
(port 3005).

## Architecture

`output: 'export'` in `next.config.mjs` is the most consequential fact about
this repo. Every route prerenders to static HTML; there is no server runtime.
Consequences:

- No `next/image` optimization — `sharp` is in the tree but never invoked.
- No *server* `instrumentation.ts`. Sentry warns about the missing one on
  every build, which is suppressed at the top of `next.config.mjs` rather than
  satisfied with a file that could never execute. `instrumentation-client.ts`
  does exist and is the live client-side Sentry entry point — edit that one.
- No API routes, middleware, or server actions.

```
app/             routes
components/ui/   presentational components
data/index.ts    site content (projects, testimonials, nav)
lib/             helpers
```

## Deploy

Merge to `main` → CI (lint, typecheck, build) → Deploy workflow → `rsync` over
SSH to Hostinger. There is no FTP path and one should not be added: key-based
auth, `--delete-after` pruning and a web-root guard all already exist, and a
second write path to one document root invites drift. (The host key is
trust-on-first-use per job — `ssh-keyscan` seeds `known_hosts`, then
`StrictHostKeyChecking=yes` holds for the rest of that run. It is not pinned
against an independently trusted fingerprint.)

Manual run: Actions → Deploy. It takes a `dry_run` input that previews changes
without uploading.

Deploys are verified by comparing `out/index.html`'s checksum against the
server's over SSH — a separate `ssh` invocation from the one `rsync` opens,
using the same key and host. **Never gate CI on
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
- **Sentry reports from production *builds*, not only the production host.**
  `instrumentation-client.ts` enables the SDK when `NODE_ENV === "production"`
  and drops events from local hosts and events whose stack carries no
  first-party frames. A preview or staging deploy is a production build on a
  non-local host, so it still reports — and is tagged `production` unless
  `NEXT_PUBLIC_VERCEL_ENV` is set. Most of the issue list was once `next dev`
  and browser extensions.
- **Sentry releases are created only in the deploy build.** CI builds the same
  code but never ships it, so it must not mint releases —
  `SENTRY_AUTH_TOKEN` is passed to the deploy build alone.
  `sentry.shared.mjs` is the single source for the org and project slugs; do
  not hardcode them anywhere else.

## Working in this repo

- **An empty read is not proof of absence.** `gh run list --commit <sha>` has
  come back empty while those runs existed, and `ccd_pr get_status` reports 0
  checks for a few seconds after a PR opens — GitHub takes a moment to index.
  Re-read, or cross-check a different way, before reporting that something
  never ran. (`gh api` separately caches; `--cache 0` defeats that. It is a
  `gh api` flag only — `gh run list` rejects it.)
- `gh pr update-branch <n>` before `gh pr merge` — strict status checks reject
  a branch that is behind `main`.
- Copilot reviews most PRs but not all — it has skipped docs-only and
  lockfile-only ones. When it does comment, the ruleset requires threads
  resolved, so the merge stays blocked until each is answered and resolved.
  Check for threads rather than assuming either way.
- Test a workflow `run:` block by extracting and executing it, not by reading
  it:

  ```bash
  npx --yes js-yaml .github/workflows/deploy.yml \
    | jq -r '.jobs.deploy.steps[] | select(.name=="STEP NAME") | .run' > /tmp/step.sh
  bash -e /tmp/step.sh   # same `bash -e` GitHub uses
  ```

  This caught a heredoc that could not terminate and brace mangling that
  produced an invalid import — both of which `deploy.yml`'s warn-and-continue
  error handling would otherwise have hidden indefinitely.
- Proving a build option works needs a control run with the option *absent*.
  Comparing old-option against new-option output only shows they match, which
  is also what two no-ops look like.

## Branch protection on `main`

Squash merges only, linear history required, the `ci` check must pass, and
review threads must be resolved before merge. A PR that merges at a stale head
can silently drop commits pushed after review — verify what actually landed.
