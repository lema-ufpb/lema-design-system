import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, within } from "storybook/test"
import { Plus, Database, FilterX } from "lucide-react"

import { EmptyAction } from "./empty-action"

const meta = {
  title: "Feedback/EmptyAction",
  component: EmptyAction,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Contextual and actionable empty state guiding users with primary CTAs, secondary documentation, and recommended next steps.",
      },
    },
  },
  args: {
    title: "Nenhuma Simulação Encontrada",
    description:
      "Crie sua primeira estimativa ou importe parâmetros de uma série histórica para começar.",
  },
  argTypes: {
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Component scale.",
    },
    locale: {
      control: "radio",
      options: ["pt-BR", "en-US", "es-ES", "fr-FR"],
      description: "Language locale.",
    },
  },
} satisfies Meta<typeof EmptyAction>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    icon: <Database className="size-full" />,
    primaryAction: {
      label: "Nova Simulação",
      icon: <Plus className="size-4" />,
      onClick: () => alert("Criando nova simulação!"),
    },
    secondaryAction: {
      label: "Ver Documentação",
      onClick: () => alert("Abrindo docs!"),
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(
      canvas.getByText("Nenhuma Simulação Encontrada")
    ).toBeInTheDocument()
    await expect(canvas.getByText("Nova Simulação")).toBeInTheDocument()
  },
}

export const FilterZeroResults: Story = {
  args: {
    icon: <FilterX className="size-full" />,
    title: "Nenhum resultado para estes filtros",
    description:
      "Tente ajustar o intervalo de datas ou remover alguns termos da busca.",
    secondaryAction: {
      label: "Limpar Filtros",
      onClick: () => alert("Filtros limpos!"),
    },
  },
}

export const WithSuggestions: Story = {
  args: {
    primaryAction: {
      label: "Conectar Base de Dados",
    },
    suggestions: [
      "Configurar credenciais do S3 / RustFS",
      "Definir dicionário de variáveis",
      "Executar validação de esquema de colunas",
    ],
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex w-full max-w-xl flex-col gap-6">
      <EmptyAction
        size="sm"
        title="Pequeno (sm)"
        description="Adequado para uso interno em cartões ou widgets compactos."
        primaryAction={{ label: "Adicionar" }}
      />
      <EmptyAction
        size="md"
        title="Médio (md)"
        description="Padrão do design system para seções de página inteira."
        primaryAction={{ label: "Adicionar Item" }}
      />
    </div>
  ),
}

export const Locales: Story = {
  render: () => (
    <div className="flex max-w-lg flex-col gap-6">
      <EmptyAction
        locale="pt-BR"
        title="Sem dados"
        description="Nenhum registro localizado"
        primaryAction={{ label: "Começar" }}
      />
      <EmptyAction
        locale="en-US"
        title="No data"
        description="No records found in this view"
        primaryAction={{ label: "Get started" }}
      />
    </div>
  ),
}
