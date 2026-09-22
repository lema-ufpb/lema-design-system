import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, within } from "storybook/test"
import { CultureGallery } from "./culture-gallery"

const sampleItems = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80",
    alt: "Team gathered in ideation and design session",
    caption: "Collaborative design session at LEMA",
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&auto=format&fit=crop&q=80",
    alt: "Researcher coding in the laboratory",
    caption: "Development and statistical modeling",
  },
  {
    id: "3",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=80",
    alt: "Presentation of scientific results in the auditorium",
    caption: "Presentation for the university community",
  },
  {
    id: "4",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&auto=format&fit=crop&q=80",
    alt: "Hands-on workshop with undergraduate students",
    caption: "Mentoring and training of new researchers",
  },
]

const meta: Meta<typeof CultureGallery> = {
  title: "Gallery/CultureGallery",
  component: CultureGallery,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A CultureGallery component for the LEMA Design System.",
          "Supports loading state, CVA variants.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `items` | `CultureGalleryItem[]` | — | - |",
          '| `layout` | `"mosaic" \| "grid"` | `"mosaic"` | Variant |',
        ].join("\n"),
      },
    },
    layout: "padded",
  },
  args: {
    items: sampleItems,
    layout: "mosaic",
  },
}

export default meta
type Story = StoryObj<typeof CultureGallery>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(
      canvas.getByAltText("Team gathered in ideation and design session")
    ).toBeInTheDocument()
  },
}

export const GridLayout: Story = {
  args: {
    layout: "grid",
  },
}
