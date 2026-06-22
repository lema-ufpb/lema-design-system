import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Badge } from "./badge"
import { MailIcon } from "lucide-react"

const meta = {
  title: "Data Display/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "Compact label with optional dot, icon, removable action, counter, and loading state.",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          '| `variant` | `"default" \\| "secondary" \\| "destructive" \\| "outline" \\| "success" \\| "warning"` | `"default"` | Visual style variant |',
          '| `size` | `"sm" \\| "md" \\| "lg"` | `"md"` | Size preset |',
          "| `dot` | `boolean` | `false` | Show a leading status dot |",
          "| `removable` | `boolean` | `false` | Show a close (×) button |",
          "| `icon` | `ReactNode` | — | Leading icon element |",
          "| `maxCount` | `number` | — | Max value before showing `maxCount+` overflow |",
          "| `count` | `number` | — | Numeric counter displayed with `maxCount` |",
          "| `children` | `ReactNode` | — | Badge content |",
          "| `loading` | `boolean` | `false` | Show skeleton placeholder |",
          "| `onRemove` | `() => void` | — | Callback when close button is clicked |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "secondary",
        "destructive",
        "outline",
        "success",
        "warning",
      ],
      table: { defaultValue: { summary: "default" } },
    },
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
      table: { defaultValue: { summary: "md" } },
    },
    dot: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    removable: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    loading: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    icon: { table: { disable: true } },
    children: { table: { disable: true } },
    onRemove: { table: { disable: true } },
    maxCount: { control: "number" },
    count: { control: "number" },
    locale: {
      control: "inline-radio",
      options: ["en-US", "pt-BR", "es-ES", "fr-FR"],
      table: { defaultValue: { summary: "pt-BR" } },
    },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Badge",
    variant: "default",
    size: "md",
    dot: false,
    removable: false,
    loading: false,
    locale: "pt-BR",
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
}

export const WithDot: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant="default" dot>
        Default
      </Badge>
      <Badge variant="success" dot>
        Online
      </Badge>
      <Badge variant="warning" dot>
        Pending
      </Badge>
      <Badge variant="destructive" dot>
        Error
      </Badge>
    </div>
  ),
}

export const Removable: Story = {
  args: {
    children: "Dismiss me",
    removable: true,
    variant: "secondary",
  },
  argTypes: {
    onRemove: { action: "removed" },
  },
}

export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant="default" icon={<MailIcon />}>
        Inbox
      </Badge>
      <Badge variant="success" icon={<MailIcon />}>
        12 new
      </Badge>
      <Badge variant="secondary" icon={<MailIcon />}>
        Sent
      </Badge>
    </div>
  ),
}

export const Counter: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge maxCount={999} count={5}>
        Items
      </Badge>
      <Badge maxCount={999} count={150}>
        Over limit
      </Badge>
      <Badge maxCount={99} count={100}>
        Overflow
      </Badge>
    </div>
  ),
}

export const Loading: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Badge loading size="sm" />
      <Badge loading size="md" />
      <Badge loading size="lg" />
    </div>
  ),
}
