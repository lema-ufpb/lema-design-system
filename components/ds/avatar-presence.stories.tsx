import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, within } from "storybook/test"

import { AvatarPresence } from "./avatar-presence"

const meta = {
  title: "Data Display/AvatarPresence",
  component: AvatarPresence,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "User avatar with live presence badge (online, away, busy, offline) and optional pulse animation.",
      },
    },
  },
  args: {
    fallback: "HS",
    alt: "Hilton Silva",
    status: "online",
    pulse: true,
  },
  argTypes: {
    status: {
      control: "radio",
      options: ["online", "away", "busy", "offline"],
      description: "Presence state.",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg", "xl"],
      description: "Scale size.",
    },
    pulse: {
      control: "boolean",
      description: "Live ping effect.",
    },
    position: {
      control: "radio",
      options: ["bottom-right", "top-right"],
      description: "Badge position.",
    },
    locale: {
      control: "radio",
      options: ["pt-BR", "en-US", "es-ES", "fr-FR"],
      description: "Language locale.",
    },
  },
} satisfies Meta<typeof AvatarPresence>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    fallback: "MS",
    alt: "Mariana Souza",
    status: "online",
    pulse: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("MS")).toBeInTheDocument()
  },
}

export const AllStatuses: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <AvatarPresence status="online" pulse fallback="ON" />
        <span className="text-xs text-muted-foreground">Online</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <AvatarPresence status="away" fallback="AW" />
        <span className="text-xs text-muted-foreground">Away</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <AvatarPresence status="busy" fallback="BU" />
        <span className="text-xs text-muted-foreground">Busy</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <AvatarPresence status="offline" fallback="OF" />
        <span className="text-xs text-muted-foreground">Offline</span>
      </div>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-end gap-6">
      <AvatarPresence size="sm" fallback="SM" status="online" />
      <AvatarPresence size="md" fallback="MD" status="online" />
      <AvatarPresence size="lg" fallback="LG" status="online" />
      <AvatarPresence size="xl" fallback="XL" status="online" />
    </div>
  ),
}

export const TopRightPosition: Story = {
  args: {
    position: "top-right",
    status: "busy",
    fallback: "TR",
  },
}
