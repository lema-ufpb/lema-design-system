import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { useState } from "react"
import {
  FilterBuilder,
  type FilterRule,
  type FilterField,
} from "./filter-builder"
import { fn } from "storybook/test"
import { Card, CardContent } from "@/components/ui/card"

const meta = {
  title: "Form/FilterBuilder",
  component: FilterBuilder,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: [
          "A complex component for building advanced query filters.",
          "Supports i18n.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `fields` | `FilterField[]` | — | - |",
          "| `rules` | `FilterRule[]` | — | - |",
          "| `onChange` | `(rules: FilterRule[]) => void` | — | - |",
          "| `locale` | `UILocale` | — | - |",
          "| `className` | `string` | — | - |",
        ].join("\n"),
      },
    },
  },
  args: {
    fields: [],
    rules: [],
    onChange: fn(),
  },
} satisfies Meta<typeof FilterBuilder>

export default meta
type Story = StoryObj<typeof meta>

const sampleFields: FilterField[] = [
  {
    id: "status",
    label: "Status",
    operators: [
      { value: "equals", label: "Equals" },
      { value: "not_equals", label: "Not equals" },
    ],
  },
  {
    id: "name",
    label: "Name",
    operators: [
      { value: "contains", label: "Contains" },
      { value: "equals", label: "Equals" },
      { value: "starts_with", label: "Starts with" },
    ],
  },
  {
    id: "created_at",
    label: "Created Date",
    operators: [
      { value: "after", label: "After" },
      { value: "before", label: "Before" },
      { value: "between", label: "Between" },
    ],
  },
]

export const Default: Story = {
  render: () => {
    const [rules, setRules] = useState<FilterRule[]>([
      { id: "1", field: "status", operator: "equals", value: "Active" },
    ])

    return (
      <Card className="max-w-[800px] w-full">
        <CardContent className="p-6">
          <FilterBuilder
            fields={sampleFields}
            rules={rules}
            onChange={setRules}
          />
        </CardContent>
      </Card>
    )
  },
}

export const Empty: Story = {
  render: () => {
    const [rules, setRules] = useState<FilterRule[]>([])

    return (
      <Card className="max-w-[800px] w-full">
        <CardContent className="p-6">
          <FilterBuilder
            fields={sampleFields}
            rules={rules}
            onChange={setRules}
          />
        </CardContent>
      </Card>
    )
  },
}
