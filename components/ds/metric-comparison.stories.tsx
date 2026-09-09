import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, within } from "storybook/test"

import { MetricComparison } from "./metric-comparison"

const meta = {
  title: "Data Display/MetricComparison",
  component: MetricComparison,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Side-by-side metric comparison card with automated percentage delta badge, sentiment colorization, and proportion bar.",
      },
    },
  },
  args: {
    title: "Volume de Exportações (US$ Milhões)",
    primaryMetric: {
      label: "Nov 2025",
      value: 28450,
      format: (val) => `$${val.toLocaleString()}`,
      subtext: "Período Vigente",
    },
    secondaryMetric: {
      label: "Nov 2024",
      value: 24200,
      format: (val) => `$${val.toLocaleString()}`,
      subtext: "12m atrás (YoY)",
    },
  },
  argTypes: {
    sentiment: {
      control: "radio",
      options: ["positiveIsGood", "negativeIsGood"],
      description: "Whether growth is favorable.",
    },
    layout: {
      control: "radio",
      options: ["horizontal", "vertical"],
      description: "Layout direction.",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Component scale.",
    },
    loading: {
      control: "boolean",
      description: "Shows skeleton layout.",
    },
  },
} satisfies Meta<typeof MetricComparison>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    sentiment: "positiveIsGood",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("$28,450")).toBeInTheDocument()
    await expect(canvas.getByText("+17.6%")).toBeInTheDocument()
  },
}

export const DeficitReduction: Story = {
  args: {
    title: "Déficit Nominal (% PIB)",
    sentiment: "negativeIsGood",
    primaryMetric: {
      label: "2025",
      value: 6.2,
      format: (v) => `${v}%`,
      subtext: "Meta Fiscal",
    },
    secondaryMetric: {
      label: "2024",
      value: 8.9,
      format: (v) => `${v}%`,
      subtext: "Exercício Anterior",
    },
  },
}

export const VerticalLayout: Story = {
  args: {
    layout: "vertical",
    title: "Consumo Energético Mensal",
    primaryMetric: {
      label: "Neste Mês",
      value: 1420,
      format: (v) => `${v} kWh`,
    },
    secondaryMetric: {
      label: "Média Histórica",
      value: 1250,
      format: (v) => `${v} kWh`,
    },
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex w-96 flex-col gap-6">
      <MetricComparison
        size="sm"
        title="Pequeno (sm)"
        primaryMetric={{ label: "Atual", value: 120 }}
        secondaryMetric={{ label: "Anterior", value: 100 }}
      />
      <MetricComparison
        size="md"
        title="Médio (md)"
        primaryMetric={{ label: "Atual", value: 120 }}
        secondaryMetric={{ label: "Anterior", value: 100 }}
      />
      <MetricComparison
        size="lg"
        title="Grande (lg)"
        primaryMetric={{ label: "Atual", value: 120 }}
        secondaryMetric={{ label: "Anterior", value: 100 }}
      />
    </div>
  ),
}

export const Loading: Story = {
  args: {
    loading: true,
  },
}
