import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { LogoCloudGrouped } from "./logo-cloud-grouped"

function Wordmark({ children }: { children: string }) {
  return (
    <span className="text-lg font-semibold tracking-tight text-foreground">
      {children}
    </span>
  )
}

const groups = [
  { value: "media", label: "Media" },
  { value: "tech", label: "Tech" },
  { value: "finance", label: "Finance" },
]

const items = [
  { label: "Forbes", group: "media", content: <Wordmark>Forbes</Wordmark> },
  {
    label: "TechCrunch",
    group: "tech",
    content: <Wordmark>TechCrunch</Wordmark>,
  },
  {
    label: "Bloomberg",
    group: "finance",
    content: <Wordmark>Bloomberg</Wordmark>,
  },
  { label: "Wired", group: "media", content: <Wordmark>Wired</Wordmark> },
  {
    label: "The Verge",
    group: "tech",
    content: <Wordmark>The Verge</Wordmark>,
  },
]

const meta = {
  title: "Layout/LogoCloudGrouped",
  component: LogoCloudGrouped,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A logo wall with an industry/category filter above it — composed from PressWall and PillGroup.",
      },
    },
  },
  args: { groups, items, kicker: "Filter by industry" },
} satisfies Meta<typeof LogoCloudGrouped>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
