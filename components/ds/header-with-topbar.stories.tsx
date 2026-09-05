import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BoxIcon } from "lucide-react"
import { HeaderWithTopbar } from "./header-with-topbar"

const brand = { title: "LEMA", logo: <BoxIcon /> }
const nav = [
  { label: "Home", href: "#" },
  { label: "Products", href: "#" },
  { label: "About", href: "#" },
]

const meta = {
  title: "Navigation/HeaderWithTopbar",
  component: HeaderWithTopbar,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof HeaderWithTopbar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    brand,
    navItems: nav,
    actions: [{ label: "Contact", variant: "default" as const }],
    email: "hello@ufpb.br",
    phone: "+55 83 3216-7200",
    socials: [{ platform: "github", href: "https://github.com" }],
    topbarAnnouncement: "Free shipping over R$ 200",
  },
}

export const WithAnnouncementDismissible: Story = {
  args: {
    brand,
    navItems: nav,
    actions: [{ label: "Get started", variant: "default" as const }],
    email: "hello@ufpb.br",
    announcement: {
      children: "v2.0 is live — check the new header blocks",
      tag: "New",
      href: "#",
    },
  },
}

export const WithoutTopbar: Story = {
  args: {
    brand,
    navItems: nav,
    actions: [{ label: "Sign in", variant: "ghost" as const }],
  },
}
