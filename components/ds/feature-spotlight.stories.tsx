import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, within } from "storybook/test"

import { FeatureSpotlight } from "./feature-spotlight"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

const meta = {
  title: "Feedback/FeatureSpotlight",
  component: FeatureSpotlight,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Contextual feature discovery spotlight anchored to an interface element with step counter and dismiss controls.",
      },
    },
  },
  args: {
    children: (
      <Button size="sm">
        <Download data-icon="inline-start" />
        Exportar Parquet
      </Button>
    ),
    title: "Novo Formato de Exportação",
    description:
      "Agora você pode exportar séries completas em Apache Parquet para carregamento ultrarrápido em Python e R.",
  },
  argTypes: {
    side: {
      control: "radio",
      options: ["top", "right", "bottom", "left"],
      description: "Popover side placement.",
    },
    showBeacon: {
      control: "boolean",
      description: "Shows glowing beacon dot.",
    },
    locale: {
      control: "radio",
      options: ["pt-BR", "en-US", "es-ES", "fr-FR"],
      description: "Language locale.",
    },
  },
} satisfies Meta<typeof FeatureSpotlight>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    locale: "pt-BR",
  },
  play: async () => {
    const popoverHeading = await within(document.body).findByText(
      "Novo Formato de Exportação"
    )
    await expect(popoverHeading).toBeInTheDocument()
  },
}

export const MultiStepTour: Story = {
  args: {
    step: 2,
    totalSteps: 4,
    title: "Ajuste de Hiperparâmetros",
    description:
      "Configure a taxa de aprendizado e o número de épocas da estimação bayesiana antes de executar a simulação.",
    onNext: () => alert("Próximo passo!"),
    onPrevious: () => alert("Passo anterior!"),
  },
}

export const Locales: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <FeatureSpotlight
        locale="en-US"
        title="New Export Feature"
        description="Download files directly in Parquet format."
        step={1}
        totalSteps={3}
      >
        <Button size="sm" variant="outline">
          Export
        </Button>
      </FeatureSpotlight>
    </div>
  ),
}
