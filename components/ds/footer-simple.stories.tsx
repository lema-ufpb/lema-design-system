import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { FooterSimple } from "./footer-simple"

const sampleBrand = (
  <div className="flex items-center gap-2">
    <div className="flex size-7 items-center justify-center rounded-lg bg-primary text-xs font-bold text-primary-foreground">
      L
    </div>
    <span className="text-sm font-semibold tracking-tight">
      LEMA Design System
    </span>
  </div>
)

const meta: Meta<typeof FooterSimple> = {
  title: "Blocks/FooterSimple",
  component: FooterSimple,
  tags: ["autodocs"],
  args: {
    brand: sampleBrand,
    showStatusBadge: false,
    align: "center",
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithStatusBadge: Story = {
  args: {
    showStatusBadge: true,
    status: "operational",
    statusUptime: "99.99%",
    statusHref: "https://status.ufpb.br",
  },
}

export const LeftAligned: Story = {
  args: {
    align: "start",
    showStatusBadge: true,
  },
}
