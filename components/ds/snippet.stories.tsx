import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Snippet } from "./snippet"

const meta = {
  title: "Kibo/Snippet",
  component: Snippet,
  tags: ["autodocs"],
} satisfies Meta<typeof Snippet>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { tabs: [{ label: "npm", code: "npx shadcn@latest add button" }, { label: "pnpm", code: "pnpm dlx shadcn@latest add button" }] },
}
