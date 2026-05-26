import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
  ContextMenuRadioGroup,
} from "./context-menu"

const meta = {
  title: "Shadcn UI/Context Menu",
  component: ContextMenu,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A right-click context menu built on Radix UI's ContextMenu primitive.",
          "",
          "Provides menu items, sub-menus, checkbox and radio items, labels, separators, and keyboard shortcut indicators. Items support `inset` layout and a `variant` prop (`default` | `destructive`).",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Variant / Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Content background** | `--popover` | Dropdown surface background |",
          "| **Content text** | `--popover-foreground` | Default text color inside menu |",
          "| **Item focus** | `--accent` / `--accent-foreground` | Hover/focus highlight on items |",
          "| **Destructive text** | `--destructive` | Text color for destructive variant items |",
          "| **Destructive focus bg** | `--destructive/10` | Background tint on destructive item focus |",
          "| **Separator** | `--border/50` | Divider line between menu groups |",
          "| **Label text** | `--muted-foreground` | Category label color |",
          "| **Ring** | `--ring` / `--ring/5` | Popover border ring (subtle) |",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof ContextMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Full-featured context menu with edit actions, sharing options, a submenu, and a destructive delete item.",
      },
    },
  },
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-32 w-80 items-center justify-center rounded-3xl border-2 border-dashed border-border bg-muted/30 text-sm text-muted-foreground">
        Right-click here
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>
          Edit
          <ContextMenuShortcut>⌘E</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Duplicate
          <ContextMenuShortcut>⌘D</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuLabel>Sharing</ContextMenuLabel>
        <ContextMenuItem inset>Share via Email</ContextMenuItem>
        <ContextMenuItem inset>Copy Link</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuSub>
          <ContextMenuSubTrigger inset>More Actions</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>Bookmark</ContextMenuItem>
            <ContextMenuItem>Report</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">
          Delete
          <ContextMenuShortcut>⌘⌫</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
}

export const CheckboxItems: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Context menu with toggleable checkbox items for showing sidebar, toolbar, and status bar.",
      },
    },
  },
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-32 w-80 items-center justify-center rounded-3xl border-2 border-dashed border-border bg-muted/30 text-sm text-muted-foreground">
        Right-click here
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuCheckboxItem checked>Show Sidebar</ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem>Show Toolbar</ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem>Show Status Bar</ContextMenuCheckboxItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
}

export const RadioItems: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Context menu with a radio group for selecting a sort order (name, date, or size).",
      },
    },
  },
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-32 w-80 items-center justify-center rounded-3xl border-2 border-dashed border-border bg-muted/30 text-sm text-muted-foreground">
        Right-click here
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>Sort By</ContextMenuLabel>
        <ContextMenuRadioGroup value="name">
          <ContextMenuRadioItem value="name">Name</ContextMenuRadioItem>
          <ContextMenuRadioItem value="date">Date</ContextMenuRadioItem>
          <ContextMenuRadioItem value="size">Size</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  ),
}
