import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { PullQuote } from "./pull-quote"

const meta = {
  title: "Data Display/PullQuote",
  component: PullQuote,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A large, editorial-style quote for founder letters and testimonials, with an optional cited author.",
      },
    },
  },
  args: {
    quote:
      "We started this company because we believed teams deserved software that respects their time. Five years later, that belief hasn't changed.",
    name: "Alex Rivera",
    role: "Co-founder & CEO",
    avatarFallback: "AR",
    size: "md",
    align: "start",
    tone: "plain",
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    align: { control: "select", options: ["start", "center"] },
    tone: { control: "select", options: ["plain", "violet", "sky"] },
  },
} satisfies Meta<typeof PullQuote>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const AllSizes: Story = {
  render: (args) => (
    <div className="flex max-w-2xl flex-col gap-10">
      <PullQuote {...args} size="sm" />
      <PullQuote {...args} size="md" />
      <PullQuote {...args} size="lg" />
    </div>
  ),
}

export const AllTones: Story = {
  render: (args) => (
    <div className="flex max-w-2xl flex-col gap-6">
      <PullQuote {...args} tone="plain" />
      <PullQuote {...args} tone="violet" />
      <PullQuote {...args} tone="sky" />
    </div>
  ),
}

export const Centered: Story = {
  args: {
    align: "center",
    tone: "violet",
  },
  parameters: {
    layout: "fullscreen",
  },
  render: (args) => (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <PullQuote {...args} />
    </div>
  ),
}

export const WithoutAvatar: Story = {
  args: {
    name: "Product Team",
    role: undefined,
    avatarFallback: undefined,
  },
}

export const Loading: Story = {
  render: (args) => (
    <div className="flex max-w-2xl flex-col gap-10">
      <PullQuote {...args} loading size="sm" />
      <PullQuote {...args} loading size="md" />
      <PullQuote {...args} loading size="lg" />
    </div>
  ),
}
