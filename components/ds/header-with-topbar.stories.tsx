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
  title: "Header/HeaderWithTopbar",
  component: HeaderWithTopbar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A HeaderWithTopbar component for the LEMA Design System.",
          "Supports loading state, i18n support.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `brand` | `HeaderBrandProps` | — | - |",
          "| `navItems` | `HeaderNavItem[]` | — | - |",
          "| `actions` | `HeaderActionItem[]` | — | - |",
          "| `email` | `string` | — | - |",
          "| `phone` | `string` | — | - |",
          "| `socials` | `SocialLinkItem[]` | — | - |",
          "| `localeSelector` | `React.ReactNode` | — | - |",
          "| `topbarAnnouncement` | `React.ReactNode` | — | - |",
          "| `announcement` | `{` | — | - |",
          "| `children` | `React.ReactNode` | — | - |",
          "| `href` | `string` | — | - |",
          "| `tag` | `string` | — | - |",
          "| `dismissible` | `boolean` | — | - |",
          "| `onDismiss` | `() => void` | — | - |",
          '| `variant` | `"default" \| "outline" \| "glow"` | — | - |',
          "| `showSearch` | `boolean` | — | - |",
          "| `onSearch` | `(value: string) => void` | — | - |",
          "| `searchPlaceholder` | `string` | — | - |",
          '| `size` | `"sm" \| "md" \| "lg"` | — | - |',
          '| `variant` | `"default" \| "blurred" \| "transparent" \| "solid"` | — | - |',
          "| `sticky` | `boolean` | — | - |",
          "| `locale` | `UILocale` | — | - |",
          "| `loading` | `boolean` | — | - |",
        ].join("\n"),
      },
    },
    layout: "fullscreen",
  },
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
