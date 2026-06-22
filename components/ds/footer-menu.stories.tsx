import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { FooterMenu } from "@/components/ds/footer-menu"

const meta = {
  title: "Navigation/FooterMenu",
  component: FooterMenu,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A navigation panel designed for footer sections, displaying content in static columns on desktop layouts and collapsible accordion lists on mobile views.",
          "",
          "Supports typography size variants (`sm`, `md`, `lg`), lowercase/uppercase header toggles, and is accessible out-of-the-box with keyboard navigation indicators.",
          "",
          "---",
          "",
          "## Data API",
          "",
          "### `data`",
          "",
          "An array of footer column descriptor objects. Each object represents one column with a title and a list of links.",
          "",
          "```tsx",
          "const data = [",
          "  {",
          '    title: "Product",',
          "    options: [",
          '      { name: "Features",     url: "#" },',
          '      { name: "Integrations", url: "#" },',
          "    ],",
          "  },",
          "  {",
          '    title: "Company",',
          "    options: [",
          '      { name: "About", url: "#" },',
          '      { name: "Blog",  url: "#", target: "_blank" },',
          "    ],",
          "  },",
          "]",
          "```",
          "",
          "#### `FooterGroupData`",
          "",
          "| Field | Type | Required | Description |",
          "| --- | --- | --- | --- |",
          "| `title` | `string` | ✓ | Column header — displayed as the section title |",
          "| `options` | `FooterOptionData[]` | ✓ | Array of link items within this column |",
          "",
          "#### `FooterOptionData`",
          "",
          "| Field | Type | Required | Description |",
          "| --- | --- | --- | --- |",
          "| `name` | `string` | ✓ | Link display text |",
          "| `url` | `string` | ✓ | Link target URL |",
          '| `target` | `string` | — | Anchor target (e.g. `"_blank"` for external links) |',
          "",
          "> **Type:** `FooterGroupData[]`  •  Nested: each group contains an array of options",
          "",
          "---",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Menu Headers** | `--foreground` | Font color for column headers and section titles |",
          "| **Navigation Links** | `--muted-foreground` | Idle color for link text options |",
          "| **Active Link hover** | `--primary` | Active hover text highlight color for links |",
          "| **Trigger Focus rings** | `--primary` | Outline border ring visible during keyboard focus navigation |",
          "| **Mobile hover highlight** | `--accent/50` | Background translucent color for mobile header triggers |",
          "",
          "## Component Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `data` | `FooterGroupData[]` | — | (required) Footer column data |",
          "| `upper` | `boolean` | `false` | Uppercase headers |",
          '| `locale` | `UILocale` | `"en-US"` | i18n locale |',
          '| `size` | `"sm" \\| "md" \\| "lg"` | `"md"` | Typography size variant |',
          "| `className` | `string` | — | Additional CSS classes |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    upper: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      table: { defaultValue: { summary: "md" } },
    },
    data: { table: { disable: true } },
    locale: {
      control: "select",
      options: ["en-US", "pt-BR", "es-ES", "fr-FR"],
      table: { defaultValue: { summary: "en-US" } },
    },
  },
} satisfies Meta<typeof FooterMenu>

export default meta
type Story = StoryObj<typeof meta>

const footerData = [
  {
    title: "Product",
    options: [
      { name: "Features", url: "#" },
      { name: "Integrations", url: "#" },
      { name: "Pricing", url: "#" },
      { name: "Changelog", url: "#" },
    ],
  },
  {
    title: "Company",
    options: [
      { name: "About Us", url: "#" },
      { name: "Careers", url: "#" },
      { name: "Blog", url: "#" },
      { name: "Contact", url: "#" },
    ],
  },
  {
    title: "Resources",
    options: [
      { name: "Documentation", url: "#" },
      { name: "Help Center", url: "#" },
      { name: "Community", url: "#" },
      { name: "Privacy Policy", url: "#" },
    ],
  },
  {
    title: "Social",
    options: [
      { name: "Twitter", url: "#" },
      { name: "GitHub", url: "#" },
      { name: "Discord", url: "#" },
      { name: "LinkedIn", url: "#" },
    ],
  },
]

export const Default: Story = {
  args: {
    data: footerData,
    size: "md",
    upper: true,
    locale: "en-US",
  },
  render: (args) => (
    <div className="mx-auto w-full max-w-6xl rounded-xl bg-card">
      <FooterMenu {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Default footer menu with four columns (Product, Company, Resources, Social) in uppercase mode.",
      },
    },
  },
}

export const LocalePTBR: Story = {
  args: {
    data: [
      {
        title: "Product",
        options: [
          { name: "Features", url: "#" },
          { name: "Integrations", url: "#" },
          { name: "Pricing", url: "#" },
        ],
      },
      {
        title: "Company",
        options: [
          { name: "About Us", url: "#" },
          { name: "Careers", url: "#" },
          { name: "Contact", url: "#" },
        ],
      },
    ],
    size: "md",
    locale: "pt-BR",
  },
  render: (args) => (
    <div className="mx-auto w-full max-w-6xl rounded-xl bg-card">
      <FooterMenu {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Portuguese (pt-BR) localization — two-column layout with translated headings.",
      },
    },
  },
}

export const Simple: Story = {
  args: {
    data: footerData.slice(0, 2),
    size: "lg",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Simplified footer menu with two columns and large size preset, no uppercase toggle.",
      },
    },
  },
}
