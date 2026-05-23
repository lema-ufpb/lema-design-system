import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Spinner } from "./spinner"

const meta = {
  title: "Shadcn UI/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A lightweight animated loading indicator used to communicate an ongoing processing or fetching state.",
          "",
          "Wraps [Lucide's `Loader2Icon`](https://lucide.dev/icons/loader-2) with an `animate-spin` class. Use inline to signal transient activity inside buttons, panels, or empty-state areas.",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Variant / Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Icon color** | `currentColor` | Inherits text color from parent container |",
          "| **Sizing** | `size-4` (—spacing-4) | Default 16×16 pixel dimension |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    className: {
      control: "text",
      table: { disable: true },
    },
  },
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const CustomSize: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Spinner className="size-3" />
      <Spinner className="size-4" />
      <Spinner className="size-6" />
      <Spinner className="size-8" />
    </div>
  ),
}

export const InContext: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Spinner />
        Loading data…
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Spinner className="size-5" />
        Processing request…
      </div>
    </div>
  ),
}
