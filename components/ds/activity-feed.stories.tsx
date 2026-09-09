import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, within } from "storybook/test"
import { subHours, subMinutes, subDays } from "date-fns"

import { ActivityFeed, type ActivityFeedItem } from "./activity-feed"

const sampleItems: ActivityFeedItem[] = [
  {
    id: "1",
    actor: {
      name: "Mariana Souza",
      initials: "MS",
    },
    action: "publicou uma nova versão de",
    target: "Modelo DSGE Brasil v2.4",
    timestamp: subMinutes(new Date(), 15),
    status: "success",
    statusLabel: "Concluído",
  },
  {
    id: "2",
    actor: {
      name: "Carlos Eduardo",
      initials: "CE",
    },
    action: "executou a simulação fiscal em",
    target: "Cenário IPCA + 4.5%",
    timestamp: subHours(new Date(), 2),
    status: "default",
    statusLabel: "142 iterações",
    description: (
      <span className="font-mono text-[11px] text-muted-foreground">
        Equilíbrio dinâmico atingido com resíduo &lt; 1e-6.
      </span>
    ),
  },
  {
    id: "3",
    actor: {
      name: "Sistema LEMA",
      initials: "SL",
    },
    action: "detectou inconsistência no upload de",
    target: "microdados_pnad_2025.csv",
    timestamp: subHours(new Date(), 5),
    status: "destructive",
    statusLabel: "Falha na validação",
    description:
      "Coluna 'renda_domiciliar_pc' contém 14 valores negativos inválidos.",
  },
  {
    id: "4",
    actor: {
      name: "Prof. Hilton",
      initials: "PH",
    },
    action: "adicionou 3 novos pesquisadores à equipe",
    timestamp: subDays(new Date(), 1),
  },
]

const meta = {
  title: "Data Display/ActivityFeed",
  component: ActivityFeed,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Audit trail and chronological activity feed with connecting vertical rail, actor avatars, statuses and collapsible details.",
      },
    },
  },
  args: {
    items: sampleItems,
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
} satisfies Meta<typeof ActivityFeed>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: sampleItems,
    locale: "pt-BR",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Mariana Souza")).toBeInTheDocument()
    await expect(canvas.getByText("Carlos Eduardo")).toBeInTheDocument()
  },
}

export const WithDescriptionsAndDiffs: Story = {
  args: {
    items: [
      {
        id: "d1",
        actor: { name: "Mariana Souza", initials: "MS" },
        action: "alterou o parâmetro beta em",
        target: "Função de Utilidade CES",
        timestamp: subMinutes(new Date(), 42),
        status: "warning",
        statusLabel: "Pendente de revisão",
        description: (
          <div className="flex flex-col gap-1 font-mono text-[11px]">
            <span className="text-destructive">- beta = 0.985</span>
            <span className="text-success">+ beta = 0.992</span>
          </div>
        ),
      },
    ],
  },
}

export const Loading: Story = {
  args: {
    items: [],
    loading: true,
  },
}

export const Empty: Story = {
  args: {
    items: [],
    locale: "pt-BR",
  },
}

export const Locales: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <div>
        <span className="block pb-2 text-xs font-semibold text-muted-foreground">
          pt-BR:
        </span>
        <ActivityFeed locale="pt-BR" items={sampleItems.slice(0, 2)} />
      </div>
      <div>
        <span className="block pb-2 text-xs font-semibold text-muted-foreground">
          en-US:
        </span>
        <ActivityFeed locale="en-US" items={sampleItems.slice(0, 2)} />
      </div>
    </div>
  ),
}
