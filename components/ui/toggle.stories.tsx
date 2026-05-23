import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Toggle } from "./toggle"
import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react"

const meta = {
  title: "Shadcn UI/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A two-state button that can be pressed or not pressed, typically used to enable/disable formatting options or filters.",
          "",
          "Wraps [Radix UI's `Toggle`](https://www.radix-ui.com/primitives/docs/components/toggle) primitive. Comes in `default` and `outline` variants with three size presets (`sm`, `default`, `lg`). Supports inline-start/end icons via the `data-icon` attribute.",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Variant / Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Default background** | `transparent` | Default variant background |",
          "| **Outline border** | `--border` / `--input` | Border line for outline variant |",
          "| **Pressed state** | `--muted` | Background when the toggle is pressed (`aria-pressed`) |",
          "| **Hover background** | `--muted` | Background on hover |",
          "| **Focus ring** | `--ring` / `--ring/30` | Keyboard focus outline |",
          "| **Destructive** | `--destructive` / `--destructive/20` | Invalid/error state |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline"],
      description: "Visual style variant",
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
      description: "Size and padding preset",
    },
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Toggle",
    variant: "default",
    size: "default",
  },
}

export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Toggle variant="default" aria-label="Toggle default">
        Default
      </Toggle>
      <Toggle variant="outline" aria-label="Toggle outline">
        Outline
      </Toggle>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Toggle size="sm" aria-label="Small toggle">
        Small
      </Toggle>
      <Toggle size="default" aria-label="Default toggle">
        Default
      </Toggle>
      <Toggle size="lg" aria-label="Large toggle">
        Large
      </Toggle>
    </div>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Toggle aria-label="Toggle bold">
        <BoldIcon data-icon="inline-start" />
        Bold
      </Toggle>
      <Toggle aria-label="Toggle italic">
        <ItalicIcon data-icon="inline-start" />
        Italic
      </Toggle>
      <Toggle aria-label="Toggle underline">
        <UnderlineIcon data-icon="inline-start" />
        Underline
      </Toggle>
    </div>
  ),
}

export const Pressed: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Toggle pressed aria-label="Toggle bold">
        <BoldIcon data-icon="inline-start" />
      </Toggle>
      <Toggle pressed variant="outline" aria-label="Toggle italic">
        <ItalicIcon data-icon="inline-start" />
      </Toggle>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Toggle disabled variant="default" aria-label="Disabled default">
        Disabled
      </Toggle>
      <Toggle disabled variant="outline" aria-label="Disabled outline">
        Disabled
      </Toggle>
      <Toggle disabled pressed variant="outline" aria-label="Disabled pressed">
        Disabled Pressed
      </Toggle>
    </div>
  ),
}
