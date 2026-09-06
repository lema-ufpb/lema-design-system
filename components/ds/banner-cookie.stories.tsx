import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BannerCookie } from "./banner-cookie"

const meta = {
  title: "Navigation/BannerCookie",
  component: BannerCookie,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  argTypes: {
    position: { control: "inline-radio", options: ["bottom", "floating"] },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    locale: {
      control: "inline-radio",
      options: ["en-US", "pt-BR", "es-ES", "fr-FR"],
    },
  },
} satisfies Meta<typeof BannerCookie>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onAcceptAll: () => {},
    onDecline: () => {},
    onManage: () => {},
    learnMoreHref: "#",
  },
}

export const Floating: Story = {
  args: { position: "floating", onAcceptAll: () => {}, onDecline: () => {} },
}

export const Bottom: Story = {
  args: { position: "bottom", onAcceptAll: () => {}, onDecline: () => {} },
}

export const Locales: Story = {
  args: { onAcceptAll: () => {}, onDecline: () => {} },
  render: () => (
    <div className="flex flex-col gap-4">
      {(["en-US", "pt-BR", "es-ES", "fr-FR"] as const).map((locale) => (
        <BannerCookie
          key={locale}
          locale={locale}
          onAcceptAll={() => {}}
          onDecline={() => {}}
        />
      ))}
    </div>
  ),
}
