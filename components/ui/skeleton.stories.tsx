import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Skeleton } from "./skeleton"

const meta = {
  title: "Shadcn UI/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A placeholder loading state component shaped as elements to outline UI containers during data fetching lifecycle phases.",
          "",
          "Includes keyframe pulsing CSS class bindings (`animate-pulse`) and custom border radius defaults.",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Skeleton Fill** | `--muted` | Backdrop placeholder pulse color |",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    className: "h-4 w-20",
  },
}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-4 w-24" />
    </div>
  ),
}

export const Card: Story = {
  render: () => (
    <div className="flex w-full max-w-sm flex-col gap-3 rounded-lg border p-4">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  ),
}

export const Avatar: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Skeleton className="size-10 rounded-full" />
      <div className="flex flex-col gap-1">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
  ),
}

export const Image: Story = {
  render: () => (
    <Skeleton className="aspect-video w-full max-w-sm rounded-lg" />
  ),
}
