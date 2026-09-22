import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { DirectionAwareHover } from "./direction-aware-hover"

const meta = {
  title: "Data Display/DirectionAwareHover",
  component: DirectionAwareHover,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DirectionAwareHover>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    imageSrc:
      "https://images.unsplash.com/photo-1550537687-c91072c4792d?q=80&w=600&auto=format&fit=crop",
    imageAlt: "Example photo",
    className: "w-80 h-96",
    children: (
      <div className="flex h-full flex-col justify-end p-6">
        <p className="text-xl font-bold">Modern Architecture</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Discover the incredible details of this new building in the city center
          city.
        </p>
      </div>
    ),
  },
}

export const FocusWithin: Story = {
  args: {
    imageSrc:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop",
    className: "max-w-[400px] w-full h-[300px]",
    children: (
      <div className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
        <h3 className="text-2xl font-bold">Premium Properties</h3>
        <button className="rounded-md bg-primary px-4 py-2 text-primary-foreground focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none">
          Focus Here (Tab)
        </button>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Simulates focus state. Use the TAB key to focus the inner button and the overlay will remain visible due to `focus-within`.",
      },
    },
  },
}
