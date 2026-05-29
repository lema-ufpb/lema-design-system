import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Separator } from "./separator"

const meta = {
  title: "Shadcn UI/Separator",
  component: Separator,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A visual divider used to separate content into distinct sections.",
          "",
          'Built on Radix Separator. Supports `orientation` (`"horizontal"` | `"vertical"`) and `decorative` (boolean, default `true`) to indicate whether the element is purely decorative or semantic.',
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Variant / Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Divider line** | `--border` | Color of the separating line |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    orientation: {
      control: "radio",
      options: ["horizontal", "vertical"],
      description: "The axis along which the separator is rendered",
      table: { defaultValue: { summary: "horizontal" } },
    },
    decorative: {
      control: "boolean",
      description:
        "Whether the separator is purely decorative (not announced by screen readers)",
      table: { defaultValue: { summary: "true" } },
    },
  },
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  args: {
    orientation: "horizontal",
    decorative: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Horizontal divider separating two blocks of text to demonstrate visual content separation.",
      },
    },
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">
        Content above the separator
      </p>
      <Separator {...args} />
      <p className="text-sm text-muted-foreground">
        Content below the separator
      </p>
    </div>
  ),
}

export const Vertical: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Vertical separator dividing three inline text labels in a flex row layout.",
      },
    },
  },
  render: () => (
    <div className="flex h-12 items-center gap-4">
      <span className="text-sm text-muted-foreground">Left</span>
      <Separator orientation="vertical" />
      <span className="text-sm text-muted-foreground">Center</span>
      <Separator orientation="vertical" />
      <span className="text-sm text-muted-foreground">Right</span>
    </div>
  ),
}
