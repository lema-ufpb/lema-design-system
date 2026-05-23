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
    },
    decorative: {
      control: "boolean",
      description:
        "Whether the separator is purely decorative (not announced by screen readers)",
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
