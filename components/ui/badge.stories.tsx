import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Badge } from "./badge"
import { StarIcon, CheckIcon } from "lucide-react"

const meta = {
  title: "Shadcn UI/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A small visual indicator for categorization, counts, or status labels.",
          "",
          "Supports various semantic variants (`default`, `secondary`, `destructive`, `outline`, `ghost`, `link`) and can be rendered as a link or child element using the `asChild` prop.",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Variant / Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Default background** | `--primary` | Background for default variant |",
          "| **Default text** | `--primary-foreground` | Text color for default variant |",
          "| **Secondary background** | `--secondary` | Background for secondary variant |",
          "| **Secondary text** | `--secondary-foreground` | Text color for secondary variant |",
          "| **Destructive color** | `--destructive` | Text color for destructive variant |",
          "| **Destructive background** | `--destructive/10` / `--destructive/20` | Light transparency background for destructive state |",
          "| **Outline border** | `--border` | Border boundary for the outline variant |",
          "| **Outline/Ghost hover** | `--muted` / `--muted-foreground` | Colors when hovering over link badges |",
          "| **Focus ring** | `--ring` / `--ring/50` | Focus ring styling for keyboard accessibility |",
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
        "ghost",
        "link",
      ],
      table: { defaultValue: { summary: "default" } },
    },
    asChild: {
      table: { disable: true },
    },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Badge",
    variant: "default",
  },
  parameters: {
    docs: {
      description: {
        story:
          'Primary variant badge with the label "Badge" for standard categorization.',
      },
    },
  },
}

export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "All six badge variants (default, secondary, destructive, outline, ghost, link) displayed side by side.",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="ghost">Ghost</Badge>
      <Badge variant="link">Link</Badge>
    </div>
  ),
}

export const WithIcon: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Badges with inline-start and inline-end icon positions across different variants.",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">
        <StarIcon data-icon="inline-start" className="size-3" />
        Star
      </Badge>
      <Badge variant="secondary">
        <CheckIcon data-icon="inline-start" className="size-3" />
        Verified
      </Badge>
      <Badge variant="destructive">
        Alert
        <StarIcon data-icon="inline-end" className="size-3" />
      </Badge>
    </div>
  ),
}

export const AsChild: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Badge rendered as an anchor link using the `asChild` composition pattern.",
      },
    },
  },
  render: () => (
    <Badge asChild>
      <a href="#">Link Badge</a>
    </Badge>
  ),
}
