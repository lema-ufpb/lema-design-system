import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { FooterCta } from "./footer-cta"

const meta: Meta<typeof FooterCta> = {
  title: "Footer/FooterCta",
  component: FooterCta,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A FooterCta component for the LEMA Design System.",
          "Supports i18n and CVA variants.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `ctaTitle` | `string` | — | - |",
          "| `ctaDescription` | `string` | — | - |",
          "| `primaryAction` | `FooterCtaAction` | — | - |",
          "| `secondaryAction` | `FooterCtaAction` | — | - |",
          "| `columns` | `FooterGroupData[]` | — | - |",
          "| `brand` | `React.ReactNode` | — | - |",
          "| `socialLinks` | `SocialLinkItem[]` | — | - |",
          "| `brandName` | `string` | — | - |",
          "| `legalLinks` | `LegalLinkItem[]` | — | - |",
          "| `locale` | `UILocale` | — | - |",
          '| `ctaTone` | `"card" \| "primary" \| "glow"` | `"glow"` | Variant |',
        ].join("\n"),
      },
    },
  },
  args: {
    ctaTitle: "Ready to transform your digital experience?",
    ctaDescription:
      "Join researchers and developers building modern web applications with the LEMA Design System.",
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
