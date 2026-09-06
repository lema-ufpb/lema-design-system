import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, within } from "storybook/test"
import {
  GalleryVerticalEndIcon,
  AudioWaveformIcon,
  CommandIcon,
  SquareTerminalIcon,
  BotIcon,
  BookOpenIcon,
  Settings2Icon,
  FrameIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Dashboard } from "./dashboard"

const teams = [
  { name: "Acme Inc", logo: GalleryVerticalEndIcon, plan: "Enterprise" },
  { name: "Acme Corp.", logo: AudioWaveformIcon, plan: "Startup" },
  { name: "Evil Corp.", logo: CommandIcon, plan: "Free" },
]

const navMain = [
  {
    title: "Playground",
    url: "#",
    icon: SquareTerminalIcon,
    isActive: true,
    items: [{ title: "History", url: "#" }],
  },
  {
    title: "Models",
    url: "#",
    icon: BotIcon,
    items: [{ title: "Genesis", url: "#" }],
  },
  {
    title: "Documentation",
    url: "#",
    icon: BookOpenIcon,
    items: [{ title: "Introduction", url: "#" }],
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings2Icon,
    items: [{ title: "General", url: "#" }],
  },
]

const user = { name: "shadcn", email: "m@example.com", avatarUrl: "" }

const projects = [{ name: "Design Eng.", url: "#", icon: FrameIcon }]

const stats = [
  {
    title: "Total Revenue",
    value: "$1,250.00",
    badge: { value: "+12.5%", trend: "up" as const },
    footerTitle: "Trending up",
    footerDescription: "Last 6 months",
  },
  {
    title: "New Customers",
    value: "1,234",
    badge: { value: "-20%", trend: "down" as const },
    footerTitle: "Down 20%",
    footerDescription: "Attention needed",
  },
  {
    title: "Active Accounts",
    value: "45,678",
    badge: { value: "+12.5%", trend: "up" as const },
    footerTitle: "Strong retention",
    footerDescription: "Above target",
  },
  {
    title: "Growth Rate",
    value: "4.5%",
    badge: { value: "+4.5%", trend: "up" as const },
    footerTitle: "Steady increase",
    footerDescription: "On track",
  },
]

const meta: Meta<typeof Dashboard> = {
  title: "Layout/Dashboard",
  component: Dashboard,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj<typeof Dashboard>

export const Default: Story = {
  args: {
    sidebar: { teams, navMain, projects, user },
    header: {
      title: "Documents",
      actions: (
        <Button size="sm" variant="outline">
          GitHub
        </Button>
      ),
    },
    stats,
    chart: (
      <div className="h-64 rounded-xl border bg-muted/50 p-6 text-sm text-muted-foreground">
        Chart placeholder
      </div>
    ),
    table: (
      <div className="h-64 rounded-xl border bg-muted/50 p-6 text-sm text-muted-foreground">
        DataTable placeholder
      </div>
    ),
  },
}

export const Inset: Story = {
  args: {
    variant: "inset",
    sidebar: { teams, navMain, user },
    header: { title: "Dashboard" },
    stats,
  },
}

export const Loading: Story = {
  args: { loading: true },
}

export const WithoutSidebar: Story = {
  args: {
    header: { title: "Documents" },
    stats,
  },
}

export const A11y: Story = {
  args: {
    sidebar: { teams, navMain, user },
    header: { title: "Documents" },
    stats,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Documents")).toBeInTheDocument()
  },
}
