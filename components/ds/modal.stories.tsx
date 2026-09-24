import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as React from "react"
import {
  TrashIcon,
  SaveIcon,
  LogOutIcon,
  UserIcon,
  LockIcon,
  BellIcon,
  ShieldIcon,
} from "lucide-react"
import { Modal } from "@/components/ds/modal"
import { Button } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"

const meta = {
  title: "Feedback/Modal",
  component: Modal,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A flexible modal dialog built on the **Dialog** primitive.",
          "Supports size variants, an intent system with semantic icon+color accents,",
          "scrollable body mode with sticky header/footer, auto async confirm tracking, and i18n.",
          "",
          "## Design Tokens",
          "",
          "| Element | Token | Purpose |",
          "| --- | --- | --- |",
          "| **Background** | `--popover` | Dialog surface |",
          "| **Text** | `--popover-foreground` | Title and body |",
          "| **Description** | `--muted-foreground` | Subtitle text |",
          "| **Destructive icon** | `--destructive` | Error/delete intent |",
          "| **Success icon** | `--success` | Positive intent |",
          "| **Warning icon** | `--warning` | Caution intent |",
          "| **Info icon** | `--highlight-sky` | Informational intent |",
          "| **Border** | `--border` | Scrollable section dividers |",
          "",
          "## Size variants",
          "",
          "| Size | Max width |",
          "| --- | --- |",
          "| `sm` | 384px |",
          "| `md` | 448px *(default)* |",
          "| `lg` | 512px |",
          "| `xl` | 576px |",
          "| `2xl` | 672px |",
          "| `full` | viewport − 2rem |",
          "",
          "## Component Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `open` | `boolean` | — | Controlled open state |",
          "| `onOpenChange` | `(open: boolean) => void` | — | Callback when open state changes |",
          "| `trigger` | `React.ReactNode` | — | Element that opens the modal |",
          "| `title` | `React.ReactNode` | — | Modal title |",
          "| `description` | `React.ReactNode` | — | Modal description |",
          "| `children` | `React.ReactNode` | — | Modal body content |",
          "| `footer` | `React.ReactNode` | — | Custom footer — replaces auto-generated buttons |",
          "| `icon` | `React.ReactNode` | — | Custom icon — overrides intent default |",
          "| `onConfirm` | `() => void \\| Promise<void>` | — | Confirm action — async tracking auto-enabled |",
          "| `onCancel` | `() => void` | — | Cancel action |",
          "| `confirmLabel` | `string` | — | Confirm button text |",
          "| `cancelLabel` | `string` | — | Cancel button text |",
          "| `confirmLoading` | `boolean` | — | Manual loading override for confirm button |",
          "| `closeOnConfirm` | `boolean` | `false` | Auto-close after confirm |",
          '| `size` | `"sm" \\| "md" \\| "lg" \\| "xl" \\| "2xl" \\| "full"` | `"md"` | Dialog max-width |',
          '| `intent` | `"default" \\| "destructive" \\| "success" \\| "warning" \\| "info"` | `"default"` | Semantic accent and icon |',
          "| `scrollable` | `boolean` | `false` | Enables scrollable body with sticky header/footer |",
          "| `loading` | `boolean` | `false` | Shows skeleton placeholders |",
          "| `showCloseButton` | `boolean` | `true` | Shows or hides the X close button |",
          "| `maximize` | `boolean` | `false` | Shows expand/fullscreen toggle beside the close button |",
          '| `locale` | `UILocale` | `"en-US"` | Locale for button labels |',
        ].join("\n"),
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "2xl", "full"],
      table: { defaultValue: { summary: "md" } },
    },
    intent: {
      control: "select",
      options: ["default", "destructive", "success", "warning", "info"],
      table: { defaultValue: { summary: "default" } },
    },
    scrollable: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    loading: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    showCloseButton: {
      control: "boolean",
      table: { defaultValue: { summary: "true" } },
    },
    maximize: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    closeOnConfirm: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    locale: {
      control: "inline-radio",
      options: ["en-US", "pt-BR", "es-ES", "fr-FR"],
      table: { defaultValue: { summary: "en-US" } },
    },
    title: { control: "text" },
    description: { control: "text" },
    confirmLabel: { control: "text" },
    cancelLabel: { control: "text" },
    open: { table: { disable: true } },
    onOpenChange: { table: { disable: true } },
    trigger: { table: { disable: true } },
    children: { table: { disable: true } },
    footer: { table: { disable: true } },
    icon: { table: { disable: true } },
    onConfirm: { table: { disable: true } },
    onCancel: { table: { disable: true } },
    confirmLoading: { table: { disable: true } },
    className: { table: { disable: true } },
  },
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

// ── Basic ──

export const Default: Story = {
  name: "Default — Edit Profile",
  render: () => (
    <Modal
      title="Edit Profile"
      description="Update your display name and email address."
      trigger={<Button>Edit Profile</Button>}
      onConfirm={() => {}}
      closeOnConfirm
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="modal-name">Display name</Label>
          <Input id="modal-name" defaultValue="Ana Souza" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="modal-email">Email</Label>
          <Input id="modal-email" defaultValue="ana@ufpb.br" type="email" />
        </div>
      </div>
    </Modal>
  ),
  parameters: {
    docs: {
      description: {
        story: "Default modal with form fields and auto confirm/cancel footer.",
      },
    },
  },
}

// ── Intent variants ──

export const IntentDestructive: Story = {
  name: "Intent — Destructive",
  render: () => (
    <Modal
      intent="destructive"
      size="sm"
      title="Delete Account"
      description="This action is permanent and cannot be undone. All your data will be erased."
      trigger={
        <Button variant="destructive">
          <TrashIcon data-icon="inline-start" />
          Delete Account
        </Button>
      }
      confirmLabel="Yes, delete"
      cancelLabel="Keep account"
      onConfirm={() => new Promise((r) => setTimeout(r, 1500))}
      closeOnConfirm
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Destructive intent: red icon accent + matching confirm button. `onConfirm` returns a Promise — loading state is tracked automatically.",
      },
    },
  },
}

export const IntentSuccess: Story = {
  name: "Intent — Success",
  render: () => (
    <Modal
      intent="success"
      size="sm"
      title="Changes Saved"
      description="Your profile has been updated successfully."
      trigger={<Button variant="outline">Show Success</Button>}
      confirmLabel="Done"
      closeOnConfirm
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Success intent: green icon + matching confirm button.",
      },
    },
  },
}

export const IntentWarning: Story = {
  name: "Intent — Warning",
  render: () => (
    <Modal
      intent="warning"
      size="sm"
      title="Unsaved Changes"
      description="You have unsaved changes. Leaving now will discard them."
      trigger={<Button variant="outline">Show Warning</Button>}
      confirmLabel="Discard"
      cancelLabel="Stay"
      onConfirm={() => {}}
      closeOnConfirm
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Warning intent: amber icon accent.",
      },
    },
  },
}

export const IntentInfo: Story = {
  name: "Intent — Info",
  render: () => (
    <Modal
      intent="info"
      size="sm"
      title="New Feature Available"
      description="We just launched dark mode across the entire dashboard. Toggle it from your profile settings."
      trigger={<Button variant="outline">What&apos;s New</Button>}
      confirmLabel="Got it"
      closeOnConfirm
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Info intent: sky-blue icon accent.",
      },
    },
  },
}

// ── Size variants ──

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {(["sm", "md", "lg", "xl", "2xl", "full"] as const).map((size) => (
        <Modal
          key={size}
          size={size}
          title={`Modal — ${size}`}
          description={`This dialog uses size="${size}".`}
          trigger={<Button variant="outline">{size}</Button>}
          onConfirm={() => {}}
          closeOnConfirm
        >
          <p className="text-sm text-muted-foreground">
            Content area for a <strong>{size}</strong> modal. The max-width
            adjusts per size, with responsive fallback to viewport − 2rem on
            small screens.
          </p>
        </Modal>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All six size variants: sm, md, lg, xl, 2xl, full. Each adjusts `max-width` at the sm breakpoint.",
      },
    },
  },
}

// ── Scrollable ──

export const Scrollable: Story = {
  name: "Scrollable Body",
  render: () => (
    <Modal
      size="md"
      scrollable
      title="Terms of Service"
      description="Read the full terms before accepting."
      trigger={<Button>View Terms</Button>}
      confirmLabel="Accept"
      cancelLabel="Decline"
      onConfirm={() => {}}
      closeOnConfirm
    >
      <div className="flex flex-col gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <React.Fragment key={i}>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-foreground">
                {i + 1}.{" "}
                {
                  [
                    "Acceptance",
                    "Privacy Policy",
                    "Data Usage",
                    "User Conduct",
                    "Intellectual Property",
                    "Limitations",
                    "Governing Law",
                    "Contact",
                  ][i]
                }
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
            {i < 7 && <Separator />}
          </React.Fragment>
        ))}
      </div>
    </Modal>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Scrollable modal: the header and footer are sticky, only the body scrolls. Triggered with `scrollable` prop.",
      },
    },
  },
}

// ── Loading skeleton ──

export const LoadingSkeleton: Story = {
  render: function Render() {
    const [loading, setLoading] = React.useState(true)
    return (
      <Modal
        size="md"
        loading={loading}
        title="User Details"
        description="Loading profile information…"
        trigger={<Button variant="outline">Open Loading</Button>}
        footer={
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLoading((v) => !v)}
            >
              {loading ? "Reveal content" : "Show skeleton"}
            </Button>
          </div>
        }
      >
        <div className="flex flex-col gap-3">
          <p className="text-sm text-muted-foreground">Content loaded.</p>
        </div>
      </Modal>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          "Loading state renders skeleton lines matched to the modal size. Toggle the button inside to reveal content.",
      },
    },
  },
}

// ── Custom icon ──

export const CustomIcon: Story = {
  render: () => (
    <Modal
      intent="destructive"
      icon={<LogOutIcon />}
      size="sm"
      title="Sign Out"
      description="You will be signed out of all devices and sessions."
      trigger={<Button variant="outline">Sign Out</Button>}
      confirmLabel="Sign out"
      onConfirm={() => {}}
      closeOnConfirm
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Custom icon via the `icon` prop overrides the intent default icon while keeping the intent color.",
      },
    },
  },
}

// ── Async confirm ──

export const AsyncConfirm: Story = {
  name: "Async Confirm — Auto Loading",
  render: () => (
    <Modal
      intent="success"
      size="md"
      title="Publish Report"
      description="This will make the report visible to all members of your organization."
      trigger={<Button>Publish</Button>}
      confirmLabel="Publish"
      onConfirm={() => new Promise((resolve) => setTimeout(resolve, 2000))}
      closeOnConfirm
    >
      <div className="rounded-lg border border-border bg-muted/50 px-4 py-3">
        <p className="text-sm font-medium">
          Q1 2025 — Academic Performance Report
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Last edited 2 hours ago · 42 pages
        </p>
      </div>
    </Modal>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "When `onConfirm` returns a Promise, the confirm button shows a spinner automatically. No extra state management needed.",
      },
    },
  },
}

// ── Custom footer ──

export const CustomFooter: Story = {
  render: () => (
    <Modal
      size="lg"
      title="Notification Preferences"
      description="Choose which updates you want to receive."
      trigger={
        <Button variant="outline">
          <BellIcon data-icon="inline-start" />
          Notifications
        </Button>
      }
      footer={
        <div className="flex w-full items-center justify-between gap-2">
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            Reset to defaults
          </Button>
          <div className="flex gap-2">
            <DialogClose asChild>
              <Button variant="outline" size="sm">
                Cancel
              </Button>
            </DialogClose>
            <Button size="sm">
              <SaveIcon data-icon="inline-start" />
              Save preferences
            </Button>
          </div>
        </div>
      }
    >
      <div className="flex flex-col gap-3">
        {[
          { icon: BellIcon, label: "Push notifications", badge: "On" },
          { icon: ShieldIcon, label: "Security alerts", badge: "On" },
          { icon: UserIcon, label: "Account activity", badge: "Off" },
          { icon: LockIcon, label: "Two-factor prompts", badge: "On" },
        ].map(({ icon: Icon, label, badge }) => (
          <div
            key={label}
            className="flex items-center justify-between rounded-lg border border-border px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <Icon className="size-4 text-muted-foreground" />
              <span className="text-sm">{label}</span>
            </div>
            <Badge variant={badge === "On" ? "default" : "secondary"}>
              {badge}
            </Badge>
          </div>
        ))}
      </div>
    </Modal>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Custom `footer` slot replaces the auto-generated buttons entirely.",
      },
    },
  },
}

// ── No close button ──

export const NoCloseButton: Story = {
  name: "No Close Button — Forced Action",
  render: () => (
    <Modal
      size="sm"
      intent="warning"
      showCloseButton={false}
      title="Session Expiring"
      description="Your session will expire in 2 minutes due to inactivity."
      trigger={<Button variant="outline">Simulate session alert</Button>}
      confirmLabel="Stay logged in"
      cancelLabel="Log out"
      onConfirm={() => {}}
      closeOnConfirm
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Hide the X button via `showCloseButton={false}` to force the user to pick an action.",
      },
    },
  },
}

// ── Maximize ──

export const Maximize: Story = {
  name: "Maximize — Fullscreen Toggle",
  render: () => (
    <Modal
      size="lg"
      maximize
      title="Report Viewer"
      description="Toggle the expand button to view in fullscreen."
      trigger={<Button>Open Report</Button>}
      onConfirm={() => {}}
      closeOnConfirm
    >
      <div className="flex flex-col gap-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            className="rounded-lg border border-border bg-muted/30 p-4"
          >
            <p className="text-sm font-medium text-foreground">
              Section {i + 1}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        ))}
      </div>
    </Modal>
  ),
  parameters: {
    docs: {
      description: {
        story: [
          "Shows an **expand** button (`Maximize2` icon) beside the close button.",
          "Click toggles to fullscreen (`h-dvh w-full`), replacing the icon with `Minimize2`.",
          "Click again or close the modal to return to the original size.",
          "",
          "**Note:** `maximize` auto-suppresses DialogContent's built-in close button",
          "to avoid duplicates — both close and maximize are rendered inside the header.",
        ].join("\n"),
      },
    },
  },
}

// ── Controlled ──

export const Controlled: Story = {
  name: "Controlled — External State",
  render: function Render() {
    const [open, setOpen] = React.useState(false)
    return (
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <Button onClick={() => setOpen(true)}>Open</Button>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={!open}
          >
            Close
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          State: <span className="font-sans">{open ? "open" : "closed"}</span>
        </p>
        <Modal
          open={open}
          onOpenChange={setOpen}
          title="Controlled Modal"
          description="Opened and closed via external state."
          footer={
            <Button variant="outline" onClick={() => setOpen(false)}>
              Close
            </Button>
          }
        >
          <p className="text-sm text-muted-foreground">
            This modal is driven entirely by the{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">open</code>{" "}
            and{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              onOpenChange
            </code>{" "}
            props.
          </p>
        </Modal>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          "Fully controlled via `open` + `onOpenChange` — no trigger prop needed.",
      },
    },
  },
}

// ── i18n ──

export const Locales: Story = {
  name: "i18n — Locale Variants",
  render: () => (
    <div className="flex flex-wrap gap-2">
      {(["en-US", "pt-BR", "es-ES", "fr-FR"] as const).map((locale) => (
        <Modal
          key={locale}
          locale={locale}
          size="sm"
          intent="destructive"
          title="Confirm Action"
          description="This operation cannot be undone."
          trigger={
            <Button variant="outline" size="sm">
              {locale}
            </Button>
          }
          onConfirm={() => {}}
          closeOnConfirm
        />
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Button labels adapt to `locale` prop: en-US, pt-BR, es-ES, fr-FR.",
      },
    },
  },
}
