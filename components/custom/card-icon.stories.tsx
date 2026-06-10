import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  CompassIcon,
  TargetIcon,
  ShieldCheckIcon,
  LeafIcon,
  BarChart3Icon,
  GlobeIcon,
  HeartHandshakeIcon,
  ZapIcon,
} from "lucide-react"

import { CardIcon } from "./card-icon"

const meta = {
  title: "Data Display/CardIcon",
  component: CardIcon,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "Feature / navigation card built around a tinted icon medallion, a title and a description.",
          "Icon colour and background both derive from a single semantic `tone` token — no raw Tailwind values.",
          "Three media styles (`soft`, `solid`, `outline`), three sizes, centred or left-aligned, and an optional link mode with a hover lift.",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    tone: {
      control: "select",
      options: [
        "primary",
        "success",
        "warning",
        "destructive",
        "violet",
        "sky",
        "neutral",
      ],
      table: { defaultValue: { summary: "primary" } },
    },
    mediaStyle: {
      control: "inline-radio",
      options: ["soft", "solid", "outline"],
      table: { defaultValue: { summary: "soft" } },
    },
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
      table: { defaultValue: { summary: "md" } },
    },
    align: {
      control: "inline-radio",
      options: ["center", "start"],
      table: { defaultValue: { summary: "center" } },
    },
    titleUpper: { control: "boolean" },
    title: { control: "text" },
    description: { control: "text" },
    badge: { control: "text" },
    href: { control: "text" },
    actionLabel: { control: "text" },
    loading: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
  },
  args: {
    icon: CompassIcon,
    title: "Visão geral dos ODS",
    description:
      "Seu ponto de partida para os principais indicadores de desempenho da Agenda 2030.",
    tone: "warning",
    mediaStyle: "soft",
    size: "md",
    align: "center",
    titleUpper: true,
  },
} satisfies Meta<typeof CardIcon>

export default meta
type Story = StoryObj<typeof meta>

// Reproduces the reference dashboard hero card.
export const Default: Story = {
  render: (args) => (
    <div className="max-w-sm">
      <CardIcon {...args} />
    </div>
  ),
}

export const Tones: Story = {
  render: () => (
    <div className="grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <CardIcon
        icon={LeafIcon}
        tone="success"
        title="Sustentabilidade"
        description="Indicadores ambientais e metas de redução de impacto."
      />
      <CardIcon
        icon={TargetIcon}
        tone="warning"
        title="Metas em risco"
        description="Objetivos que precisam de atenção no ciclo atual."
      />
      <CardIcon
        icon={ShieldCheckIcon}
        tone="destructive"
        title="Conformidade"
        description="Requisitos críticos pendentes de verificação."
      />
      <CardIcon
        icon={BarChart3Icon}
        tone="primary"
        title="Desempenho"
        description="Evolução consolidada dos principais indicadores."
      />
      <CardIcon
        icon={GlobeIcon}
        tone="sky"
        title="Cobertura territorial"
        description="Distribuição dos dados por município e região."
      />
      <CardIcon
        icon={HeartHandshakeIcon}
        tone="violet"
        title="Parcerias"
        description="Articulações institucionais ativas no programa."
      />
    </div>
  ),
}

export const MediaStyles: Story = {
  render: () => (
    <div className="grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
      <CardIcon
        icon={ZapIcon}
        tone="primary"
        mediaStyle="soft"
        title="Soft"
        description="Token tingido a 10%."
      />
      <CardIcon
        icon={ZapIcon}
        tone="primary"
        mediaStyle="solid"
        title="Solid"
        description="Preenchimento sólido com foreground."
      />
      <CardIcon
        icon={ZapIcon}
        tone="primary"
        mediaStyle="outline"
        title="Outline"
        description="Contorno na cor do token."
      />
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="grid max-w-4xl grid-cols-1 items-start gap-4 sm:grid-cols-3">
      <CardIcon
        icon={CompassIcon}
        tone="sky"
        size="sm"
        title="Small"
        description="Escala compacta para grids densos."
      />
      <CardIcon
        icon={CompassIcon}
        tone="sky"
        size="md"
        title="Medium"
        description="Tamanho padrão para a maioria dos casos."
      />
      <CardIcon
        icon={CompassIcon}
        tone="sky"
        size="lg"
        title="Large"
        description="Destaque em seções de abertura."
      />
    </div>
  ),
}

export const AlignStart: Story = {
  args: {
    align: "start",
    titleUpper: false,
    tone: "primary",
    icon: BarChart3Icon,
    title: "Relatórios analíticos",
    description: "Exporte e compartilhe painéis com a equipe.",
  },
  render: (args) => (
    <div className="max-w-sm">
      <CardIcon {...args} />
    </div>
  ),
}

export const AsLink: Story = {
  args: {
    href: "#indicadores",
    tone: "violet",
    titleUpper: false,
    icon: TargetIcon,
    title: "Explorar indicadores",
    description: "Navegue pelos 17 objetivos e suas metas.",
    actionLabel: "Acessar",
  },
  render: (args) => (
    <div className="max-w-sm">
      <CardIcon {...args} />
    </div>
  ),
}

export const WithBadge: Story = {
  args: {
    badge: "Novo",
    tone: "success",
    titleUpper: false,
    icon: LeafIcon,
    title: "Painel de impacto",
    description: "Acompanhe os resultados ambientais em tempo real.",
  },
  render: (args) => (
    <div className="max-w-sm">
      <CardIcon {...args} />
    </div>
  ),
}

export const Loading: Story = {
  args: { loading: true },
  render: (args) => (
    <div className="max-w-sm">
      <CardIcon {...args} />
    </div>
  ),
}
