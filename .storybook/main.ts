import type { StorybookConfig } from "@storybook/nextjs-vite"
import { execSync } from "child_process"

const config: StorybookConfig = {
  stories: [
    "../app/Introduction.mdx",
    "../app/colors.stories.tsx",
    "../components/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-mcp",
  ],
  framework: "@storybook/nextjs-vite",
  staticDirs: ["../public", { from: "../app/favicon.ico", to: "/favicon.ico" }],
  // Points AI agents/crawlers at the machine-readable component catalog
  // instead of the rendered HTML — see scripts/build-component-docs.mjs
  // and llms.txt (https://llmstxt.org/).
  managerHead: (head) => `
    ${head}
    <link rel="alternate" type="application/json" href="/docs/components.json" title="LEMA-DS Component Catalog" />
  `,
  previewHead: (head) => `
    ${head}
    <link rel="alternate" type="application/json" href="/docs/components.json" title="LEMA-DS Component Catalog" />
  `,
  viteFinal: async (config) => {
    const version = (
      process.env.APP_VERSION ||
      execSync("git describe --tags --abbrev=0 2>/dev/null || echo '0.0.0'")
        .toString()
        .trim()
    ).replace(/^v/, "")
    config.define = {
      ...config.define,
      __APP_VERSION__: JSON.stringify(version),
    }
    return config
  },
}
export default config
