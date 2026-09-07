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
  PieChartIcon,
  MapIcon,
} from "lucide-react"
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { AppSidebar } from "./app-sidebar"

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
    items: [
      { title: "History", url: "#" },
      { title: "Starred", url: "#" },
      { title: "Settings", url: "#" },
    ],
  },
  {
    title: "Models",
    url: "#",
    icon: BotIcon,
    items: [
      { title: "Genesis", url: "#" },
      { title: "Explorer", url: "#" },
    ],
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

const projects = [
  { name: "Design Engineering", url: "#", icon: FrameIcon },
  { name: "Sales & Marketing", url: "#", icon: PieChartIcon },
  { name: "Travel", url: "#", icon: MapIcon },
]

const user = { name: "Shadcn", email: "m@example.com", avatarUrl: "" }

const meta: Meta<typeof AppSidebar> = {
  title: "Navigation/AppSidebar",
  component: AppSidebar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A AppSidebar component for the LEMA Design System.",
          "Supports loading state, skeleton, i18n support.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `teams` | `TeamSwitcherTeam[]` | — | - |",
          "| `navMain` | `AppSidebarNavItem[]` | — | - |",
          "| `projects` | `AppSidebarProject[]` | — | - |",
          "| `user` | `UserMenuData \| null` | — | - |",
          "| `showSearch` | `boolean` | — | - |",
          "| `searchPlaceholder` | `string` | — | - |",
          '| `collapsible` | `"offcanvas" \| "icon" \| "none"` | — | - |',
          '| `sidebarVariant` | `"sidebar" \| "floating" \| "inset"` | `"sidebar"` | - |',
          "| `locale` | `UILocale` | — | - |",
          "| `loading` | `boolean` | — | - |",
          "| `onNavItemClick` | `(item: AppSidebarNavItem) => void` | — | - |",
          "| `onProjectClick` | `(project: AppSidebarProject) => void` | — | - |",
          "| `onTeamChange` | `(team: TeamSwitcherTeam) => void` | — | - |",
        ].join("\n"),
      },
    },
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <TooltipProvider>
        <SidebarProvider>
          <Story />
          <SidebarInset>
            <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">Build</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4">
              <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="aspect-video rounded-xl bg-muted/50" />
                <div className="aspect-video rounded-xl bg-muted/50" />
                <div className="aspect-video rounded-xl bg-muted/50" />
              </div>
              <div className="min-h-[40vh] flex-1 rounded-xl bg-muted/50" />
            </div>
          </SidebarInset>
        </SidebarProvider>
      </TooltipProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof AppSidebar>

export const Default: Story = {
  args: { teams, navMain, projects, user },
}

export const CollapsibleIcon: Story = {
  args: { teams, navMain, projects, user, collapsible: "icon" },
}

export const Floating: Story = {
  args: { teams, navMain, projects, user, sidebarVariant: "floating" },
}

export const Inset: Story = {
  args: { teams, navMain, projects, user, sidebarVariant: "inset" },
}

export const Loading: Story = {
  args: { loading: true },
}

export const AllVariants: Story = {
  parameters: { a11y: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-6 p-4">
      {(["sidebar", "floating", "inset"] as const).map((sidebarVariant) => (
        <div key={sidebarVariant} className="rounded-xl border">
          <p className="p-2 text-xs font-medium">{sidebarVariant}</p>
          <TooltipProvider>
            <SidebarProvider>
              <div className="flex h-64">
                <AppSidebar
                  teams={teams}
                  navMain={navMain}
                  projects={projects}
                  user={user}
                  sidebarVariant={sidebarVariant}
                />
                <div className="flex flex-1 items-center justify-center bg-muted/20 text-xs text-muted-foreground">
                  content
                </div>
              </div>
            </SidebarProvider>
          </TooltipProvider>
        </div>
      ))}
    </div>
  ),
}

export const A11y: Story = {
  args: { teams, navMain, projects, user },
  parameters: { a11y: { disable: true } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("button")).toBeInTheDocument()
  },
}
