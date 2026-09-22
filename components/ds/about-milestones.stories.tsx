import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, within } from "storybook/test"
import { AboutMilestones } from "./about-milestones"

const sampleMilestones = [
  {
    year: "2018",
    title: "Laboratory Foundation",
    description:
      "Creation of the applied research center at the Center for Exact Sciences and Nature at UFPB.",
    badge: "Origin",
  },
  {
    year: "2020",
    title: "First Technical Cooperation",
    description:
      "Formalization of agreements with government agencies for predictive modeling of public indicators.",
  },
  {
    year: "2022",
    title: "Expansion into Engineering and Design",
    description:
      "Integration of the interaction design front and development of accessible frontend libraries.",
  },
  {
    year: "2024",
    title: "Launch of LEMA-DS",
    description:
      "Release of the public component ecosystem for consumption via CLI and registry.",
    badge: "Consolidation",
  },
]

const meta: Meta<typeof AboutMilestones> = {
  title: "About/AboutMilestones",
  component: AboutMilestones,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A AboutMilestones component for the LEMA Design System.",
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
          "| `milestones` | `MilestoneItem[]` | — | - |",
          '| `orientation` | `"vertical" \| "horizontal"` | — | - |',
          "| `locale` | `UILocale` | — | - |",
          '| `variant` | `"default" \| "muted"` | `"default"` | Variant |',
        ].join("\n"),
      },
    },
    layout: "fullscreen",
  },
  args: {
    badge: "Our Journey",
    title: "A journey guided by science and collective impact",
    description:
      "Follow the timeline with the most remarkable moments of our academic and technological history.",
    milestones: sampleMilestones,
    orientation: "vertical",
    locale: "en-US",
  },
}

export default meta
type Story = StoryObj<typeof AboutMilestones>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Our Journey")).toBeInTheDocument()
    await expect(
      canvas.getByText(/A journey guided by science/i)
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
