import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Button } from "./button"
import { Loader2Icon, StarIcon } from "lucide-react"

const meta = {
  title: "Shadcn UI/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "An interactive button control used to trigger actions, submit forms, or navigate.",
          "",
          "Includes support for prefix/suffix icons, a loading spinner state, disabled states, and standard size presets. Can render as custom child elements via the `asChild` prop.",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Variant / Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Default background** | `--primary` | Background for default variant |",
          "| **Default text** | `--primary-foreground` | Text color for default variant |",
          "| **Secondary background** | `--secondary` | Background for secondary variant |",
          "| **Secondary text** | `--secondary-foreground` | Text color for secondary variant |",
          "| **Outline border** | `--border` | Outer border line for the outline variant |",
          "| **Outline background** | `--background` | Fill color for the outline variant |",
          "| **Hover state background** | `--muted` / `--input/30` | Hover bg color for outline/ghost variants |",
          "| **Destructive color** | `--destructive` | Primary text and border color for destructive state |",
          "| **Destructive background** | `--destructive/10` / `--destructive/20` | Subtle background tint for destructive buttons |",
          "| **Focus ring** | `--ring` / `--ring/30` | Ring outline visible during keyboard focus navigation |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "outline",
        "secondary",
        "ghost",
        "destructive",
        "link",
      ],
      description: "Visual style variant",
      table: { defaultValue: { summary: "default" } },
    },
    size: {
      control: "select",
      options: [
        "default",
        "xs",
        "sm",
        "lg",
        "icon",
        "icon-xs",
        "icon-sm",
        "icon-lg",
      ],
      description: "Size and padding",
      table: { defaultValue: { summary: "default" } },
    },
    disabled: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    asChild: {
      table: { disable: true },
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Button",
    variant: "default",
    size: "default",
  },
  parameters: {
    docs: {
      description: {
        story:
          'Primary variant with default size and the label "Button" for standard action triggers.',
      },
    },
  },
}

export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "All six button variants (default, outline, secondary, ghost, destructive, link) displayed together.",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">Default</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
}

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Button size presets from xs to lg compared side by side with text labels.",
      },
    },
  },
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
}

export const IconSizes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Icon-only buttons at icon-xs, icon-sm, icon, and icon-lg sizes with an outline variant.",
      },
    },
  },
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="icon-xs" variant="outline" aria-label="Extra small icon">
        <StarIcon data-icon="inline-start" />
      </Button>
      <Button size="icon-sm" variant="outline" aria-label="Small icon">
        <StarIcon data-icon="inline-start" />
      </Button>
      <Button size="icon" variant="outline" aria-label="Default icon">
        <StarIcon data-icon="inline-start" />
      </Button>
      <Button size="icon-lg" variant="outline" aria-label="Large icon">
        <StarIcon data-icon="inline-start" />
      </Button>
    </div>
  ),
}

export const Icons: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Buttons with icons positioned at inline-start and inline-end of the text label.",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button>
        <StarIcon data-icon="inline-start" />
        With Icon Start
      </Button>
      <Button>
        With Icon End
        <StarIcon data-icon="inline-end" />
      </Button>
    </div>
  ),
}

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Disabled state demonstrated across default, outline, and secondary variants.",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button disabled>Disabled</Button>
      <Button disabled variant="outline">
        Disabled Outline
      </Button>
      <Button disabled variant="secondary">
        Disabled Secondary
      </Button>
    </div>
  ),
}

export const Loading: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Loading state with an animated spinner icon positioned inline-start, shown in default, outline, and disabled variants.",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button>
        <Loader2Icon data-icon="inline-start" className="animate-spin" />
        Loading
      </Button>
      <Button variant="outline">
        <Loader2Icon data-icon="inline-start" className="animate-spin" />
        Loading
      </Button>
      <Button disabled>
        <Loader2Icon data-icon="inline-start" className="animate-spin" />
        Loading
      </Button>
    </div>
  ),
}

export const AsChild: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Button component rendered as an anchor element using the `asChild` composition API.",
      },
    },
  },
  render: () => (
    <Button asChild>
      <a href="#">Link as Button</a>
    </Button>
  ),
}
