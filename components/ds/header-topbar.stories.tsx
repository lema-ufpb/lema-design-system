import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { HeaderTopbar } from "./header-topbar"

const meta = {
  title: "Header/HeaderTopbar",
  component: HeaderTopbar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A HeaderTopbar component for the LEMA Design System.",
          "Supports i18n.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `email` | `string` | — | - |",
          "| `phone` | `string` | — | - |",
          "| `announcement` | `React.ReactNode` | — | - |",
          "| `socials` | `SocialLinkItem[]` | — | - |",
          "| `localeSelector` | `React.ReactNode` | — | - |",
        ].join("\n"),
      },
    },
    layout: "fullscreen",
  },
} satisfies Meta<typeof HeaderTopbar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    email: "hello@ufpb.br",
    phone: "+55 83 3216-7200",
    socials: [
      { platform: "github", href: "https://github.com" },
      { platform: "x", href: "https://x.com" },
      { platform: "linkedin", href: "https://linkedin.com" },
    ],
  },
}

export const WithAnnouncement: Story = {
  args: {
    email: "hello@ufpb.br",
    phone: "+55 83 3216-7200",
    announcement: "Free shipping on orders over R$ 200",
    socials: [{ platform: "github", href: "https://github.com" }],
  },
}

export const Empty: Story = { args: {} }
