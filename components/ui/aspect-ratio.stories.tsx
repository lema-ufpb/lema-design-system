import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { AspectRatio } from "./aspect-ratio"

const meta = {
  title: "Shadcn UI/Aspect Ratio",
  component: AspectRatio,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A container that enforces a specific aspect ratio (width-to-height ratio) on its children.",
          "",
          "Built on Radix UI's `AspectRatio.Root`, it accepts a `ratio` prop (default `1`) and wraps child elements — typically images or embedded media — ensuring they maintain the desired proportion.",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Variant / Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Root** | *(none)* | Pure layout wrapper; no semantic tokens applied |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    ratio: {
      control: "number",
      description: "Width-to-height ratio (e.g. 16/9, 4/3, 1)",
    },
  },
} satisfies Meta<typeof AspectRatio>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "16:9 widescreen aspect ratio applied to a landscape image inside a 400px container.",
      },
    },
  },
  render: () => (
    <div className="w-[400px]">
      <AspectRatio ratio={16 / 9}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="Abstract landscape"
          className="size-full rounded-xl object-cover"
        />
      </AspectRatio>
    </div>
  ),
}

export const Square: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "1:1 square aspect ratio in a compact 200px container for profile images or thumbnails.",
      },
    },
  },
  render: () => (
    <div className="w-[200px]">
      <AspectRatio ratio={1}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=400&dpr=2&q=80"
          alt="Square crop placeholder"
          className="size-full rounded-xl object-cover"
        />
      </AspectRatio>
    </div>
  ),
}

export const Wide: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "21:9 ultrawide aspect ratio in a 600px container for cinematic banners and hero images.",
      },
    },
  },
  render: () => (
    <div className="w-[600px]">
      <AspectRatio ratio={21 / 9}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=1200&dpr=2&q=80"
          alt="Wide aspect placeholder"
          className="size-full rounded-xl object-cover"
        />
      </AspectRatio>
    </div>
  ),
}
