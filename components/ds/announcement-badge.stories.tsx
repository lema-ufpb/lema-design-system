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
    children: "Introducing LEMA-DS v2.0",
    tag: "New",
    ping: true,
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4">
      <AnnouncementBadge variant="default" tag="New" ping>
        Default: System updates released
      </AnnouncementBadge>
      <AnnouncementBadge variant="outline" tag="Changelog">
        Outline: See what changed in the latest version
      </AnnouncementBadge>
      <AnnouncementBadge variant="glow" tag="Highlight" ping>
        Glow: Integrated Artificial Intelligence
      </AnnouncementBadge>
      <AnnouncementBadge variant="gradient" tag="Beta">
        Gradient: Try the new experience
      </AnnouncementBadge>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4">
      <AnnouncementBadge size="sm" tag="v2.1">
        Small Size (sm)
      </AnnouncementBadge>
      <AnnouncementBadge size="md" tag="v2.1" ping>
        Default Size (md)
      </AnnouncementBadge>
      <AnnouncementBadge size="lg" tag="v2.1" ping>
        Large Size (lg)
      </AnnouncementBadge>
    </div>
  ),
}

export const WithCustomIcon: Story = {
  args: {
    icon: <SparklesIcon className="size-3.5 text-primary" />,
    children: "Boost your productivity with automations",
    variant: "glow",
  },
}

export const AsLink: Story = {
  args: {
    href: "https://github.com/lema-ufpb/design-system",
    target: "_blank",
    rel: "noopener noreferrer",
    children: "Check out the official repository on GitHub",
    tag: "Open Source",
  },
}
