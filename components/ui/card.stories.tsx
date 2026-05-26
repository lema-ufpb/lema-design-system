import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from "./card"
import { Button } from "./button"
import { Badge } from "./badge"
import { MoreHorizontal } from "lucide-react"

const meta = {
  title: "Shadcn UI/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A versatile card container with sub-components for header, title, action buttons, descriptions, body content, and footer actions.",
          "",
          "Supports size variants (`default` and `sm`) to adjust internal padding and spacing dynamically.",
          "",
          "## Sub-components",
          "- `Card`: The main container element.",
          "- `CardHeader`: Header layout supporting titles, descriptions, and custom actions.",
          "- `CardTitle`: Formatted typography for the card title.",
          "- `CardDescription`: Formatted typography for secondary information/description.",
          "- `CardAction`: Container positioned at the top right of the header, typically used for action icons/dropdowns.",
          "- `CardContent`: The body container of the card.",
          "- `CardFooter`: Footer layout positioned at the bottom of the card.",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["default", "sm"],
      description: "Controls the card's internal padding and gap sizing.",
      table: { defaultValue: { summary: "default" } },
    },
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    size: "default",
    children: (
      <>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>
            Card Description and secondary details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This is the main body content of the card. You can render any
            elements here, including charts, forms, or paragraph blocks.
          </p>
        </CardContent>
        <CardFooter className="border-t pt-6">
          <div className="flex w-full items-center justify-between">
            <span className="text-xs text-muted-foreground">
              Last updated 5m ago
            </span>
            <Button size="sm">Action</Button>
          </div>
        </CardFooter>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Standard card with header, title, description, body content, and a footer action button.",
      },
    },
  },
}

export const Small: Story = {
  args: {
    size: "sm",
    children: (
      <>
        <CardHeader>
          <CardTitle>Small Variant</CardTitle>
          <CardDescription>
            Using size=&quot;sm&quot; for compact UI cards.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Compact padding and narrower gaps between header and body contents.
            Useful for dashboard widgets.
          </p>
        </CardContent>
        <CardFooter className="border-t pt-4">
          <Button size="sm" variant="outline" className="w-full">
            Confirm
          </Button>
        </CardFooter>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Compact card with `size="sm"` for reduced padding, suitable for dashboard widgets.',
      },
    },
  },
}

export const WithAction: Story = {
  args: {
    size: "default",
    children: (
      <>
        <CardHeader>
          <CardTitle>Project Settings</CardTitle>
          <CardDescription>Manage your workspace preferences.</CardDescription>
          <CardAction>
            <Button size="icon-sm" variant="ghost">
              <MoreHorizontal className="size-4" />
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Click the action menu in the top-right corner to perform
            context-specific actions on this card.
          </p>
        </CardContent>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Card with a contextual action button positioned in the top-right corner of the header via CardAction.",
      },
    },
  },
}

export const StatusBadge: Story = {
  args: {
    size: "default",
    children: (
      <>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>API Integration</CardTitle>
            <Badge variant="secondary">Active</Badge>
          </div>
          <CardDescription>
            Webhook connections and data payloads.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Monitor API endpoints, latency charts, and event dispatches from
            this central view.
          </p>
        </CardContent>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Card header with an inline status badge next to the title for indicating live state.",
      },
    },
  },
}
