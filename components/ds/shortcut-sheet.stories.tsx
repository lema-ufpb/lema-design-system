import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, within, userEvent } from "storybook/test"

import { ShortcutSheet, type ShortcutGroup } from "./shortcut-sheet"
import { Button } from "@/components/ui/button"
import { Keyboard } from "lucide-react"

const sampleGroups: ShortcutGroup[] = [
  {
    name: "Geral",
    shortcuts: [
      { id: "g1", label: "Abrir menu de comandos", keys: ["⌘", "K"] },
      { id: "g2", label: "Ajuda e atalhos de teclado", keys: ["?"] },
      { id: "g3", label: "Alternar modo claro / escuro", keys: ["⌘", "J"] },
      { id: "g4", label: "Fechar diálogo ou janela", keys: ["Esc"] },
    ],
  },
  {
    name: "Navegação",
    shortcuts: [
      { id: "n1", label: "Ir para Início / Dashboard", keys: ["G", "H"] },
      { id: "n2", label: "Ir para Modelos Econométricos", keys: ["G", "M"] },
      { id: "n3", label: "Ir para Conjuntos de Dados", keys: ["G", "D"] },
    ],
  },
  {
    name: "Execução & Edição",
    shortcuts: [
      { id: "e1", label: "Executar simulação", keys: ["⌘", "Enter"] },
      { id: "e2", label: "Salvar alterações", keys: ["⌘", "S"] },
      { id: "e3", label: "Exportar dados para CSV", keys: ["⌘", "E"] },
    ],
  },
]

const meta = {
  title: "Navigation/ShortcutSheet",
  component: ShortcutSheet,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Keyboard shortcuts sheet modal mapping key combinations grouped by category with live search filter.",
      },
    },
  },
  args: {
    groups: sampleGroups,
  },
  argTypes: {
    enableGlobalListener: {
      control: "boolean",
      description: "Toggles open on '?' keypress.",
    },
    locale: {
      control: "radio",
      options: ["pt-BR", "en-US", "es-ES", "fr-FR"],
      description: "Language locale.",
    },
  },
} satisfies Meta<typeof ShortcutSheet>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <ShortcutSheet
      {...args}
      trigger={
        <Button variant="outline" size="sm">
          <Keyboard data-icon="inline-start" />
          Atalhos de Teclado (?)
        </Button>
      }
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole("button")
    await expect(trigger).toBeInTheDocument()
    await userEvent.click(trigger)
    const title = await within(document.body).findByText("Atalhos de Teclado")
    await expect(title).toBeInTheDocument()
  },
}

export const Locales: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <ShortcutSheet
        locale="pt-BR"
        groups={sampleGroups}
        trigger={<Button size="sm">pt-BR</Button>}
      />
      <ShortcutSheet
        locale="en-US"
        groups={sampleGroups}
        trigger={<Button size="sm">en-US</Button>}
      />
    </div>
  ),
}
