import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Button } from "@/components/ui/button"
import { GallerySplit } from "./gallery-split"

const photoIds = [
  "1517245386807-bb43f82c33c4",
  "1518770660439-4636190af475",
  "1522071820081-009f0129c71c",
  "1531482615713-2afd69097998",
]

const items = photoIds.map((id, index) => ({
  src: `https://images.unsplash.com/photo-${id}?w=800&auto=format&fit=crop&q=80`,
  alt: `Photo ${index + 1}`,
}))

const meta = {
  title: "Layout/GallerySplit",
  component: GallerySplit,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Split section — copy on one side, an image collage on the other — composed from HeroSection and ImageGallery.",
      },
    },
  },
  args: {
    kicker: "Our work",
    title: "Crafted with care.",
    description: "A look at the details that make the product feel right.",
    actions: <Button>See more</Button>,
    items,
  },
} satisfies Meta<typeof GallerySplit>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
