import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Spinner } from "./spinner"
import { Button } from "@/components/ui/button"

const meta = {
  title: "Feedback/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "An animated loader icon used to represent background processing, async submission delays, or loading data sequences.",
          "",
          "Adapts color from standard inline text elements using CSS `currentColor` inheritance.",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Icon Stroke** | `currentColor` | Inherited CSS text color from parent context configurations |",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const LocalePTBR: Story = {
  args: {
    locale: "pt-BR",
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Spinner className="size-3" />
      <Spinner className="size-4" />
      <Spinner className="size-5" />
      <Spinner className="size-6" />
    </div>
  ),
}

export const InButton: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button disabled>
        <Spinner data-icon="inline-start" className="animate-spin" />
        Loading
      </Button>
      <Button variant="outline" disabled>
        <Spinner data-icon="inline-start" className="animate-spin" />
        Processing
      </Button>
      <Button variant="secondary" disabled>
        <Spinner data-icon="inline-start" className="animate-spin" />
        Saving
      </Button>
    </div>
  ),
}

export const CustomColor: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Spinner className="size-6 text-primary" />
      <Spinner className="size-6 text-muted-foreground" />
      <Spinner className="size-6 text-destructive" />
    </div>
  ),
}
