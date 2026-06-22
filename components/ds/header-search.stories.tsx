import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { HeaderSearch } from "@/components/ds/header-search"

const meta = {
  title: "Navigation/HeaderSearch",
  component: HeaderSearch,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A compact, expandable search bar designed for global menus and header components.",
          "",
          "Includes transition expansion animations (`isExpanded`), custom corner rounded variants (`full`, `md`, `none`), blur/focus management, keyboard actions support (Esc to close, Enter to submit), and clear buttons.",
          "",
          "## Component Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `placeholder` | `string` | `Search...` | Input placeholder text |",
          "| `isExpanded` | `boolean` | `false` | Controlled expanded state |",
          "| `rounded` | `full` \\| `md` \\| `none` | `full` | Border radius variant |",
          "| `autoFocus` | `boolean` | `true` | Auto-focus input when expanded |",
          "| `locale` | `en-US` \\| `pt-BR` \\| `es-ES` \\| `fr-FR` | `en-US` | Locale for button labels |",
          "| `value` | `string` | — | Controlled input value |",
          "| `onChange` | `(value: string) => void` | — | Called when input value changes |",
          "| `onSearch` | `(value: string) => void` | — | Called on Enter key |",
          "| `className` | `string` | — | Additional CSS classes |",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Outer search input** | `--input` | Border line color of the text input container |",
          "| **Hover buttons** | `--accent` | Highlight backdrop background for search trigger buttons |",
          "| **Icons & Indicators** | `--muted-foreground` | Icon fill color when input is empty or inactive |",
          "| **Focused field** | `--ring` | Ring outline when typing or selecting the search input |",
          "| **Focus backdrop ring** | `--background` | Ring offset background matching local dark/light themes |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    placeholder: {
      control: "text",
      table: { defaultValue: { summary: "Search..." } },
    },
    isExpanded: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    rounded: {
      control: "select",
      options: ["full", "md", "none"],
      table: { defaultValue: { summary: "full" } },
    },
    autoFocus: {
      control: "boolean",
      table: { defaultValue: { summary: "true" } },
    },
    locale: {
      control: "inline-radio",
      options: ["en-US", "pt-BR", "es-ES", "fr-FR"],
      table: { defaultValue: { summary: "en-US" } },
    },
    onSearch: { table: { disable: true } },
    onChange: { table: { disable: true } },
    value: { table: { disable: true } },
  },
} satisfies Meta<typeof HeaderSearch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: "Search indicators...",
    rounded: "full",
    locale: "en-US",
    autoFocus: true,
  },
  render: (args) => (
    <div className="flex h-20 w-full items-center justify-end rounded-lg border bg-card px-8">
      <HeaderSearch {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Compact search bar in collapsed state with full rounded corners.",
      },
    },
  },
}

export const LocalePTBR: Story = {
  args: {
    placeholder: "Search indicators...",
    rounded: "full",
    locale: "pt-BR",
  },
  render: (args) => (
    <div className="flex h-20 w-full items-center justify-end rounded-lg border bg-card px-8">
      <HeaderSearch {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Portuguese (pt-BR) localization — placeholder text translated.",
      },
    },
  },
}

export const Square: Story = {
  args: {
    rounded: "none",
    placeholder: "Square search...",
    isExpanded: true,
  },
  render: (args) => (
    <div className="flex h-20 w-full items-center justify-end rounded-lg border bg-card px-8">
      <HeaderSearch {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Search bar with square corners (rounded='none') and always-expanded state.",
      },
    },
  },
}

export const Expanded: Story = {
  args: {
    isExpanded: true,
    placeholder: "Type something...",
  },
  render: (args) => (
    <div className="flex h-20 w-full items-center justify-end rounded-lg border bg-card px-8">
      <HeaderSearch {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Search bar pre-expanded with a custom placeholder.",
      },
    },
  },
}

export const InHeaderMock: Story = {
  render: () => (
    <header className="flex h-16 w-full items-center justify-between border-b bg-background px-6">
      <div className="flex items-center gap-4">
        <div className="size-8 rounded bg-primary" />
        <span className="font-bold">Lema DS</span>
      </div>
      <nav className="hidden gap-6 text-sm font-medium text-muted-foreground md:flex">
        <a href="#" className="hover:text-foreground">
          Home
        </a>
        <a href="#" className="hover:text-foreground">
          Analytics
        </a>
        <a href="#" className="hover:text-foreground">
          Reports
        </a>
      </nav>
      <div className="flex items-center gap-2">
        <HeaderSearch onSearch={(v) => alert(`Searching for: ${v}`)} />
      </div>
    </header>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Search bar rendered inside a mock header layout with navigation links.",
      },
    },
  },
}
