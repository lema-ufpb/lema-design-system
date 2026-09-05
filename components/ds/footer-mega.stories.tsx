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
      <span className="text-[10px] text-muted-foreground">
        UFPB Design System
      </span>
    </div>
  </div>
)

const meta: Meta<typeof FooterMega> = {
  title: "Layout/FooterMega",
  component: FooterMega,
  tags: ["autodocs"],
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
