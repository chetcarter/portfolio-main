// Single source for the Sentry slugs. next.config.mjs hands them to the build
// plugin; .github/workflows/deploy.yml reads them from here when it records
// the deploy, so a rename cannot update one and miss the other. That drift
// would otherwise be invisible: the deploy step degrades failures to a
// warning, so it would keep going green while silently recording nothing.
export const SENTRY_ORG = 'chet-carter';
export const SENTRY_PROJECT = 'javascript-nextjs';
