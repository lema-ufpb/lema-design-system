import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { useState, useMemo } from "react"
import { SearchCombo } from "@/components/ds/search-combo"
import type { SearchComboItem } from "@/components/ds/search-combo"
import { BookOpen, Globe, BarChart3, Users, FileText } from "lucide-react"

const meta: Meta<typeof SearchCombo> = {
  title: "Forms/SearchCombo",
  component: SearchCombo,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: [
          "An autocomplete search input component offering categorized group listings, dynamic result filtering, keyboard-friendly option navigation, text highlighting, and speech-to-text integration.",
          "",
          "Supports size scales (`sm`, `md`, `lg`), pill-shaped roundings, header border configurations, and virtualized listing capabilities powered by `@tanstack/react-virtual`.",
          "",
          "---",
          "",
          "## Data API",
          "",
          "### `options`",
          "",
          "An array of search result descriptor objects. Each object represents one item in the autocomplete dropdown.",
          "",
          "```tsx",
          "const options = [",
          "  {",
          '    id: 1, label: "João Pessoa",',
          '    value: "jp",',
          '    group: "Capital",',
          '    icon: <Globe className="size-4" />,',
          "  },",
          "  {",
          '    id: 2, label: "Campina Grande", group: "Interior",',
          "  },",
          "]",
          "```",
          "",
          "#### `SearchComboItem`",
          "",
          "| Field | Type | Required | Description |",
          "| --- | --- | --- | --- |",
          "| `id` | `string \\| number` | ✓ | Unique identifier — returned in `onSelectResult` |",
          "| `label` | `string` | ✓ | Display text — matched against the search query |",
          "| `value` | `string` | — | Alternative value; defaults to `label` if omitted |",
          "| `group` | `string` | — | Section header — items with the same group are clustered |",
          "| `icon` | `ReactNode` | — | Icon rendered to the left of the label |",
          "| `data` | `unknown` | — | Arbitrary payload attached to the item, surfaced in `onSelectResult` |",
          "",
          "> **Type:** `SearchComboItem[]`",
          "",
          "### Controlled input",
          "",
          "```tsx",
          'const [query, setQuery] = useState("")',
          "",
          "<SearchCombo",
          "  value={query}",
          "  onChange={setQuery}",
          '  onSearch={(q) => console.log("Submitted:", q)}',
          '  onSelectResult={(item) => console.log("Selected:", item)}',
          "  options={filteredOptions}",
          "/>",
          "```",
          "",
          "| Prop | Type | Description |",
          "| --- | --- | --- |",
          "| `value` | `string` | Controlled input value |",
          "| `onChange` | `(value: string) => void` | Called on every keystroke |",
          "| `onSearch` | `(value: string) => void` | Called on Enter or button click |",
          "| `onSelectResult` | `(item: SearchComboItem) => void` | Called when a dropdown item is selected |",
          "",
          "---",
          "## Design Tokens & Semantic Variables",
          "",
          "| Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Wrapper Backing** | `--background` | Standard input box fill background |",
          "| **Outer Border** | `--input` | Default outline border boundary color |",
          "| **Hover/Focus outline** | `--ring` | Active focus indicator ring color |",
          "| **Focus Ring Outer Glow** | `--ring/20` | Translucent glow outline halo for active inputs |",
          "| **Popover Backing** | `--popover` | Dropdown floating menu container background |",
          "| **Popover Text** | `--popover-foreground` | Main category labels and text within the dropdown menu |",
          "| **Popover Border** | `--border/80` | Boundary ring border enclosing popover listings |",
          "| **Row Hover / Focus** | `--accent` / `--accent/50` | Row background highlight on hover or arrow-key navigation |",
          "| **Action Button Background** | `--primary` | Main background fill for search submission button |",
          "| **Action Button Text** | `--primary-foreground` | Icon stroke and text color on primary action button |",
          "| **Sub-labels & Spoke Icons** | `--muted-foreground` | Auxiliary placeholder messages, secondary group headers, and icons |",
          "| **Highlighted Query Match** | `--primary` / `--primary/15` | Accent highlight backing for matched text parts |",
        ].join("\n"),
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Controls the overall scale and padding",
      table: { defaultValue: { summary: "md" } },
    },
    rounded: {
      control: "boolean",
      description: "Applies fully rounded pill-shape styling",
      table: { defaultValue: { summary: "false" } },
    },
    border: {
      control: "boolean",
      description: "Inverted/header mode with primary background",
      table: { defaultValue: { summary: "false" } },
    },
    button: {
      control: "boolean",
      description: "Shows or hides the search submit button",
      table: { defaultValue: { summary: "true" } },
    },
    disabled: {
      control: "boolean",
      description: "Disables the input and dropdown",
      table: { defaultValue: { summary: "false" } },
    },
    loading: {
      control: "boolean",
      description: "Shows a loading spinner in place of the search icon",
      table: { defaultValue: { summary: "false" } },
    },
    voice: {
      control: "boolean",
      description: "Enables voice recognition (if supported by browser)",
      table: { defaultValue: { summary: "false" } },
    },
    value: { table: { disable: true } },
    onChange: { table: { disable: true } },
    onSearch: { table: { disable: true } },
    onSelectResult: { table: { disable: true } },
    options: { table: { disable: true } },
    autoFocus: { table: { disable: true } },
    onVoiceStart: { table: { disable: true } },
    onVoiceEnd: { table: { disable: true } },
    onVoiceError: { table: { disable: true } },
  },
  args: {
    size: "md",
    rounded: false,
    border: false,
    button: true,
    disabled: false,
    loading: false,
    voice: false,
    placeholder: "Search topics...",
  },
}

export default meta
type Story = StoryObj<typeof SearchCombo>

const sampleOptions: SearchComboItem[] = [
  { id: "apple", label: "Apple", value: "apple" },
  { id: "banana", label: "Banana", value: "banana" },
  { id: "orange", label: "Orange", value: "orange" },
  { id: "grape", label: "Grape", value: "grape" },
  { id: "mango", label: "Mango", value: "mango" },
  { id: "strawberry", label: "Strawberry", value: "strawberry" },
  { id: "pineapple", label: "Pineapple", value: "pineapple" },
]

const groupedOptions: SearchComboItem[] = [
  { id: "apple", label: "Apple", group: "Fruits" },
  { id: "banana", label: "Banana", group: "Fruits" },
  { id: "orange", label: "Orange", group: "Fruits" },
  { id: "carrot", label: "Carrot", group: "Vegetables" },
  { id: "potato", label: "Potato", group: "Vegetables" },
  { id: "broccoli", label: "Broccoli", group: "Vegetables" },
]

const iconOptions: SearchComboItem[] = [
  {
    id: "docs",
    label: "Documentation",
    group: "Resources",
    icon: <BookOpen />,
  },
  {
    id: "api",
    label: "API Reference",
    group: "Resources",
    icon: <FileText />,
  },
  {
    id: "dashboard",
    label: "Dashboard",
    group: "Pages",
    icon: <BarChart3 />,
  },
  { id: "users", label: "User Management", group: "Pages", icon: <Users /> },
  { id: "site", label: "Public Website", group: "External", icon: <Globe /> },
]

/**
 * Interactive wrapper that handles filtering and state.
 */
const InteractiveSearchCombo = (
  args: Partial<React.ComponentProps<typeof SearchCombo>> & {
    items?: SearchComboItem[]
  }
) => {
  const { items = sampleOptions, ...rest } = args
  const [value, setValue] = useState("")
  const [results, setResults] = useState<SearchComboItem[]>([])

  const handleChange = (val: string) => {
    setValue(val)
    if (!val.trim()) {
      setResults([])
      return
    }
    const filtered = items.filter((r) =>
      r.label.toLowerCase().includes(val.toLowerCase())
    )
    setResults(filtered)
  }

  return (
    <div className="w-[450px]">
      <SearchCombo
        {...rest}
        value={value}
        onChange={handleChange}
        options={results}
        autoFocus={false}
      />
    </div>
  )
}

export const Default: Story = {
  render: (args) => <InteractiveSearchCombo {...args} />,
}

export const AllSizes: Story = {
  parameters: {
    docs: {
      description: {
        story: "Available size variations: `sm`, `md`, and `lg`",
      },
    },
  },
  render: () => (
    <div className="flex w-[450px] flex-col gap-4">
      <InteractiveSearchCombo size="sm" placeholder="Small (sm)" />
      <InteractiveSearchCombo size="md" placeholder="Medium (md)" />
      <InteractiveSearchCombo size="lg" placeholder="Large (lg)" />
    </div>
  ),
}

export const WithGroups: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Results are grouped by the `group` field with visual headers separating each group.",
      },
    },
  },
  render: (args) => (
    <InteractiveSearchCombo
      {...args}
      items={groupedOptions}
      placeholder="Search fruits or vegetables..."
    />
  ),
}

export const WithIcons: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Each result item can display an icon for better visual recognition.",
      },
    },
  },
  render: (args) => (
    <InteractiveSearchCombo
      {...args}
      items={iconOptions}
      placeholder="Search pages..."
    />
  ),
}

export const Rounded: Story = {
  render: (args) => (
    <InteractiveSearchCombo
      {...args}
      rounded
      placeholder="Pill-shaped search..."
    />
  ),
}

export const BorderMode: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "The `border` mode renders the input with an inverted primary background, ideal for dark headers or navbars.",
      },
    },
  },
  render: (args) => (
    <div className="flex w-[500px] flex-col gap-4 rounded-lg bg-muted/50 p-6">
      <InteractiveSearchCombo {...args} border placeholder="Header search..." />
      <InteractiveSearchCombo
        {...args}
        border
        rounded
        placeholder="Rounded header search..."
      />
    </div>
  ),
}

export const WithoutButton: Story = {
  render: (args) => (
    <InteractiveSearchCombo
      {...args}
      button={false}
      placeholder="No button..."
    />
  ),
}

export const Disabled: Story = {
  render: () => {
    const [value, setValue] = useState("")
    return (
      <div className="w-[450px]">
        <SearchCombo
          value={value}
          onChange={setValue}
          options={sampleOptions}
          disabled
          autoFocus={false}
          placeholder="Disabled search..."
        />
      </div>
    )
  },
}

export const Loading: Story = {
  render: () => {
    const [value, setValue] = useState("")
    return (
      <div className="w-[450px]">
        <SearchCombo
          value={value}
          onChange={setValue}
          options={[]}
          loading
          autoFocus={false}
          placeholder="Loading..."
        />
      </div>
    )
  },
}

export const WithVoice: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Enables the microphone button for speech-to-text. Note: This only appears in browsers that support the Web Speech API (like Chrome).",
      },
    },
  },
  render: (args) => (
    <InteractiveSearchCombo
      {...args}
      voice
      placeholder="Click the microphone to speak..."
    />
  ),
}

export const EmptyState: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Shows the `emptyMessage` when the user has typed a query but no results match. Type anything to see the empty state.",
      },
    },
  },
  render: (args) => {
    const [value, setValue] = useState("")
    return (
      <div className="w-[450px]">
        <SearchCombo
          {...args}
          value={value}
          onChange={setValue}
          options={[]}
          autoFocus={false}
          emptyMessage="No matching topics found."
          placeholder="Try typing something..."
        />
      </div>
    )
  },
}

export const WithOnSearch: Story = {
  render: () => {
    const [value, setValue] = useState("")
    const [searched, setSearched] = useState<string | null>(null)
    const [results, setResults] = useState<SearchComboItem[]>([])

    const handleChange = (val: string) => {
      setValue(val)
      if (!val.trim()) {
        setResults([])
        return
      }
      setResults(
        sampleOptions.filter((r) =>
          r.label.toLowerCase().includes(val.toLowerCase())
        )
      )
    }

    return (
      <div className="flex w-[450px] flex-col gap-4">
        <SearchCombo
          value={value}
          onChange={handleChange}
          options={results}
          onSearch={(v) => setSearched(v)}
          autoFocus={false}
        />
        {searched && (
          <p className="text-sm text-muted-foreground">
            Searched: <strong>{searched}</strong>
          </p>
        )}
      </div>
    )
  },
}

export const WithOnSelectResult: Story = {
  render: () => {
    const [value, setValue] = useState("")
    const [selected, setSelected] = useState<string | null>(null)
    const [results, setResults] = useState<SearchComboItem[]>([])

    const handleChange = (val: string) => {
      setValue(val)
      if (!val.trim()) {
        setResults([])
        return
      }
      setResults(
        sampleOptions.filter((r) =>
          r.label.toLowerCase().includes(val.toLowerCase())
        )
      )
    }

    return (
      <div className="flex w-[450px] flex-col gap-4">
        <SearchCombo
          value={value}
          onChange={handleChange}
          options={results}
          onSelectResult={(item) => setSelected(item.label)}
          autoFocus={false}
        />
        {selected && (
          <p className="text-sm text-muted-foreground">
            Selected: <strong>{selected}</strong>
          </p>
        )}
      </div>
    )
  },
}

export const Virtualized: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Dropdown renders 500 items via `@tanstack/react-virtual`. Only visible rows are mounted in the DOM at any time. Type `0` to match all 500 results and observe constant scroll performance.",
      },
    },
  },
  render: () => {
    const [value, setValue] = useState("")
    const [results, setResults] = useState<SearchComboItem[]>([])

    const dataset = useMemo(() => {
      const groups = [
        "Engineering",
        "Design",
        "Product",
        "Marketing",
        "Operations",
      ]
      return Array.from({ length: 500 }, (_, i) => ({
        id: i + 1,
        label: `User ${String(i + 1).padStart(3, "0")}`,
        group: groups[i % groups.length],
      }))
    }, [])

    const handleChange = (val: string) => {
      setValue(val)
      if (!val.trim()) {
        setResults([])
        return
      }
      setResults(
        dataset.filter(
          (item) =>
            item.label.toLowerCase().includes(val.toLowerCase()) ||
            item.group.toLowerCase().includes(val.toLowerCase())
        )
      )
    }

    return (
      <div className="flex w-[450px] flex-col gap-3">
        <p className="text-sm text-muted-foreground">
          500 items — only visible rows are in the DOM
        </p>
        <SearchCombo
          value={value}
          onChange={handleChange}
          options={results}
          autoFocus={false}
          placeholder="Type User for all 500 results..."
        />
        {results.length > 0 && (
          <p className="text-xs text-muted-foreground">
            {results.length} result{results.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>
    )
  },
}

export const AllVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: "All available variant combinations side by side.",
      },
    },
  },
  render: () => (
    <div className="flex w-[450px] flex-col gap-4">
      <InteractiveSearchCombo placeholder="Default" />
      <InteractiveSearchCombo rounded placeholder="Rounded" />
      <InteractiveSearchCombo border placeholder="Border mode" />
      <InteractiveSearchCombo button={false} placeholder="No button" />
      <InteractiveSearchCombo size="sm" placeholder="Small" />
      <InteractiveSearchCombo size="lg" placeholder="Large" />
      <InteractiveSearchCombo voice placeholder="Voice recognition" />
    </div>
  ),
}
