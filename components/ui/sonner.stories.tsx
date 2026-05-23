import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Toaster } from "./sonner"
import { Button } from "./button"
import { toast } from "sonner"

const meta = {
  title: "Shadcn UI/Sonner (Toaster)",
  component: Toaster,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A toast notification system that auto-adapts to the current theme via `next-themes`.",
          "",
          "Wraps the `sonner` library's `<Toaster />` component. Uses LEMADS custom icons (success, info, warning, error, loading) and CSS variable integration (`--normal-bg`, `--normal-text`, `--normal-border`, `--border-radius`) mapped to the design system tokens. The stories below demonstrate how to trigger toasts from any component tree.",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Variant / Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Toast background** | `--popover` | Background of the toast notification (`--normal-bg`) |",
          "| **Toast text** | `--popover-foreground` | Text color inside the toast (`--normal-text`) |",
          "| **Toast border** | `--border` | Border around the toast (`--normal-border`) |",
          "| **Border radius** | `--radius` | Corner rounding via `--border-radius` |",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof Toaster>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <>
      <Toaster />
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" onClick={() => toast("Hello, world!")}>
          Default Toast
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast("Your changes have been saved.", {
              description: "The operation completed successfully.",
            })
          }
        >
          With Description
        </Button>
      </div>
    </>
  ),
}

export const Variants: Story = {
  render: () => (
    <>
      <Toaster />
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => toast.success("Data saved successfully")}>
          Success
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.info("You have 3 new messages")}
        >
          Info
        </Button>
        <Button
          variant="secondary"
          onClick={() => toast.warning("Disk space is running low")}
        >
          Warning
        </Button>
        <Button
          variant="destructive"
          onClick={() => toast.error("Something went wrong")}
        >
          Error
        </Button>
      </div>
    </>
  ),
}

export const Loading: Story = {
  render: () => (
    <>
      <Toaster />
      <Button
        variant="outline"
        onClick={() => {
          const id = toast.loading("Uploading file...")
          setTimeout(() => toast.success("Upload complete!", { id }), 2000)
        }}
      >
        Simulate Loading
      </Button>
    </>
  ),
}

export const Dismissable: Story = {
  render: () => (
    <>
      <Toaster />
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          onClick={() =>
            toast("This will auto-dismiss", {
              duration: 3000,
            })
          }
        >
          3s Auto-dismiss
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast("Sticky notification", {
              duration: Infinity,
            })
          }
        >
          Sticky (no dismiss)
        </Button>
      </div>
    </>
  ),
}
