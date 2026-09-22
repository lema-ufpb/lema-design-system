import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, within } from "storybook/test"
import { MilestoneStepper } from "./milestone-stepper"

const sampleMilestones = [
  {
    year: "2018",
    title: "Laboratory Foundation",
    description:
      "Start of applied research activities focused on statistical modeling and data analysis.",
    badge: "Milestone Zero",
  },
  {
    year: "2020",
    title: "First International Publication",
    description:
      "International recognition with an impactful article on Bayesian inference applied to health.",
  },
  {
    year: "2022",
    title: "Team Expansion and Partnerships",
    description:
      "Creation of the scientific initiation program and technical cooperation with partner institutions.",
  },
  {
    year: "2024",
    title: "LEMA-DS Launch",
    description:
      "Release of the unified, accessible Design System for all of the laboratory's software ecosystems.",
    badge: "Present",
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
    await expect(canvas.getByText("Laboratory Foundation")).toBeInTheDocument()
    await expect(canvas.getByText("2018")).toBeInTheDocument()
    await expect(canvas.getByText("2024")).toBeInTheDocument()
  },
}

export const Horizontal: Story = {
  args: {
    orientation: "horizontal",
  },
}
