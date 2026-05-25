import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarCheckboxItem,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
  MenubarRadioGroup,
} from "./menubar"

const meta = {
  title: "Shadcn UI/Menubar",
  component: Menubar,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A horizontal menu bar with dropdown menus, built on Radix UI's Menubar primitive.",
          "",
          'Provides nested menus, checkbox and radio items, labels, separators, and keyboard shortcut indicators. Items support `inset` layout and a `variant` prop (`default` | `destructive`). Content accepts `align` (default `"start"`).',
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Variant / Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Menubar border** | `--border` | Outer border of the menubar |",
          "| **Trigger hover** | `--muted` | Highlight on trigger hover |",
          "| **Content background** | `--popover` | Dropdown surface background |",
          "| **Content text** | `--popover-foreground` | Default text color in dropdown |",
          "| **Item focus** | `--accent` / `--accent-foreground` | Hover/focus highlight on items |",
          "| **Destructive text** | `--destructive` | Text color for destructive variant |",
          "| **Destructive focus bg** | `--destructive/10` | Background tint on destructive focus |",
          "| **Separator** | `--border/50` | Divider line between groups |",
          "| **Label text** | `--muted-foreground` | Category label color |",
          "| **Ring** | `--ring` / `--ring/5` | Subtle popover border ring |",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof Menubar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Horizontal menubar with File, Edit, and View menus featuring items, keyboard shortcuts, a destructive item, checkbox items, and a submenu with radio group options.",
      },
    },
  },
  render: () => (
    <Menubar className="w-fit">
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New File
            <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Open
            <MenubarShortcut>⌘O</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem variant="destructive">
            Close
            <MenubarShortcut>⌘W</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Undo
            <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Redo
            <MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem checked>Show Sidebar</MenubarCheckboxItem>
          <MenubarCheckboxItem>Show Toolbar</MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Zoom</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarRadioGroup value="100">
                <MenubarRadioItem value="75">75%</MenubarRadioItem>
                <MenubarRadioItem value="100">100%</MenubarRadioItem>
                <MenubarRadioItem value="150">150%</MenubarRadioItem>
              </MenubarRadioGroup>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
}
