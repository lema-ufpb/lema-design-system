import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { UsersIcon } from "lucide-react"
import { Stats } from "./stats"

const meta = {
  title: "Stats/Stats",
  component: Stats,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A Stats component for the LEMA Design System.",
          "Supports loading state, skeleton, i18n support.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `label` | `string` | — | - |",
          "| `value` | `string \| number` | — | - |",
          "| `trend` | `{ value: string` | — | - |",
          "| `period` | `string` | — | - |",
          "| `icon` | `React.ReactNode` | — | - |",
          "| `locale` | `UILocale` | — | - |",
          "| `loading` | `boolean` | — | - |",
          '| `size` | `"sm" \| "md"` | `"md"` | Variant |',
        ].join("\n"),
      },
    },
  },
  argTypes: { size: { control: "inline-radio", options: ["sm", "md"] } },
} satisfies Meta<typeof Stats>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: "Total users",
    value: "12,345",
    trend: { value: "+12%", direction: "up" },
    period: "vs last month",
    icon: <UsersIcon />,
  },
}

export const WithoutTrend: Story = {
  args: { label: "Revenue", value: "$48,290" },
}

export const Loading: Story = {
  args: { label: "Loading", value: "0", loading: true },
}
