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
          "",
          "## Component Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `icon` | `React.ElementType` | — | (required) Icon component rendered inside the media circle |",
          "| `title` | `string` | — | (required) Card title |",
          "| `description` | `string` | — | Optional description text |",
          "| `tone` | ``primary` \\| `success` \\| `warning` \\| `destructive` \\| `violet` \\| `sky` \\| `neutral`` | `primary` | Semantic colour applied to icon and background |",
          "| `mediaStyle` | `soft` \\| `solid` \\| `outline` | `soft` | How the media circle is painted from the tone token |",
          "| `size` | `sm` \\| `md` \\| `lg` | `md` | Card size preset |",
          "| `align` | `center` \\| `start` | `center` | Content alignment |",
          "| `titleUpper` | `boolean` | `false` | Uppercase + tracked title |",
          "| `badge` | `string` | — | Optional badge shown above the title |",
          "| `href` | `string` | — | Renders the whole card as a link |",
          "| `actionLabel` | `string` | — | Optional call-to-action row at the bottom |",
          "| `loading` | `boolean` | `false` | Show skeleton placeholder while data is fetching |",
          "| `className` | `string` | — | Additional CSS classes |",
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
    titleUpper: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    title: { control: "text" },
    description: { control: "text" },
    badge: { control: "text" },
    href: { control: "text" },
    actionLabel: { control: "text" },
    loading: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    icon: { table: { disable: true } },
  },
  args: {
    icon: CompassIcon,
    title: "ODS overview",
    description:
      "Your starting point for the main performance indicators of the 2030 Agenda.",
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
  args: {
    tone: "primary",
    mediaStyle: "soft",
    size: "md",
    align: "center",
    titleUpper: false,
  },
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
        title="Sustainability"
        description="Environmental indicators and impact reduction targets."
      />
      <CardIcon
        icon={TargetIcon}
        tone="warning"
        title="Goals at risk"
        description="Targets requiring attention in the current cycle."
      />
      <CardIcon
        icon={ShieldCheckIcon}
        tone="destructive"
        title="Compliance"
        description="Critical requirements pending verification."
      />
      <CardIcon
        icon={BarChart3Icon}
        tone="primary"
        title="Performance"
        description="Consolidated evolution of key indicators."
      />
      <CardIcon
        icon={GlobeIcon}
        tone="sky"
        title="Territorial coverage"
        description="Data distribution by municipality and region."
      />
      <CardIcon
        icon={HeartHandshakeIcon}
        tone="violet"
        title="Partnerships"
        description="Active institutional liaisons within the program."
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
        description="Tinted token at 10%."
      />
      <CardIcon
        icon={ZapIcon}
        tone="primary"
        mediaStyle="solid"
        title="Solid"
        description="Solid fill with foreground."
      />
      <CardIcon
        icon={ZapIcon}
        tone="primary"
        mediaStyle="outline"
        title="Outline"
        description="Outline in the token colour."
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
        description="Compact scale for dense grids."
      />
      <CardIcon
        icon={CompassIcon}
        tone="sky"
        size="md"
        title="Medium"
        description="Standard size for most use cases."
      />
      <CardIcon
        icon={CompassIcon}
        tone="sky"
        size="lg"
        title="Large"
        description="Highlight in opening sections."
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
    title: "Analytical reports",
    description: "Export and share dashboards with the team.",
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
    title: "Explore indicators",
    description: "Browse the 17 goals and their targets.",
    actionLabel: "Access",
  },
  render: (args) => (
    <div className="max-w-sm">
      <CardIcon {...args} />
    </div>
  ),
}

export const WithBadge: Story = {
  args: {
    badge: "New",
    tone: "success",
    titleUpper: false,
    icon: LeafIcon,
    title: "Impact dashboard",
    description: "Track environmental results in real time.",
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
