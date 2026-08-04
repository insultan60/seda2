import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    /* The pre-React static site this project was ported from. Next does not
       serve any of it — only /public is — so it is reference material, not
       shipped code, and linting it just reports on a build nobody runs. */
    "js/**",
    "css/**",
    "*.html",
    // Camera masters parked by `npm run optimize-photos`.
    "_photo-originals/**",
  ]),
]);

export default eslintConfig;
