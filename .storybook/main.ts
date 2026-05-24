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
  staticDirs: ["../public", "../app"],
  viteFinal: async (config) => {
    const version = execSync(
      "git describe --tags --abbrev=0 2>/dev/null || echo '0.0.0'"
    )
      .toString()
      .trim()
    config.define = {
      ...config.define,
      __APP_VERSION__: JSON.stringify(version),
    }
    return config
  },
}
export default config
