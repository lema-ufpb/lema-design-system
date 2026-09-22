import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, within } from "storybook/test"

import { Sparkline } from "./sparkline"

const sampleData = [12, 14, 11, 18, 16, 22, 26, 24, 31, 29, 38]

const meta = {
  title: "Data Display/Sparkline",
  component: Sparkline,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Lightweight standalone SVG sparkline micro-chart with line, area, and bar modes for tabular data and metric widgets.",
      },
    },
  },
  args: {
    data: sampleData,
    width: 140,
    height: 36,
  },
  argTypes: {
    type: {
      control: "radio",
      options: ["line", "area", "bar"],
      description: "Visual style.",
    },
    intent: {
      control: "radio",
      options: ["primary", "success", "destructive", "warning"],
      description: "Semantic color.",
    },
    loading: {
      control: "boolean",
      description: "Shows skeleton placeholder.",
    },
  },
} satisfies Meta<typeof Sparkline>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    intent: "primary",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const svg = canvas.getByRole("img")
    await expect(svg).toBeInTheDocument()
  },
}

export const AreaVariant: Story = {
  args: {
    type: "area",
    intent: "success",
    data: [15, 18, 14, 25, 22, 34, 30, 42],
  },
}

export const BarVariant: Story = {
  args: {
    type: "bar",
    intent: "warning",
    data: [5, 12, 8, 15, 10, 20, 14, 18],
  },
}

export const AllIntents: Story = {
  render: () => (
    <div className="grid w-80 grid-cols-2 gap-6">
      <div className="rounded-lg border border-border bg-card p-3">
        <span className="block pb-1 text-xs text-muted-foreground">
          Primary:
        </span>
        <Sparkline data={sampleData} intent="primary" type="area" />
      </div>
      <div className="rounded-lg border border-border bg-card p-3">
        <span className="block pb-1 text-xs text-muted-foreground">
          Success (+18%):
        </span>
        <Sparkline
          data={[10, 12, 16, 20, 25, 32]}
          intent="success"
          type="area"
        />
      </div>
      <div className="rounded-lg border border-border bg-card p-3">
        <span className="block pb-1 text-xs text-muted-foreground">
          Destructive (-8%):
        </span>
        <Sparkline
          data={[32, 28, 25, 26, 20, 15]}
          intent="destructive"
          type="area"
        />
      </div>
      <div className="rounded-lg border border-border bg-card p-3">
        <span className="block pb-1 text-xs text-muted-foreground">
          Warning:
        </span>
        <Sparkline
          data={[15, 18, 12, 24, 18, 22]}
          intent="warning"
          type="line"
        />
      </div>
    </div>
  ),
}

export const InTableCell: Story = {
  render: () => (
    <div className="w-96 overflow-hidden rounded-lg border border-border bg-card">
      <table className="w-full text-xs">
        <thead className="border-b border-border bg-muted/40">
          <tr>
            <th className="p-2.5 text-left font-medium text-muted-foreground">
              Indicador
            </th>
            <th className="p-2.5 text-right font-medium text-muted-foreground">
              Last
            </th>
            <th className="p-2.5 text-center font-medium text-muted-foreground">
              Tendência (30d)
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          <tr>
            <td className="p-2.5 font-medium text-foreground">Taxa Selic</td>
            <td className="p-2.5 text-right font-semibold tabular-nums">
              10.75%
            </td>
            <td className="w-28 p-2.5">
              <Sparkline
                data={[12.25, 11.75, 11.25, 10.75, 10.75]}
                height={22}
                intent="destructive"
              />
            </td>
          </tr>
          <tr>
            <td className="p-2.5 font-medium text-foreground">
              PIB Trimestral
            </td>
            <td className="p-2.5 text-right font-semibold tabular-nums">
              +2.8%
            </td>
            <td className="w-28 p-2.5">
              <Sparkline
                data={[1.2, 1.8, 2.1, 2.4, 2.8]}
                height={22}
                intent="success"
                type="area"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  ),
}

export const Loading: Story = {
  args: {
    loading: true,
  },
}
