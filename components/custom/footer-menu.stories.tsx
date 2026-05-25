import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { FooterMenu } from "@/components/custom/footer-menu"

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
          "## Design Tokens & Semantic Variables",
          "",
          "| Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Menu Headers** | `--foreground` | Font color for column headers and section titles |",
          "| **Navigation Links** | `--muted-foreground` | Idle color for link text options |",
          "| **Active Link hover** | `--primary` | Active hover text highlight color for links |",
          "| **Trigger Focus rings** | `--primary` | Outline border ring visible during keyboard focus navigation |",
          "| **Mobile hover highlight** | `--accent/50` | Background translucent color for mobile header triggers |",
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
        title: "Produto",
        options: [
          { name: "Recursos", url: "#" },
          { name: "Integrações", url: "#" },
          { name: "Preços", url: "#" },
        ],
      },
      {
        title: "Empresa",
        options: [
          { name: "Sobre Nós", url: "#" },
          { name: "Carreiras", url: "#" },
          { name: "Contato", url: "#" },
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
