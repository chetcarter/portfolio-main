import {withSentryConfig} from '@sentry/nextjs';
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

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

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

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
});