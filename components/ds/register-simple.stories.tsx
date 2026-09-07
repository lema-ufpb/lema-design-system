import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { RegisterSimple } from "./register-simple"

const meta = {
  title: "Auth/RegisterSimple",
  component: RegisterSimple,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A RegisterSimple component for the LEMA Design System.",
          "Composable and theme-aware via semantic tokens.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `className` | `string` | — | Additional CSS classes |",
          "| `children` | `ReactNode` | — | Content |",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof RegisterSimple>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: {} }

export const WithBadge: Story = { args: { badge: "New" } }
