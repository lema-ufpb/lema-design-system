import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  NativeSelect,
  NativeSelectOption,
  NativeSelectOptGroup,
} from "./native-select"

const meta = {
  title: "Shadcn UI/Native Select",
  component: NativeSelect,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A native `<select>` element with styled wrapper for consistent appearance across browsers.",
          "",
          "Supports `size` (`sm`, `default`) and renders a chevron icon. Use `NativeSelectOption` and `NativeSelectOptGroup` as drop-in replacements for `<option>` and `<optgroup>`.",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Variant / Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Select background** | `--input/50` | Default select fill |",
          "| **Focus border** | `--ring` | Border on focus |",
          "| **Focus ring** | `--ring/30` | Glow ring on focus |",
          "| **Invalid border** | `--destructive` | Error state border |",
          "| **Invalid ring** | `--destructive/20` | Error state ring glow |",
          "| **Placeholder text** | `--muted-foreground` | Placeholder color |",
          "| **Selection bg** | `--primary` | Selected option background |",
          "| **Selection text** | `--primary-foreground` | Selected option text |",
          "| **Icon color** | `--muted-foreground` | Chevron icon color |",
          "| **Disabled** | `--foreground` / `opacity-50` | Dimmed when disabled |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["sm", "default"],
      description: "Select height preset",
      table: { defaultValue: { summary: "default" } },
    },
    disabled: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
  },
} satisfies Meta<typeof NativeSelect>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Native select element with three simple options using the default size preset and a chevron icon.",
      },
    },
  },
  render: () => (
    <NativeSelect defaultValue="option-1">
      <NativeSelectOption value="option-1">Option 1</NativeSelectOption>
      <NativeSelectOption value="option-2">Option 2</NativeSelectOption>
      <NativeSelectOption value="option-3">Option 3</NativeSelectOption>
    </NativeSelect>
  ),
}

export const Small: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Compact native select using the small size preset for space-constrained layouts.",
      },
    },
  },
  render: () => (
    <NativeSelect size="sm" defaultValue="option-1">
      <NativeSelectOption value="option-1">Option 1</NativeSelectOption>
      <NativeSelectOption value="option-2">Option 2</NativeSelectOption>
    </NativeSelect>
  ),
}

export const WithGroup: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Native select with options organized into Fruits and Vegetables optgroups via NativeSelectOptGroup.",
      },
    },
  },
  render: () => (
    <NativeSelect defaultValue="apple">
      <NativeSelectOptGroup label="Fruits">
        <NativeSelectOption value="apple">Apple</NativeSelectOption>
        <NativeSelectOption value="banana">Banana</NativeSelectOption>
      </NativeSelectOptGroup>
      <NativeSelectOptGroup label="Vegetables">
        <NativeSelectOption value="carrot">Carrot</NativeSelectOption>
        <NativeSelectOption value="broccoli">Broccoli</NativeSelectOption>
      </NativeSelectOptGroup>
    </NativeSelect>
  ),
}

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Native select in a disabled state with a pre-selected value, preventing user interaction.",
      },
    },
  },
  render: () => (
    <NativeSelect disabled defaultValue="option-1">
      <NativeSelectOption value="option-1">Option 1</NativeSelectOption>
      <NativeSelectOption value="option-2">Option 2</NativeSelectOption>
    </NativeSelect>
  ),
}
