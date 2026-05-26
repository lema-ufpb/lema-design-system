import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "./sidebar"
import { Button } from "./button"
import { TooltipProvider } from "./tooltip"
import {
  CalendarIcon,
  HomeIcon,
  InboxIcon,
  SearchIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react"

const meta = {
  title: "Shadcn UI/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: [
          "A persistent or collapsible sidebar navigation shell using Radix Dialog for mobile and a custom desktop implementation.",
          "",
          '`Sidebar` accepts `side` (`"left"` | `"right"`), `variant` (`"sidebar"` | `"floating"` | `"inset"`), and `collapsible` (`"offcanvas"` | `"icon"` | `"none"`). Must be wrapped in `SidebarProvider`. Provides `useSidebar()` hook for state control and `SidebarTrigger` to toggle. Includes a comprehensive sub-component API for menus, groups, badges, skeletons, and sub-navigation.',
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Variant / Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Sidebar background** | `--sidebar` | Primary background of the sidebar panel |",
          "| **Sidebar text** | `--sidebar-foreground` | Default text color inside sidebar |",
          "| **Sidebar accent** | `--sidebar-accent` | Hover/active background for items |",
          "| **Accent text** | `--sidebar-accent-foreground` | Text color on accent backgrounds |",
          "| **Sidebar border** | `--sidebar-border` | Borders, separators, and rail dividers |",
          "| **Sidebar ring** | `--sidebar-ring` | Focus ring for interactive items |",
          "| **Inset variant** | `--background` | Background of the main content area for inset variant |",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

function SidebarContentMain() {
  const { toggleSidebar } = useSidebar()
  return (
    <main className="flex flex-1 flex-col p-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <Button onClick={toggleSidebar}>Toggle Sidebar</Button>
      </div>
      <div className="mt-6 flex flex-1 items-center justify-center rounded-2xl border border-dashed text-sm text-muted-foreground">
        Main Content Area
      </div>
    </main>
  )
}

function SidebarContentDemo() {
  return (
    <div className="flex h-screen">
      <SidebarProvider defaultOpen>
        <Sidebar>
          <SidebarHeader>
            <SidebarInput placeholder="Search..." />
          </SidebarHeader>
          <SidebarSeparator />
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>General</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive>
                      <HomeIcon />
                      <span>Dashboard</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <InboxIcon />
                      <span>Inbox</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <CalendarIcon />
                      <span>Calendar</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Settings</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <UserIcon />
                      <span>Profile</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <SettingsIcon />
                      <span>Preferences</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarSeparator />
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <UserIcon />
                    <span>Account</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
        <SidebarContentMain />
      </SidebarProvider>
    </div>
  )
}

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Full-featured sidebar with search input, grouped navigation menus, footer links, and a collapsible rail.",
      },
    },
  },
  render: () => <SidebarContentDemo />,
}

function SidebarInsetDemo() {
  return (
    <TooltipProvider>
      <div className="flex h-screen">
        <SidebarProvider defaultOpen>
          <Sidebar variant="inset" collapsible="icon">
            <SidebarHeader>
              <SidebarInput placeholder="Search..." />
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton tooltip="Dashboard" isActive>
                        <HomeIcon />
                        <span>Dashboard</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton tooltip="Inbox">
                        <InboxIcon />
                        <span>Inbox</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton tooltip="Search">
                        <SearchIcon />
                        <span>Search</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            <SidebarRail />
          </Sidebar>
          <main className="flex flex-1 flex-col bg-background p-6">
            <SidebarTrigger />
            <div className="mt-6 flex flex-1 items-center justify-center rounded-2xl border border-dashed text-sm text-muted-foreground">
              Inset Variant Content
            </div>
          </main>
        </SidebarProvider>
      </div>
    </TooltipProvider>
  )
}

export const Inset: Story = {
  render: () => <SidebarInsetDemo />,
}
