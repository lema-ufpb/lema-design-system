import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { TimePicker } from "./time-picker"

const meta = {
  title: "Form/TimePicker",
  component: TimePicker,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: [
          "A native time picker input component that provides a consistent layout with the design system.",
          "Supports loading state, skeleton, CVA variants.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `loading` | `boolean` | — | - |",
          "| `invalid` | `boolean` | — | - |",
          '| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Variant |',
        ].join("\n"),
      },
    },
  },
  args: {
    disabled: false,
    invalid: false,
    loading: false,
    "aria-label": "Time",
  },
  argTypes: {
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Sets the size of the time picker.",
      table: {
        defaultValue: { summary: '"md"' },
      },
    },
    invalid: {
      control: "boolean",
      description: "Applies invalid styling.",
    },
    loading: {
      control: "boolean",
      description: "Shows a skeleton loading state.",
    },
    disabled: {
      control: "boolean",
      description: "Disables the input.",
    },
  },
} satisfies Meta<typeof TimePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-muted-foreground">
          Small (sm)
        </span>
        <TimePicker {...args} size="sm" defaultValue="09:00" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-muted-foreground">
          Medium (md)
        </span>
        <TimePicker {...args} size="md" defaultValue="12:30" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-muted-foreground">
          Large (lg)
        </span>
        <TimePicker {...args} size="lg" defaultValue="18:45" />
      </div>
    </div>
  ),
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
    defaultValue: "25:99",
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
    defaultValue: "10:00",
  },
  parameters: {
    docs: {
      description: {
        story: "Set `disabled` to true to disable interactions.",
      },
    },
  },
}

export const Loading: Story = {
  args: {
    loading: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Set `loading` to true to render skeleton placeholders.",
      },
    },
  },
}
