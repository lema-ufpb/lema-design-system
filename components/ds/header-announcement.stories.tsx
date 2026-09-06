import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { HeaderAnnouncement } from "./header-announcement"

const meta = {
  title: "Blocks/HeaderAnnouncement",
  component: HeaderAnnouncement,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default", "outline", "glow"] },
    dismissible: { control: "boolean" },
    locale: {
      control: "inline-radio",
      options: ["en-US", "pt-BR", "es-ES", "fr-FR"],
    },
  },
} satisfies Meta<typeof HeaderAnnouncement>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "v1.2 shipped — explore new headers and footers",
    tag: "New",
  },
}

export const Dismissible: Story = {
  args: {
    children: "Black Friday: 30% off all plans",
    tag: "Sale",
    dismissible: true,
  },
}

export const WithLink: Story = {
  args: { children: "Read the announcement", href: "#", tag: "Update" },
}

export const GlowVariant: Story = {
  args: {
    children: "Join the waitlist — limited spots",
    tag: "Early Access",
    variant: "glow",
  },
}

export const Locales: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      {(["en-US", "pt-BR", "es-ES", "fr-FR"] as const).map((l) => (
        <HeaderAnnouncement key={l} locale={l} tag="New">
          Announcement — {l}
        </HeaderAnnouncement>
      ))}
    </div>
  ),
}
