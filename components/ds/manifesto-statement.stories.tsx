import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, within } from "storybook/test"
import { ManifestoStatement } from "./manifesto-statement"

const meta: Meta<typeof ManifestoStatement> = {
  title: "About/ManifestoStatement",
  component: ManifestoStatement,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A ManifestoStatement component for the LEMA Design System.",
          "Supports CVA variants.",
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
          '| `size` | `"default" \| "lg" \| "xl"` | `"default"` | Variant |',
          '| `align` | `"left" \| "center"` | `"left"` | Variant |',
        ].join("\n"),
      },
    },
    layout: "centered",
  },
  args: {
    eyebrow: "Our Manifesto",
    statement:
      "We believe that rigorous design and open science are the greatest catalysts for human transformation.",
    author: "Laboratory of Statistics and Applied Modeling (LEMA)",
    size: "default",
    align: "left",
  },
}

export default meta
type Story = StoryObj<typeof ManifestoStatement>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Our Manifesto")).toBeInTheDocument()
    await expect(
      canvas.getByText(/We believe that rigorous design/i)
    ).toBeInTheDocument()
  },
}

export const Centered: Story = {
  args: {
    align: "center",
    size: "lg",
    statement: (
      <>
        Technology should serve{" "}
        <span className="text-primary">cognitive clarity</span> and the public
        good, without unnecessary noise.
      </>
    ),
  },
}

export const Large: Story = {
  args: {
    align: "center",
    size: "xl",
    statement: "Building the future with academic rigor and real impact.",
    author: "Executive Board",
  },
}
