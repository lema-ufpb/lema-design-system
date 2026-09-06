import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, within } from "storybook/test"
import {
  ShieldCheck,
  Sparkles,
  HeartHandshake,
  Lightbulb,
  Users,
  Compass,
} from "lucide-react"
import { AboutValuesGrid } from "./about-values-grid"

const sampleValues = [
  {
    title: "Excelência Científica",
    description:
      "Rigor metodológico contínuo em todas as fases da investigação e do desenvolvimento.",
    icon: Sparkles,
  },
  {
    title: "Transparência e Ética",
    description:
      "Compromisso irrestrito com a reprodutibilidade dos dados e o código aberto.",
    icon: ShieldCheck,
  },
  {
    title: "Impacto Social",
    description:
      "Pesquisa que transcende os muros da universidade para resolver demandas reais da população.",
    icon: HeartHandshake,
  },
  {
    title: "Inovação Acessível",
    description:
      "Design de interfaces intuitivas construídas sob os mais rigorosos critérios de acessibilidade.",
    icon: Lightbulb,
  },
  {
    title: "Colaboração Multidisciplinar",
    description:
      "Integração contínua entre estatísticos, desenvolvedores, designers e especialistas de domínio.",
    icon: Users,
  },
  {
    title: "Formação de Futuro",
    description:
      "Dedicação à mentoria contínua de novos talentos e novos pesquisadores.",
    icon: Compass,
  },
]

const meta: Meta<typeof AboutValuesGrid> = {
  title: "Blocks/AboutValuesGrid",
  component: AboutValuesGrid,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    badge: "Nossos Valores",
    title: "Os pilares fundamentais que norteiam nossas pesquisas",
    description:
      "Conheça os princípios inegociáveis que orientam cada linha de código e cada modelo matemático desenvolvido no LEMA.",
    values: sampleValues,
    columns: 3,
    locale: "pt-BR",
  },
}

export default meta
type Story = StoryObj<typeof AboutValuesGrid>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Nossos Valores")).toBeInTheDocument()
    await expect(canvas.getByText("Excelência Científica")).toBeInTheDocument()
    await expect(canvas.getByText("Formação de Futuro")).toBeInTheDocument()
  },
}

export const TwoColumns: Story = {
  args: {
    columns: 2,
    values: sampleValues.slice(0, 4),
  },
}

export const FourColumns: Story = {
  args: {
    columns: 4,
    values: sampleValues.slice(0, 4),
  },
}
