import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// eslint-config-next 15.5 still ships eslintrc-style configs only — it has no
// flat export yet — so the shareable config comes through the compat shim.
// This is the shape Next's own codemod produces; swap it for a direct import
// once eslint-config-next publishes a flat entry point.
const compat = new FlatCompat({ baseDirectory: __dirname });

const config = [
  {
    // Flat config ignores node_modules on its own but nothing else. `next lint`
    // used to scope itself to the source directories; linting from the repo
    // root instead means build artefacts have to be excluded by hand, and
    // `out/` in particular holds minified bundles that would take minutes.
    ignores: [".next/**", "out/**", "next-env.d.ts", "node_modules/**"],
  },
  ...compat.extends("next/core-web-vitals"),
];

export default config;
