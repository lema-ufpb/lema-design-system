import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { FooterCta } from "./footer-cta"

const meta: Meta<typeof FooterCta> = {
  title: "Layout/FooterCta",
  component: FooterCta,
  tags: ["autodocs"],
  args: {
    ctaTitle: "Pronto para transformar sua experiência digital?",
    ctaDescription:
      "Junte-se a pesquisadores e desenvolvedores construindo aplicações web modernas com o LEMA Design System.",
    ctaTone: "glow",
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const PrimaryTone: Story = {
  args: {
    ctaTone: "primary",
  },
}

export const CardTone: Story = {
  args: {
    ctaTone: "card",
  },
}
