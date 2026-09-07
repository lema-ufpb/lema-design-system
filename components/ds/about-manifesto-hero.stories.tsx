import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, within } from "storybook/test"
import { AboutManifestoHero } from "./about-manifesto-hero"

const meta: Meta<typeof AboutManifestoHero> = {
  title: "About/AboutManifestoHero",
  component: AboutManifestoHero,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A AboutManifestoHero component for the LEMA Design System.",
          "Supports i18n and CVA variants.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `statement` | `React.ReactNode` | — | - |",
          "| `eyebrow` | `string` | — | - |",
          "| `author` | `string` | — | - |",
          "| `stats` | `AboutManifestoHeroStat[]` | — | - |",
          "| `primaryAction` | `AboutManifestoHeroAction` | — | - |",
          "| `secondaryAction` | `AboutManifestoHeroAction` | — | - |",
          "| `locale` | `UILocale` | — | - |",
          '| `variant` | `"default" \| "subtle"` | `"default"` | Variant |',
        ].join("\n"),
      },
    },
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
