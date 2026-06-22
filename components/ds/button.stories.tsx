import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  ChevronRight,
  Download,
  Mail,
  Send,
  Trash2,
  UserPlus,
} from "lucide-react"
import { Button } from "./button"

const meta = {
  title: "Actions/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A feature-rich button built on top of the shadcn `Button` primitive.",
          "",
          "Adds loading states, icon slots, rounded variants, full-width mode, double-click debounce, two-step confirmation for destructive actions, and built-in tooltips.",
          "",
          "---",
          "",
          "## Data API",
          "",
          "### Props",
          "",
          "All `ButtonRoot` props are inherited (`variant`, `size`, `asChild`, `disabled`, `type`, etc.).",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `loading` | `boolean` | `false` | Shows a spinner and disables the button |",
          "| `loadingText` | `string` | — | Text shown next to the spinner; defaults to `children` |",
          "| `startIcon` | `ReactNode` | — | Icon rendered before the button label |",
          "| `endIcon` | `ReactNode` | — | Icon rendered after the button label |",
          '| `rounded` | `"full" \\| "lg" \\| "md" \\| "none"` | `"full"` | Border radius |',
          "| `fullWidth` | `boolean` | `false` | Spans the full container width |",
          "| `debounceMs` | `number` | — | Minimum interval between clicks (ms) |",
          "| `confirm` | `{ text: string; duration?: number }` | — | Two-step confirmation for destructive actions |",
          '| `tooltip` | `string \\| { text: string; side?: "top" \\| "right" \\| "bottom" \\| "left" }` | — | Tooltip shown on hover |',
          "",
          "---",
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
        "outline",
        "ghost",
        "destructive",
        "link",
      ],
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
      table: { defaultValue: { summary: "default" } },
    },
    rounded: {
      control: "inline-radio",
      options: ["full", "lg", "md", "none"],
      table: { defaultValue: { summary: "full" } },
    },
    fullWidth: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    loading: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    disabled: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    onClick: { table: { disable: true } },
    confirm: { table: { disable: true } },
    tooltip: { table: { disable: true } },
    startIcon: { table: { disable: true } },
    endIcon: { table: { disable: true } },
    debounceMs: { table: { disable: true } },
    loadingText: { table: { disable: true } },
    asChild: { table: { disable: true } },
    children: { table: { disable: true } },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// ── Stories ────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    children: "Button",
    variant: "default",
    loading: false,
  },
  parameters: {
    docs: {
      description: {
        story: "Default button with the primary variant.",
      },
    },
  },
}

export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story: "All six inherited variants rendered side by side.",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
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
        story: "All size presets from xs to lg.",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-end gap-4">
      <Button size="xs">XS</Button>
      <Button size="sm">SM</Button>
      <Button size="default">Default</Button>
      <Button size="lg">LG</Button>
    </div>
  ),
}

export const Loading: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          "`loading=true` replaces the content with a `Loader2` spinner. ",
          "The button is disabled and `aria-busy` is set.",
          "",
          "Pass `loadingText` to show custom text alongside the spinner.",
        ].join("\n"),
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button loading>Default</Button>
      <Button loading variant="secondary">
        Secondary
      </Button>
      <Button loading variant="destructive">
        Delete
      </Button>
      <Button loading variant="outline" loadingText="Saving…">
        Save
      </Button>
      <Button loading variant="ghost" loadingText="Please wait…">
        Connect
      </Button>
    </div>
  ),
}

export const WithIcons: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use `startIcon` and `endIcon` to add icons before or after the label.",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button startIcon={<Mail className="size-4" />}>Email</Button>
      <Button endIcon={<ChevronRight className="size-4" />}>Next</Button>
      <Button startIcon={<Download className="size-4" />} variant="secondary">
        Download
      </Button>
      <Button
        startIcon={<UserPlus className="size-4" />}
        endIcon={<ChevronRight className="size-4" />}
      >
        Invite
      </Button>
      <Button
        startIcon={<Send className="size-4" />}
        variant="outline"
        loading
        loadingText="Sending…"
      >
        Send
      </Button>
    </div>
  ),
}

export const Rounded: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          "Four border-radius presets: `full` (pill, default), `lg`, `md`, and `none`.",
          "",
          "This is especially useful when embedding buttons inside cards or dialogs that already have their own border radius.",
        ].join("\n"),
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button rounded="full">Full</Button>
      <Button rounded="lg">LG</Button>
      <Button rounded="md">MD</Button>
      <Button rounded="none">None</Button>
    </div>
  ),
}

export const FullWidth: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          "`fullWidth` makes the button span 100% of its container.",
          "Useful for mobile layouts, sidebars, and call-to-action sections.",
        ].join("\n"),
      },
    },
  },
  render: () => (
    <div className="flex max-w-sm flex-col gap-3">
      <Button fullWidth>Full-width button</Button>
      <Button fullWidth variant="secondary">
        Secondary action
      </Button>
      <Button fullWidth variant="outline" rounded="md">
        Outline with rounded=&quot;md&quot;
      </Button>
    </div>
  ),
}

export const ConfirmMode: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          "Two-step confirmation for destructive actions.",
          "",
          "**1st click** — the label changes to the `confirm.text`.",
          "**2nd click** — within the duration window, fires `onClick`.",
          "",
          "If the user does not click again within the duration (default 3s), the button resets. ",
          "During confirming state, the button is not disabled — the user can still click to confirm.",
        ].join("\n"),
      },
    },
  },
  args: { children: "Delete item", variant: "destructive" },
  render: (args) => {
    const [deleted, setDeleted] = React.useState(false)

    if (deleted) {
      return (
        <div className="flex flex-col gap-3">
          <p className="text-sm text-muted-foreground">Item deleted.</p>
          <Button variant="outline" size="sm" onClick={() => setDeleted(false)}>
            Reset
          </Button>
        </div>
      )
    }

    return (
      <Button
        {...args}
        confirm={{ text: "Click again to confirm", duration: 4000 }}
        startIcon={<Trash2 className="size-4" />}
        onClick={() => {
          setDeleted(true)
        }}
        onMouseEnter={() => setDeleted(false)}
      />
    )
  },
}

export const ConfirmModeControlled: Story = {
  name: "Confirm — Reset on hover-out",
  parameters: {
    docs: {
      description: {
        story: [
          "A controlled variant: if the user hovers away from the button while in confirming state, ",
          "the confirmation resets. This prevents accidental confirmations when the user moves the mouse away.",
          "",
          "The internal `confirm` mechanism fires `onClick` on the second click; ",
          "you can attach `onMouseLeave` or `onPointerLeave` to call `onCancel` yourself.",
        ].join("\n"),
      },
    },
  },
  args: {
    children: "Delete record",
    variant: "destructive",
    startIcon: <Trash2 className="size-4" />,
    confirm: { text: "Sure?", duration: 5000 },
  },
}

export const Debounced: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          "`debounceMs={1000}` prevents the `onClick` from firing more than once per second. ",
          "Click rapidly — only every other second the counter increments.",
          "",
          "Useful for payment forms, API submissions, and any action that should never double-fire.",
        ].join("\n"),
      },
    },
  },
  render: () => {
    const [count, setCount] = React.useState(0)
    return (
      <div className="flex items-center gap-4">
        <Button
          debounceMs={1000}
          variant="destructive"
          onClick={() => setCount((c) => c + 1)}
        >
          Click me fast
        </Button>
        <span className="text-sm text-muted-foreground">
          Clicks: <strong className="text-foreground">{count}</strong> (max 1/s)
        </span>
      </div>
    )
  },
}

export const Tooltip: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          "Add a `tooltip` prop to show a tooltip on hover. ",
          "Accepts a plain string or `{ text, side }` to control placement.",
        ].join("\n"),
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-6">
      <Button
        tooltip="Simple tooltip"
        startIcon={<Download className="size-4" />}
      >
        Download
      </Button>
      <Button
        tooltip={{ text: "This might take a moment", side: "top" }}
        variant="secondary"
        loading
      >
        Processing
      </Button>
      <Button
        tooltip={{ text: "Destructive action", side: "right" }}
        variant="destructive"
      >
        <Trash2 className="size-4" />
      </Button>
      <Button
        tooltip={{ text: "Send email", side: "left" }}
        startIcon={<Mail className="size-4" />}
        variant="outline"
      >
        Email
      </Button>
    </div>
  ),
}

export const KitchenSink: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "All features combined: loading, icons, custom rounded, tooltip, and fullWidth in a single button.",
      },
    },
  },
  args: {
    children: "Publish changes",
    variant: "default",
    size: "lg",
    fullWidth: false,
    rounded: "md",
    startIcon: <Send className="size-4" />,
    tooltip: "Deploy to production",
    loading: false,
  },
  render: (args) => {
    const [loading, setLoading] = React.useState(false)
    return (
      <div className="flex max-w-xs flex-col gap-3">
        <Button
          {...args}
          loading={loading}
          onClick={() => {
            setLoading(true)
            setTimeout(() => setLoading(false), 2500)
          }}
        />
        <p className="text-xs text-muted-foreground">
          Click to simulate a 2.5s async operation.
        </p>
      </div>
    )
  },
}
