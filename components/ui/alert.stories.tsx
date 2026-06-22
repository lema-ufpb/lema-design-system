import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Alert, AlertTitle, AlertDescription, AlertAction } from "./alert"
import { Button } from "./button"
import { TerminalIcon, XIcon, TriangleAlertIcon } from "lucide-react"

const meta = {
  title: "Shadcn UI/Alert",
  component: Alert,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A contextual notification banner for feedback messages, warnings, errors, or informational tips.",
          "",
          "Supports two variants (`default` and `destructive`) and accepts an optional icon via children. The `AlertAction` slot renders an absolute-positioned element (e.g. a close button) at the top-right corner.",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Variant / Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Default background** | `--card` | Surface fill for the default variant |",
          "| **Default text** | `--card-foreground` | Primary text color |",
          "| **Destructive text** | `--destructive` | Icon and title color for destructive variant |",
          "| **Destructive description** | `--destructive` (at 90%) | Muted body text for destructive variant |",
          "| **Description text** | `--muted-foreground` | Secondary body text |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["default", "destructive"],
      description: "Visual style variant",
      table: { defaultValue: { summary: "default" } },
    },
  },
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: "default",
    children: (
      <>
        <TerminalIcon />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components to your app using the CLI.
        </AlertDescription>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Default alert with terminal icon, a title, and a brief description for general notifications.",
      },
    },
  },
}

export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Side-by-side comparison of the default and destructive alert variants.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <Alert variant="default">
        <TerminalIcon />
        <AlertTitle>Default Alert</AlertTitle>
        <AlertDescription>This is a default alert message.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <TriangleAlertIcon />
        <AlertTitle>Destructive Alert</AlertTitle>
        <AlertDescription>
          This is a destructive alert message indicating an error.
        </AlertDescription>
      </Alert>
    </div>
  ),
}

export const WithAction: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Default alert with an action slot — a ghost close button positioned at the top-right corner.",
      },
    },
  },
  render: () => (
    <Alert variant="default">
      <TerminalIcon />
      <AlertTitle>Update available</AlertTitle>
      <AlertDescription>
        A new version is ready to install. Restart the application to apply
        changes.
      </AlertDescription>
      <AlertAction>
        <Button variant="ghost" size="icon-xs" aria-label="Close">
          <XIcon />
        </Button>
      </AlertAction>
    </Alert>
  ),
}

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: (
      <>
        <TriangleAlertIcon />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Your session has expired. Please log in again.
        </AlertDescription>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Destructive variant with a triangle alert icon, used to communicate errors or critical issues.",
      },
    },
  },
}

export const WithoutIcon: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Default alert rendered without a leading icon, showing only the title and description.",
      },
    },
  },
  render: () => (
    <Alert variant="default">
      <AlertTitle>No icon alert</AlertTitle>
      <AlertDescription>
        This alert does not include an icon in its layout.
      </AlertDescription>
    </Alert>
  ),
}
