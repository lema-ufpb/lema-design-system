import path from "node:path"
import { fileURLToPath } from "node:url"

import { defineConfig } from "vitest/config"

import { storybookTest } from "@storybook/addon-vitest/vitest-plugin"

import { playwright } from "@vitest/browser-playwright"

const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [storybookTest({ configDir: path.join(dirname, ".storybook") })],
  test: {
    name: "storybook",
    testTimeout: 30000,
    hookTimeout: 30000,
    browser: {
      enabled: true,
      headless: true,
      provider: playwright({}),
      instances: [{ browser: "chromium" }],
    },
  },
})
