import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as React from "react"
import { BellIcon } from "lucide-react"
import { Drawer } from "@/components/custom/drawer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const meta = {
  title: "Navigation/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A full-size slide-over panel wrapping the **vaul** drawer primitive.",
          "Opens from any edge (bottom, left, right, top) and fills the viewport edge-to-edge.",
          "Combines optional header, scrollable body, footer, and a direction-aware close button.",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Content background** | `--popover` | Inner container background |",
          "| **Text** | `--popover-foreground` | Title and body color |",
          "| **Sub-text** | `--muted-foreground` | Description text |",
          "| **Close button** | `--secondary` | Close button background fill |",
          "| **Drag handle** | `--muted` | Rounded indicator on bottom drawers |",
          "| **Border** | `--border` | Panel outline |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    direction: {
      control: "select",
      options: ["bottom", "left", "right", "top"],
    },
    showCloseButton: { control: "boolean" },
    title: { control: "text" },
    description: { control: "text" },
    open: { table: { disable: true } },
    onOpenChange: { table: { disable: true } },
    trigger: { table: { disable: true } },
    children: { table: { disable: true } },
    footer: { table: { disable: true } },
  },
} satisfies Meta<typeof Drawer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: "Bottom — Edit Profile",
  render: () => (
    <Drawer
      direction="bottom"
      title="Edit Profile"
      description="Make changes to your profile here."
      trigger={<Button>Open Drawer</Button>}
      footer={
        <>
          <Button variant="outline">Cancel</Button>
          <Button>Save changes</Button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Input placeholder="Your name" />
        <Input placeholder="Your email" />
      </div>
    </Drawer>
  ),
}

export const FromLeft: Story = {
  name: "Left — Navigation",
  render: () => (
    <Drawer
      direction="left"
      title="Navigation"
      description="Browse available sections."
      trigger={<Button>Open Menu</Button>}
    >
      <nav className="flex flex-col gap-1">
        {["Dashboard", "Analytics", "Settings", "Help Center"].map(
          (item, i) => (
            <Button
              key={item}
              variant={i === 0 ? "default" : "ghost"}
              className="justify-start"
            >
              {item}
            </Button>
          )
        )}
      </nav>
    </Drawer>
  ),
}

export const FromRight: Story = {
  name: "Right — Notifications",
  render: () => (
    <Drawer
      direction="right"
      title="Notifications"
      description="Your recent activity."
      trigger={
        <Button>
          <BellIcon />
          Notifications
        </Button>
      }
    >
      <div className="flex flex-col gap-3">
        {[
          {
            msg: "New comment on your post",
            time: "2m ago",
            variant: "default" as const,
          },
          {
            msg: "Server deployment complete",
            time: "15m ago",
            variant: "secondary" as const,
          },
          {
            msg: "Payment received — $249.00",
            time: "1h ago",
            variant: "secondary" as const,
          },
          {
            msg: "Security alert: new login",
            time: "3h ago",
            variant: "destructive" as const,
          },
        ].map(({ msg, time, variant }) => (
          <div
            key={msg}
            className="flex items-start justify-between rounded-lg border border-border bg-card p-3"
          >
            <div className="flex flex-col gap-1">
              <span className="text-sm">{msg}</span>
              <span className="text-xs text-muted-foreground">{time}</span>
            </div>
            <Badge variant={variant} className="shrink-0">
              New
            </Badge>
          </div>
        ))}
      </div>
    </Drawer>
  ),
}

export const FromTop: Story = {
  name: "Top — Quick Actions",
  render: () => (
    <Drawer
      direction="top"
      title="Quick Actions"
      description="Select an action to perform."
      trigger={<Button variant="outline">Actions</Button>}
    >
      <div className="grid grid-cols-3 gap-3">
        {["New File", "Upload", "Share"].map((action) => (
          <Button
            key={action}
            variant="outline"
            className="flex-col gap-1 py-4"
          >
            {action}
          </Button>
        ))}
      </div>
    </Drawer>
  ),
}

export const Confirmation: Story = {
  name: "Bottom — Confirmation",
  render: () => (
    <Drawer
      direction="bottom"
      title="Delete Item"
      description="This action cannot be undone."
      trigger={<Button variant="destructive">Delete Item</Button>}
      footer={
        <>
          <Button variant="outline">Cancel</Button>
          <Button variant="destructive">Delete</Button>
        </>
      }
    >
      <p className="text-sm text-muted-foreground">
        Are you sure you want to delete this item? All associated data will be
        permanently removed.
      </p>
    </Drawer>
  ),
}

export const ScrollableContent: Story = {
  name: "Right — Scrollable Content",
  render: () => (
    <Drawer
      direction="right"
      title="Activity Log"
      description="Set your daily activity goal."
      trigger={<Button variant="outline">Scrollable Content</Button>}
      footer={
        <>
          <Button>Submit</Button>
          <Button variant="outline">Cancel</Button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <p key={index} className="leading-relaxed text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        ))}
      </div>
    </Drawer>
  ),
}

export const NoHeader: Story = {
  name: "Bottom — No Header",
  render: () => (
    <Drawer
      direction="bottom"
      trigger={<Button variant="outline">No Header</Button>}
      footer={
        <Button variant="outline" className="w-full">
          Done
        </Button>
      }
    >
      <p className="text-sm text-muted-foreground">
        This drawer has no title or description. Content starts right after the
        close button.
      </p>
    </Drawer>
  ),
}

export const NoCloseButton: Story = {
  name: "Left — No Close Button",
  render: () => (
    <Drawer
      direction="left"
      showCloseButton={false}
      title="No Close Button"
      description="Swipe or tap the backdrop to close."
      trigger={<Button variant="outline">Open</Button>}
    >
      <p className="text-sm text-muted-foreground">
        This drawer hides the close button. Use drag gestures or the backdrop to
        dismiss.
      </p>
    </Drawer>
  ),
}

export const ProgrammaticControl: Story = {
  name: "Bottom — Controlled",
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
          State: <span className="font-mono">{open ? "open" : "closed"}</span>
        </p>
        <Drawer
          open={open}
          onOpenChange={setOpen}
          direction="bottom"
          title="Controlled Drawer"
          description="Managed via external state."
          footer={
            <Button variant="outline" onClick={() => setOpen(false)}>
              Close
            </Button>
          }
        >
          <p className="text-sm">
            This drawer is controlled programmatically. Click
            &ldquo;Close&rdquo; or the backdrop to dismiss it.
          </p>
        </Drawer>
      </div>
    )
  },
}
