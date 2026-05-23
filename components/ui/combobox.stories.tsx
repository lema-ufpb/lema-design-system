import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as React from "react"
import {
  Combobox,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxEmpty,
  ComboboxInput,
  useComboboxAnchor,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
} from "./combobox"
import { Button } from "./button"
import { Badge } from "./badge"

const meta = {
  title: "Shadcn UI/Combobox",
  component: Combobox,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "An autocomplete combobox built on **@base-ui/react Combobox**, supporting single-select, multi-select with chips, groups, custom filtering, and keyboard navigation.",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Popup background** | `--popover` | Dropdown list background |",
          "| **Popup text** | `--popover-foreground` | Item text color |",
          "| **Highlighted item** | `--accent` / `--accent-foreground` | Active/hover item highlight |",
          "| **Border** | `--border` | Popup outline and separators |",
          "| **Muted text** | `--muted-foreground` | Group labels and placeholder |",
          "| **Input background** | `--input` | Input field styling |",
          "| **Danger ring** | `--destructive` | Invalid state border |",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof Combobox>

export default meta
type Story = StoryObj<typeof meta>

const FRAMEWORKS = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
  { value: "angular", label: "Angular" },
  { value: "next", label: "Next.js" },
  { value: "nuxt", label: "Nuxt" },
  { value: "remix", label: "Remix" },
  { value: "solid", label: "Solid" },
  { value: "qwik", label: "Qwik" },
  { value: "astro", label: "Astro" },
]

const GROUPED_OPTIONS = [
  { value: "react", label: "React", group: "Library" },
  { value: "vue", label: "Vue", group: "Library" },
  { value: "svelte", label: "Svelte", group: "Library" },
  { value: "angular", label: "Angular", group: "Library" },
  { value: "next", label: "Next.js", group: "Meta-framework" },
  { value: "nuxt", label: "Nuxt", group: "Meta-framework" },
  { value: "remix", label: "Remix", group: "Meta-framework" },
  { value: "astro", label: "Astro", group: "Meta-framework" },
]

export const Default: Story = {
  name: "Single Select",
  render: function Render() {
    const [value, setValue] = React.useState<string | null>(null)
    const anchorRef = useComboboxAnchor()
    return (
      <div className="flex flex-col gap-4">
        <Combobox value={value} onValueChange={setValue}>
          <div ref={anchorRef}>
            <ComboboxInput placeholder="Pick a framework" />
          </div>
          <ComboboxContent anchor={anchorRef.current}>
            <ComboboxList>
              {FRAMEWORKS.map((fw) => (
                <ComboboxItem key={fw.value} value={fw.value}>
                  {fw.label}
                </ComboboxItem>
              ))}
              <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
        <p className="text-sm text-muted-foreground">
          Selected: <span className="font-mono">{value ?? "none"}</span>
        </p>
      </div>
    )
  },
}

export const WithClear: Story = {
  render: function Render() {
    const [value, setValue] = React.useState<string | null>("react")
    const anchorRef = useComboboxAnchor()
    return (
      <Combobox value={value} onValueChange={setValue}>
        <div ref={anchorRef}>
          <ComboboxInput showClear placeholder="Pick a framework" />
        </div>
        <ComboboxContent anchor={anchorRef.current}>
          <ComboboxList>
            {FRAMEWORKS.map((fw) => (
              <ComboboxItem key={fw.value} value={fw.value}>
                {fw.label}
              </ComboboxItem>
            ))}
            <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    )
  },
}

export const Disabled: Story = {
  render: function Render() {
    const anchorRef = useComboboxAnchor()
    return (
      <Combobox defaultOpen={false}>
        <div ref={anchorRef}>
          <ComboboxInput disabled placeholder="Cannot interact" />
        </div>
        <ComboboxContent anchor={anchorRef.current}>
          <ComboboxList>
            {FRAMEWORKS.map((fw) => (
              <ComboboxItem key={fw.value} value={fw.value}>
                {fw.label}
              </ComboboxItem>
            ))}
            <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    )
  },
}

export const WithGroups: Story = {
  render: function Render() {
    const [value, setValue] = React.useState<string | null>(null)
    const anchorRef = useComboboxAnchor()
    const groups = React.useMemo(() => {
      const map = new Map<string, typeof GROUPED_OPTIONS>()
      for (const opt of GROUPED_OPTIONS) {
        const g = map.get(opt.group) ?? []
        g.push(opt)
        map.set(opt.group, g)
      }
      return map
    }, [])

    return (
      <Combobox value={value} onValueChange={setValue}>
        <div ref={anchorRef}>
          <ComboboxInput placeholder="Pick a framework" />
        </div>
        <ComboboxContent anchor={anchorRef.current}>
          <ComboboxList>
            {Array.from(groups.entries()).map(([group, items]) => (
              <ComboboxGroup key={group}>
                <ComboboxLabel>{group}</ComboboxLabel>
                {items.map((item) => (
                  <ComboboxItem key={item.value} value={item.value}>
                    {item.label}
                  </ComboboxItem>
                ))}
              </ComboboxGroup>
            ))}
            <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    )
  },
}

export const MultiSelect: Story = {
  name: "Multi Select with Chips",
  render: function Render() {
    const [value, setValue] = React.useState<string[]>(["react", "next"])
    const anchorRef = useComboboxAnchor()

    return (
      <Combobox value={value} onValueChange={setValue} multiple>
        <div ref={anchorRef}>
          <ComboboxChips>
            {(value as string[]).map((v) => {
              const item = FRAMEWORKS.find((f) => f.value === v)
              if (!item) return null
              return <ComboboxChip key={v}>{item.label}</ComboboxChip>
            })}
            <ComboboxChipsInput placeholder="Add frameworks..." />
          </ComboboxChips>
        </div>
        <ComboboxContent anchor={anchorRef.current}>
          <ComboboxList>
            {FRAMEWORKS.map((fw) => (
              <ComboboxItem key={fw.value} value={fw.value}>
                {fw.label}
              </ComboboxItem>
            ))}
            <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    )
  },
}

export const WithCustomFilter: Story = {
  name: "Custom Filter",
  render: function Render() {
    const [value, setValue] = React.useState<string | null>(null)
    const [search, setSearch] = React.useState("")
    const anchorRef = useComboboxAnchor()

    const filtered = FRAMEWORKS.filter(
      (fw) =>
        fw.label.toLowerCase().includes(search.toLowerCase()) ||
        fw.value.includes(search.toLowerCase())
    )

    return (
      <Combobox value={value} onValueChange={setValue}>
        <div ref={anchorRef}>
          <ComboboxInput
            placeholder="Type to filter..."
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
          />
        </div>
        <ComboboxContent anchor={anchorRef.current}>
          <ComboboxList>
            {filtered.map((fw) => (
              <ComboboxItem key={fw.value} value={fw.value}>
                {fw.label}
              </ComboboxItem>
            ))}
            <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    )
  },
}

export const ControlledValue: Story = {
  name: "Controlled",
  render: function Render() {
    const [value, setValue] = React.useState<string | null>(null)
    const anchorRef = useComboboxAnchor()

    return (
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          {["react", "vue", "svelte"].map((fw) => (
            <Button
              key={fw}
              variant={value === fw ? "default" : "outline"}
              size="sm"
              onClick={() => setValue(fw)}
            >
              {fw}
            </Button>
          ))}
          <Button variant="ghost" size="sm" onClick={() => setValue(null)}>
            Clear
          </Button>
        </div>
        <Combobox value={value} onValueChange={setValue}>
          <div ref={anchorRef}>
            <ComboboxInput placeholder="Pick a framework" />
          </div>
          <ComboboxContent anchor={anchorRef.current}>
            <ComboboxList>
              {FRAMEWORKS.map((fw) => (
                <ComboboxItem key={fw.value} value={fw.value}>
                  {fw.label}
                </ComboboxItem>
              ))}
              <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
    )
  },
}

export const WithBadgeValue: Story = {
  name: "Custom Value Display",
  render: function Render() {
    const [value, setValue] = React.useState<string | null>(null)
    const anchorRef = useComboboxAnchor()
    const selected = FRAMEWORKS.find((fw) => fw.value === value)

    return (
      <Combobox value={value} onValueChange={setValue}>
        <div ref={anchorRef} className="flex items-center gap-2">
          {selected ? (
            <Badge variant="secondary" className="cursor-pointer">
              {selected.label}
            </Badge>
          ) : (
            <ComboboxInput placeholder="Pick a framework" />
          )}
        </div>
        <ComboboxContent anchor={anchorRef.current}>
          <ComboboxList>
            {FRAMEWORKS.map((fw) => (
              <ComboboxItem key={fw.value} value={fw.value}>
                {fw.label}
              </ComboboxItem>
            ))}
            <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    )
  },
}
