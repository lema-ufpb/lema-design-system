import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { RegisterSplit } from "./register-split"

const meta = {
  title: "Auth/RegisterSplit",
  component: RegisterSplit,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A RegisterSplit component for the LEMA Design System.",
          "Supports loading state.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `imageSrc` | `string` | — | - |",
          "| `testimonial` | `{` | — | - |",
          "| `quote` | `string` | — | - |",
          "| `author` | `string` | — | - |",
          "| `role` | `string` | — | - |",
          "| `avatarUrl` | `string` | — | - |",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof RegisterSplit>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    testimonial: {
      quote: "LEMA DS accelerated our onboarding.",
      author: "Ana Silva",
      role: "Design Lead",
      avatarUrl:
        "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><rect width='100' height='100' fill='%23e5e7eb'/><circle cx='50' cy='38' r='16' fill='%239ca3af'/><rect x='26' y='62' width='48' height='30' rx='15' fill='%239ca3af'/></svg>",
    },
  },
}

export const WithoutTestimonial: Story = { args: {} }
