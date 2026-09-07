import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { DashboardLayout } from "./dashboard-layout"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Home, Settings, Users, BarChart3, LayoutDashboard } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

const meta = {
  title: "Layout/DashboardLayout",
  component: DashboardLayout,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A DashboardLayout component for the LEMA Design System.",
          "Supports CVA variants.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `sidebar` | `React.ReactNode` | — | /** The sidebar component to render */ |",
          "| `header` | `React.ReactNode` | — | /** The global header/topbar */ |",
          "| `children` | `React.ReactNode` | — | /** The main content */ |",
          "| `defaultOpen` | `boolean` | — | /** Default state of the sidebar */ |",
        ].join("\n"),
      },
    },
    layout: "fullscreen",
  },
} satisfies Meta<typeof DashboardLayout>

export default meta
type Story = StoryObj<typeof meta>

function MockSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex h-14 items-center px-4 font-semibold">
          Acme Corp
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive>
                  <Home className="size-4" />
                  <span>Overview</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <BarChart3 className="size-4" />
                  <span>Analytics</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Users className="size-4" />
                  <span>Customers</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <LayoutDashboard className="size-4" />
                  <span>Reports</span>
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
                  <Settings className="size-4" />
                  <span>Configuration</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

export const Default: Story = {
  args: {
    sidebar: undefined,
    header: undefined,
    children: undefined,
  },
  render: (args) => (
    <DashboardLayout
      {...args}
      sidebar={<MockSidebar />}
      header={<div className="font-medium">Dashboard Overview</div>}
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Skeleton className="h-32 rounded-xl" />
        <Skeleton className="h-32 rounded-xl" />
        <Skeleton className="h-32 rounded-xl" />
        <Skeleton className="h-32 rounded-xl" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Skeleton className="col-span-4 h-[400px] rounded-xl" />
        <Skeleton className="col-span-3 h-[400px] rounded-xl" />
      </div>
    </DashboardLayout>
  ),
}
