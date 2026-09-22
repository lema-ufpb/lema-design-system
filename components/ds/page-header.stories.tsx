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
    title: "Projects and Models",
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
    title: "Projects and Models",
    description: "Manage LEMA economic models and datasets.",
    actions: (
      <>
        <Button variant="outline" size="sm">
          <Download data-icon="inline-start" />
          Export
        </Button>
        <Button size="sm">
          <Plus data-icon="inline-start" />
          New Project
        </Button>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Projects and Models"
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
    title: "DSGE Model Brazil",
    badge: <Badge variant="secondary">Production v2.1</Badge>,
    description: "Parameters calibrated for the Central Bank of Brazil.",
    metadata: (
      <>
        <span className="text-xs text-muted-foreground">
          Created on 03/12/2025
        </span>
        <span className="text-xs text-muted-foreground">•</span>
        <span className="text-xs text-muted-foreground">Author: Prof. LEMA</span>
      </>
    ),
    actions: (
      <Button size="sm">
        <Plus data-icon="inline-start" />
        New Simulation
      </Button>
    ),
  },
}

export const WithBackButton: Story = {
  args: {
    title: "Simulation Details #481",
    description: "Equilibrium convergence reached in 142 iterations.",
    onBack: () => alert("Back triggered!"),
    actions: (
      <Button variant="outline" size="sm">
        Download Report
      </Button>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(
      canvas.getByRole("button", { name: "Back" })
    ).toBeInTheDocument()
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <PageHeader
        as="section"
        size="sm"
        title="Small Size (sm)"
        description="Ideal for subpages or compact panels."
        actions={<Button size="sm">Action sm</Button>}
      />
      <PageHeader
        as="section"
        size="md"
        title="Medium Size (md)"
        description="Default design system size for main screens."
        actions={<Button size="sm">Action md</Button>}
      />
      <PageHeader
        as="section"
        size="lg"
        title="Large Size (lg)"
        description="Highlight for landing pages or executive reports."
        actions={<Button>Action lg</Button>}
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
        title="Default Variant"
        description="Has a subtle bottom divider line."
        actions={<Button size="sm">Default</Button>}
      />
      <PageHeader
        as="section"
        variant="compact"
        title="Compact Variant"
        description="No bottom border for fluid layouts."
        actions={<Button size="sm">Compact</Button>}
      />
      <PageHeader
        as="section"
        variant="banner"
        title="Banner Variant"
        description="Styled card with highlighted background for premium areas."
        actions={<Button size="sm">Banner</Button>}
      />
    </div>
  ),
}

export const Loading: Story = {
  args: {
    loading: true,
    title: "Loading...",
    breadcrumbs: <span>Home / Models</span>,
    actions: <Button size="sm">Loading</Button>,
  },
}

export const Locales: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <PageHeader
        as="section"
        locale="en-US"
        title="English (en-US)"
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
