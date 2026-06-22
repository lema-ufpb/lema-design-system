import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BadgeCheck, Bell, LogOut, Settings } from "lucide-react"
import { NavUser } from "./nav-user"

const meta = {
  title: "Navigation/NavUser",
  component: NavUser,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A customized user profile navigation block containing an avatar button trigger and an associated action dropdown.",
          "",
          "Combines the `Avatar` and `DropdownMenu` components, displaying details like name, email, fallback initials, sub-group options, keyboard shortcuts, and styled action items.",
          "",
          "---",
          "",
          "## Data API",
          "",
          "### `user`",
          "",
          "The user profile data displayed in the trigger button and dropdown header.",
          "",
          "```tsx",
          "const user = {",
          '  name: "Eucharia Odili",',
          '  email: "odilieucharia1@gmail.com",',
          '  avatarUrl: "https://github.com/shadcn.png",',
          "}",
          "```",
          "",
          "#### `UserMenuData`",
          "",
          "| Field | Type | Required | Description |",
          "| --- | --- | --- | --- |",
          "| `name` | `string` | ✓ | Display name — shown next to the avatar and in the dropdown header |",
          "| `email` | `string` | ✓ | Email — shown below the name; fallback initials derived from first character |",
          "| `avatarUrl` | `string` | — | Avatar image URL; falls back to initials when omitted |",
          "",
          "> **Type:** `UserMenuData`  •  `name` and `email` are required",
          "",
          "### `groups`",
          "",
          "A 2D array of menu item groups. Each inner array becomes a `DropdownMenuGroup`; groups are separated by dividers.",
          "",
          "```tsx",
          "const groups = [",
          "  [",
          "    {",
          '      id: "account",',
          '      label: "Account",',
          '      icon: <BadgeCheck className="size-4" />,',
          "    },",
          "  ],",
          "  [",
          "    {",
          '      id: "settings",',
          '      label: "Settings",',
          '      shortcut: "⌘S",',
          '      icon: <Settings className="size-4" />,',
          "    },",
          "    {",
          '      id: "logout",',
          '      label: "Log out",',
          '      variant: "destructive",',
          '      icon: <LogOut className="size-4" />,',
          "      onClick: () => signOut(),",
          "    },",
          "  ],",
          "]",
          "```",
          "",
          "#### `UserMenuItem`",
          "",
          "| Field | Type | Required | Description |",
          "| --- | --- | --- | --- |",
          "| `id` | `string` | ✓ | Unique item identifier |",
          "| `label` | `string` | ✓ | Menu item text |",
          '| `icon` | `ReactNode` | — | Pre-rendered icon node (e.g. `<Settings className="size-4" />`) |',
          "| `shortcut` | `string` | — | Keyboard shortcut hint displayed on the right |",
          "| `onClick` | `() => void` | — | Callback when the item is clicked |",
          '| `variant` | `"default" \\| "destructive"` | — | Visual style — `"destructive"` renders in red for logout/delete |',
          "",
          "> **Type:** `UserMenuItem[][]`  •  Each inner array = one visual group, separated by a divider",
          "",
          "---",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Trigger name text** | `--foreground` | Main color for the username text |",
          "| **Trigger email text** | `--muted-foreground` | Idle color for the email text and dropdown toggle icon |",
          "| **Dropdown background** | `--popover` | Backdrop color of the popover menu |",
          "| **Dropdown items** | `--popover-foreground` | Main color for action items inside the dropdown |",
          "| **Highlight background** | `--accent` | Highlight hover background for menu items |",
          "| **Highlight text** | `--accent-foreground` | Highlight hover text and icon colors |",
          "| **Destructive option** | `--destructive` | Text color highlighting delete/logout actions |",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof NavUser>

export default meta
type Story = StoryObj<typeof meta>

const mockUser = {
  name: "Eucharia Odili",
  email: "odilieucharia1@gmail.com",
  avatarUrl: "https://github.com/shadcn.png",
}

const defaultGroups = [
  [
    {
      id: "account",
      label: "Account",
      icon: <BadgeCheck className="size-4" />,
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: <Bell className="size-4" />,
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings className="size-4" />,
    },
  ],
  [
    {
      id: "logout",
      label: "Log out",
      icon: <LogOut className="size-4" />,
      variant: "destructive" as const,
    },
  ],
]

function LoadingDemo(args: React.ComponentProps<typeof NavUser>) {
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    if (!loading) return
    const t = setTimeout(() => setLoading(false), 2500)
    return () => clearTimeout(t)
  }, [loading])

  return (
    <div className="flex h-32 w-full flex-col items-end justify-center gap-3 rounded-lg border bg-card px-12">
      <NavUser {...args} loading={loading} />
      <div className="flex items-center gap-3">
        <button
          onClick={() => setLoading(true)}
          className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
        >
          ↺ Simulate reload
        </button>
        <span className="text-xs text-muted-foreground">
          {loading ? "Fetching user…" : "User loaded"}
        </span>
      </div>
    </div>
  )
}

export const Loading: Story = {
  name: "Loading State",
  parameters: {
    docs: {
      description: {
        story:
          "Pass `loading={true}` (or omit `user`) to render the skeleton in place of the trigger button. The skeleton mirrors the exact dimensions of the loaded state — avatar slot, name line, and email line — so the layout does not shift when data arrives.\n\nClick **Simulate reload** to replay the transition.",
      },
    },
  },
  args: {
    user: mockUser,
    groups: defaultGroups,
  },
  render: (args) => <LoadingDemo {...args} />,
}

export const Default: Story = {
  args: {
    user: mockUser,
    groups: defaultGroups,
  },
  render: (args) => (
    <div className="flex h-32 w-full items-center justify-end rounded-lg border bg-card px-12">
      <NavUser {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Default NavUser with full avatar, name, email, and dropdown action groups.",
      },
    },
  },
}

export const WithoutAvatar: Story = {
  args: {
    user: { ...mockUser, avatarUrl: undefined },
    groups: defaultGroups,
  },
  render: (args) => (
    <div className="flex h-32 w-full items-center justify-end rounded-lg border bg-card px-12">
      <NavUser {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "NavUser without an avatar URL — uses initials fallback instead.",
      },
    },
  },
}

export const DashboardMock: Story = {
  args: {
    user: mockUser,
    groups: defaultGroups,
  },
  render: (args) => (
    <header className="flex h-16 w-full items-center justify-between border-b bg-background px-6">
      <div className="flex items-center gap-6">
        <div className="size-8 rounded bg-primary" />
        <nav className="flex gap-4 text-sm font-medium">
          <a href="#" className="text-foreground">
            Dashboard
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground">
            Projects
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground">
            Team
          </a>
        </nav>
      </div>
      <NavUser {...args} />
    </header>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "NavUser rendered inside a mock dashboard header with navigation links.",
      },
    },
  },
}
