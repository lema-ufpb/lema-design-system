"use client"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { useEffect, useState } from "react"

import {
  Combobox,
  type ComboboxOption,
  type ComboboxValue,
} from "@/components/ds/combobox"
import { Badge } from "@/components/ui/badge"

const meta = {
  title: "Form/Combobox",
  component: Combobox,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A batteries-included combobox built on **Popover** primitives with **@tanstack/react-virtual** for O(1) rendering regardless of list size.",
          "",
          "- **Search bar** with instant client-side filtering",
          "- **Single and multi-select** via the `multiple` prop",
          "- **Clear all** — inline clear button on trigger + toolbar inside dropdown",
          "- **Size variants** — `sm`, `md`, `lg`",
          "- **Virtualized list** — renders only visible rows, handles 10k+ items smoothly",
          "- **Groups** — set `option.group` to auto-organize items under labeled headers",
          "- **Custom rendering** — `renderOption` slot for rich item content",
          "- **Controlled and uncontrolled** — both patterns supported",
          "",
          "---",
          "",
          "## Data API",
          "",
          "### `options`",
          "",
          "An array of option descriptor objects. Each object represents one selectable item in the dropdown.",
          "",
          "```tsx",
          "const options = [",
          '  { value: "next",  label: "Next.js" },',
          '  { value: "remix", label: "Remix", disabled: true },',
          '  { value: "astro", label: "Astro", group: "Frontend" },',
          "]",
          "```",
          "",
          "#### `ComboboxOption`",
          "",
          "| Field | Type | Required | Description |",
          "| --- | --- | --- | --- |",
          "| `value` | `string \\| number` | ✓ | Unique identifier — returned in `onChange` |",
          "| `label` | `string` | ✓ | Display text shown in the list and trigger |",
          "| `disabled` | `boolean` | — | Prevents selection — item is skipped via keyboard nav |",
          "| `group` | `string` | — | Section header — items with the same `group` are clustered under a labeled divider |",
          "",
          "> **Type:** `ComboboxOption[]`  •  **Required**",
          "",
          "### `renderOption`",
          "",
          "Custom render function for each row. Receives the option and its selection state:",
          "",
          "```tsx",
          "renderOption={(option, selected) => (",
          '  <span className="flex items-center gap-2">',
          "    <span className={option.disabled ? 'opacity-50' : ''} />",
          "    {option.label}",
          "  </span>",
          ")}",
          "```",
          "",
          "> **Type:** `(option: ComboboxOption, selected: boolean) => React.ReactNode`",
          "",
          "### `value` / `onChange`",
          "",
          "| Variant | `value` type | `onChange` signature |",
          "| --- | --- | --- |",
          "| Single | `ComboboxValue \\| null` | `(value: ComboboxValue \\| null) => void` |",
          "| Multiple | `ComboboxValue[]` | `(values: ComboboxValue[]) => void` |",
          "",
          "Where `ComboboxValue = string | number`.",
          "",
          "---",
          "",
          "## Component Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `options` | `ComboboxOption[]` | — | (required) List of selectable options |",
          "| `placeholder` | `string` | — | Placeholder text in trigger |",
          "| `searchPlaceholder` | `string` | — | Placeholder text in search input |",
          "| `emptyText` | `string` | — | Text shown when search yields no results |",
          "| `noOptionsText` | `string` | — | Text shown when options list is empty |",
          "| `loading` | `boolean` | `false` | Skeleton state |",
          "| `disabled` | `boolean` | `false` | Disabled state |",
          "| `clearable` | `boolean` | `true` | Show clear button |",
          "| `searchable` | `boolean` | `true` | Show search bar |",
          "| `maxWidth` | `string \\| number` | — | Max width of the combobox |",
          '| `locale` | `UILocale` | `"en-US"` | i18n locale |',
          '| `size` | `"sm" \\| "md" \\| "lg"` | `"md"` | Size variant |',
          '| `rounded` | `"full" \\| "md" \\| "none"` | `"md"` | Border radius variant |',
          "| `multiple` | `boolean` | `false` | Enable multi-select |",
          "| `value` | `ComboboxValue \\| ComboboxValue[] \\| null` | — | Controlled value |",
          "| `defaultValue` | `ComboboxValue \\| ComboboxValue[] \\| null` | — | Uncontrolled default value |",
          "| `onChange` | `(value) => void` | — | Selection change handler |",
          "| `maxDisplayed` | `number` | `3` | Max visible badges in multi-select |",
          "| `renderOption` | `(option, selected) => ReactNode` | — | Custom option renderer |",
          "| `aria-label` | `string` | — | Accessibility label |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
      table: { defaultValue: { summary: "md" } },
    },
    rounded: {
      control: "inline-radio",
      options: ["full", "md", "none"],
      table: { defaultValue: { summary: "md" } },
    },
    disabled: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    loading: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    clearable: {
      control: "boolean",
      table: { defaultValue: { summary: "true" } },
    },
    searchable: {
      control: "boolean",
      table: { defaultValue: { summary: "true" } },
    },
    multiple: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    placeholder: {
      control: "text",
      table: { defaultValue: { summary: "" } },
    },
    searchPlaceholder: {
      control: "text",
      table: { defaultValue: { summary: "" } },
    },
    emptyText: {
      control: "text",
      table: { defaultValue: { summary: "" } },
    },
    noOptionsText: {
      control: "text",
      table: { defaultValue: { summary: "" } },
    },
    maxWidth: {
      control: "text",
      table: { defaultValue: { summary: "" } },
    },
    locale: {
      control: "inline-radio",
      options: ["en-US", "pt-BR", "es-ES", "fr-FR"],
      table: { defaultValue: { summary: "en-US" } },
    },
  },
} satisfies Meta<typeof Combobox>

export default meta
// Use explicit ComboboxProps for render stories to avoid discriminated-union inference issues
type Story = StoryObj<typeof meta>
type RenderStory = StoryObj<typeof Combobox>

// ── Fixtures ───────────────────────────────────────────────────────────────

const FRAMEWORKS: ComboboxOption[] = [
  { value: "next", label: "Next.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
  { value: "nuxt", label: "Nuxt.js" },
  { value: "svelte", label: "SvelteKit" },
  { value: "solid", label: "SolidStart" },
  { value: "qwik", label: "Qwik" },
]

const GROUPED: ComboboxOption[] = [
  { value: "react", label: "React", group: "Frontend" },
  { value: "vue", label: "Vue", group: "Frontend" },
  { value: "svelte", label: "Svelte", group: "Frontend" },
  { value: "angular", label: "Angular", group: "Frontend" },
  { value: "express", label: "Express", group: "Backend" },
  { value: "fastify", label: "Fastify", group: "Backend" },
  { value: "hono", label: "Hono", group: "Backend" },
  { value: "nestjs", label: "NestJS", group: "Backend" },
  { value: "postgres", label: "PostgreSQL", group: "Database" },
  { value: "mysql", label: "MySQL", group: "Database" },
  { value: "sqlite", label: "SQLite", group: "Database" },
  { value: "mongodb", label: "MongoDB", group: "Database" },
]

const LARGE_LIST: ComboboxOption[] = Array.from({ length: 10_000 }, (_, i) => ({
  value: i,
  label: `Item ${String(i + 1).padStart(5, "0")}`,
  group: `Group ${Math.floor(i / 500) + 1}`,
}))

// ── Stories ────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    options: FRAMEWORKS,
    placeholder: "Select a framework…",
    maxWidth: "320px",
    size: "md",
    rounded: "md",
    loading: false,
    disabled: false,
    clearable: true,
    searchable: true,
    locale: "en-US",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Default single-select combobox with search bar and a list of framework options.",
      },
    },
  },
}

export const SingleControlled: RenderStory = {
  render: () => {
    const [value, setValue] = useState<ComboboxValue | null>("next")
    return (
      <div className="flex flex-col gap-4">
        <Combobox
          options={FRAMEWORKS}
          value={value}
          onChange={setValue}
          placeholder="Select a framework…"
          maxWidth="320px"
        />
        <p className="text-sm text-muted-foreground">
          Selected: <strong>{value ?? "none"}</strong>
        </p>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: "Controlled single-select — selection reflected outside.",
      },
    },
  },
}

export const MultiSelect: RenderStory = {
  render: () => {
    const [values, setValues] = useState<ComboboxValue[]>(["next", "astro"])
    return (
      <div className="flex flex-col gap-4">
        <Combobox
          multiple
          options={FRAMEWORKS}
          value={values}
          onChange={setValues}
          placeholder="Select frameworks…"
          maxWidth="400px"
        />
        <p className="text-sm text-muted-foreground">
          Selected: <strong>{values.join(", ") || "none"}</strong>
        </p>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          "Multi-select with chips in the trigger. The dropdown shows a 'Clear all' toolbar when items are selected.",
      },
    },
  },
}

export const WithGroups: Story = {
  args: {
    options: GROUPED,
    placeholder: "Select a technology…",
    maxWidth: "320px",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Options with a `group` field are automatically sorted into labeled sections inside the dropdown.",
      },
    },
  },
}

export const MultiWithGroups: RenderStory = {
  render: () => {
    const [values, setValues] = useState<ComboboxValue[]>([])
    return (
      <div className="flex flex-col gap-4">
        <Combobox
          multiple
          options={GROUPED}
          value={values}
          onChange={setValues}
          placeholder="Select technologies…"
          maxWidth="400px"
          maxDisplayed={4}
        />
        <p className="text-sm text-muted-foreground">
          {values.length} selected: {values.join(", ") || "none"}
        </p>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          "Multi-select combobox with grouped options — groups auto-label sections in the dropdown.",
      },
    },
  },
}

export const VirtualizedLargeList: RenderStory = {
  render: () => {
    const [value, setValue] = useState<ComboboxValue | null>(null)
    return (
      <div className="flex flex-col gap-4">
        <Combobox
          options={LARGE_LIST}
          value={value}
          onChange={setValue}
          placeholder="Search 10,000 items…"
          searchPlaceholder="Type to filter…"
          maxWidth="360px"
        />
        <p className="text-sm text-muted-foreground">
          Selected:{" "}
          <strong>
            {value !== null ? `Item ${Number(value) + 1}` : "none"}
          </strong>
        </p>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          "10,000 items across 20 groups — only visible rows are rendered. Scroll and search remain fluid.",
      },
    },
  },
}

export const CustomRenderOption: RenderStory = {
  render: () => {
    const LANGS: ComboboxOption[] = [
      { value: "ts", label: "TypeScript", group: "Typed" },
      { value: "rust", label: "Rust", group: "Systems" },
      { value: "go", label: "Go", group: "Systems" },
      { value: "python", label: "Python", group: "Scripting" },
      { value: "js", label: "JavaScript", group: "Scripting" },
      { value: "swift", label: "Swift", group: "Mobile" },
      { value: "kotlin", label: "Kotlin", group: "Mobile" },
    ]

    const COLORS: Record<string, string> = {
      ts: "bg-blue-500",
      rust: "bg-orange-500",
      go: "bg-cyan-500",
      python: "bg-yellow-400",
      js: "bg-yellow-300",
      swift: "bg-orange-400",
      kotlin: "bg-purple-500",
    }

    const [values, setValues] = useState<ComboboxValue[]>(["ts"])

    return (
      <div className="flex flex-col gap-4">
        <Combobox
          multiple
          options={LANGS}
          value={values}
          onChange={setValues}
          placeholder="Select languages…"
          maxWidth="400px"
          renderOption={(opt) => (
            <span className="flex items-center gap-2">
              <span
                className={`size-2 shrink-0 rounded-full ${COLORS[opt.value] ?? "bg-muted"}`}
              />
              <span className="truncate">{opt.label}</span>
              <Badge variant="outline" className="ml-auto text-[10px]">
                {opt.group}
              </Badge>
            </span>
          )}
        />
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          "Pass `renderOption` to fully customize each row — icons, badges, descriptions, etc.",
      },
    },
  },
}

export const LocalePTBR: Story = {
  args: {
    options: FRAMEWORKS,
    placeholder: "Selecione um framework…",
    maxWidth: "320px",
    locale: "pt-BR",
  },
  parameters: {
    docs: {
      description: {
        story: "Portuguese (pt-BR) localization applied to the combobox.",
      },
    },
  },
}

export const Sizes: RenderStory = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size} className="flex items-center gap-4">
          <span className="w-8 shrink-0 text-sm font-medium">{size}</span>
          <Combobox
            size={size}
            options={FRAMEWORKS}
            placeholder={`Size ${size}`}
          />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Comparison of all three size presets — sm, md, and lg.",
      },
    },
  },
}

export const Disabled: Story = {
  args: {
    options: FRAMEWORKS,
    defaultValue: "next",
    disabled: true,
    maxWidth: "320px",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Disabled state preventing the user from opening the combobox or changing the value.",
      },
    },
  },
}

export const DisabledOptions: Story = {
  args: {
    options: FRAMEWORKS.map((o) =>
      ["remix", "nuxt"].includes(o.value as string)
        ? { ...o, disabled: true }
        : o
    ),
    placeholder: "Select a framework…",
    maxWidth: "320px",
  },
  parameters: {
    docs: {
      description: {
        story: "Individual options can be disabled via `option.disabled`.",
      },
    },
  },
}

export const NoSearchBar: Story = {
  args: {
    options: FRAMEWORKS,
    searchable: false,
    placeholder: "Select a framework…",
    maxWidth: "320px",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Set `searchable={false}` to hide the search bar. Keyboard nav (↑↓ Enter Esc) still works via the focused list.",
      },
    },
  },
}

export const RoundedVariants: RenderStory = {
  render: () => (
    <div className="flex flex-col gap-6">
      {(["full", "md", "none"] as const).map((rounded) => (
        <div key={rounded} className="flex items-center gap-4">
          <span className="w-10 shrink-0 text-sm font-medium">{rounded}</span>
          <Combobox
            options={FRAMEWORKS}
            rounded={rounded}
            placeholder={`rounded="${rounded}"`}
            maxWidth="280px"
          />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The `rounded` prop controls the border radius of the trigger, dropdown container, and individual items simultaneously.",
      },
    },
  },
}

export const FluidWidth: RenderStory = {
  render: () => (
    <div className="flex flex-col gap-4">
      <p className="text-xs text-muted-foreground">Full width (default)</p>
      <Combobox options={FRAMEWORKS} placeholder="Fills container…" />
      <p className="text-xs text-muted-foreground">maxWidth: 320px</p>
      <Combobox
        options={FRAMEWORKS}
        placeholder="Capped at 320px…"
        maxWidth="320px"
      />
      <p className="text-xs text-muted-foreground">Two side-by-side</p>
      <div className="flex gap-3">
        <Combobox options={FRAMEWORKS} placeholder="Left…" />
        <Combobox options={FRAMEWORKS} placeholder="Right…" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The component fills its container by default. Use `maxWidth` to cap growth. Two instances share space without overflow.",
      },
    },
  },
}

export const Loading: RenderStory = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size} className="flex items-center gap-4">
          <span className="w-8 shrink-0 text-sm font-medium">{size}</span>
          <Combobox
            loading
            size={size}
            options={FRAMEWORKS}
            placeholder="Loading…"
            maxWidth="320px"
          />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Pass `loading={true}` while fetching remote options. The trigger is replaced by a `Skeleton` that matches the size and rounded variants — no layout shift when data arrives.",
      },
    },
  },
}

export const SimulatedLoading: RenderStory = {
  render: () => {
    const [loading, setLoading] = useState(true)
    const [options, setOptions] = useState<ComboboxOption[]>([])

    useEffect(() => {
      const timer = setTimeout(() => {
        setOptions(FRAMEWORKS)
        setLoading(false)
      }, 2000)
      return () => clearTimeout(timer)
    }, [])

    return (
      <div className="flex flex-col gap-3">
        <Combobox
          loading={loading}
          options={options}
          placeholder="Select a framework…"
          maxWidth="320px"
        />
        <p className="text-xs text-muted-foreground">
          {loading ? "Fetching options…" : `${options.length} options loaded`}
        </p>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          "Simulates a 2-second async fetch. The skeleton holds the trigger's space, then transitions seamlessly to the interactive combobox when data arrives.",
      },
    },
  },
}

export const EmptyOptions: RenderStory = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-xs text-muted-foreground">
          Empty list — default message
        </p>
        <Combobox options={[]} placeholder="Select…" maxWidth="320px" />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xs text-muted-foreground">
          Empty list — custom message
        </p>
        <Combobox
          options={[]}
          placeholder="Select a city…"
          noOptionsText="No cities found for this region."
          maxWidth="320px"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "When `options` is empty the dropdown shows `noOptionsText` (distinct from `emptyText`, which appears only when a search query returns no matches). Use `noOptionsText` to give context-specific guidance.",
      },
    },
  },
}
