import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, within, userEvent } from "storybook/test"

import { InlineEdit } from "./inline-edit"

const meta = {
  title: "Form/InlineEdit",
  component: InlineEdit,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "In-place text editor that toggles into an input on click, with keyboard controls (Enter to save, Esc to cancel), async saving, and validation.",
      },
    },
  },
  args: {
    value: "Econometric Model v1",
    onSave: () => {},
  },
  argTypes: {
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Size scale of text and input.",
    },
    disabled: {
      control: "boolean",
      description: "Disables editing.",
    },
    locale: {
      control: "radio",
      options: ["en-US", "pt-BR", "es-ES", "fr-FR"],
      description: "Localization language.",
    },
  },
} satisfies Meta<typeof InlineEdit>

export default meta
type Story = StoryObj<typeof meta>

function InteractiveInlineEdit(
  props: Partial<React.ComponentProps<typeof InlineEdit>> & {
    initialValue?: string
  }
) {
  const [val, setVal] = React.useState(
    props.initialValue ?? "Econometric Model v1"
  )
  return (
    <div className="w-80 rounded-lg border border-border bg-card p-4">
      <span className="block pb-1 text-xs text-muted-foreground">
        Model Name:
      </span>
      <InlineEdit
        value={val}
        onSave={(newVal) => {
          setVal(newVal)
          props.onSave?.(newVal)
        }}
        {...props}
      />
    </div>
  )
}

export const Default: Story = {
  render: (args) => <InteractiveInlineEdit {...args} />,
  args: {
    value: "Econometric Model v1",
    locale: "en-US",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole("button")
    await expect(trigger).toBeInTheDocument()
    await userEvent.click(trigger)
    const input = canvas.getByRole("textbox")
    await expect(input).toBeInTheDocument()
  },
}

export const WithValidation: Story = {
  render: (args) => (
    <InteractiveInlineEdit
      {...args}
      validate={(val) => {
        if (!val.trim()) return "Title cannot be empty."
        if (val.length < 5) return "Minimum 5 characters required."
        return undefined
      }}
    />
  ),
  args: {
    value: "Valid Model",
    locale: "en-US",
  },
}

export const AsyncSave: Story = {
  render: (args) => {
    const [val, setVal] = React.useState("Fiscal Simulation 2026")
    return (
      <div className="w-80 rounded-lg border border-border bg-card p-4">
        <span className="block pb-1 text-xs text-muted-foreground">
          Saving to API:
        </span>
        <InlineEdit
          {...args}
          value={val}
          onSave={async (newVal) => {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            setVal(newVal)
          }}
        />
      </div>
    )
  },
  args: {
    value: "Fiscal Simulation 2026",
  },
}

export const Disabled: Story = {
  render: (args) => <InteractiveInlineEdit {...args} disabled />,
  args: {
    disabled: true,
    value: "Locked Field",
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-6">
      <div>
        <span className="block pb-1 text-xs text-muted-foreground">
          Small (sm):
        </span>
        <InlineEdit size="sm" value="Alpha Parameter" onSave={() => {}} />
      </div>
      <div>
        <span className="block pb-1 text-xs text-muted-foreground">
          Medium (md):
        </span>
        <InlineEdit size="md" value="IPCA Inflation Rate" onSave={() => {}} />
      </div>
      <div>
        <span className="block pb-1 text-xs text-muted-foreground">
          Large (lg):
        </span>
        <InlineEdit
          size="lg"
          value="LEMA Quarterly Report"
          onSave={() => {}}
        />
      </div>
    </div>
  ),
}

export const Locales: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <InlineEdit locale="en-US" value="English" onSave={() => {}} />
      <InlineEdit locale="pt-BR" value="Português" onSave={() => {}} />
      <InlineEdit locale="es-ES" value="Español" onSave={() => {}} />
      <InlineEdit locale="fr-FR" value="Français" onSave={() => {}} />
    </div>
  ),
}
