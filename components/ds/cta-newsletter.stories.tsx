import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { CtaNewsletter } from "./cta-newsletter"

const meta = {
  title: "CTA/CtaNewsletter",
  component: CtaNewsletter,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A CtaNewsletter component for the LEMA Design System.",
          "Supports loading state, i18n support.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `onSubscribe` | `(email: string) => Promise<boolean \| void> \| void` | — | - |",
          "| `placeholder` | `string` | — | - |",
          "| `disclaimer` | `string` | — | - |",
          "| `locale` | `UILocale` | — | - |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    locale: {
      control: "inline-radio",
      options: ["en-US", "pt-BR", "es-ES", "fr-FR"],
    },
  },
} satisfies Meta<typeof CtaNewsletter>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: "Stay updated",
    description: "Subscribe for latest releases.",
    badge: "Newsletter",
  },
}

export const WithHandler: Story = {
  args: {
    title: "Join waitlist",
    description: "Be first to access.",
    onSubscribe: async () => {
      await new Promise((r) => setTimeout(r, 500))
      return true
    },
  },
}

export const Locales: Story = {
  args: { title: "Stay updated", description: "Description" },
  render: () => (
    <div className="flex flex-col gap-6">
      {(["en-US", "pt-BR", "es-ES", "fr-FR"] as const).map((locale) => (
        <CtaNewsletter
          key={locale}
          locale={locale}
          title="Stay updated"
          description="Subscribe"
        />
      ))}
    </div>
  ),
}
