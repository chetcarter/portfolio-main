// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://7abb6eefbe0e3f5f60b49ed06aa97921@o4510314380591104.ingest.us.sentry.io/4510314385899520",

  // Sample a fraction of traffic rather than all of it — this is a public
  // portfolio, and 100% tracing burns the quota for no extra signal.
  tracesSampleRate: 0.1,

  // Enable logs to be sent to Sentry
  enableLogs: true,

  // Errors are still captured at 100%; only performance traces are sampled.

  // Don't attach visitor PII (IP address, headers, cookies) to events.
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
  sendDefaultPii: false,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;