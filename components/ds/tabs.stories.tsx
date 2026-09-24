import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  Activity,
  Bell,
  CreditCard,
  Eye,
  Key,
  Lock,
  Mail,
  MessageSquare,
  Shield,
  ShoppingCart,
  User,
  Users,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ds/button"
import { Tabs, type TabItem } from "./tabs"

const meta = {
  title: "Navigation/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A declarative tab component that wraps the Radix Tabs primitive.",
          "",
          "Instead of nesting JSX (`TabsList > TabsTrigger > TabsContent`), pass an `items` array with `value`, `label`, optional `icon`, `count`, `disabled`, and `content`. The component handles controlled/uncontrolled state, four visual variants, three sizes, orientation, and responsive accordion fallback on mobile.",
          "",
          "---",
          "",
          "## Data API",
          "",
          "### Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `items` | `TabItem[]` | — | Array of tab definitions |",
          "| `defaultValue` | `string` | first item | Initial active tab (uncontrolled) |",
          "| `value` | `string` | — | Controlled active tab |",
          "| `onValueChange` | `(value: string) => void` | — | Callback when active tab changes |",
          '| `variant` | `"default" \\| "line" \\| "pill" \\| "segmented"` | `"default"` | Visual variant |',
          '| `size` | `"sm" \\| "md" \\| "lg"` | `"md"` | Trigger size |',
          '| `orientation` | `"horizontal" \\| "vertical"` | `"horizontal"` | Layout direction |',
          "| `responsive` | `boolean` | `false` | Collapses to Accordion on mobile |",
          "| `forceAccordion` | `boolean` | `false` | Always render as Accordion |",
          "| `loading` | `boolean` | `false` | Shows skeleton placeholders |",
          "| `skeletonCount` | `number` | items.length | Number of skeleton items |",
          '| `locale` | `"en-US" \\| "pt-BR" \\| "es-ES" \\| "fr-FR"` | `"en-US"` | Locale for aria-labels |',
          "",
          "### `TabItem`",
          "",
          "| Prop | Type | Description |",
          "| --- | --- | --- |",
          "| `value` | `string` | Unique identifier |",
          "| `label` | `string` | Display text |",
          "| `icon` | `React.ElementType` | Lucide icon before the label |",
          "| `count` | `number` | Numeric badge (e.g. notification count) |",
          "| `disabled` | `boolean` | Disables the tab |",
          "| `content` | `ReactNode` | Rendered inside the active panel |",
          "",
          "---",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["default", "line", "pill", "segmented"],
      table: { defaultValue: { summary: "default" } },
    },
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
      table: { defaultValue: { summary: "md" } },
    },
    orientation: {
      control: "inline-radio",
      options: ["horizontal", "vertical"],
      table: { defaultValue: { summary: "horizontal" } },
    },
    loading: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    responsive: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    forceAccordion: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    defaultValue: {
      control: "text",
      table: { defaultValue: { summary: "" } },
    },
    items: { table: { disable: true } },
    value: { table: { disable: true } },
    onValueChange: { table: { disable: true } },
    skeletonCount: { table: { disable: true } },
    locale: { table: { disable: true } },
  },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

// ── Helper: reusable items ────────────────────────────────────────────────

const defaultItems: TabItem[] = [
  {
    value: "account",
    label: "Account",
    content: (
      <div className="flex flex-col gap-4 pt-4">
        <p className="text-sm text-muted-foreground">
          Manage your account settings, email preferences, and security options.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-muted-foreground">
              Name
            </label>
            <div className="flex h-9 items-center rounded-lg border bg-background px-3 text-sm">
              John Doe
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-muted-foreground">
              Email
            </label>
            <div className="flex h-9 items-center rounded-lg border bg-background px-3 text-sm">
              john@example.com
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    value: "security",
    label: "Security",
    content: (
      <div className="flex flex-col gap-4 pt-4">
        <p className="text-sm text-muted-foreground">
          Configure two-factor authentication, active sessions, and password
          policies.
        </p>
        <div className="flex gap-3">
          <Button
            size="sm"
            variant="outline"
            startIcon={<Key className="size-3.5" />}
          >
            Change password
          </Button>
          <Button
            size="sm"
            variant="outline"
            startIcon={<Shield className="size-3.5" />}
          >
            2FA setup
          </Button>
        </div>
      </div>
    ),
  },
  {
    value: "notifications",
    label: "Notifications",
    content: (
      <div className="flex flex-col gap-4 pt-4">
        <p className="text-sm text-muted-foreground">
          Choose which notifications you receive and how they are delivered.
        </p>
        <div className="flex flex-col gap-3">
          {["Email alerts", "Push notifications", "Weekly digest"].map(
            (item) => (
              <label
                key={item}
                className="flex items-center gap-3 rounded-lg border px-3 py-2 text-sm"
              >
                <input
                  type="checkbox"
                  defaultChecked
                  className="size-4 accent-foreground"
                />
                {item}
              </label>
            )
          )}
        </div>
      </div>
    ),
  },
]

const iconItems: TabItem[] = [
  {
    value: "profile",
    label: "Profile",
    icon: User,
    content: (
      <ContentPanel>
        Profile settings content with personal information.
      </ContentPanel>
    ),
  },
  {
    value: "security",
    label: "Security",
    icon: Lock,
    content: (
      <ContentPanel>Security settings and authentication methods.</ContentPanel>
    ),
  },
  {
    value: "billing",
    label: "Billing",
    icon: CreditCard,
    content: (
      <ContentPanel>
        Billing history, invoices, and payment methods.
      </ContentPanel>
    ),
  },
]

function ContentPanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="pt-4">
      <p className="text-sm text-muted-foreground">{children}</p>
    </div>
  )
}

// ── Stories ────────────────────────────────────────────────────────────────

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Basic tabs with the `default` variant. Three tabs with account, security, and notification panels.",
      },
    },
  },
  args: {
    items: defaultItems,
    defaultValue: "account",
    variant: "default",
    size: "md",
    orientation: "horizontal",
    responsive: false,
    forceAccordion: false,
    loading: false,
    locale: "en-US",
  },
}

export const Variants: Story = {
  args: { items: defaultItems, defaultValue: "account" },
  parameters: {
    docs: {
      description: {
        story: "Four visual variants rendered side by side.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-10">
      <div>
        <p className="mb-3 text-xs font-medium tracking-wide text-muted-foreground uppercase">
          default
        </p>
        <Tabs items={defaultItems} defaultValue="account" variant="default" />
      </div>
      <div>
        <p className="mb-3 text-xs font-medium tracking-wide text-muted-foreground uppercase">
          line
        </p>
        <Tabs
          items={defaultItems.map((it) => ({ ...it, icon: undefined }))}
          defaultValue="account"
          variant="line"
        />
      </div>
      <div>
        <p className="mb-3 text-xs font-medium tracking-wide text-muted-foreground uppercase">
          pill
        </p>
        <Tabs items={defaultItems} defaultValue="account" variant="pill" />
      </div>
      <div>
        <p className="mb-3 text-xs font-medium tracking-wide text-muted-foreground uppercase">
          segmented
        </p>
        <Tabs
          items={defaultItems.map((it) => ({ ...it, icon: undefined }))}
          defaultValue="account"
          variant="segmented"
        />
      </div>
    </div>
  ),
}

export const Sizes: Story = {
  args: { items: defaultItems, defaultValue: "account" },
  parameters: {
    docs: {
      description: {
        story: "Three size presets in the `default` variant.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-3 text-xs font-medium tracking-wide text-muted-foreground uppercase">
          sm
        </p>
        <Tabs items={defaultItems} defaultValue="account" size="sm" />
      </div>
      <div>
        <p className="mb-3 text-xs font-medium tracking-wide text-muted-foreground uppercase">
          md
        </p>
        <Tabs items={defaultItems} defaultValue="account" size="md" />
      </div>
      <div>
        <p className="mb-3 text-xs font-medium tracking-wide text-muted-foreground uppercase">
          lg
        </p>
        <Tabs items={defaultItems} defaultValue="account" size="lg" />
      </div>
    </div>
  ),
}

export const WithIcons: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Each tab displays a Lucide icon before its label via the `icon` field.",
      },
    },
  },
  args: {
    items: [
      {
        value: "profile",
        label: "Profile",
        icon: User,
        content: (
          <ContentPanel>
            Profile settings with avatar, name, and contact info.
          </ContentPanel>
        ),
      },
      {
        value: "security",
        label: "Security",
        icon: Lock,
        content: (
          <ContentPanel>Password, 2FA, and session management.</ContentPanel>
        ),
      },
      {
        value: "billing",
        label: "Billing",
        icon: CreditCard,
        content: (
          <ContentPanel>
            Invoices, payments, and subscription plan.
          </ContentPanel>
        ),
      },
    ],
    defaultValue: "profile",
  },
}

export const WithBadges: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          "The `count` field adds a numeric badge next to the tab label.",
          "",
          "Useful for notification counts, pending items, or cart quantities.",
        ].join("\n"),
      },
    },
  },
  args: {
    items: [
      {
        value: "inbox",
        label: "Inbox",
        icon: Mail,
        count: 12,
        content: <ContentPanel>12 unread messages in your inbox.</ContentPanel>,
      },
      {
        value: "activity",
        label: "Activity",
        icon: Activity,
        count: 3,
        content: (
          <ContentPanel>3 recent activities from your team.</ContentPanel>
        ),
      },
      {
        value: "messages",
        label: "Messages",
        icon: MessageSquare,
        count: 7,
        content: (
          <ContentPanel>7 unread messages across all channels.</ContentPanel>
        ),
      },
      {
        value: "cart",
        label: "Cart",
        icon: ShoppingCart,
        count: 2,
        content: <ContentPanel>2 items in your shopping cart.</ContentPanel>,
      },
    ],
    defaultValue: "inbox",
    variant: "default",
  },
}

export const Vertical: Story = {
  args: { items: iconItems, defaultValue: "profile" },
  parameters: {
    docs: {
      description: {
        story:
          "Vertical orientation places the tab list on the left and content on the right.",
      },
    },
  },
  render: () => (
    <Tabs
      items={iconItems}
      defaultValue="profile"
      orientation="vertical"
      variant="default"
    />
  ),
}

export const Loading: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Pass `loading` to show skeleton placeholders while tab data is being fetched.",
      },
    },
  },
  args: {
    items: defaultItems,
    loading: true,
    skeletonCount: 5,
    defaultValue: "account",
  },
}

export const ResponsiveAccordion: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          "When `responsive` is enabled and the viewport is below 768px, the tabs transform into a collapsible accordion.",
          "",
          "This story uses `forceAccordion` to simulate the mobile experience at any viewport width.",
          "Each item becomes an accordion section with a chevron indicator, expanding to reveal its content.",
        ].join("\n"),
      },
    },
  },
  args: {
    items: [
      {
        value: "account",
        label: "Account",
        icon: User,
        content: (
          <ContentPanel>
            Account settings panel rendered inside an accordion section.
          </ContentPanel>
        ),
      },
      {
        value: "security",
        label: "Security",
        icon: Shield,
        count: 2,
        content: (
          <ContentPanel>
            Security settings with pending 2FA setup and active sessions.
          </ContentPanel>
        ),
      },
      {
        value: "notifications",
        label: "Notifications",
        icon: Bell,
        count: 12,
        content: (
          <ContentPanel>
            Notification preferences with email, push, and SMS options.
          </ContentPanel>
        ),
      },
    ],
    defaultValue: "account",
    forceAccordion: true,
    variant: "default",
  },
}

export const Controlled: Story = {
  args: { items: defaultItems, defaultValue: "account" },
  parameters: {
    docs: {
      description: {
        story: [
          "External control via `value` and `onValueChange`.",
          "Click the buttons below to programmatically switch tabs.",
        ].join("\n"),
      },
    },
  },
  render: (args) => {
    const [tab, setTab] = React.useState(
      args.defaultValue ?? args.items[0]?.value ?? ""
    )

    const controlItems: TabItem[] = args.items.map((item) => ({
      value: item.value,
      label: item.label,
      content: item.content,
      disabled: item.disabled,
      icon: item.icon,
      count: item.count,
    }))

    const noIconItems = controlItems.map((item) => ({
      ...item,
      icon: undefined,
    }))

    return (
      <div className="flex flex-col gap-6">
        <div className="flex gap-2">
          {controlItems.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.value}
                size="sm"
                variant={tab === item.value ? "default" : "outline"}
                startIcon={Icon ? <Icon className="size-3.5" /> : undefined}
                onClick={() => setTab(item.value)}
              >
                {item.label}
              </Button>
            )
          })}
        </div>
        <Tabs items={noIconItems} value={tab} onValueChange={setTab} />
        <p className="text-xs text-muted-foreground">
          Active tab:{" "}
          <code className="rounded bg-muted px-1.5 py-0.5">{tab}</code>
        </p>
      </div>
    )
  },
}

export const KitchenSink: Story = {
  args: { items: defaultItems, defaultValue: "overview" },
  parameters: {
    docs: {
      description: {
        story: [
          "All features combined: pill variant, icons, badges, and vertical orientation.",
          "Demonstrates a feature-rich tab bar ready for production use.",
        ].join("\n"),
      },
    },
  },
  render: () => {
    const items: TabItem[] = [
      {
        value: "overview",
        label: "Overview",
        icon: Eye,
        count: 1,
        content: (
          <div className="grid grid-cols-3 gap-4 pt-4">
            {["Users", "Revenue", "Growth"].map((label) => (
              <div
                key={label}
                className="rounded-xl border bg-card p-4 text-card-foreground"
              >
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="mt-1 text-2xl font-semibold">
                  {Math.floor(Math.random() * 1000)}
                </p>
              </div>
            ))}
          </div>
        ),
      },
      {
        value: "activity",
        label: "Activity",
        icon: Activity,
        count: 3,
        content: (
          <div className="flex flex-col gap-3 pt-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-lg border px-4 py-3 text-sm"
              >
                <div className="size-2 rounded-full bg-primary" />
                <span className="flex-1 text-muted-foreground">
                  Activity event #{i + 1}
                </span>
                <span className="text-xs text-muted-foreground">
                  {i + 1}h ago
                </span>
              </div>
            ))}
          </div>
        ),
      },
      {
        value: "team",
        label: "Team",
        icon: Users,
        count: 5,
        content: (
          <div className="flex flex-col gap-3 pt-4">
            {[
              { name: "Alice", role: "Designer" },
              { name: "Bob", role: "Developer" },
              { name: "Carol", role: "PM" },
            ].map((member) => (
              <div
                key={member.name}
                className="flex items-center gap-3 rounded-lg border px-4 py-3 text-sm"
              >
                <div className="flex size-8 items-center justify-center rounded-full bg-muted text-xs font-medium">
                  {member.name[0]}
                </div>
                <div>
                  <p className="font-medium">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        ),
      },
      {
        value: "alerts",
        label: "Alerts",
        icon: Zap,
        count: 12,
        content: (
          <ContentPanel>
            12 active alerts requiring attention across your projects.
          </ContentPanel>
        ),
      },
    ]

    return (
      <Tabs
        items={items}
        defaultValue="overview"
        variant="pill"
        size="md"
        className="max-w-2xl"
      />
    )
  },
}
