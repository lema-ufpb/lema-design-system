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
    title: "Scientific Excellence",
    description:
      "Continuous methodological rigor at every stage of research and development.",
    icon: Sparkles,
  },
  {
    title: "Transparency and Ethics",
    description:
      "Unwavering commitment to data reproducibility and open source.",
    icon: ShieldCheck,
  },
  {
    title: "Social Impact",
    description:
      "Research that transcends university walls to solve real-world needs of the population.",
    icon: HeartHandshake,
  },
  {
    title: "Accessible Innovation",
    description:
      "Intuitive interface design built to the most rigorous accessibility standards.",
    icon: Lightbulb,
  },
  {
    title: "Multidisciplinary Collaboration",
    description:
      "Continuous integration among statisticians, developers, designers and domain experts.",
    icon: Users,
  },
  {
    title: "Future Training",
    description:
      "Dedication to continuous mentoring of new talents and researchers.",
    icon: Compass,
  },
]

const meta: Meta<typeof AboutValuesGrid> = {
  title: "About/AboutValuesGrid",
  component: AboutValuesGrid,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A AboutValuesGrid component for the LEMA Design System.",
          "Supports i18n and CVA variants.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `title` | `string` | — | - |",
          "| `description` | `string` | — | - |",
          "| `badge` | `string` | — | - |",
          "| `values` | `ValuesCardProps[]` | — | - |",
          "| `columns` | `2 \| 3 \| 4` | — | - |",
          "| `locale` | `UILocale` | — | - |",
          '| `variant` | `"default" \| "muted"` | `"default"` | Variant |',
        ].join("\n"),
      },
    },
    layout: "fullscreen",
  },
  args: {
    badge: "Our Values",
    title: "The fundamental pillars guiding our research",
    description:
      "Discover the non-negotiable principles guiding every line of code and every mathematical model developed at LEMA.",
    values: sampleValues,
    columns: 3,
    locale: "en-US",
  },
}

export default meta
type Story = StoryObj<typeof AboutValuesGrid>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Our Values")).toBeInTheDocument()
    await expect(canvas.getByText("Scientific Excellence")).toBeInTheDocument()
    await expect(canvas.getByText("Future Training")).toBeInTheDocument()
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
