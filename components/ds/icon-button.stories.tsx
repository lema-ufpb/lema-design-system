import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  Bell,
  Bookmark,
  Copy,
  Download,
  Edit,
  EllipsisVertical,
  Heart,
  Link,
  MessageSquare,
  Pencil,
  RefreshCw,
  Search,
  Settings,
  Share2,
  Star,
  Trash2,
  Upload,
  X,
} from "lucide-react"
import { IconButton } from "./icon-button"

const meta = {
  title: "Actions/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "An accessible icon button with built-in tooltip.",
          "Builds on the shadcn/ui `Button` using icon-specific sizes",
          "and wraps the `Tooltip` automatically.",
          "",
          "## Component Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `icon` | `ReactNode` | — | (required) The icon to display |",
          "| `label` | `string` | — | (required) Accessible label — becomes `aria-label` and default tooltip text |",
          "| `tooltip` | `string \\| false` | — | Override tooltip text; pass `false` to disable tooltip |",
          "| `tooltipSide` | `top` \\| `right` \\| `bottom` \\| `left` | `bottom` | Side the tooltip appears on |",
          "| `variant` | `default` \\| `outline` \\| `secondary` \\| `ghost` \\| `destructive` \\| `link` | `ghost` | Visual variant |",
          "| `size` | `icon-xs` \\| `icon-sm` \\| `icon` \\| `icon-lg` | `icon` | Button size |",
          "| `rounded` | `none` \\| `md` \\| `full` | `md` | Border radius |",
          "| `loading` | `boolean` | `false` | Show spinner and disable interaction |",
          "| `disabled` | `boolean` | `false` | Disable the button |",
          "| `className` | `string` | — | Additional CSS classes |",
          "",
          "## Behavior",
          "",
          "- `label` is always required — becomes the `aria-label` and default tooltip text",
          "- `tooltip={false}` disables the tooltip without removing the `aria-label`",
          '- `tooltip="text"` overrides the tooltip while preserving the original `aria-label`',
          "- `loading` replaces the icon with a spinner and disables interaction",
          "",
          "## Available sizes",
          "",
          "| Size | Dimension |",
          "| --- | --- |",
          "| `icon-xs` | 24 × 24px |",
          "| `icon-sm` | 32 × 32px |",
          "| `icon` | 36 × 36px (default) |",
          "| `icon-lg` | 40 × 40px |",
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
      table: { defaultValue: { summary: "ghost" } },
    },
    size: {
      control: "inline-radio",
      options: ["icon-xs", "icon-sm", "icon", "icon-lg"],
      table: { defaultValue: { summary: "icon" } },
    },
    tooltipSide: {
      control: "select",
      options: ["top", "right", "bottom", "left"],
      table: { defaultValue: { summary: "bottom" } },
    },
    rounded: {
      control: "inline-radio",
      options: ["none", "md", "full"],
      table: { defaultValue: { summary: "md" } },
    },
    loading: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    disabled: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    tooltip: {
      control: "text",
      table: { defaultValue: { summary: "" } },
    },
    label: {
      control: "text",
      table: { defaultValue: { summary: "" } },
    },
    icon: { table: { disable: true } },
    className: { table: { disable: true } },
  },
} satisfies Meta<typeof IconButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    icon: <Bell />,
    label: "Notifications",
    tooltipSide: "bottom",
    variant: "ghost",
    size: "icon",
    rounded: "md",
    loading: false,
  },
  parameters: {
    docs: {
      description: {
        story: "Default IconButton with a Bell icon and ghost variant.",
      },
    },
  },
}

export const Playground: Story = {
  args: {
    icon: <Settings />,
    label: "Settings",
    variant: "ghost",
    size: "icon",
    rounded: "md",
    tooltipSide: "bottom",
    loading: false,
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive playground with all control knobs exposed for experimentation.",
      },
    },
  },
}

export const Variants: Story = {
  args: { icon: <Star />, label: "Variant" },
  parameters: {
    docs: {
      description: {
        story: "All Button variants applied to IconButton.",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <IconButton icon={<Star />} label="Default" variant="default" />
      <IconButton icon={<Star />} label="Outline" variant="outline" />
      <IconButton icon={<Star />} label="Secondary" variant="secondary" />
      <IconButton icon={<Star />} label="Ghost" variant="ghost" />
      <IconButton icon={<Trash2 />} label="Destructive" variant="destructive" />
    </div>
  ),
}

export const Sizes: Story = {
  args: { icon: <Search />, label: "Size showcase" },
  parameters: {
    docs: {
      description: { story: "Four icon sizes — icon-xs to icon-lg." },
    },
  },
  render: () => (
    <div className="flex items-end gap-3">
      <div className="flex flex-col items-center gap-2">
        <IconButton
          icon={<Search />}
          label="Search"
          size="icon-xs"
          variant="outline"
        />
        <span className="text-xs text-muted-foreground">xs · 24px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <IconButton
          icon={<Search />}
          label="Search"
          size="icon-sm"
          variant="outline"
        />
        <span className="text-xs text-muted-foreground">sm · 32px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <IconButton
          icon={<Search />}
          label="Search"
          size="icon"
          variant="outline"
        />
        <span className="text-xs text-muted-foreground">icon · 36px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <IconButton
          icon={<Search />}
          label="Search"
          size="icon-lg"
          variant="outline"
        />
        <span className="text-xs text-muted-foreground">lg · 40px</span>
      </div>
    </div>
  ),
}

export const Rounded: Story = {
  args: { icon: <Star />, label: "Rounded showcase" },
  parameters: {
    docs: {
      description: {
        story:
          "Three border radius options: `none` (square), `md` (default — inherited from Button), `full` (circular).",
      },
    },
  },
  render: () => (
    <div className="flex items-end gap-8">
      {(["none", "md", "full"] as const).map((r) => (
        <div key={r} className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            <IconButton
              icon={<Star />}
              label={r}
              rounded={r}
              variant="outline"
              size="icon-sm"
            />
            <IconButton
              icon={<Star />}
              label={r}
              rounded={r}
              variant="secondary"
              size="icon"
            />
            <IconButton
              icon={<Star />}
              label={r}
              rounded={r}
              variant="default"
              size="icon-lg"
            />
          </div>
          <span className="text-xs text-muted-foreground">{r}</span>
        </div>
      ))}
    </div>
  ),
}

export const TooltipSides: Story = {
  args: { icon: <Upload />, label: "Tooltip sides" },
  parameters: {
    layout: "centered",
    docs: {
      description: { story: "Tooltip can appear on any side." },
    },
  },
  render: () => (
    <div className="grid grid-cols-3 place-items-center gap-4 p-8">
      <div />
      <IconButton
        icon={<Upload />}
        label="Top"
        tooltipSide="top"
        variant="outline"
      />
      <div />
      <IconButton
        icon={<Upload />}
        label="Left"
        tooltipSide="left"
        variant="outline"
      />
      <IconButton
        icon={<Upload />}
        label="Center"
        tooltip={false}
        variant="secondary"
      />
      <IconButton
        icon={<Upload />}
        label="Right"
        tooltipSide="right"
        variant="outline"
      />
      <div />
      <IconButton
        icon={<Upload />}
        label="Bottom"
        tooltipSide="bottom"
        variant="outline"
      />
      <div />
    </div>
  ),
}

export const Loading: Story = {
  args: { icon: <Download />, label: "Loading" },
  parameters: {
    docs: {
      description: {
        story:
          "Loading state replaces the icon with a spinner and disables the button.",
      },
    },
  },
  render: () => (
    <div className="flex items-center gap-3">
      <IconButton
        icon={<Download />}
        label="Download"
        loading
        variant="outline"
      />
      <IconButton
        icon={<RefreshCw />}
        label="Refresh"
        loading
        variant="secondary"
      />
      <IconButton icon={<Upload />} label="Upload" loading />
    </div>
  ),
}

export const States: Story = {
  args: { icon: <Bookmark />, label: "Save" },
  parameters: {
    docs: {
      description: {
        story: "Comparison between idle, loading, and disabled states.",
      },
    },
  },
  render: () => (
    <div className="flex items-center gap-6">
      {(["Idle", "Loading", "Disabled"] as const).map((state) => (
        <div key={state} className="flex flex-col items-center gap-2">
          <IconButton
            icon={<Bookmark />}
            label="Save"
            variant="outline"
            loading={state === "Loading"}
            disabled={state === "Disabled"}
          />
          <span className="text-xs text-muted-foreground">{state}</span>
        </div>
      ))}
    </div>
  ),
}

export const NoTooltip: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`tooltip={false}` removes the tooltip but preserves the `aria-label`.",
      },
    },
  },
  args: {
    icon: <X />,
    label: "Close",
    tooltip: false,
    variant: "ghost",
  },
}

export const ToolbarExample: Story = {
  name: "Toolbar — Rich Text",
  args: { icon: <Edit />, label: "Toolbar" },
  parameters: {
    docs: {
      description: {
        story:
          "Real-world example: rich text editor toolbar with action groups.",
      },
    },
  },
  render: () => (
    <div className="inline-flex items-center gap-0.5 rounded-xl border border-border bg-background p-1 shadow-sm">
      <IconButton icon={<Edit />} label="Edit" size="icon-sm" />
      <IconButton icon={<Copy />} label="Copy" size="icon-sm" />
      <IconButton icon={<Link />} label="Copy link" size="icon-sm" />

      <div className="mx-1 h-5 w-px bg-border" />

      <IconButton icon={<MessageSquare />} label="Comment" size="icon-sm" />
      <IconButton icon={<Heart />} label="Like" size="icon-sm" />
      <IconButton icon={<Bookmark />} label="Save" size="icon-sm" />

      <div className="mx-1 h-5 w-px bg-border" />

      <IconButton icon={<Share2 />} label="Share" size="icon-sm" />
      <IconButton
        icon={<Trash2 />}
        label="Delete"
        size="icon-sm"
        variant="destructive"
      />
      <IconButton
        icon={<EllipsisVertical />}
        label="More options"
        size="icon-sm"
      />
    </div>
  ),
}

export const CardActions: Story = {
  args: { icon: <Pencil />, label: "Edit" },
  parameters: {
    docs: {
      description: {
        story: "Common pattern: inline actions in cards or list items.",
      },
    },
  },
  render: () => (
    <div className="flex w-80 flex-col gap-2">
      {["Design System v2", "Component Library", "Storybook Setup"].map(
        (name) => (
          <div
            key={name}
            className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3"
          >
            <span className="text-sm font-medium">{name}</span>
            <div className="flex items-center gap-0.5">
              <IconButton
                icon={<Pencil />}
                label={`Edit ${name}`}
                size="icon-sm"
                tooltip="Edit"
              />
              <IconButton
                icon={<Star />}
                label={`Star ${name}`}
                size="icon-sm"
                tooltip="Star"
              />
              <IconButton
                icon={<Trash2 />}
                label={`Delete ${name}`}
                size="icon-sm"
                tooltip="Delete"
                variant="destructive"
              />
            </div>
          </div>
        )
      )}
    </div>
  ),
}
