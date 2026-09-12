// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

// Anything served from a developer's own machine — `next dev`, a local
// production build, a headless crawler pointed at 127.0.0.1 — is not a visitor
// having a bad time. These made up the bulk of the issue list.
const LOCAL_HOSTS = /^(localhost|127\.0\.0\.1|0\.0\.0\.0|\[::1\])$|\.local$/i;

// Frames from our own bundles. Sentry rewrites them to the `app:///` prefix.
const FIRST_PARTY_FRAME = /^app:\/\/\//;

function isFirstParty(event: Sentry.ErrorEvent): boolean {
  const frames = (event.exception?.values ?? []).flatMap(
    (value) => value.stacktrace?.frames ?? []
  );

  // No stack at all is normal (message events, cross-origin scripts) — judging
  // those as third-party would throw away real signal. Only reject a trace we
  // can actually read and can see contains none of our code.
  if (frames.length === 0) return true;

  return frames.some((frame) => FIRST_PARTY_FRAME.test(frame.filename ?? ""));
}

Sentry.init({
  dsn: "https://7abb6eefbe0e3f5f60b49ed06aa97921@o4510314380591104.ingest.us.sentry.io/4510314385899520",

  // NODE_ENV is "production" for every non-dev build, which would file preview
  // and staging deploys alongside real chetcarter.com traffic. Prefer the
  // host's deploy environment where it publishes one.
  environment: process.env.NEXT_PUBLIC_VERCEL_ENV ?? process.env.NODE_ENV,

  // Local development reported into the same project as production and buried
  // the real issues under hydration warnings from `next dev`.
  enabled: process.env.NODE_ENV === "production",

  // Sample a fraction of traffic rather than all of it — this is a public
  // portfolio, and 100% tracing burns the quota for no extra signal.
  tracesSampleRate: 0.1,

  // Enable logs to be sent to Sentry
  enableLogs: true,

  // Errors are still captured at 100%; only performance traces are sampled.

  // Don't attach visitor PII (IP address, headers, cookies) to events.
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
  sendDefaultPii: false,

  // Extensions and embedded browsers throw inside our page constantly. None of
  // it is actionable and none of it is ours.
  ignoreErrors: [
    "ResizeObserver loop limit exceeded",
    "ResizeObserver loop completed with undelivered notifications",
    /^Non-Error promise rejection captured/,
  ],

  denyUrls: [
    /^chrome-extension:\/\//,
    /^moz-extension:\/\//,
    /^safari-(web-)?extension:\/\//,
    // Not `ext://` — Deno-backed extension frames are spelled `ext:core/...`.
    /^ext:/,
  ],

  beforeSend(event) {
    const hostname =
      typeof window !== "undefined" ? window.location.hostname : "";

    if (hostname && LOCAL_HOSTS.test(hostname)) return null;
    if (!isFirstParty(event)) return null;

    return event;
  },
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
