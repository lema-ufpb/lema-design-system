import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Rating } from "./rating"

const meta = {
  title: "Data Display/Rating",
  component: Rating,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: [
          "Interactive rating component using icon-based (star) evaluation.",
          "Supports CVA variants.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `value` | `number` | — | The current rating value. |",
          "| `max` | `number` | — | The maximum rating value. Defaults to 5. |",
          "| `readonly` | `boolean` | — | Disables interaction and hover states. |",
          '| `disabled` | `"true" \| "false"` | — | Disables the component entirely (opacity). |',
          "| `onChange` | `(value: number) => void` | — | Callback when a star is clicked. |",
          "| `icon` | `React.ElementType` | — | Custom icon component to render. Defaults to StarIcon. |",
          '| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Variant |',
          '| `interactive` | `"true" \| "false"` | — | Variant |',
        ].join("\n"),
      },
    },
  },
  argTypes: {
    value: {
      control: "number",
      description: "Current rating value.",
    },
    max: {
      control: "number",
      description: "Maximum scale value (number of stars).",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Star size.",
    },
    readonly: {
      control: "boolean",
      description: "Disables interaction with the component.",
    },
    disabled: {
      control: "boolean",
      description: "Visually disables the component.",
    },
  },
} satisfies Meta<typeof Rating>

export default meta
type Story = StoryObj<typeof meta>

// Stateful wrapper for interactive stories
function InteractiveRating(props: React.ComponentProps<typeof Rating>) {
  const [value, setValue] = React.useState(props.value)
  return <Rating {...props} value={value} onChange={setValue} />
}

export const Default: Story = {
  render: (args) => <InteractiveRating {...args} />,
  args: {
    value: 3,
    max: 5,
    size: "md",
  },
}

export const Readonly: Story = {
  args: {
    value: 4,
    max: 5,
    size: "md",
    readonly: true,
  },
}

export const AllSizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Rating {...args} size="sm" />
      <Rating {...args} size="md" />
      <Rating {...args} size="lg" />
    </div>
  ),
  args: {
    value: 3,
    readonly: true,
  },
  parameters: {
    docs: {
      description: {
        story: "The component supports 3 sizes: sm, md and lg.",
      },
    },
  },
}

export const Disabled: Story = {
  args: {
    value: 2,
    max: 5,
    size: "md",
    disabled: true,
  },
}
