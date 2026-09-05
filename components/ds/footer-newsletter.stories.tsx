import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"
import { FooterNewsletter } from "./footer-newsletter"

const meta: Meta<typeof FooterNewsletter> = {
  title: "Form/FooterNewsletter",
  component: FooterNewsletter,
  tags: ["autodocs"],
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
