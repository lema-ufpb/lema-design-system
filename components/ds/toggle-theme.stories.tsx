import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ToggleTheme, ThemeProvider } from "@/components/ds/toggle-theme"

const meta = {
  title: "Actions/ToggleTheme",
  component: ToggleTheme,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: [
          "A theme selector dropdown toggle component utilizing `next-themes` under the hood to manage system/light/dark client settings.",
          "",
          "Wrapper elements re-export `ThemeProvider` setup hooks and configure dropdown lists mapping icons to system presets.",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Trigger Toggle Button** | `--foreground` / `--muted-foreground` | Icon stroke indicator color depending on activity state |",
          "| **Dropdown Popover** | `--popover` | Backdrop popover dropdown context background |",
          "| **Hover Item Highlight** | `--accent` | Hover item selection background |",
        ].join("\n"),
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {
    locale: {
      control: "select",
      options: ["en-US", "pt-BR", "es-ES", "fr-FR"],
      description: "Locale for menu item and trigger labels",
      table: { defaultValue: { summary: "en-US" } },
    },
  },
} satisfies Meta<typeof ToggleTheme>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          "Default theme toggle with system/light/dark options and English labels.",
      },
    },
  },
}

export const Portuguese: Story = {
  args: {
    locale: "pt-BR",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Portuguese (pt-BR) labels for theme options — Claro, Escuro, and Sistema.",
      },
    },
  },
}

export const InHeader: Story = {
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "Theme toggle rendered inside a mock header layout with navigation links.",
      },
    },
  },
  render: (args) => (
    <header className="flex h-16 w-full items-center justify-between border-b bg-background px-6">
      <div className="flex items-center gap-6">
        <div className="size-8 rounded bg-primary" />
        <nav className="flex gap-4 text-sm font-medium">
          <a href="#" className="text-foreground">
            Dashboard
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground">
            Projects
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground">
            Team
          </a>
        </nav>
      </div>
      <ToggleTheme {...args} />
    </header>
  ),
}
