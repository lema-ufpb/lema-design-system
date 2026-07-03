import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Marker, MarkerIcon, MarkerContent } from "./marker"
import { InfoIcon, AlertTriangleIcon, CheckCircleIcon } from "lucide-react"

const meta = {
  title: "Shadcn UI/Marker",
  component: Marker,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A marker component for annotating content with contextual labels, separators, and borders.",
          "",
          "Composed of `MarkerIcon` and `MarkerContent` sub-components. Supports variant (`default` | `separator` | `border`) and can be rendered as a child element using the `asChild` prop.",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Variant / Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Text color** | `--muted-foreground` | Marker label text |",
          "| **Separator/Border** | `--border` | Horizontal rules and bottom border |",
          "| **Link hover** | `--foreground` | Link color on hover |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "separator", "border"],
      table: { defaultValue: { summary: "default" } },
    },
    asChild: {
      table: { disable: true },
    },
  },
} satisfies Meta<typeof Marker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Default marker with an information icon and a label indicating a status message.",
      },
    },
  },
  render: () => (
    <Marker>
      <MarkerIcon>
        <InfoIcon />
      </MarkerIcon>
      <MarkerContent>This is an informational marker</MarkerContent>
    </Marker>
  ),
}

export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "All three marker variants (default, separator, border) displayed side by side.",
      },
    },
  },
  render: () => (
    <div className="flex max-w-md flex-col gap-6">
      <Marker variant="default">
        <MarkerIcon>
          <InfoIcon />
        </MarkerIcon>
        <MarkerContent>Default marker with icon</MarkerContent>
      </Marker>
      <Marker variant="separator">
        <MarkerContent>Separator variant</MarkerContent>
      </Marker>
      <Marker variant="border">
        <MarkerIcon>
          <AlertTriangleIcon className="text-warning" />
        </MarkerIcon>
        <MarkerContent>Border marker with warning</MarkerContent>
      </Marker>
    </div>
  ),
}

export const WithIcons: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Markers with different semantic icons conveying various message types.",
      },
    },
  },
  render: () => (
    <div className="flex max-w-md flex-col gap-4">
      <Marker>
        <MarkerIcon>
          <InfoIcon />
        </MarkerIcon>
        <MarkerContent>Information message</MarkerContent>
      </Marker>
      <Marker>
        <MarkerIcon>
          <AlertTriangleIcon className="text-warning" />
        </MarkerIcon>
        <MarkerContent>Warning message</MarkerContent>
      </Marker>
      <Marker>
        <MarkerIcon>
          <CheckCircleIcon className="text-success" />
        </MarkerIcon>
        <MarkerContent>Success message</MarkerContent>
      </Marker>
    </div>
  ),
}

export const AsChild: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Marker rendered as a clickable link using the asChild composition pattern.",
      },
    },
  },
  render: () => (
    <Marker asChild>
      <a href="#">
        <MarkerIcon>
          <InfoIcon />
        </MarkerIcon>
        <MarkerContent>Clickable marker link</MarkerContent>
      </a>
    </Marker>
  ),
}

export const SeparatorLabel: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Marker with separator variant used as a section divider with centered text label.",
      },
    },
  },
  render: () => (
    <div className="max-w-md space-y-3">
      <div className="text-sm text-foreground">Previous section content</div>
      <Marker variant="separator">
        <MarkerContent>Today</MarkerContent>
      </Marker>
      <div className="text-sm text-foreground">
        Today&apos;s section content
      </div>
    </div>
  ),
}
