import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Empty } from "./empty"

const meta = {
  title: "Feedback/Empty",
  component: Empty,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "An empty state component with four built-in variants: **no-data**, **search**, **error**, and **no-results**.",
          "Each variant provides its own icon, i18n title, and description.",
          "",
          "## API",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          '| `variant` | `"no-data" \\| "search" \\| "error" \\| "no-results"` | `"no-data"` | Visual variant |',
          "| `title` | `string` | — | Overrides the i18n title |",
          "| `description` | `string` | — | Overrides the i18n description |",
          "| `compact` | `boolean` | `false` | Compact padding |",
          "| `loading` | `boolean` | `false` | Shows skeleton placeholder |",
          "| `action` | `{ label: string; onClick: () => void }` | — | Action button config |",
          '| `locale` | `"en-US" \\| "pt-BR" \\| "es-ES" \\| "fr-FR"` | `"pt-BR"` | Locale for i18n labels |',
        ].join("\n"),
      },
    },
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["no-data", "search", "error", "no-results"],
      table: { defaultValue: { summary: "no-data" } },
    },
    compact: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    loading: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    title: {
      control: "text",
      table: { defaultValue: { summary: "" } },
    },
    description: {
      control: "text",
      table: { defaultValue: { summary: "" } },
    },
    action: { table: { disable: true } },
    locale: {
      control: "inline-radio",
      options: ["en-US", "pt-BR", "es-ES", "fr-FR"],
      table: { defaultValue: { summary: "pt-BR" } },
    },
  },
} satisfies Meta<typeof Empty>

export default meta
type Story = StoryObj<typeof meta>

export const NoData: Story = {
  args: {
    variant: "no-data",
  },
}

export const Search: Story = {
  args: {
    variant: "search",
  },
}

export const Error: Story = {
  args: {
    variant: "error",
  },
}

export const NoResults: Story = {
  args: {
    variant: "no-results",
  },
}

export const WithAction: Story = {
  args: {
    variant: "no-data",
    action: {
      label: "Refresh data",
      onClick: () => alert("Refresh clicked"),
    },
  },
}

export const Compact: Story = {
  args: {
    variant: "no-data",
    compact: true,
  },
}

export const Loading: Story = {
  args: {
    loading: true,
  },
}

export const CustomTitle: Story = {
  args: {
    variant: "no-data",
    title: "Nothing here yet",
    description: "Create your first project to get started.",
    action: {
      label: "Create project",
      onClick: () => alert("Create clicked"),
    },
  },
}
