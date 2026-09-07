import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Lightbox, type LightboxImage } from "./lightbox"

const photoIds = [
  "1517245386807-bb43f82c33c4",
  "1518770660439-4636190af475",
  "1522071820081-009f0129c71c",
]

const images: LightboxImage[] = photoIds.map((id, index) => ({
  src: `https://images.unsplash.com/photo-${id}?w=1200&auto=format&fit=crop&q=80`,
  alt: `Photo ${index + 1}`,
  caption: `Photo ${index + 1} of 3`,
}))

const meta = {
  title: "Data Display/Lightbox",
  component: Lightbox,
  tags: ["autodocs"],
  args: {
    images,
    index: 0,
    open: false,
    onOpenChange: () => {},
    onIndexChange: () => {},
  },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: [
          "A fullscreen image viewer with prev/next navigation, keyboard arrows, and an optional thumbnail strip.",
          "Supports loading state, i18n support.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `images` | `LightboxImage[]` | — | - |",
          "| `index` | `number` | — | /** Currently shown image index (controlled). */ |",
          "| `open` | `boolean` | — | - |",
          "| `onOpenChange` | `(open: boolean) => void` | — | - |",
          "| `onIndexChange` | `(index: number) => void` | — | - |",
          "| `showThumbnails` | `boolean` | — | /** Shows a strip of clickable thumbnails below the main image. */ |",
          "| `locale` | `UILocale` | — | - |",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof Lightbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false)
    const [index, setIndex] = React.useState(0)

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open lightbox</Button>
        <Lightbox
          images={images}
          index={index}
          open={open}
          onOpenChange={setOpen}
          onIndexChange={setIndex}
        />
      </>
    )
  },
}

export const SingleImage: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false)

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open single image</Button>
        <Lightbox
          images={[images[0]]}
          index={0}
          open={open}
          onOpenChange={setOpen}
          onIndexChange={() => {}}
          showThumbnails={false}
        />
      </>
    )
  },
}
