import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, within } from "storybook/test"
import { AboutMilestones } from "./about-milestones"

const sampleMilestones = [
  {
    year: "2018",
    title: "Fundação do Laboratório",
    description:
      "Criação do núcleo de pesquisa aplicada no Centro de Ciências Exatas e da Natureza da UFPB.",
    badge: "Origem",
  },
  {
    year: "2020",
    title: "Primeira Cooperação Técnica",
    description:
      "Formalização de convênio com órgãos governamentais para modelagem preditiva de indicadores públicos.",
  },
  {
    year: "2022",
    title: "Expansão para Engenharia e Design",
    description:
      "Integração da frente de design de interação e desenvolvimento de bibliotecas frontend acessíveis.",
  },
  {
    year: "2024",
    title: "Lançamento do LEMA-DS",
    description:
      "Disponibilização do ecossistema de componentes públicos para consumo via CLI e registry.",
    badge: "Consolidação",
  },
]

const meta: Meta<typeof AboutMilestones> = {
  title: "About/AboutMilestones",
  component: AboutMilestones,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    badge: "Nossa Trajetória",
    title: "Uma jornada pautada na ciência e no impacto coletivo",
    description:
      "Acompanhe a linha do tempo com os momentos mais marcantes da nossa história acadêmica e tecnológica.",
    milestones: sampleMilestones,
    orientation: "vertical",
    locale: "pt-BR",
  },
}

export default meta
type Story = StoryObj<typeof AboutMilestones>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Nossa Trajetória")).toBeInTheDocument()
    await expect(
      canvas.getByText(/Uma jornada pautada na ciência/i)
    ).toBeInTheDocument()
    await expect(canvas.getByText("2018")).toBeInTheDocument()
  },
}

export const Horizontal: Story = {
  args: {
    orientation: "horizontal",
  },
}

export const MutedSurface: Story = {
  args: {
    variant: "muted",
  },
}
