import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, within } from "storybook/test"
import { PageHeader } from "./page-header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Download } from "lucide-react"

const meta = {
  title: "Layout/PageHeader",
  component: PageHeader,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Standardized page-level header component containing title, description, actions, breadcrumbs, badges and back navigation.",
      },
    },
  },
  args: {
    title: "Projetos e Modelos",
  },
  argTypes: {
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Header scale size.",
    },
    variant: {
      control: "radio",
      options: ["default", "compact", "banner"],
      description: "Visual container variant.",
    },
    loading: {
      control: "boolean",
      description: "Renders skeleton layout.",
    },
    locale: {
      control: "radio",
      options: ["pt-BR", "en-US", "es-ES", "fr-FR"],
      description: "Locale for text translations.",
    },
  },
} satisfies Meta<typeof PageHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: "Projetos e Modelos",
    description: "Gerencie modelos econômicos e conjuntos de dados do LEMA.",
    actions: (
      <>
        <Button variant="outline" size="sm">
          <Download data-icon="inline-start" />
          Exportar
        </Button>
        <Button size="sm">
          <Plus data-icon="inline-start" />
          Novo Projeto
        </Button>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Projetos e Modelos"
    )
  },
}

export const WithBreadcrumbsAndBadge: Story = {
  args: {
    breadcrumbs: (
      <div className="flex items-center gap-1.5 pb-1 text-xs text-muted-foreground">
        <span>Home</span>
        <span>/</span>
        <span>Economia</span>
        <span>/</span>
        <span className="font-medium text-foreground">Modelos</span>
      </div>
    ),
    title: "Modelo DSGE Brasil",
    badge: <Badge variant="secondary">Produção v2.1</Badge>,
    description: "Parâmetros calibrados para o Banco Central do Brasil.",
    metadata: (
      <>
        <span className="text-xs text-muted-foreground">
          Criado em 12/03/2025
        </span>
        <span className="text-xs text-muted-foreground">•</span>
        <span className="text-xs text-muted-foreground">Autor: Prof. LEMA</span>
      </>
    ),
    actions: (
      <Button size="sm">
        <Plus data-icon="inline-start" />
        Nova Simulação
      </Button>
    ),
  },
}

export const WithBackButton: Story = {
  args: {
    title: "Detalhes da Simulação #481",
    description: "Convergência de equilíbrio atingida em 142 iterações.",
    onBack: () => alert("Voltar acionado!"),
    actions: (
      <Button variant="outline" size="sm">
        Baixar Relatório
      </Button>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(
      canvas.getByRole("button", { name: "Voltar" })
    ).toBeInTheDocument()
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <PageHeader
        as="section"
        size="sm"
        title="Tamanho Pequeno (sm)"
        description="Ideal para subpáginas ou painéis compactos."
        actions={<Button size="sm">Ação sm</Button>}
      />
      <PageHeader
        as="section"
        size="md"
        title="Tamanho Médio (md)"
        description="Padrão do design system para telas principais."
        actions={<Button size="sm">Ação md</Button>}
      />
      <PageHeader
        as="section"
        size="lg"
        title="Tamanho Grande (lg)"
        description="Destaque para páginas de entrada ou relatórios executivos."
        actions={<Button>Ação lg</Button>}
      />
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <PageHeader
        as="section"
        variant="default"
        title="Variante Default"
        description="Possui linha divisória inferior discreta."
        actions={<Button size="sm">Default</Button>}
      />
      <PageHeader
        as="section"
        variant="compact"
        title="Variante Compact"
        description="Sem borda inferior para layouts fluidos."
        actions={<Button size="sm">Compact</Button>}
      />
      <PageHeader
        as="section"
        variant="banner"
        title="Variante Banner"
        description="Card estilizado com fundo destacado para áreas nobres."
        actions={<Button size="sm">Banner</Button>}
      />
    </div>
  ),
}

export const Loading: Story = {
  args: {
    loading: true,
    title: "Carregando...",
    breadcrumbs: <span>Home / Modelos</span>,
    actions: <Button size="sm">Carregando</Button>,
  },
}

export const Locales: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <PageHeader
        as="section"
        locale="pt-BR"
        title="Português (pt-BR)"
        onBack={() => {}}
      />
      <PageHeader
        as="section"
        locale="en-US"
        title="English (en-US)"
        onBack={() => {}}
      />
      <PageHeader
        as="section"
        locale="es-ES"
        title="Español (es-ES)"
        onBack={() => {}}
      />
      <PageHeader
        as="section"
        locale="fr-FR"
        title="Français (fr-FR)"
        onBack={() => {}}
      />
    </div>
  ),
}
