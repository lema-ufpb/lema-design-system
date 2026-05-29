import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as React from "react"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "./command"
import {
  SettingsIcon,
  UserIcon,
  PaletteIcon,
  BellIcon,
  MailIcon,
  PlusIcon,
} from "lucide-react"

const meta = {
  title: "Shadcn UI/Command",
  component: CommandDialog,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A fast, searchable command palette and menu list interface driven by keyboard navigation.",
          "",
          "Built on top of **CMDK** by Pacocoursey, it can be mounted inside a modal (`CommandDialog`) or rendered inline (`Command`). It includes sub-components for input fields, group filtering, shortcut indicators, divider separators, and empty states.",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Palette background** | `--popover` | Overall background color of the command menu |",
          "| **Palette text** | `--popover-foreground` | General text color of command options |",
          "| **List item hover/focus** | `--muted` | Background color for currently active/selected list item |",
          "| **List item active text** | `--foreground` | Text color when an item is selected |",
          "| **Sub-headers/Shortcuts** | `--muted-foreground` | Color of group headers and shortcut keys |",
          "| **Input field wrapper** | `--input/50` | Background color transparency for the search bar |",
          "| **Separator lines** | `--border/50` | Faded boundary lines separating list groups |",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof CommandDialog>

export default meta
type Story = StoryObj<typeof meta>

const frameworkItems = [
  { value: "nextjs", label: "Next.js", shortcut: "G" },
  { value: "react", label: "React", shortcut: "R" },
  { value: "vue", label: "Vue", shortcut: "V" },
  { value: "svelte", label: "Svelte", shortcut: "S" },
]

const accountItems = [
  { value: "profile", label: "Profile", shortcut: "P" },
  { value: "billing", label: "Billing", shortcut: "B" },
  { value: "settings", label: "Settings", shortcut: "," },
  { value: "logout", label: "Logout", shortcut: "Q" },
]

const DefaultCommand = () => (
  <>
    <CommandInput placeholder="Type a command or search..." />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Frameworks">
        {frameworkItems.map((item) => (
          <CommandItem key={item.value}>
            <PlusIcon data-icon="inline-start" />
            {item.label}
            <CommandShortcut>{item.shortcut}</CommandShortcut>
          </CommandItem>
        ))}
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="Account">
        {accountItems.map((item) => (
          <CommandItem key={item.value}>
            <UserIcon data-icon="inline-start" />
            {item.label}
            <CommandShortcut>{item.shortcut}</CommandShortcut>
          </CommandItem>
        ))}
      </CommandGroup>
    </CommandList>
  </>
)

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Command dialog with framework and account groups, each item displaying an icon and keyboard shortcut.",
      },
    },
  },
  render: () => (
    <CommandDialog>
      <DefaultCommand />
    </CommandDialog>
  ),
}

export const WithIcons: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Command dialog with action and preference groups using descriptive icons and keyboard shortcuts.",
      },
    },
  },
  render: () => (
    <CommandDialog>
      <CommandInput placeholder="Search..." />
      <CommandList>
        <CommandGroup heading="Actions">
          <CommandItem>
            <UserIcon data-icon="inline-start" />
            Add User
            <CommandShortcut>⌘U</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <MailIcon data-icon="inline-start" />
            Send Email
            <CommandShortcut>⌘E</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <SettingsIcon data-icon="inline-start" />
            Settings
            <CommandShortcut>⌘,</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Preferences">
          <CommandItem>
            <PaletteIcon data-icon="inline-start" />
            Theme
            <CommandShortcut>⌘T</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <BellIcon data-icon="inline-start" />
            Notifications
            <CommandShortcut>⌘N</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  ),
}

export const Empty: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Command dialog showing the empty state message when no results match the search input.",
      },
    },
  },
  render: () => (
    <CommandDialog>
      <CommandInput placeholder="Search..." />
      <CommandList>
        <CommandEmpty>No results found for your search.</CommandEmpty>
      </CommandList>
    </CommandDialog>
  ),
}

export const WithoutDialog: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Inline command palette rendered directly in the page without a modal overlay, inside a bordered container.",
      },
    },
  },
  render: () => (
    <div className="w-full max-w-sm rounded-lg border p-2">
      <Command>
        <CommandInput placeholder="Search commands..." />
        <CommandList>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <PlusIcon data-icon="inline-start" />
              New Project
            </CommandItem>
            <CommandItem>
              <UserIcon data-icon="inline-start" />
              Add Member
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  ),
}
