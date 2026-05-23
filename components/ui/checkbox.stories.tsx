import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Checkbox } from "./checkbox"
import { Label } from "./label"
import { useState } from "react"

const meta = {
  title: "Shadcn UI/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A two-state boolean input control built on Radix UI's `Checkbox.Root`.",
          "",
          "Supports the standard HTML checkbox semantics with keyboard accessibility, indeterminate state, and form integration. Use the `checked` and `onCheckedChange` props to manage state.",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Variant / Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Default fill** | `--input` (at 90%) | Unchecked background color |",
          "| **Checked background** | `--primary` | Background when checked |",
          "| **Checked text** | `--primary-foreground` | Checkmark icon color |",
          "| **Focus ring** | `--ring` / `--ring/30` | Keyboard focus indicator |",
          "| **Error border** | `--destructive` | Border and ring on validation error |",
          "| **Error ring** | `--destructive/20` | Focus ring when in error state |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    checked: {
      control: "select",
      options: [true, false, "indeterminate"],
      description: "The controlled checked state",
    },
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [checked, setChecked] = useState<boolean>(false)
    return (
      <div className="flex items-center gap-2">
        <Checkbox
          id="terms"
          checked={checked}
          onCheckedChange={(v) => typeof v === "boolean" && setChecked(v)}
        />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </div>
    )
  },
}

export const Checked: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="checked-demo" checked />
      <Label htmlFor="checked-demo">Option enabled</Label>
    </div>
  ),
}

export const Indeterminate: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="indeterminate-demo" checked="indeterminate" />
      <Label htmlFor="indeterminate-demo">Some selected</Label>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Checkbox id="disabled-unchecked" disabled />
        <Label htmlFor="disabled-unchecked" className="text-muted-foreground">
          Unavailable option
        </Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="disabled-checked" disabled checked />
        <Label htmlFor="disabled-checked" className="text-muted-foreground">
          Locked selection
        </Label>
      </div>
    </div>
  ),
}

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="label-demo" />
      <Label htmlFor="label-demo">Subscribe to newsletter</Label>
    </div>
  ),
}
