import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { within, expect } from "storybook/test"
import { SectionCards } from "./section-cards"

const meta: Meta<typeof SectionCards> = {
  title: "Data Display/SectionCards",
  component: SectionCards,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A SectionCards component for the LEMA Design System.",
          "Supports loading state, skeleton, CVA variants.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `items` | `SectionCardItem[]` | — | - |",
          "| `loading` | `boolean` | — | - |",
          '| `columns` | `"2" \| "4"` | — | Variant |',
          '| `variant` | `"default" \| "gradient"` | `"gradient"` | Variant |',
        ].join("\n"),
      },
    },
    layout: "fullscreen",
  },
}

export default meta
type Story = StoryObj<typeof SectionCards>

const items = [
  {
    title: "Total Revenue",
    value: "$1,250.00",
    badge: { value: "+12.5%", trend: "up" as const },
    footerTitle: "Trending up this month",
    footerDescription: "Visitors for the last 6 months",
  },
  {
    title: "New Customers",
    value: "1,234",
    badge: { value: "-20%", trend: "down" as const },
    footerTitle: "Down 20% this period",
    footerDescription: "Acquisition needs attention",
  },
  {
    title: "Active Accounts",
    value: "45,678",
    badge: { value: "+12.5%", trend: "up" as const },
    footerTitle: "Strong user retention",
    footerDescription: "Engagement exceed targets",
  },
  {
    title: "Growth Rate",
    value: "4.5%",
    badge: { value: "+4.5%", trend: "up" as const },
    footerTitle: "Steady performance increase",
    footerDescription: "Meets growth projections",
  },
]

export const Default: Story = {
  args: { items },
}

export const TwoColumns: Story = {
  args: { items: items.slice(0, 2), columns: 2 },
}

export const Loading: Story = {
  args: { items, loading: true },
}

export const WithoutBadge: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    items: items.map(({ badge, ...rest }) => rest as unknown as never),
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <SectionCards items={items} variant="gradient" />
      <SectionCards items={items} variant="default" />
    </div>
  ),
}

export const A11y: Story = {
  args: { items },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Total Revenue")).toBeInTheDocument()
  },
}
