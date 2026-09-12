import {withSentryConfig} from '@sentry/nextjs';

// `output: 'export'` means there is no server runtime at all — every route is
// prerendered to static HTML and served by Hostinger. Sentry warns on every
// build that an instrumentation file is missing, but that file only ever runs
// server-side, so adding one here would be dead code. Silence the warning
// rather than satisfy it with a file that can never execute.
process.env.SENTRY_SUPPRESS_INSTRUMENTATION_FILE_WARNING ??= '1';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
};

export default withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: "chet-carter",

  project: "javascript-nextjs",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  // tunnelRoute: "/monitoring",

  // Automatically tree-shake Sentry logger statements to reduce bundle size.
  // (Was `disableLogger`, deprecated in favour of this nested form.)
  webpack: {
    treeshake: {
      removeDebugLogging: true,
    },
  },

  release: {
    // Attach the commits in this release to it, so Sentry can match the
    // `Fixes ISSUE-ID` trailers in commit messages and auto-resolve.
    //
    // This needs three things to line up, and all three were missing: a
    // SENTRY_AUTH_TOKEN at build time (without it the plugin skips release
    // creation entirely — which is why no release existed for any commit
    // after 2026-08-27), a non-shallow checkout for `auto` to walk history,
    // and the GitHub repository linked in Sentry's integration settings.
    setCommits: {
      auto: true,
      // Commit association is a convenience. If Sentry cannot match the repo
      // or finds nothing new, say so in the log and carry on — a deploy that
      // is otherwise healthy must not fail over release bookkeeping.
      ignoreMissing: true,
      ignoreEmpty: true,
    },
  },

  // `automaticVercelMonitors` was set here and is now deprecated. Rather than
  // move it to `webpack.automaticVercelMonitors`, it is dropped: it creates
  // Sentry cron monitors from Vercel Cron Jobs declared in vercel.json, and
  // this site deploys to Hostinger with no vercel.json and no cron jobs. It
  // was a no-op before the rename and would be a no-op after it.
});