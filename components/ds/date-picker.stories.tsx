import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { DatePicker } from "./date-picker"

const meta = {
  title: "Form/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: [
          "Date picker combining a trigger button and a calendar popover.",
          "Supports i18n.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `date` | `Date` | — | The currently selected date. |",
          "| `onSelect` | `(date?: Date) => void` | — | Callback when a date is selected. |",
          "| `placeholder` | `string` | — | Placeholder text when no date is selected. |",
          "| `disabled` | `boolean` | — | Disables the date picker. |",
          "| `locale` | `UILocale` | — | Locale for date formatting and the calendar component. |",
          '| `size` | `"sm" \| "md" \| "lg"` | — | Component size, applied to the trigger button. |',
        ].join("\n"),
      },
    },
  },
  argTypes: {
    date: {
      control: "date",
      description: "Selected date.",
    },
    disabled: {
      control: "boolean",
      description: "Disables the picker.",
    },
    locale: {
      control: "radio",
      options: ["en-US", "pt-BR", "es-ES", "fr-FR"],
      description: "Locale for date formatting.",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Trigger button size.",
    },
  },
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

function InteractiveDatePicker(props: React.ComponentProps<typeof DatePicker>) {
  const [date, setDate] = React.useState<Date | undefined>(
    props.date ? new Date(props.date) : undefined
  )
  return <DatePicker {...props} date={date} onSelect={setDate} />
}

export const Default: Story = {
  render: (args) => <InteractiveDatePicker {...args} />,
  args: {
    locale: "en-US",
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const WithPreset: Story = {
  render: (args) => <InteractiveDatePicker {...args} />,
  args: {
    date: new Date(2025, 0, 1),
  },
}

export const AllSizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <DatePicker {...args} size="sm" date={new Date(2025, 0, 1)} />
      <DatePicker {...args} size="md" date={new Date(2025, 0, 1)} />
      <DatePicker {...args} size="lg" date={new Date(2025, 0, 1)} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "The component supports 3 sizes: sm, md and lg.",
      },
    },
  },
}

export const Locales: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <DatePicker locale="en-US" date={new Date(2025, 0, 1)} />
      <DatePicker locale="pt-BR" date={new Date(2025, 0, 1)} />
      <DatePicker locale="es-ES" date={new Date(2025, 0, 1)} />
      <DatePicker locale="fr-FR" date={new Date(2025, 0, 1)} />
    </div>
  ),
}
