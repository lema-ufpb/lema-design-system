import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  EmptyStateIllustration,
  type EmptyStateVariant,
} from "./empty-state-illustration"
import { Button } from "@/components/ui/button"

const meta = {
  title: "Feedback/EmptyStateIllustration",
  component: EmptyStateIllustration,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "An empty state component with built-in animated SVG illustrations for 8 common contexts.",
          "Extends shadcn `EmptyState` with richer visual feedback.",
          "",
          "Animations are pure CSS (float, pulse, shake, bounce, sway) — no JS animation libraries.",
          "",
          "Variants: `default`, `search`, `error`, `success`, `inbox`, `filter`, `upload`, `locked`.",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "search",
        "error",
        "success",
        "inbox",
        "filter",
        "upload",
        "locked",
      ],
    },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof EmptyStateIllustration>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: "default",
    size: "md",
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {(
        [
          "default",
          "search",
          "error",
          "success",
          "inbox",
          "filter",
          "upload",
          "locked",
        ] as EmptyStateVariant[]
      ).map((variant) => (
        <div key={variant} className="rounded-xl border border-border p-4">
          <EmptyStateIllustration variant={variant} size="sm" />
          <p className="mt-2 text-center text-xs text-muted-foreground">
            {variant}
          </p>
        </div>
      ))}
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col divide-y divide-border">
      {(["sm", "md", "lg"] as const).map((size) => (
        <EmptyStateIllustration
          key={size}
          variant="search"
          size={size}
          title={`Size: ${size}`}
          description="This is the description text shown below the illustration."
        />
      ))}
    </div>
  ),
}

export const WithAction: Story = {
  args: {
    variant: "default",
    title: "No projects yet",
    description:
      "Create your first project to get started with the design system.",
    action: <Button size="sm">Create Project</Button>,
    size: "md",
  },
}

export const ErrorWithRetry: Story = {
  args: {
    variant: "error",
    title: "Failed to load data",
    description:
      "We couldn't fetch the data. Please check your connection and try again.",
    action: (
      <div className="flex gap-2">
        <Button size="sm" variant="outline">
          Contact Support
        </Button>
        <Button size="sm">Retry</Button>
      </div>
    ),
  },
}

export const Loading: Story = {
  args: {
    variant: "default",
    loading: true,
    size: "md",
  },
}

export const CustomIllustration: Story = {
  args: {
    title: "No notifications",
    description: "You're all caught up! Check back later.",
    illustration: (
      <div className="flex size-24 items-center justify-center rounded-full bg-muted text-4xl">
        🔔
      </div>
    ),
  },
}
