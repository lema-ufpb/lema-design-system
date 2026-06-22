import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Switch } from "./switch"

const meta = {
  title: "Form/Switch",
  component: Switch,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A toggle switch built on the Radix `Switch` primitive with support for label, color variants, loading skeleton, error state, and left/right label positioning.",
          "",
          "## Props",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          '| `color` | `"default" \\| "success" \\| "destructive" \\| "warning"` | `"default"` | Active state color |',
          '| `size` | `"sm" \\| "md" \\| "lg"` | `"md"` | Switch dimensions |',
          "| `loading` | `boolean` | `false` | Shows skeleton placeholder |",
          '| `labelPosition` | `"left" \\| "right"` | `"right"` | Label alignment |',
          "| `label` | `string` | — | Label text next to the switch |",
          "| `disabled` | `boolean` | `false` | Disables the switch |",
          "| `error` | `string` | — | Error message below the switch |",
          "| `defaultChecked` | `boolean` | — | Initial checked state (uncontrolled) |",
          '| `locale` | `UILocale` | `"pt-BR"` | Locale for i18n strings |',
          "",
          "---",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    color: {
      control: "inline-radio",
      options: ["default", "success", "destructive", "warning"],
      table: { defaultValue: { summary: "default" } },
    },
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
      table: { defaultValue: { summary: "md" } },
    },
    loading: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    labelPosition: {
      control: "inline-radio",
      options: ["left", "right"],
      table: { defaultValue: { summary: "right" } },
    },
    label: { control: "text" },
    disabled: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    error: { control: "text" },
    defaultChecked: { control: "boolean" },
    locale: {
      control: "inline-radio",
      options: ["en-US", "pt-BR", "es-ES", "fr-FR"],
      table: { defaultValue: { summary: "pt-BR" } },
    },
  },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    color: "default",
    size: "md",
    labelPosition: "right",
    loading: false,
    locale: "pt-BR",
  },
}

export const WithLabel: Story = {
  args: {
    label: "Enable notifications",
  },
}

export const LabelLeft: Story = {
  args: {
    label: "Notifications",
    labelPosition: "left",
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Switch size="sm" label="Small" />
      <Switch size="md" label="Medium" />
      <Switch size="lg" label="Large" />
    </div>
  ),
}

export const AllColors: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Switch color="default" label="Default" defaultChecked />
      <Switch color="success" label="Success" defaultChecked />
      <Switch color="destructive" label="Destructive" defaultChecked />
      <Switch color="warning" label="Warning" defaultChecked />
    </div>
  ),
}

export const Loading: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Switch loading size="sm" label="Small" />
      <Switch loading size="md" label="Medium" />
      <Switch loading size="lg" label="Large" />
    </div>
  ),
}

export const WithError: Story = {
  args: {
    label: "Accept terms",
    error: "You must accept the terms to continue.",
  },
}

export const Disabled: Story = {
  args: {
    label: "Disabled switch",
    disabled: true,
  },
}

export const DisabledChecked: Story = {
  args: {
    label: "Always active",
    disabled: true,
    defaultChecked: true,
  },
}
