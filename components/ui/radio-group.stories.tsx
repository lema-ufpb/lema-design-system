import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { RadioGroup, RadioGroupItem } from "./radio-group"
import { Label } from "./label"

const meta = {
  title: "Shadcn UI/Radio Group",
  component: RadioGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A set of mutually exclusive radio buttons for selecting a single option from a list.",
          "",
          "Built on Radix RadioGroup. `RadioGroup` wraps the group container and manages selection state. `RadioGroupItem` renders the circular indicator. Must be paired with `<Label>` for accessibility. Supports `disabled`, `aria-invalid`, and `data-checked` styling states via Radix.",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Variant / Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Background (unchecked)** | `--input` / `--input/90` | Fill color of the radio circle when unchecked |",
          "| **Checked background** | `--primary` / `--primary-foreground` | Fill and indicator color when selected |",
          "| **Focus ring** | `--ring` / `--ring/30` | Focus indicator for keyboard navigation |",
          "| **Error state** | `--destructive` / `--destructive/20` | Border and ring color when `aria-invalid` |",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Radio group with three options, the first selected by default, demonstrating standard single-selection behavior.",
      },
    },
  },
  render: () => (
    <RadioGroup defaultValue="option-1">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-1" id="option-1" />
        <Label htmlFor="option-1">Option 1</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-2" id="option-2" />
        <Label htmlFor="option-2">Option 2</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-3" id="option-3" />
        <Label htmlFor="option-3">Option 3</Label>
      </div>
    </RadioGroup>
  ),
}

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Radio group comparing an enabled option against a disabled option with muted label styling.",
      },
    },
  },
  render: () => (
    <RadioGroup defaultValue="option-1">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-1" id="disabled-1" />
        <Label htmlFor="disabled-1">Enabled</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-2" id="disabled-2" disabled />
        <Label htmlFor="disabled-2" className="text-muted-foreground">
          Disabled
        </Label>
      </div>
    </RadioGroup>
  ),
}
