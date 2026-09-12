"use client";
import React from "react";
import * as Sentry from "@sentry/nextjs";

type Props = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

// Everything WebGL renders on this site is decorative. A dead context should
// cost the visitor an ornament, not the page — without a boundary, a throw
// during Canvas render unmounts the whole React tree back to a blank screen.
//
// This is the second line of defence only: it catches synchronous render
// throws, not the async ones react-three-fiber turns into unhandled
// rejections. `isWebGLAvailable()` is what keeps us from getting that far.
export class WebGLBoundary extends React.Component<Props, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  // React hands caught errors to `onCaughtError`, which only console.errors —
  // Sentry never sees them. Swallowing the render is the point; swallowing the
  // report is not, since this catches every throw in the subtree, not just the
  // WebGL ones. Without this, a real bug in Globe.tsx would blank the globe for
  // everyone and produce no events at all.
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    Sentry.captureException(error, {
      tags: { boundary: "webgl" },
      contexts: { react: { componentStack: info.componentStack } },
    });
  }

  render() {
    return this.state.failed ? this.props.fallback ?? null : this.props.children;
  }
}
