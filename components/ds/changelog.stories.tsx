import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, within } from "storybook/test"

import { Changelog, type ChangelogRelease } from "./changelog"

const sampleReleases: ChangelogRelease[] = [
  {
    version: "v1.11.0",
    date: new Date(2025, 10, 15),
    title: "Expansão da Família de Componentes e Novos Gráficos",
    isLatest: true,
    changes: [
      {
        type: "feature",
        description:
          "Adicionado suporte nativo ao novo DateRangePicker com atalhos inteligentes.",
      },
      {
        type: "feature",
        description:
          "Componente Sparkline independente para tabelas de alta densidade.",
      },
      {
        type: "improvement",
        description:
          "Otimização de tempo de renderização no motor de SVG e Recharts.",
      },
      {
        type: "fix",
        description:
          "Correção de acessibilidade e foco via teclado no ConfirmDialog.",
      },
    ],
  },
  {
    version: "v1.10.0",
    date: new Date(2025, 9, 2),
    title: "Migração para Tailwind CSS v4 e Shadcn Luma",
    changes: [
      {
        type: "breaking",
        description:
          "Variáveis CSS migradas de HSL para o padrão oklch do Tailwind v4.",
      },
      {
        type: "improvement",
        description:
          "Suporte completo a 4 idiomas (pt-BR, en-US, es-ES, fr-FR) via ui-i18n.",
      },
      {
        type: "fix",
        description:
          "Ajuste na escala tipográfica sm/md/lg em botões e badges de dados.",
      },
    ],
  },
]

const meta = {
  title: "Data Display/Changelog",
  component: Changelog,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Visual release notes timeline categorizing features, improvements, fixes, and breaking changes.",
      },
    },
  },
  args: {
    releases: sampleReleases,
  },
  argTypes: {
    loading: {
      control: "boolean",
      description: "Shows skeleton loading state.",
    },
    locale: {
      control: "radio",
      options: ["pt-BR", "en-US", "es-ES", "fr-FR"],
      description: "Language locale.",
    },
  },
} satisfies Meta<typeof Changelog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    locale: "pt-BR",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("v1.11.0")).toBeInTheDocument()
    await expect(canvas.getByText("v1.10.0")).toBeInTheDocument()
  },
}

export const Loading: Story = {
  args: {
    loading: true,
  },
}

export const Locales: Story = {
  render: () => (
    <div className="flex max-w-xl flex-col gap-8">
      <div>
        <span className="block pb-2 text-xs font-semibold text-muted-foreground">
          pt-BR:
        </span>
        <Changelog locale="pt-BR" releases={sampleReleases.slice(0, 1)} />
      </div>
      <div>
        <span className="block pb-2 text-xs font-semibold text-muted-foreground">
          en-US:
        </span>
        <Changelog locale="en-US" releases={sampleReleases.slice(0, 1)} />
      </div>
    </div>
  ),
}
