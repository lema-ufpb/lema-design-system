import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BannerCookie } from "./banner-cookie"

const meta = {
  title: "Navigation/BannerCookie",
  component: BannerCookie,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A BannerCookie component for the LEMA Design System.",
          "Supports i18n and CVA variants.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `title` | `string` | — | - |",
          "| `description` | `React.ReactNode` | — | - |",
          "| `learnMoreHref` | `string` | — | - |",
          "| `onAcceptAll` | `() => void` | — | - |",
          "| `onDecline` | `() => void` | — | - |",
          "| `onManage` | `() => void` | — | - |",
          "| `locale` | `UILocale` | — | - |",
          '| `position` | `"bottom" \| "floating"` | `"floating"` | Variant |',
          '| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Variant |',
        ].join("\n"),
      },
    },
    layout: "fullscreen",
  },
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
