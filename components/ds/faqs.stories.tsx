import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Faqs } from "./faqs"

const items = [
  {
    value: "1",
    trigger: "What is LEMA DS?",
    children: "LEMA DS is a design system based on shadcn/ui with Tailwind v4.",
  },
  {
    value: "2",
    trigger: "How to install?",
    children: "Run npx shadcn add ds-button.",
  },
  { value: "3", trigger: "Is it free?", children: "Yes, MIT licensed." },
  { value: "4", trigger: "Support?", children: "Open an issue on GitHub." },
]

const meta = {
  title: "Blocks/Faqs",
  component: Faqs,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    iconVariant: {
      control: "select",
      options: ["chevron", "plus", "arrow", "sign"],
    },
    locale: {
      control: "inline-radio",
      options: ["en-US", "pt-BR", "es-ES", "fr-FR"],
    },
  },
} satisfies Meta<typeof Faqs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { items, title: "FAQs", description: "Quick answers" },
}

export const Searchable: Story = {
  args: {
    items: [
      ...items,
      { value: "5", trigger: "Billing question", children: "Billing info." },
      { value: "6", trigger: "Support hours", children: "24/7." },
    ],
    searchable: true,
  },
}

export const AllSizes: Story = {
  args: { items },
  render: () => (
    <div className="flex flex-col gap-8">
      <Faqs items={items} size="sm" title="Small" />
      <Faqs items={items} size="md" title="Medium" />
      <Faqs items={items} size="lg" title="Large" />
    </div>
  ),
}

export const Loading: Story = { args: { items, loading: true } }

export const Empty: Story = { args: { items, searchable: true, search: "xyz" } }
