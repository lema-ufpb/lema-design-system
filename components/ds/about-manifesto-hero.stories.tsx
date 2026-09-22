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
    eyebrow: "Institutional Manifesto",
    statement: (
      <>
        We believe in scientific rigor as the foundation of{" "}
        <span className="text-primary">digital clarity</span> e no design
        accessible design as a universal right.
      </>
    ),
    author: "LEMA — Universidade Federal da Paraíba",
    stats: [
      { label: "Years of Research", value: "7+" },
      { label: "Published Articles", value: "48" },
      { label: "Devices Reached", value: "100k" },
      { label: "DS Components", value: "90+" },
    ],
    primaryAction: {
      label: "Read Coordinator's Letter",
      href: "#",
    },
    secondaryAction: {
      label: "Meet the Team",
      href: "#",
    },
    locale: "en-US",
  },
}

export default meta
type Story = StoryObj<typeof AboutManifestoHero>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(
      canvas.getByText("Institutional Manifesto")
    ).toBeInTheDocument()
    await expect(canvas.getByText("Years of Research")).toBeInTheDocument()
    await expect(canvas.getByText("7+")).toBeInTheDocument()
    await expect(
      canvas.getByText("Read Coordinator's Letter")
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
