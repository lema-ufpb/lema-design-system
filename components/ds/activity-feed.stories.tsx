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
    action: "published a new version of",
    target: "Modelo DSGE Brasil v2.4",
    timestamp: subMinutes(new Date(), 15),
    status: "success",
    statusLabel: "Completed",
  },
  {
    id: "2",
    actor: {
      name: "Carlos Eduardo",
      initials: "CE",
    },
    action: "ran the fiscal simulation on",
    target: "Scenario IPCA + 4.5%",
    timestamp: subHours(new Date(), 2),
    status: "default",
    statusLabel: "142 iterations",
    description: (
      <span className="font-mono text-xs text-muted-foreground">
        Dynamic equilibrium reached with residual &lt; 1e-6.
      </span>
    ),
  },
  {
    id: "3",
    actor: {
      name: "Sistema LEMA",
      initials: "SL",
    },
    action: "detected inconsistency in upload of",
    target: "microdados_pnad_2025.csv",
    timestamp: subHours(new Date(), 5),
    status: "destructive",
    statusLabel: "Validation failed",
    description:
      "Column 'renda_domiciliar_pc' contains 14 invalid negative values.",
  },
  {
    id: "4",
    actor: {
      name: "Prof. Hilton",
      initials: "PH",
    },
    action: "added 3 new researchers to the team",
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
    locale: "en-US",
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
        action: "changed the beta parameter in",
        target: "CES Utility Function",
        timestamp: subMinutes(new Date(), 42),
        status: "warning",
        statusLabel: "Pending review",
        description: (
          <div className="flex flex-col gap-1 font-mono text-xs">
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
    locale: "en-US",
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
