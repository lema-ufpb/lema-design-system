import React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Switch } from "./switch"

const meta = {
  title: "Shadcn UI/Switch",
  component: Switch,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A binary toggle control used for turning settings, features, or preferences on and off.",
          "",
          "Wraps [Radix UI's `Switch.Root`](https://www.radix-ui.com/primitives/docs/components/switch) with two size presets (`sm`, `default`). Supports a full controlled or uncontrolled API via Radix primitives, including `defaultChecked` and `onCheckedChange`.",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Variant / Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Checked background** | `--primary` | Background when the switch is toggled on |",
          "| **Unchecked background** | `--input` / 90% opacity | Background when the switch is toggled off |",
          "| **Thumb (dark checked)** | `--primary-foreground` | Thumb color on dark mode when checked |",
          "| **Thumb (dark unchecked)** | `--foreground` | Thumb color on dark mode when unchecked |",
          "| **Focus ring** | `--ring` / `--ring/30` | Keyboard focus outline |",
          "| **Destructive border** | `--destructive` / `--destructive/20` | Invalid/error state border |",
          "| **Border** | `--border` | Outer border of the switch track |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["default", "sm"],
      description: "Switch size preset",
    },
    disabled: {
      control: "boolean",
    },
    defaultChecked: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    size: "default",
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Switch size="sm" defaultChecked />
      <Switch size="default" defaultChecked />
    </div>
  ),
}

export const Controlled: Story = {
  render: function Render() {
    const [checked, setChecked] = React.useState(false)
    return (
      <div className="flex items-center gap-4">
        <Switch checked={checked} onCheckedChange={setChecked} />
        <span className="text-sm text-muted-foreground">
          Value: {checked ? "true" : "false"}
        </span>
      </div>
    )
  },
}

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Switch />
        <span className="text-sm text-muted-foreground">Unchecked</span>
      </div>
      <div className="flex items-center gap-4">
        <Switch defaultChecked />
        <span className="text-sm text-muted-foreground">Checked</span>
      </div>
      <div className="flex items-center gap-4">
        <Switch disabled />
        <span className="text-sm text-muted-foreground">
          Disabled unchecked
        </span>
      </div>
      <div className="flex items-center gap-4">
        <Switch disabled defaultChecked />
        <span className="text-sm text-muted-foreground">Disabled checked</span>
      </div>
    </div>
  ),
}
