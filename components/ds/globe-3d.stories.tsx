import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Globe3D } from "./globe-3d"

const meta = {
  title: "Data Display/Globe3D",
  component: Globe3D,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Globe3D>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="flex h-[400px] max-w-[400px] w-full items-center justify-center">
      <Globe3D />
    </div>
  ),
}

export const WithMarkers: Story = {
  render: () => (
    <div className="flex h-[400px] max-w-[400px] w-full items-center justify-center">
      <Globe3D
        markers={[
          { location: [37.7595, -122.4367], size: 0.05 },
          { location: [40.7128, -74.006], size: 0.1 },
          { location: [-23.5505, -46.6333], size: 0.08 },
          { location: [51.5074, -0.1278], size: 0.05 },
          { location: [35.6762, 139.6503], size: 0.1 },
        ]}
        markerColor={[0, 1, 0.5]}
      />
    </div>
  ),
}
