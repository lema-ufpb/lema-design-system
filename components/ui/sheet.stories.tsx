import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Button } from "./button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet"

const meta = {
  title: "Shadcn UI/Sheet",
  component: Sheet,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A slide-in panel (drawer) from any edge of the screen for additional content or navigation.",
          "",
          'Built on Radix Dialog. `SheetContent` accepts a `side` prop (`"top"` | `"right"` | `"bottom"` | `"left"`) and `showCloseButton` (boolean, default `true`) which renders a ghost close button. Includes `SheetHeader`, `SheetFooter`, `SheetTitle`, and `SheetDescription` sub-components for structured content.',
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Variant / Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Panel background** | `--popover` | Background of the slide-in panel |",
          "| **Panel text** | `--popover-foreground` | Text color inside the panel |",
          "| **Overlay** | `--black/30` | Semi-transparent backdrop overlay |",
          "| **Title text** | `--foreground` | Color for the SheetTitle heading |",
          "| **Description text** | `--muted-foreground` | Color for the SheetDescription text |",
          "| **Close button** | `--secondary` | Background for the close icon button |",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof Sheet>

export default meta
type Story = StoryObj<typeof meta>

export const Right: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Right Sheet</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Edit Profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you are done.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 p-6 pt-0">
          <p className="text-sm text-muted-foreground">
            Sheet content goes here. You can place any elements inside.
          </p>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
          <Button>Save Changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
}

export const Left: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Left Sheet</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>Browse through the sections.</SheetDescription>
        </SheetHeader>
        <div className="flex-1 p-6 pt-0">
          <nav className="flex flex-col gap-2">
            <Button variant="ghost" className="justify-start">
              Dashboard
            </Button>
            <Button variant="ghost" className="justify-start">
              Settings
            </Button>
            <Button variant="ghost" className="justify-start">
              Profile
            </Button>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  ),
}

export const Top: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Top Sheet</Button>
      </SheetTrigger>
      <SheetContent side="top" className="h-48">
        <SheetHeader>
          <SheetTitle>Notification</SheetTitle>
          <SheetDescription>
            This is a top slide-in notification panel.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
}

export const Bottom: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Bottom Sheet</Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-64">
        <SheetHeader>
          <SheetTitle>Quick Actions</SheetTitle>
          <SheetDescription>
            Access frequently used actions from the bottom.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 p-6 pt-0">
          <div className="flex gap-2">
            <Button className="flex-1">Action 1</Button>
            <Button className="flex-1" variant="outline">
              Action 2
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  ),
}

export const WithoutCloseButton: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">No Close Button</Button>
      </SheetTrigger>
      <SheetContent side="right" showCloseButton={false}>
        <SheetHeader>
          <SheetTitle>Custom Close</SheetTitle>
          <SheetDescription>
            The default close button is hidden. Use a custom close mechanism.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 p-6 pt-0">
          <SheetClose asChild>
            <Button variant="outline" className="w-full">
              Close Manually
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  ),
}
