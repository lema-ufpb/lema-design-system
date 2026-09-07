import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Snippet } from "./snippet"

const meta = {
  title: "Data Display/Snippet",
  component: Snippet,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A Snippet component for the LEMA Design System.",
          "Supports i18n.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `tabs` | `SnippetTab[]` | — | - |",
          "| `locale` | `UILocale` | — | - |",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof Snippet>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    tabs: [
      { label: "npm", code: "npx shadcn@latest add button" },
      { label: "pnpm", code: "pnpm dlx shadcn@latest add button" },
    ],
  },
}
