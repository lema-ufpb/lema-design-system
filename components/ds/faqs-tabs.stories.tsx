import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { FaqsTabs } from "./faqs-tabs"

const groups = [
  { id: "general", label: "General", items: [{ value: "1", trigger: "What is this?", children: "General answer." }] },
  { id: "billing", label: "Billing", items: [{ value: "2", trigger: "How to pay?", children: "Billing answer." }] },
  { id: "support", label: "Support", items: [{ value: "3", trigger: "Contact?", children: "Support answer." }] },
]

const meta = {
  title: "Marketing/FaqsTabs",
  component: FaqsTabs,
  tags: ["autodocs"],
} satisfies Meta<typeof FaqsTabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { groups } }

export const Searchable: Story = { args: { groups, searchable: true } }
