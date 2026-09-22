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
    title: "New Export Format",
    description:
      "You can now export full series in Apache Parquet for ultra-fast loading in Python and R.",
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
      options: ["en-US", "pt-BR", "es-ES", "fr-FR"],
      description: "Language locale.",
    },
  },
} satisfies Meta<typeof FeatureSpotlight>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    locale: "en-US",
  },
  play: async () => {
    const popoverHeading = await within(document.body).findByText(
      "New Export Format"
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
      "Configure the learning rate and number of epochs for Bayesian estimation before running the simulation.",
    onNext: () => alert("Next step!"),
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
