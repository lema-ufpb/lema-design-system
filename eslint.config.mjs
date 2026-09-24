// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook"

import { defineConfig, globalIgnores } from "eslint/config"
import nextVitals from "eslint-config-next/core-web-vitals"
import nextTs from "eslint-config-next/typescript"

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
    // Generated file — do not lint
    "public/mockServiceWorker.js",
    "storybook-static/**",
  ]),
  ...storybook.configs["flat/recommended"],
  // components/ds/ and lib/ are installed in consumers that may not use Next.js
  // (Vite, Remix, Astro…): never import framework-specific modules there.
  {
    files: ["components/ds/**/*.{ts,tsx}", "lib/**/*.{ts,tsx}"],
    ignores: ["**/*.stories.tsx"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              regex: "^next(/|$)",
              message:
                "components/ds and lib must stay framework-agnostic. Use DSLink (ds-link-provider) for links and ClientOnly (lib/client-only) instead of next/dynamic.",
            },
          ],
        },
      ],
    },
  },
  // components/ui/ are shadcn primitives — updated only via CLI, not manually.
  // Disable rules that flag patterns inherent to the generated code.
  {
    files: ["components/ui/**"],
    rules: {
      "react-hooks/set-state-in-effect": "off",
    },
  },
])

export default eslintConfig
