import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { useState } from "react"
import { ColorPicker } from "./color-picker"

const meta = {
  title: "Form/ColorPicker",
  component: ColorPicker,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A color picker input combining a native color selector and text input.",
      },
    },
  },
  args: {
    disabled: false,
    invalid: false,
    "aria-label": "Select color",
  },
  argTypes: {
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Sets the size of the color picker.",
      table: {
        defaultValue: { summary: '"md"' },
      },
    },
    invalid: {
      control: "boolean",
      description: "Applies invalid styling.",
    },
    disabled: {
      control: "boolean",
      description: "Disables the input.",
    },
  },
} satisfies Meta<typeof ColorPicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => {
    const [color, setColor] = useState("#8b5cf6")
    return <ColorPicker {...args} value={color} onChange={setColor} />
  },
}

export const Sizes: Story = {
  render: (args) => {
    const [color, setColor] = useState("#f43f5e")
    return (
      <div className="flex w-64 flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-muted-foreground">
            Small (sm)
          </span>
          <ColorPicker {...args} size="sm" value={color} onChange={setColor} />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-muted-foreground">
            Medium (md)
          </span>
          <ColorPicker {...args} size="md" value={color} onChange={setColor} />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-muted-foreground">
            Large (lg)
          </span>
          <ColorPicker {...args} size="lg" value={color} onChange={setColor} />
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: "The component supports `sm`, `md`, and `lg` sizes.",
      },
    },
  },
}

export const Invalid: Story = {
  args: {
    invalid: true,
    value: "#ff0000",
  },
  parameters: {
    docs: {
      description: {
        story: "Set `invalid` to true to apply error styling.",
      },
    },
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    value: "#cccccc",
  },
  parameters: {
    docs: {
      description: {
        story: "Set `disabled` to true to disable interactions.",
      },
    },
  },
}
