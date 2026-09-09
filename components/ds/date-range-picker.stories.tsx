import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, within } from "storybook/test"
import { subDays } from "date-fns"
import type { DateRange } from "react-day-picker"

import { DateRangePicker } from "./date-range-picker"

const meta = {
  title: "Form/DateRangePicker",
  component: DateRangePicker,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Dual-date range picker with customizable presets, localized month views and clean popover trigger.",
      },
    },
  },
  argTypes: {
    disabled: {
      control: "boolean",
      description: "Disables the trigger.",
    },
    presets: {
      control: "boolean",
      description: "Shows quick range shortcuts.",
    },
    locale: {
      control: "radio",
      options: ["pt-BR", "en-US", "es-ES", "fr-FR"],
      description: "Language locale for calendar and labels.",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Trigger element size.",
    },
  },
} satisfies Meta<typeof DateRangePicker>

export default meta
type Story = StoryObj<typeof meta>

function InteractiveRangePicker(
  props: React.ComponentProps<typeof DateRangePicker>
) {
  const [range, setRange] = React.useState<DateRange | undefined>(props.date)
  return <DateRangePicker {...props} date={range} onSelect={setRange} />
}

export const Default: Story = {
  render: (args) => <InteractiveRangePicker {...args} />,
  args: {
    locale: "pt-BR",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("button")).toBeInTheDocument()
  },
}

export const WithPreselectedRange: Story = {
  render: (args) => <InteractiveRangePicker {...args} />,
  args: {
    locale: "pt-BR",
    date: {
      from: subDays(new Date(), 14),
      to: new Date(),
    },
  },
}

export const WithoutPresets: Story = {
  render: (args) => <InteractiveRangePicker {...args} />,
  args: {
    presets: false,
    locale: "pt-BR",
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    date: {
      from: subDays(new Date(), 7),
      to: new Date(),
    },
  },
}

export const AllSizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <InteractiveRangePicker {...args} size="sm" />
      <InteractiveRangePicker {...args} size="md" />
      <InteractiveRangePicker {...args} size="lg" />
    </div>
  ),
}

export const Locales: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <InteractiveRangePicker locale="pt-BR" />
      <InteractiveRangePicker locale="en-US" />
      <InteractiveRangePicker locale="es-ES" />
      <InteractiveRangePicker locale="fr-FR" />
    </div>
  ),
}
