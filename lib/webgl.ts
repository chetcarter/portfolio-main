// three.js throws a bare `Error: Error creating WebGL context.` the moment
// `canvas.getContext()` returns null, and react-three-fiber surfaces that as an
// unhandled rejection rather than something an error boundary can catch. On
// mobile Safari a null context is routine — low-power mode, GPU memory
// pressure, or simply too many live contexts on one page — so probe for support
// before mounting a <Canvas> instead of letting the renderer blow up.

// Deliberately not memoized. Context availability is a live property of the
// device, not a fact about the browser: it swings with GPU pressure and with
// how many contexts this page is already holding. A cached `true` would let a
// later caller mount a Canvas into an exhausted device and throw the very
// error this module exists to prevent, and a cached `false` would keep the
// globe blank for the rest of the session after a moment's pressure passed.
export function isWebGLAvailable(): boolean {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return false;
  }

  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ??
      canvas.getContext("webgl") ??
      canvas.getContext("experimental-webgl");

    // The probe itself occupies a context slot, which is the exact resource
    // we're short of on the devices that fail here. Hand it straight back.
    if (gl && "getExtension" in gl) {
      (gl as WebGLRenderingContext)
        .getExtension("WEBGL_lose_context")
        ?.loseContext();
    }

    return gl !== null;
  } catch {
    return false;
  }
}
