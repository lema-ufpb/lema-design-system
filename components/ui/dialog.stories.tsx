import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog"
import { Button } from "./button"
import { Input } from "./input"

const meta = {
  title: "Shadcn UI/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A modal overlay that interrupts the user with critical information or requires direct interaction.",
          "",
          "Built on top of **Radix UI Dialog**, it includes overlays with smooth backdrop-blur effects, standard close triggers, headers, description texts, content scroll containers, and aligned action footers.",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Backdrop overlay** | `bg-black/30` + backdrop blur | Translucent modal blocker covering the viewport |",
          "| **Modal background** | `--popover` | Inner container background color |",
          "| **Modal text** | `--popover-foreground` | Color of primary titles and body texts |",
          "| **Close button background** | `--secondary` | Background fill for the absolute-positioned close button |",
          "| **Sub-text labels** | `--muted-foreground` | Text color for descriptions and placeholder info |",
          "| **Modal container border** | `ring-1 ring-foreground/5` | Faded boundary ring on light/dark themes |",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input placeholder="Your name" />
          <Input placeholder="Your email" />
        </div>
        <DialogFooter showCloseButton>
          <Button variant="outline">Cancel</Button>
          <Button>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const WithoutCloseButton: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>No Close Button</Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Modal without close</DialogTitle>
          <DialogDescription>
            This dialog does not show a close button.
          </DialogDescription>
        </DialogHeader>
        <p>Content goes here...</p>
      </DialogContent>
    </Dialog>
  ),
}

export const Large: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Large Dialog</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Large Dialog</DialogTitle>
          <DialogDescription>
            A wider dialog for more content.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input placeholder="Field 1" />
          <Input placeholder="Field 2" />
          <Input placeholder="Field 3" />
          <Input placeholder="Field 4" />
        </div>
        <DialogFooter showCloseButton>
          <Button variant="outline">Cancel</Button>
          <Button>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const Confirmation: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete Item</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Item</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this item? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter showCloseButton>
          <Button variant="outline">Cancel</Button>
          <Button variant="destructive">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}
