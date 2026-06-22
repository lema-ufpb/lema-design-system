import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Select } from "./select"

const COUNTRIES = [
  { value: "br", label: "Brazil", group: "Americas" },
  { value: "us", label: "United States", group: "Americas" },
  { value: "ca", label: "Canada", group: "Americas" },
  { value: "fr", label: "France", group: "Europe" },
  { value: "de", label: "Germany", group: "Europe" },
  { value: "it", label: "Italy", group: "Europe" },
  { value: "jp", label: "Japan", group: "Asia" },
  { value: "cn", label: "China", group: "Asia" },
  { value: "au", label: "Australia", group: "Oceania" },
]

const meta = {
  title: "Form/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A searchable select built on **Popover** and **Command** primitives with support for async loading, grouped options, and inline creation of new values.",
          "",
          "## Props",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          '| `size` | `"sm" \\| "md" \\| "lg"` | `"md"` | Control height and font size |',
          "| `searchable` | `boolean` | `false` | Enables the search input inside the dropdown |",
          "| `creatable` | `boolean` | `false` | Allows creating new options from typed text |",
          "| `loading` | `boolean` | `false` | Shows skeleton placeholders |",
          "| `disabled` | `boolean` | `false` | Disables the trigger |",
          "| `placeholder` | `string` | — | Placeholder text on the trigger |",
          "| `error` | `string` | — | Error message below the trigger |",
          "| `label` | `string` | — | Label above the trigger |",
          "| `async` | `boolean` | `false` | Loads options asynchronously via `loadOptions` |",
          '| `locale` | `UILocale` | `"pt-BR"` | Locale for i18n strings |',
          "",
          "---",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
      table: { defaultValue: { summary: "md" } },
    },
    searchable: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    creatable: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    loading: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    options: { table: { disable: true } },
    loadOptions: { table: { disable: true } },
    onCreate: { table: { disable: true } },
    onChange: { table: { disable: true } },
    error: { control: "text" },
    label: { control: "text" },
    placeholder: { control: "text" },
    disabled: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    locale: {
      control: "inline-radio",
      options: ["en-US", "pt-BR", "es-ES", "fr-FR"],
      table: { defaultValue: { summary: "pt-BR" } },
    },
  },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    options: COUNTRIES,
    placeholder: "Select a country",
    searchable: false,
    async: false,
    creatable: false,
    size: "md",
    loading: false,
    locale: "pt-BR",
    disabled: false,
  },
}

export const Searchable: Story = {
  args: {
    options: COUNTRIES,
    searchable: true,
    placeholder: "Search countries…",
  },
}

export const AllSizes: Story = {
  args: { options: [] },
  render: () => (
    <div className="flex flex-col gap-4">
      <Select size="sm" options={COUNTRIES.slice(0, 3)} placeholder="Small" />
      <Select size="md" options={COUNTRIES.slice(0, 3)} placeholder="Medium" />
      <Select size="lg" options={COUNTRIES.slice(0, 3)} placeholder="Large" />
    </div>
  ),
}

export const Async: Story = {
  args: {
    options: [],
    async: true,
    searchable: true,
    placeholder: "Search users…",
    loadOptions: async (search: string) => {
      await new Promise((r) => setTimeout(r, 800))
      return COUNTRIES.filter(
        (c) =>
          c.label.toLowerCase().includes(search.toLowerCase()) ||
          c.value.includes(search)
      )
    },
  },
}

export const Creatable: Story = {
  args: {
    options: COUNTRIES.slice(0, 3),
    searchable: true,
    creatable: true,
    placeholder: "Select or create…",
    onCreate: async (label: string) => {
      await new Promise((r) => setTimeout(r, 500))
      return label.toLowerCase().replace(/\s+/g, "-")
    },
  },
}

export const Grouped: Story = {
  args: {
    options: COUNTRIES,
    placeholder: "Select a country",
  },
}

export const WithError: Story = {
  args: {
    options: COUNTRIES,
    placeholder: "Select a country",
    error: "Please select a country.",
  },
}

export const Loading: Story = {
  args: {
    options: COUNTRIES,
    placeholder: "Loading…",
    loading: true,
  },
}

export const Disabled: Story = {
  args: {
    options: COUNTRIES,
    placeholder: "Disabled select",
    disabled: true,
  },
}

export const WithLabel: Story = {
  args: {
    options: COUNTRIES,
    label: "Country",
    placeholder: "Select your country",
  },
}
