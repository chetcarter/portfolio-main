"use client";

import * as React from "react";
// next-themes 0.4 dropped the `next-themes/dist/types` subpath export and
// re-exports the props type from the package root instead.
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
