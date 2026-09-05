import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, within } from "storybook/test"
import { AboutManifestoHero } from "./about-manifesto-hero"

const meta: Meta<typeof AboutManifestoHero> = {
  title: "About/AboutManifestoHero",
  component: AboutManifestoHero,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    eyebrow: "Manifesto Institucional",
    statement: (
      <>
        Acreditamos no rigor científico como base da{" "}
        <span className="text-primary">clareza digital</span> e no design
        acessível como direito universal.
      </>
    ),
    author: "LEMA — Universidade Federal da Paraíba",
    stats: [
      { label: "Anos de Pesquisa", value: "7+" },
      { label: "Artigos Publicados", value: "48" },
      { label: "Dispositivos Atingidos", value: "100k" },
      { label: "Componentes DS", value: "90+" },
    ],
    primaryAction: {
      label: "Ler Carta do Coordenador",
      href: "#",
    },
    secondaryAction: {
      label: "Conhecer a Equipe",
      href: "#",
    },
    locale: "pt-BR",
  },
}

export default meta
type Story = StoryObj<typeof AboutManifestoHero>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(
      canvas.getByText("Manifesto Institucional")
    ).toBeInTheDocument()
    await expect(canvas.getByText("Anos de Pesquisa")).toBeInTheDocument()
    await expect(canvas.getByText("7+")).toBeInTheDocument()
    await expect(
      canvas.getByText("Ler Carta do Coordenador")
    ).toBeInTheDocument()
  },
}

export const WithoutStats: Story = {
  args: {
    stats: [],
  },
}

export const SubtleSurface: Story = {
  args: {
    variant: "subtle",
  },
}
