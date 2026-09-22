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
    title: "Delete Data",
    description: "This action is irreversible.",
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
          Delete Simulation
        </Button>
      }
      title="Delete Simulation Data"
      description="This action cannot be undone. All parameters and calculated estimates will be permanently deleted."
      onConfirm={async () => {
        await new Promise((resolve) => setTimeout(resolve, 800))
        alert("Simulation deleted successfully!")
      }}
    />
  ),
  args: {
    title: "Delete Simulation Data",
    description: "This action cannot be undone.",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole("button")
    await expect(trigger).toBeInTheDocument()
    await userEvent.click(trigger)
    // Dialog opens in document.body
    const dialogHeading = await within(document.body).findByText(
      "Delete Simulation Data"
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
          Revoke Access Token
        </Button>
      }
      title="Revoke Production API Key"
      description="All active requests using this token will be interrupted immediately."
      confirmWord="api_live_lema_prod"
      onConfirm={() => alert("Token revoked!")}
    />
  ),
  args: {
    title: "Revoke Production API Key",
    description:
      "All active requests using this token will be interrupted immediately.",
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
          Disconnect Database
        </Button>
      }
      title="Interrupt Cluster Connection"
      description="The cluster will go offline during the maintenance window."
      confirmWord="OFFLINE"
      onConfirm={() => alert("Cluster disconnected!")}
    />
  ),
  args: {
    intent: "warning",
    title: "Interrupt Cluster Connection",
    description: "The cluster will go offline during the maintenance window.",
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
          Clear Quick Filters
        </Button>
      }
      title="Reset to Default Configuration"
      description="Do you want to return display options to factory defaults?"
      onConfirm={() => alert("Filters reset!")}
    />
  ),
  args: {
    requireTyping: false,
    title: "Reset to Default Configuration",
    description: "Do you want to return display options to factory defaults?",
  },
}

export const Locales: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <ConfirmDialog
        locale="pt-BR"
        trigger={<Button size="sm">pt-BR</Button>}
        title="Delete"
        description="Confirmation in Portuguese"
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
