import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { GalleryFilterable } from "./gallery-filterable"

const photoIds = [
  "1517245386807-bb43f82c33c4",
  "1518770660439-4636190af475",
  "1522071820081-009f0129c71c",
  "1531482615713-2afd69097998",
  "1534528741775-53994a69daeb",
  "1550745165-9bc0b252726f",
]

const categories = [
  { value: "product", label: "Product" },
  { value: "team", label: "Team" },
  { value: "events", label: "Events" },
]

const items = photoIds.map((id, index) => ({
  src: `https://images.unsplash.com/photo-${id}?w=800&auto=format&fit=crop&q=80`,
  alt: `Photo ${index + 1}`,
  category: categories[index % categories.length].value,
}))

const meta = {
  title: "Blocks/GalleryFilterable",
  component: GalleryFilterable,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "An image gallery with a category filter row above it — composed from ImageGallery and PillGroup.",
      },
    },
  },
  args: { categories, items, allLabel: "All" },
} satisfies Meta<typeof GalleryFilterable>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
