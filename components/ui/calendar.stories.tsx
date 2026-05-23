import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Calendar } from "./calendar"
import { useState } from "react"

const meta = {
  title: "Shadcn UI/Calendar",
  component: Calendar,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A date picker calendar built on `react-day-picker` with full day selection, range selection, and month/year dropdown navigation.",
          "",
          "Supports `captionLayout` (`label` | `dropdown`), a `buttonVariant` prop to style the navigation buttons, and `showOutsideDays` to control visibility of adjacent month cells. Also exports `CalendarDayButton` for custom day rendering.",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Variant / Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Calendar background** | `--background` | Root surface fill |",
          "| **Today / hover** | `--muted` | Highlighted day or hover state |",
          "| **Selected day** | `--primary` | Background for selected date |",
          "| **Selected text** | `--primary-foreground` | Text color on selected date |",
          "| **Outside / disabled** | `--muted-foreground` | Dimmed text for adjacent or disabled days |",
          "| **Weekday / default text** | `--muted-foreground` | Day-of-week headers and default day text |",
          "| **Dropdown background** | `--popover` | Month/year dropdown surface |",
          "| **Focus ring** | `--ring` / `--ring/50` | Keyboard focus ring on focused day |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    captionLayout: {
      control: "select",
      options: ["label", "dropdown"],
      description: "How the month/year caption is displayed",
    },
    showOutsideDays: {
      control: "boolean",
      description: "Show days from adjacent months",
    },
    buttonVariant: {
      control: "select",
      options: [
        "default",
        "outline",
        "secondary",
        "ghost",
        "destructive",
        "link",
      ],
      description: "Variant for the previous/next navigation buttons",
    },
    mode: {
      control: "select",
      options: ["single", "multiple", "range"],
      description: "Selection mode",
    },
  },
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date())
    return <Calendar mode="single" selected={date} onSelect={setDate} />
  },
}

export const WithDropdownCaption: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date())
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        captionLayout="dropdown"
      />
    )
  },
}

export const RangeSelection: Story = {
  render: () => {
    const [range, setRange] = useState({
      from: new Date(),
      to: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    })
    return (
      <Calendar
        mode="range"
        selected={range}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onSelect={setRange as any}
      />
    )
  },
}

export const MultipleMonths: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date())
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        numberOfMonths={2}
      />
    )
  },
}

export const WithWeekNumbers: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date())
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        showWeekNumber
      />
    )
  },
}
