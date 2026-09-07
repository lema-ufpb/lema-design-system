import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Button } from "@/components/ui/button"
import { HeroAnnouncement } from "./hero-announcement"

function Wordmark({ children }: { children: string }) {
  return (
    <span className="text-lg font-semibold tracking-tight text-foreground">
      {children}
    </span>
  )
}

const logos = ["Acme", "Globex", "Initech", "Umbrella"].map((name) => (
  <Wordmark key={name}>{name}</Wordmark>
))

const meta = {
  title: "Hero/HeroAnnouncement",
  component: HeroAnnouncement,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: [
          "Centered hero with an announcement badge and a scrolling logo cloud — composed from HeroSection, AnnouncementBadge and Marquee.",
          "Composable and theme-aware via semantic tokens.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `announcement` | `HeroAnnouncementItem` | — | - |",
          "| `title` | `React.ReactNode` | — | - |",
          "| `description` | `string` | — | - |",
          "| `actions` | `React.ReactNode` | — | - |",
          "| `logos` | `React.ReactNode[]` | — | /** Logos rendered inside a Marquee below the actions. */ |",
          "| `logosLabel` | `string` | — | - |",
        ].join("\n"),
      },
    },
  },
  args: {
    announcement: { label: "Introducing v2.0", tag: "New", href: "#" },
    title: "Ship great interfaces faster.",
    description: "A design system built on shadcn/ui, ready for production.",
    actions: <Button>Get started</Button>,
    logos,
    logosLabel: "Trusted by teams at",
  },
} satisfies Meta<typeof HeroAnnouncement>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const WithoutLogos: Story = {
  args: { logos: [] },
}
