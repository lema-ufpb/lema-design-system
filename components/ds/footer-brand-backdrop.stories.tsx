import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { FooterBrandBackdrop } from "./footer-brand-backdrop"
import type { FooterGroupData } from "./footer-menu"

const sampleColumns: FooterGroupData[] = [
  {
    title: "Ecossistema",
    options: [
      { name: "Laboratories", url: "#" },
      { name: "Research & Outreach", url: "#" },
      { name: "Publications", url: "#" },
    ],
  },
  {
    title: "Desenvolvimento",
    options: [
      { name: "Design System", url: "#" },
      { name: "Git Repositories", url: "#" },
      { name: "Padrões Web", url: "#" },
    ],
  },
  {
    title: "Universidade",
    options: [
      { name: "UFPB Portal", url: "#" },
      { name: "Reitoria", url: "#" },
      { name: "Transparência", url: "#" },
    ],
  },
]

const meta: Meta<typeof FooterBrandBackdrop> = {
  title: "Footer/FooterBrandBackdrop",
  component: FooterBrandBackdrop,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A FooterBrandBackdrop component for the LEMA Design System.",
          "Supports i18n and CVA variants.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `wordmarkText` | `string` | — | - |",
          '| `wordmarkVariant` | `"outline" \| "muted" \| "gradient"` | — | - |',
          "| `brand` | `React.ReactNode` | — | - |",
          "| `description` | `string` | — | - |",
          "| `columns` | `FooterGroupData[]` | — | - |",
          "| `socialLinks` | `SocialLinkItem[]` | — | - |",
          "| `showStatusBadge` | `boolean` | — | - |",
          "| `status` | `SystemHealthStatus` | — | - |",
          "| `statusUptime` | `string` | — | - |",
          "| `statusHref` | `string` | — | - |",
          "| `brandName` | `string` | — | - |",
          "| `legalLinks` | `LegalLinkItem[]` | — | - |",
          "| `locale` | `UILocale` | — | - |",
          '| `spacing` | `"normal" \| "relaxed"` | `"normal"` | Variant |',
        ].join("\n"),
      },
    },
  },
  args: {
    wordmarkText: "LEMA",
    wordmarkVariant: "outline",
    columns: sampleColumns,
    showStatusBadge: true,
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const MutedVariant: Story = {
  args: {
    wordmarkVariant: "muted",
  },
}

export const GradientVariant: Story = {
  args: {
    wordmarkVariant: "gradient",
  },
}

export const CustomInstitution: Story = {
  args: {
    wordmarkText: "UFPB",
    wordmarkVariant: "outline",
    brandName: "Federal University of Paraíba",
  },
}
