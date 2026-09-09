import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, within, userEvent } from "storybook/test"

import { ConfirmDialog } from "./confirm-dialog"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

const meta = {
  title: "Feedback/ConfirmDialog",
  component: ConfirmDialog,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "High-stakes confirmation dialog preventing accidental destruction with typed phrase validation.",
      },
    },
  },
  args: {
    title: "Excluir Dados",
    description: "Esta ação é irreversível.",
    onConfirm: () => {},
  },
  argTypes: {
    intent: {
      control: "radio",
      options: ["destructive", "warning"],
      description: "Visual severity.",
    },
    requireTyping: {
      control: "boolean",
      description: "Enforces typing safety word.",
    },
    locale: {
      control: "radio",
      options: ["pt-BR", "en-US", "es-ES", "fr-FR"],
      description: "Localization language.",
    },
  },
} satisfies Meta<typeof ConfirmDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <ConfirmDialog
      {...args}
      trigger={
        <Button variant="destructive" size="sm">
          <Trash2 data-icon="inline-start" />
          Excluir Simulação
        </Button>
      }
      title="Excluir Dados da Simulação"
      description="Esta ação não pode ser desfeita. Todos os parâmetros e estimativas calculadas serão excluídos permanentemente."
      onConfirm={async () => {
        await new Promise((resolve) => setTimeout(resolve, 800))
        alert("Simulação excluída com sucesso!")
      }}
    />
  ),
  args: {
    title: "Excluir Dados da Simulação",
    description: "Esta ação não pode ser desfeita.",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole("button")
    await expect(trigger).toBeInTheDocument()
    await userEvent.click(trigger)
    // Dialog opens in document.body
    const dialogHeading = await within(document.body).findByText(
      "Excluir Dados da Simulação"
    )
    await expect(dialogHeading).toBeInTheDocument()
  },
}

export const SpecificResourceName: Story = {
  render: (args) => (
    <ConfirmDialog
      {...args}
      trigger={
        <Button
          variant="outline"
          size="sm"
          className="border-destructive/30 text-destructive hover:bg-destructive/10"
        >
          Revogar Token de Acesso
        </Button>
      }
      title="Revogar Chave de API de Produção"
      description="Todas as requisições ativas usando este token serão interrompidas imediatamente."
      confirmWord="api_live_lema_prod"
      onConfirm={() => alert("Token revogado!")}
    />
  ),
  args: {
    title: "Revogar Chave de API de Produção",
    description:
      "Todas as requisições ativas usando este token serão interrompidas imediatamente.",
    confirmWord: "api_live_lema_prod",
  },
}

export const WarningIntent: Story = {
  render: (args) => (
    <ConfirmDialog
      {...args}
      intent="warning"
      trigger={
        <Button variant="outline" size="sm">
          Desconectar Banco de Dados
        </Button>
      }
      title="Interromper Conexão com o Cluster"
      description="O cluster entrará em modo offline durante a janela de manutenção."
      confirmWord="OFFLINE"
      onConfirm={() => alert("Cluster desconectado!")}
    />
  ),
  args: {
    intent: "warning",
    title: "Interromper Conexão com o Cluster",
    description:
      "O cluster entrará em modo offline durante a janela de manutenção.",
    confirmWord: "OFFLINE",
  },
}

export const WithoutTypingRequirement: Story = {
  render: (args) => (
    <ConfirmDialog
      {...args}
      requireTyping={false}
      trigger={
        <Button variant="outline" size="sm">
          Limpar Filtros Rápidos
        </Button>
      }
      title="Redefinir Configuração Padrão"
      description="Deseja retornar as opções de visualização aos valores originais de fábrica?"
      onConfirm={() => alert("Filtros resetados!")}
    />
  ),
  args: {
    requireTyping: false,
    title: "Redefinir Configuração Padrão",
    description:
      "Deseja retornar as opções de visualização aos valores originais de fábrica?",
  },
}

export const Locales: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <ConfirmDialog
        locale="pt-BR"
        trigger={<Button size="sm">pt-BR</Button>}
        title="Excluir"
        description="Confirmação em Português"
        onConfirm={() => {}}
      />
      <ConfirmDialog
        locale="en-US"
        trigger={<Button size="sm">en-US</Button>}
        title="Delete"
        description="Confirmation in English"
        onConfirm={() => {}}
      />
      <ConfirmDialog
        locale="es-ES"
        trigger={<Button size="sm">es-ES</Button>}
        title="Eliminar"
        description="Confirmación en Español"
        onConfirm={() => {}}
      />
      <ConfirmDialog
        locale="fr-FR"
        trigger={<Button size="sm">fr-FR</Button>}
        title="Supprimer"
        description="Confirmation en Français"
        onConfirm={() => {}}
      />
    </div>
  ),
}
