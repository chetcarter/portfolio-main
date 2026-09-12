// three.js throws a bare `Error: Error creating WebGL context.` the moment
// `canvas.getContext()` returns null, and react-three-fiber surfaces that as an
// unhandled rejection rather than something an error boundary can catch. On
// mobile Safari a null context is routine — low-power mode, GPU memory
// pressure, or simply too many live contexts on one page — so probe for support
// before mounting a <Canvas> instead of letting the renderer blow up.

let supported: boolean | null = null;

export function isWebGLAvailable(): boolean {
  if (supported !== null) return supported;
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

    supported = gl !== null;
  } catch {
    supported = false;
  }

  return supported;
}
