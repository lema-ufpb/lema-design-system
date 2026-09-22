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
    title: "No Simulation Found",
    description:
      "Create your first estimate or import parameters from a historical series to get started.",
  },
  argTypes: {
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Component scale.",
    },
    locale: {
      control: "radio",
      options: ["en-US", "pt-BR", "es-ES", "fr-FR"],
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
      label: "New Simulation",
      icon: <Plus className="size-4" />,
      onClick: () => alert("Creating new simulation!"),
    },
    secondaryAction: {
      label: "View Documentation",
      onClick: () => alert("Opening docs!"),
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(
      canvas.getByText("No Simulation Found")
    ).toBeInTheDocument()
    await expect(canvas.getByText("New Simulation")).toBeInTheDocument()
  },
}

export const FilterZeroResults: Story = {
  args: {
    icon: <FilterX className="size-full" />,
    title: "No results for these filters",
    description:
      "Try adjusting the date range or removing some search terms.",
    secondaryAction: {
      label: "Clear Filters",
      onClick: () => alert("Filters cleared!"),
    },
  },
}

export const WithSuggestions: Story = {
  args: {
    primaryAction: {
      label: "Connect Database",
    },
    suggestions: [
      "Configure S3 / RustFS credentials",
      "Define variable dictionary",
      "Run column schema validation",
    ],
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex w-full max-w-xl flex-col gap-6">
      <EmptyAction
        size="sm"
        title="Small (sm)"
        description="Suitable for internal use in compact cards or widgets."
        primaryAction={{ label: "Add" }}
      />
      <EmptyAction
        size="md"
        title="Medium (md)"
        description="Design system default for full-page sections."
        primaryAction={{ label: "Add Item" }}
      />
    </div>
  ),
}

export const Locales: Story = {
  render: () => (
    <div className="flex max-w-lg flex-col gap-6">
      <EmptyAction
        locale="en-US"
        title="No data"
        description="No records found in this view"
        primaryAction={{ label: "Get started" }}
      />
      <EmptyAction
        locale="pt-BR"
        title="No data"
        description="No records found"
        primaryAction={{ label: "Get started" }}
      />
    </div>
  ),
}
