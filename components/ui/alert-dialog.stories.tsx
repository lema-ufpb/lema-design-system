import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "./alert-dialog"
import { Button } from "./button"
import { TriangleAlertIcon } from "lucide-react"

const meta = {
  title: "Shadcn UI/Alert Dialog",
  component: AlertDialogContent,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A modal dialog that interrupts the user to confirm an action or convey critical information.",
          "",
          "Composed of `AlertDialog`, `AlertDialogTrigger`, `AlertDialogContent`, `AlertDialogHeader`, `AlertDialogFooter`, `AlertDialogMedia`, `AlertDialogTitle`, `AlertDialogDescription`, `AlertDialogAction`, and `AlertDialogCancel`. The content accepts a `size` prop (`default` | `sm`) that adjusts the layout of the header and footer.",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Variant / Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Overlay** | `--background` (`bg-black/30`) | Semi-transparent backdrop |",
          "| **Content background** | `--popover` | Dialog surface fill |",
          "| **Content text** | `--popover-foreground` | Primary text color on the dialog |",
          "| **Media background** | `--muted` | Circular icon/illustration container |",
          "| **Description text** | `--muted-foreground` | Secondary body text |",
          "| **Title font** | `--font-heading` | Custom heading font family |",
          "| **Border glow** | `--foreground` | Subtle ring around content (`ring-foreground/5`) |",
          "| **Focus ring** | `--ring` / `--ring/30` | Keyboard focus indicator on Action/Cancel |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["default", "sm"],
      description: "Content sizing preset — affects header/footer layout",
      table: { defaultValue: { summary: "default" } },
    },
  },
} satisfies Meta<typeof AlertDialogContent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Default-sized confirmation dialog with a warning icon media area, cancel and delete actions.",
      },
    },
  },
  render: ({ size }) => (
    <AlertDialog defaultOpen>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Delete account</Button>
      </AlertDialogTrigger>
      <AlertDialogContent size={size}>
        <AlertDialogHeader>
          <AlertDialogMedia>
            <TriangleAlertIcon />
          </AlertDialogMedia>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  args: {
    size: "default",
  },
}

export const WithoutMedia: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Confirmation dialog without the media icon section, reducing visual weight for simpler confirmations.",
      },
    },
  },
  render: () => (
    <AlertDialog defaultOpen>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Discard changes</Button>
      </AlertDialogTrigger>
      <AlertDialogContent size="default">
        <AlertDialogHeader>
          <AlertDialogTitle>Discard changes?</AlertDialogTitle>
          <AlertDialogDescription>
            You have unsaved changes that will be lost.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep editing</AlertDialogCancel>
          <AlertDialogAction>Discard</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
}

export const Small: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Compact dialog with `size="sm"` for shorter confirmation flows that require less vertical space.',
      },
    },
  },
  render: () => (
    <AlertDialog defaultOpen>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Clear all</Button>
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogTitle>Clear all items?</AlertDialogTitle>
          <AlertDialogDescription>
            This will remove all items from your list.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Clear</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
}
