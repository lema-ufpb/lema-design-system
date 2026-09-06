import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as React from "react"
import { BarChart3, ShieldCheck, Sparkles, Zap } from "lucide-react"
import {
  StickyFeatureList,
  StickyFeatureListItem,
  StickyFeatureListNav,
  StickyFeatureListPanel,
  StickyFeatureListPanels,
} from "./sticky-feature-list"
import type { UILocale } from "@/lib/ui-i18n"
import { Skeleton } from "@/components/ui/skeleton"

const features = [
  {
    value: "insights",
    title: "Real-time insights",
    description: "See how your team ships, from commit to release, live.",
    icon: BarChart3,
    tone: "bg-highlight-sky/10 text-highlight-sky",
  },
  {
    value: "automation",
    title: "Built-in automation",
    description: "Route work automatically based on rules your team defines.",
    icon: Zap,
    tone: "bg-highlight-violet/10 text-highlight-violet",
  },
  {
    value: "security",
    title: "Enterprise-grade security",
    description: "SSO, audit logs, and granular permissions out of the box.",
    icon: ShieldCheck,
    tone: "bg-success/10 text-success",
  },
  {
    value: "ai",
    title: "AI-assisted workflows",
    description: "Let the assistant draft, summarize, and triage for you.",
    icon: Sparkles,
    tone: "bg-warning/10 text-warning",
  },
]

function FeatureMedia({
  icon: Icon,
  tone,
}: {
  icon: React.ElementType
  tone: string
}) {
  return (
    <div
      className={`flex aspect-4/3 w-full items-center justify-center rounded-2xl ${tone}`}
    >
      <Icon className="size-16" aria-hidden="true" />
    </div>
  )
}

const meta = {
  title: "Blocks/StickyFeatureList",
  component: StickyFeatureList,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "An interactive feature narrative: a vertical list of items on one side selects the media shown in a sticky panel on the other, following the WAI-ARIA vertical tabs pattern (roving tabindex, Arrow Up/Down navigation).",
      },
    },
  },
} satisfies Meta<typeof StickyFeatureList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <StickyFeatureList defaultValue="insights" label="Product capabilities">
      <StickyFeatureListNav>
        {features.map((feature) => (
          <StickyFeatureListItem
            key={feature.value}
            value={feature.value}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </StickyFeatureListNav>
      <StickyFeatureListPanels>
        {features.map((feature) => (
          <StickyFeatureListPanel key={feature.value} value={feature.value}>
            <FeatureMedia icon={feature.icon} tone={feature.tone} />
          </StickyFeatureListPanel>
        ))}
      </StickyFeatureListPanels>
    </StickyFeatureList>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-16">
      {(["sm", "md", "lg"] as const).map((size) => (
        <StickyFeatureList key={size} defaultValue="insights" size={size}>
          <StickyFeatureListNav>
            {features.slice(0, 2).map((feature) => (
              <StickyFeatureListItem
                key={feature.value}
                value={feature.value}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </StickyFeatureListNav>
          <StickyFeatureListPanels>
            {features.slice(0, 2).map((feature) => (
              <StickyFeatureListPanel key={feature.value} value={feature.value}>
                <FeatureMedia icon={feature.icon} tone={feature.tone} />
              </StickyFeatureListPanel>
            ))}
          </StickyFeatureListPanels>
        </StickyFeatureList>
      ))}
    </div>
  ),
}

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState("automation")
    return (
      <StickyFeatureList value={value} onValueChange={setValue}>
        <StickyFeatureListNav>
          {features.map((feature) => (
            <StickyFeatureListItem
              key={feature.value}
              value={feature.value}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </StickyFeatureListNav>
        <StickyFeatureListPanels>
          {features.map((feature) => (
            <StickyFeatureListPanel key={feature.value} value={feature.value}>
              <FeatureMedia icon={feature.icon} tone={feature.tone} />
            </StickyFeatureListPanel>
          ))}
        </StickyFeatureListPanels>
      </StickyFeatureList>
    )
  },
}

export const Loading: Story = {
  render: () => (
    <StickyFeatureList defaultValue="insights">
      <StickyFeatureListNav>
        {features.slice(0, 3).map((feature) => (
          <StickyFeatureListItem
            key={feature.value}
            value={feature.value}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </StickyFeatureListNav>
      <StickyFeatureListPanels>
        {features.slice(0, 3).map((feature) => (
          <StickyFeatureListPanel key={feature.value} value={feature.value}>
            <Skeleton className="aspect-4/3 w-full rounded-2xl" />
          </StickyFeatureListPanel>
        ))}
      </StickyFeatureListPanels>
    </StickyFeatureList>
  ),
}

export const Locales: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(["en-US", "pt-BR", "es-ES", "fr-FR"] as UILocale[]).map((locale) => (
        <StickyFeatureList key={locale} locale={locale} defaultValue="insights">
          <StickyFeatureListNav>
            {features.slice(0, 2).map((feature) => (
              <StickyFeatureListItem
                key={feature.value}
                value={feature.value}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </StickyFeatureListNav>
          <StickyFeatureListPanels>
            {features.slice(0, 2).map((feature) => (
              <StickyFeatureListPanel key={feature.value} value={feature.value}>
                <FeatureMedia icon={feature.icon} tone={feature.tone} />
              </StickyFeatureListPanel>
            ))}
          </StickyFeatureListPanels>
        </StickyFeatureList>
      ))}
    </div>
  ),
}
