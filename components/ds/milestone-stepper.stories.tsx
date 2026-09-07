import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, within } from "storybook/test"
import { MilestoneStepper } from "./milestone-stepper"

const sampleMilestones = [
  {
    year: "2018",
    title: "Fundação do Laboratório",
    description:
      "Início das atividades de pesquisa aplicada com foco em modelagem estatística e análise de dados.",
    badge: "Marco Zero",
  },
  {
    year: "2020",
    title: "Primeira Publicação Internacional",
    description:
      "Reconhecimento internacional com artigo de impacto sobre inferência bayesiana aplicada à saúde.",
  },
  {
    year: "2022",
    title: "Expansão da Equipe e Parcerias",
    description:
      "Criação do programa de iniciação científica e cooperação técnica com instituições parceiras.",
  },
  {
    year: "2024",
    title: "Lançamento do LEMA-DS",
    description:
      "Publicação do Design System unificado e acessível para todos os ecossistemas de software do laboratório.",
    badge: "Presente",
  },
]

const meta: Meta<typeof MilestoneStepper> = {
  title: "Onboarding/MilestoneStepper",
  component: MilestoneStepper,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A MilestoneStepper component for the LEMA Design System.",
          "Supports CVA variants.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `milestones` | `MilestoneItem[]` | — | - |",
          '| `orientation` | `"vertical" \| "horizontal"` | `"vertical"` | Variant |',
        ].join("\n"),
      },
    },
    layout: "padded",
  },
  args: {
    milestones: sampleMilestones,
    orientation: "vertical",
  },
}

export default meta
type Story = StoryObj<typeof MilestoneStepper>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(
      canvas.getByText("Fundação do Laboratório")
    ).toBeInTheDocument()
    await expect(canvas.getByText("2018")).toBeInTheDocument()
    await expect(canvas.getByText("2024")).toBeInTheDocument()
  },
}

export const Horizontal: Story = {
  args: {
    orientation: "horizontal",
  },
}
