import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { FaqsSupport } from "./faqs-support"

const items = [
  { value: "1", trigger: "Question 1", children: "Answer 1" },
  { value: "2", trigger: "Question 2", children: "Answer 2" },
  { value: "3", trigger: "Question 3", children: "Answer 3" },
]

const meta = {
  title: "FAQ/FaqsSupport",
  component: FaqsSupport,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A FaqsSupport component for the LEMA Design System.",
          "Supports i18n.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `supportTitle` | `string` | — | - |",
          "| `supportDescription` | `string` | — | - |",
          "| `supportAction` | `{ label: string` | — | - |",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof FaqsSupport>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items,
    supportTitle: "Still have questions?",
    supportDescription: "Our team is here to help.",
    supportAction: { label: "Contact us", href: "#" },
  },
}

export const WithoutSupport: Story = { args: { items } }
