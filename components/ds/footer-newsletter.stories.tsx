import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"
import { FooterNewsletter } from "./footer-newsletter"

const meta: Meta<typeof FooterNewsletter> = {
  title: "Footer/FooterNewsletter",
  component: FooterNewsletter,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A FooterNewsletter component for the LEMA Design System.",
          "Supports loading state, i18n support, CVA variants.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `title` | `string` | — | - |",
          "| `description` | `string` | — | - |",
          "| `onSubscribe` | `(email: string) => Promise<boolean \| void> \| void` | — | - |",
          "| `locale` | `UILocale` | — | - |",
          "| `showPrivacyNotice` | `boolean` | — | - |",
          '| `layout` | `"inline" \| "stacked"` | `"inline"` | Variant |',
        ].join("\n"),
      },
    },
  },
  args: {
    layout: "inline",
    onSubscribe: fn(),
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const StackedLayout: Story = {
  args: {
    layout: "stacked",
  },
}

export const Locales: Story = {
  render: () => (
    <div className="flex max-w-md flex-col gap-8">
      <div>
        <span className="text-xs font-semibold text-muted-foreground uppercase">
          pt-BR:
        </span>
        <FooterNewsletter locale="pt-BR" />
      </div>
      <div>
        <span className="text-xs font-semibold text-muted-foreground uppercase">
          en-US:
        </span>
        <FooterNewsletter locale="en-US" />
      </div>
      <div>
        <span className="text-xs font-semibold text-muted-foreground uppercase">
          es-ES:
        </span>
        <FooterNewsletter locale="es-ES" />
      </div>
      <div>
        <span className="text-xs font-semibold text-muted-foreground uppercase">
          fr-FR:
        </span>
        <FooterNewsletter locale="fr-FR" />
      </div>
    </div>
  ),
}
