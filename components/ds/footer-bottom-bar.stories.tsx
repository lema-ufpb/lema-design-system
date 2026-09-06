import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { FooterBottomBar } from "./footer-bottom-bar"
import { SystemStatusBadge } from "./system-status-badge"

const meta: Meta<typeof FooterBottomBar> = {
  title: "Blocks/FooterBottomBar",
  component: FooterBottomBar,
  tags: ["autodocs"],
  args: {
    brandName: "LEMA - UFPB",
    year: 2026,
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithStatusAction: Story = {
  render: (args) => (
    <FooterBottomBar {...args}>
      <SystemStatusBadge size="sm" uptime="99.98%" />
    </FooterBottomBar>
  ),
}

export const Locales: Story = {
  render: () => (
    <div className="flex w-full flex-col gap-6">
      <FooterBottomBar locale="pt-BR" brandName="UFPB" />
      <FooterBottomBar locale="en-US" brandName="LEMA" />
      <FooterBottomBar locale="es-ES" brandName="LEMA" />
      <FooterBottomBar locale="fr-FR" brandName="LEMA" />
    </div>
  ),
}
