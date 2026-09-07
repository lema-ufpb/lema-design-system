import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BoxIcon } from "lucide-react"
import { IntegrationsMarquee } from "./integrations-marquee"

const row = Array.from({ length: 6 }).map((_, i) => ({
  name: `App ${i + 1}`,
  icon: <BoxIcon />,
  status: "available" as const,
}))

const meta = {
  title: "Integrations/IntegrationsMarquee",
  component: IntegrationsMarquee,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A IntegrationsMarquee component for the LEMA Design System.",
          "Composable and theme-aware via semantic tokens.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `rows` | `IntegrationTileProps[][]` | — | - |",
          '| `speed` | `"slow" \| "normal" \| "fast"` | — | - |',
          "| `pauseOnHover` | `boolean` | — | - |",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof IntegrationsMarquee>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { rows: [row, row.slice().reverse()] } }

export const Speeds: Story = {
  args: { rows: [row] },
  render: () => (
    <div className="flex flex-col gap-4">
      <IntegrationsMarquee rows={[row]} speed="slow" />
      <IntegrationsMarquee rows={[row]} speed="normal" />
      <IntegrationsMarquee rows={[row]} speed="fast" />
    </div>
  ),
}
