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
      control: "inline-radio",
      options: ["label", "dropdown"],
      description: "How the month/year caption is displayed",
      table: { defaultValue: { summary: "label" } },
    },
    showOutsideDays: {
      control: "boolean",
      description: "Show days from adjacent months",
      table: { defaultValue: { summary: "true" } },
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
      table: { defaultValue: { summary: "ghost" } },
    },
    mode: {
      control: "inline-radio",
      options: ["single", "multiple", "range"],
      description: "Selection mode",
      table: { defaultValue: { summary: "single" } },
    },
    classNames: {
      table: { disable: true },
    },
    locale: {
      table: { disable: true },
    },
    formatters: {
      table: { disable: true },
    },
    components: {
      table: { disable: true },
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
  parameters: {
    docs: {
      description: {
        story:
          "Single date selection with today's date pre-selected and the default label caption.",
      },
    },
  },
}

export const WithDropdownCaption: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Calendar with dropdown-based month and year selectors replacing the default label caption.",
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story:
          "Range selection mode with a five-day span pre-selected from today.",
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story:
          "Two months displayed side by side using the `numberOfMonths` prop for broader date visibility.",
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story:
          "Calendar with week number indicators displayed along the left column for ISO week tracking.",
      },
    },
  },
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
