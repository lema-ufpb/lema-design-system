import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { AnnouncementBadge } from "./announcement-badge"
import { SparklesIcon } from "lucide-react"

const meta = {
  title: "Actions/AnnouncementBadge",
  component: AnnouncementBadge,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A AnnouncementBadge component for the LEMA Design System.",
          "Supports CVA variants.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `ping` | `boolean` | — | - |",
          "| `showArrow` | `boolean` | — | - |",
          "| `icon` | `React.ReactNode` | — | - |",
          "| `tag` | `string` | — | - |",
          '| `variant` | `"default" \| "outline" \| "glow" \| "gradient"` | `"default"` | Variant |',
          '| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Variant |',
        ].join("\n"),
      },
    },
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline", "glow", "gradient"],
    },
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
    },
    ping: { control: "boolean" },
    showArrow: { control: "boolean" },
  },
} satisfies Meta<typeof AnnouncementBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Apresentando LEMA-DS v2.0",
    tag: "Novo",
    ping: true,
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4">
      <AnnouncementBadge variant="default" tag="Novo" ping>
        Default: Atualizações do sistema liberadas
      </AnnouncementBadge>
      <AnnouncementBadge variant="outline" tag="Changelog">
        Outline: Veja o que mudou na última versão
      </AnnouncementBadge>
      <AnnouncementBadge variant="glow" tag="Destaque" ping>
        Glow: Inteligência Artificial integrada
      </AnnouncementBadge>
      <AnnouncementBadge variant="gradient" tag="Beta">
        Gradient: Experimente a nova experiência
      </AnnouncementBadge>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4">
      <AnnouncementBadge size="sm" tag="v2.1">
        Tamanho Pequeno (sm)
      </AnnouncementBadge>
      <AnnouncementBadge size="md" tag="v2.1" ping>
        Tamanho Padrão (md)
      </AnnouncementBadge>
      <AnnouncementBadge size="lg" tag="v2.1" ping>
        Tamanho Grande (lg)
      </AnnouncementBadge>
    </div>
  ),
}

export const WithCustomIcon: Story = {
  args: {
    icon: <SparklesIcon className="size-3.5 text-primary" />,
    children: "Turbine sua produtividade com automações",
    variant: "glow",
  },
}

export const AsLink: Story = {
  args: {
    href: "https://github.com/lema-ufpb/design-system",
    target: "_blank",
    rel: "noopener noreferrer",
    children: "Confira o repositório oficial no GitHub",
    tag: "Open Source",
  },
}
