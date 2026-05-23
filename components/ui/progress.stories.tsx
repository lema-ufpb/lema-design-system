import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Progress } from "./progress"

const meta = {
  title: "Shadcn UI/Progress",
  component: Progress,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A simple progress bar indicator designed to show status completion values.",
          "",
          "Built on top of **Radix UI Progress**, it offers transitions, customizable tracks, and simple fill options.",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Progress Fill** | `--primary` | Background color for the progress fill bar indicator |",
          "| **Track Background** | `--muted` | Outer background bar container track fill |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "Progress value",
    },
  },
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: 50,
  },
}

export const States: Story = {
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Progress value={20} />
      <Progress value={50} />
      <Progress value={80} />
      <Progress value={100} />
    </div>
  ),
}

export const Indeterminate: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <Progress value={undefined} />
    </div>
  ),
}
