import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { FooterMega } from "./footer-mega"
import type { FooterGroupData } from "./footer-menu"

const sampleColumns: FooterGroupData[] = [
  {
    title: "Plataforma",
    options: [
      { name: "Componentes", url: "#" },
      { name: "Design Tokens", url: "#" },
      { name: "Storybook", url: "#" },
      { name: "Acessibilidade", url: "#" },
    ],
  },
  {
    title: "Recursos",
    options: [
      { name: "Documentação", url: "#" },
      { name: "Changelog", url: "#" },
      { name: "Guia de Estilo", url: "#" },
      { name: "Comunidade", url: "#" },
    ],
  },
  {
    title: "Institucional",
    options: [
      { name: "Sobre o LEMA", url: "#" },
      { name: "Projetos de Pesquisa", url: "#" },
      { name: "Portal UFPB", url: "#" },
      { name: "Contato", url: "#" },
    ],
  },
]

const sampleBrand = (
  <div className="flex items-center gap-2.5">
    <div className="flex size-8 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground shadow-xs">
      L
    </div>
    <div className="flex flex-col text-left leading-none">
      <span className="text-sm font-bold tracking-tight">LEMA</span>
      <span className="text-xs text-muted-foreground">
        UFPB Design System
      </span>
    </div>
  </div>
)

const meta: Meta<typeof FooterMega> = {
  title: "Footer/FooterMega",
  component: FooterMega,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A FooterMega component for the LEMA Design System.",
          "Supports i18n and CVA variants.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `brand` | `React.ReactNode` | — | - |",
          "| `description` | `string` | — | - |",
          "| `columns` | `FooterGroupData[]` | — | - |",
          "| `socialLinks` | `SocialLinkItem[]` | — | - |",
          "| `showNewsletter` | `boolean` | — | - |",
          "| `newsletterTitle` | `string` | — | - |",
          "| `newsletterDescription` | `string` | — | - |",
          "| `onSubscribe` | `(email: string) => Promise<boolean \| void> \| void` | — | - |",
          "| `showAppBadges` | `boolean` | — | - |",
          "| `appStoreUrl` | `string` | — | - |",
          "| `googlePlayUrl` | `string` | — | - |",
          "| `showStatusBadge` | `boolean` | — | - |",
          "| `status` | `SystemHealthStatus` | — | - |",
          "| `statusUptime` | `string` | — | - |",
          "| `statusHref` | `string` | — | - |",
          "| `brandName` | `string` | — | - |",
          "| `legalLinks` | `LegalLinkItem[]` | — | - |",
          "| `locale` | `UILocale` | — | - |",
          '| `tone` | `"plain" \| "card"` | `"plain"` | Variant |',
        ].join("\n"),
      },
    },
  },
  args: {
    brand: sampleBrand,
    columns: sampleColumns,
    showNewsletter: true,
    showAppBadges: false,
    showStatusBadge: true,
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithAppBadges: Story = {
  args: {
    showAppBadges: true,
    appStoreUrl: "https://apple.com",
    googlePlayUrl: "https://google.com",
  },
}

export const CardTone: Story = {
  args: {
    tone: "card",
  },
}
