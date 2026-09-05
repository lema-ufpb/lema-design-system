import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { CtaNewsletter } from "./cta-newsletter"

const meta = {
  title: "Marketing/CtaNewsletter",
  component: CtaNewsletter,
  tags: ["autodocs"],
  argTypes: { locale: { control: "inline-radio", options: ["en-US", "pt-BR", "es-ES", "fr-FR"] } },
} satisfies Meta<typeof CtaNewsletter>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { title: "Stay updated", description: "Subscribe for latest releases.", badge: "Newsletter" } }

export const WithHandler: Story = {
  args: { title: "Join waitlist", description: "Be first to access.", onSubscribe: async () => { await new Promise((r) => setTimeout(r, 500)); return true } },
}

export const Locales: Story = {
  args: { title: "Stay updated", description: "Description" },
  render: () => (
    <div className="flex flex-col gap-6">
      {(["en-US", "pt-BR", "es-ES", "fr-FR"] as const).map((locale) => (
        <CtaNewsletter key={locale} locale={locale} title="Stay updated" description="Subscribe" />
      ))}
    </div>
  ),
}
