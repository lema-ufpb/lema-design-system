import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Accordion } from "./accordion"

const SAMPLE_ITEMS = [
  {
    value: "item-1",
    trigger: "What is LEMA Design System?",
    children:
      "LEMA is the official design system of UFPB, built on shadcn/ui with Tailwind CSS v4 and CVA.",
  },
  {
    value: "item-2",
    trigger: "How do I install components?",
    children:
      "Components can be installed via `npx shadcn@latest add` from the registry.",
  },
  {
    value: "item-3",
    trigger: "Is it open source?",
    children: "Yes, LEMA is open source and available on GitHub.",
  },
]

const meta = {
  title: "Navigation/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A composable accordion wrapping the Radix Accordion primitive.",
          "Supports single/multiple expansion, four icon variants, three sizes, border/radius variants, and loading skeletons.",
          "",
          "---",
          "",
          "## Data API",
          "",
          "### Accordion Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `items` | `AccordionItem[]` | — | Array of items (required) |",
          '| `collapsible` | `boolean` | `true` | All items can be collapsed (only applies when `type="single"`) |',
          '| `type` | `"single" \\| "multiple"` | `"single"` | Expansion behavior |',
          '| `iconVariant` | `"chevron" \\| "plus" \\| "arrow" \\| "sign"` | `"chevron"` | Expand icon style |',
          '| `size` | `"sm" \\| "md" \\| "lg"` | `"md"` | Size preset |',
          '| `rounded` | `"default" \\| "none"` | `"default"` | Border radius |',
          '| `bordered` | `"default" \\| "none"` | `"default"` | Border display |',
          "| `loading` | `boolean` | `false` | Skeleton placeholder |",
          "| `loadingCount` | `number` | `3` | Skeleton item count |",
          "",
          "### `AccordionItem`",
          "",
          "| Field | Type | Description |",
          "| --- | --- | --- |",
          "| `value` | `string` | Unique identifier |",
          "| `trigger` | `string` | Header text |",
          "| `children` | `ReactNode` | Expanded content |",
          "| `disabled` | `boolean` | Disables item |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    iconVariant: {
      control: "inline-radio",
      options: ["chevron", "plus", "arrow", "sign"],
      table: { defaultValue: { summary: "chevron" } },
    },
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
      table: { defaultValue: { summary: "md" } },
    },
    type: {
      control: "inline-radio",
      options: ["single", "multiple"],
      table: { defaultValue: { summary: "single" } },
    },
    rounded: {
      control: "inline-radio",
      options: ["default", "none"],
      table: { defaultValue: { summary: "default" } },
    },
    bordered: {
      control: "inline-radio",
      options: ["default", "none"],
      table: { defaultValue: { summary: "default" } },
    },
    loading: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    collapsible: {
      control: "boolean",
      table: { defaultValue: { summary: "true" } },
    },
    loadingCount: {
      control: "number",
      table: { defaultValue: { summary: "3" } },
    },
    items: { table: { disable: true } },
    value: { table: { disable: true } },
    onValueChange: { table: { disable: true } },
  },
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: SAMPLE_ITEMS,
    type: "single",
    collapsible: true,
    iconVariant: "chevron",
    size: "md",
    rounded: "default",
    bordered: "default",
    loading: false,
    loadingCount: 3,
  },
}

export const Multiple: Story = {
  args: {
    type: "multiple",
    items: SAMPLE_ITEMS,
  },
}

export const IconVariants: Story = {
  args: { items: [] },
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-2 text-sm font-medium text-muted-foreground">
          Chevron
        </p>
        <Accordion iconVariant="chevron" items={SAMPLE_ITEMS} />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-muted-foreground">Plus</p>
        <Accordion iconVariant="plus" items={SAMPLE_ITEMS} />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-muted-foreground">Sign</p>
        <Accordion iconVariant="sign" items={SAMPLE_ITEMS} />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-muted-foreground">Arrow</p>
        <Accordion iconVariant="arrow" items={SAMPLE_ITEMS} />
      </div>
    </div>
  ),
}

export const AllSizes: Story = {
  args: { items: [] },
  render: () => (
    <div className="flex flex-col gap-8">
      <Accordion size="sm" items={SAMPLE_ITEMS} />
      <Accordion size="md" items={SAMPLE_ITEMS} />
      <Accordion size="lg" items={SAMPLE_ITEMS} />
    </div>
  ),
}

export const RoundedNone: Story = {
  args: {
    items: SAMPLE_ITEMS,
    rounded: "none",
  },
}

export const BorderNone: Story = {
  args: {
    items: SAMPLE_ITEMS,
    bordered: "none",
  },
}

export const RoundedNoneBorderNone: Story = {
  args: {
    items: SAMPLE_ITEMS,
    rounded: "none",
    bordered: "none",
  },
}

export const Loading: Story = {
  args: {
    loading: true,
    items: SAMPLE_ITEMS,
  },
}

export const Nested: Story = {
  args: { items: [] },
  render: () => (
    <Accordion
      type="multiple"
      items={[
        {
          value: "outer-1",
          trigger: "Design System",
          children: (
            <Accordion
              size="sm"
              type="multiple"
              items={[
                {
                  value: "inner-1",
                  trigger: "Components",
                  children: "Buttons, cards, tables, and more.",
                },
                {
                  value: "inner-2",
                  trigger: "Tokens",
                  children: "Color, typography, and spacing tokens.",
                },
              ]}
            />
          ),
        },
        {
          value: "outer-2",
          trigger: "Getting Started",
          children: "Install the CLI and start using components.",
        },
      ]}
    />
  ),
}

export const Controlled: Story = {
  args: { items: [] },
  render: () => {
    const [value, setValue] = React.useState("item-1")
    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">
          Current:{" "}
          <code className="rounded bg-muted px-1.5 py-0.5">{value}</code>
        </p>
        <Accordion
          value={value}
          onValueChange={(v) => setValue(v as string)}
          items={SAMPLE_ITEMS}
        />
      </div>
    )
  },
}
