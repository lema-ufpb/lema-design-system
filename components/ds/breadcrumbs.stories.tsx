import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Breadcrumbs, type BreadcrumbItemData } from "./breadcrumbs"

const meta = {
  title: "Navigation/Breadcrumbs",
  component: Breadcrumbs,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A data-driven breadcrumb component.",
      },
    },
  },
} satisfies Meta<typeof Breadcrumbs>

export default meta
type Story = StoryObj<typeof meta>

const defaultItems: BreadcrumbItemData[] = [
  { id: "home", label: "Home", href: "/" },
  { id: "components", label: "Components", href: "/components" },
  { id: "ui", label: "UI", href: "/components/ui" },
  { id: "breadcrumbs", label: "Breadcrumbs" },
]

export const Default: Story = {
  args: {
    items: defaultItems,
  },
}

const longItems: BreadcrumbItemData[] = [
  { id: "home", label: "Home", href: "/" },
  { id: "settings", label: "Settings", href: "/settings" },
  { id: "account", label: "Account", href: "/settings/account" },
  { id: "profile", label: "Profile", href: "/settings/account/profile" },
  { id: "security", label: "Security", href: "/settings/account/security" },
  { id: "password", label: "Change Password" },
]

export const WithEllipsis: Story = {
  args: {
    items: longItems,
    itemsBeforeEllipsis: 1,
    itemsAfterEllipsis: 2,
  },
  parameters: {
    docs: {
      description: {
        story: "Automatically collapses items when the list is long.",
      },
    },
  },
}

export const CustomSeparator: Story = {
  args: {
    items: defaultItems,
    separator: <span className="text-muted-foreground">/</span>,
  },
  parameters: {
    docs: {
      description: {
        story: "Use a custom separator.",
      },
    },
  },
}
