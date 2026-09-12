"use client";
import React from "react";

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

  render() {
    return this.state.failed ? this.props.fallback ?? null : this.props.children;
  }
}
