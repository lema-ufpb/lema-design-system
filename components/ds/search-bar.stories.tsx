import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as React from "react"
import {
  SlidersHorizontalIcon,
  MapPinIcon,
  BookOpenIcon,
  UserSearchIcon,
} from "lucide-react"

import { SearchBar, SearchBarSkeleton } from "@/components/ds/search-bar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const meta = {
  title: "Form/SearchBar",
  component: SearchBar,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A full-width, composable search bar for use in the body of any page.",
          "",
          "Supports three visual variants (`outline`, `filled`, `ghost`), three sizes (`sm`, `md`, `lg`),",
          "six border-radius presets (`none` → `full`), a built-in clear button, an animated loading spinner,",
          "a keyboard shortcut hint via the `Kbd` component, an arbitrary `trailingSlot` for filter badges,",
          "action buttons, or separators, and an optional **voice input** button powered by the Web Speech API.",
          "",
          "Works in both **controlled** (`value` + `onChange`) and **uncontrolled** (`defaultValue`) modes.",
          "The `debounceMs` prop delays `onChange` callbacks without blocking the local input state.",
          "",
          "## Keyboard behavior",
          "",
          "| Key | Action |",
          "| --- | --- |",
          "| `Enter` | Calls `onSearch(value)` |",
          "| `Escape` | Clears input and keeps focus |",
          "",
          "## Design Tokens",
          "",
          "| Element | Token | Purpose |",
          "| --- | --- | --- |",
          "| Border (default) | `--border` | Resting state |",
          "| Border (hover) | `--ring/50` | Subtle hover feedback |",
          "| Border + ring (focus-within) | `--ring` | Active focus indicator |",
          "| Clear button hover | `--accent` | Neutral hover surface |",
          "| Placeholder | `--muted-foreground` | Reduced contrast hint |",
          "| Icon | `--muted-foreground` | Consistent with placeholder |",
          "| Loading spinner | `--muted-foreground` | Inherits icon color |",
          "",
          "## Component Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `value` | `string` | — | Controlled input value |",
          '| `defaultValue` | `string` | `""` | Uncontrolled initial value |',
          "| `onChange` | `(value: string) => void` | — | Callback on every keystroke (debounce-aware) |",
          "| `onSearch` | `(value: string) => void` | — | Callback on Enter |",
          "| `onClear` | `() => void` | — | Callback when input is cleared |",
          "| `placeholder` | `string` | — | Input placeholder |",
          '| `size` | `"sm" \\| "md" \\| "lg"` | `"md"` | Height and font size |',
          '| `variant` | `"outline" \\| "filled" \\| "ghost"` | `"outline"` | Visual surface style |',
          '| `rounded` | `"none" \\| "sm" \\| "md" \\| "lg" \\| "xl" \\| "full"` | `"lg"` | Border radius |',
          "| `icon` | `React.ElementType` | `SearchIcon` | Custom leading icon |",
          "| `loading` | `boolean` | `false` | Shows spinner, hides clear button |",
          "| `shortcut` | `string` | — | Kbd hint (hidden when input has value) |",
          "| `trailingSlot` | `React.ReactNode` | — | Content after clear button |",
          "| `debounceMs` | `number` | `0` | Debounce delay for onChange (ms) |",
          "| `voice` | `boolean` | `false` | Enables voice input button |",
          "| `onVoiceStart` | `() => void` | — | Callback when recording starts |",
          "| `onVoiceEnd` | `() => void` | — | Callback when recording ends |",
          "| `onVoiceError` | `(error: string) => void` | — | Callback on voice error |",
          "| `disabled` | `boolean` | `false` | Disables the search bar |",
          "| `autoFocus` | `boolean` | `false` | Auto-focuses the input on mount |",
          '| `locale` | `UILocale` | `"en-US"` | Locale for i18n strings |',
        ].join("\n"),
      },
    },
  },
  tags: ["autodocs"],
  args: {
    placeholder: "Search…",
  },
  argTypes: {
    placeholder: {
      control: "text",
      table: { defaultValue: { summary: "Search…" } },
    },
    icon: { table: { disable: true } },
    trailingSlot: { table: { disable: true } },
    onChange: { table: { disable: true } },
    onSearch: { table: { disable: true } },
    onClear: { table: { disable: true } },
    onVoiceStart: { table: { disable: true } },
    onVoiceEnd: { table: { disable: true } },
    onVoiceError: { table: { disable: true } },
    variant: {
      control: "inline-radio",
      options: ["outline", "filled", "ghost"],
      table: { defaultValue: { summary: "outline" } },
    },
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
      table: { defaultValue: { summary: "md" } },
    },
    rounded: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl", "full"],
      table: { defaultValue: { summary: "lg" } },
    },
    loading: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    disabled: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    shortcut: {
      control: "text",
      table: { defaultValue: { summary: "undefined" } },
    },
    debounceMs: {
      control: { type: "number", min: 0, max: 2000, step: 100 },
      table: { defaultValue: { summary: "0" } },
    },
    locale: {
      control: "inline-radio",
      options: ["en-US", "pt-BR", "es-ES", "fr-FR"],
      table: { defaultValue: { summary: "en-US" } },
    },
    voice: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
  },
} satisfies Meta<typeof SearchBar>

export default meta
type Story = StoryObj<typeof meta>

// ── Default ────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    placeholder: "Search anything…",
    defaultValue: "",
    size: "md",
    variant: "outline",
    rounded: "lg",
    loading: false,
    debounceMs: 0,
    voice: false,
    disabled: false,
    autoFocus: false,
    locale: "en-US",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Uncontrolled search bar with default `outline` variant, `md` size, and `lg` radius. Type to reveal the clear button; press `Escape` to clear.",
      },
    },
  },
}

// ── Variants ───────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      {(
        [
          {
            variant: "outline",
            label: 'variant="outline" — border + white background (default)',
          },
          {
            variant: "filled",
            label: 'variant="filled" — muted background, no visible border',
          },
          {
            variant: "ghost",
            label:
              'variant="ghost" — fully transparent, border and background appear on hover',
          },
        ] as const
      ).map(({ variant, label }) => (
        <div key={variant} className="flex flex-col gap-1.5">
          <p className="text-xs font-medium text-muted-foreground">{label}</p>
          <SearchBar {...args} variant={variant} />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Three visual surfaces. `outline` suits most pages; `filled` works well inside cards or sidebars; `ghost` is ideal for toolbars where a border-free look is preferred.",
      },
    },
  },
}

// ── Sizes ──────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size} className="flex flex-col gap-1.5">
          <p className="text-xs font-medium text-muted-foreground">
            size=&quot;{size}&quot;
          </p>
          <SearchBar {...args} size={size} />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Three density presets. `sm` (h-8 / text-xs) for compact toolbars; `md` (h-10 / text-sm) as the default; `lg` (h-12 / text-base) for prominent hero-style search.",
      },
    },
  },
}

// ── Rounded Variants ───────────────────────────────────────────────────────

export const RoundedVariants: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      {(["none", "sm", "md", "lg", "xl", "full"] as const).map((rounded) => (
        <div key={rounded} className="flex flex-col gap-1.5">
          <p className="text-xs font-medium text-muted-foreground">
            rounded=&quot;{rounded}&quot;
          </p>
          <SearchBar {...args} rounded={rounded} />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Six border-radius presets using the design system radius scale (`--radius-sm` → `--radius-4xl`). `lg` is the default. Use `full` for pill-shaped search bars in hero sections.",
      },
    },
  },
}

// ── With Shortcut ──────────────────────────────────────────────────────────

export const WithShortcut: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <p className="text-xs font-medium text-muted-foreground">
          Empty — shortcut badge visible
        </p>
        <SearchBar {...args} shortcut="⌘K" />
      </div>
      <div className="flex flex-col gap-1.5">
        <p className="text-xs font-medium text-muted-foreground">
          Empty — Ctrl+K for Windows/Linux
        </p>
        <SearchBar {...args} shortcut="Ctrl K" rounded="full" />
      </div>
      <div className="flex flex-col gap-1.5">
        <p className="text-xs font-medium text-muted-foreground">
          With value — shortcut hidden
        </p>
        <SearchBar {...args} shortcut="⌘K" defaultValue="university library" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The `shortcut` prop renders a `Kbd` badge on the trailing edge when the input is empty. It disappears as soon as the user starts typing and reappears after clearing.",
      },
    },
  },
}

// ── With Trailing Slot ─────────────────────────────────────────────────────

export const WithTrailingSlot: Story = {
  render: (args) => {
    const [activeFilters, setActiveFilters] = React.useState(3)

    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <p className="text-xs font-medium text-muted-foreground">
            Filter badge count
          </p>
          <SearchBar
            {...args}
            trailingSlot={
              <div className="flex items-center gap-2">
                <Separator orientation="vertical" className="h-4" />
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 gap-1.5 px-2 text-xs"
                  onClick={() => setActiveFilters((n) => (n > 0 ? n - 1 : 3))}
                >
                  <SlidersHorizontalIcon className="size-3.5" />
                  Filters
                  {activeFilters > 0 && (
                    <Badge variant="secondary" className="h-4 px-1 text-xs">
                      {activeFilters}
                    </Badge>
                  )}
                </Button>
              </div>
            }
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <p className="text-xs font-medium text-muted-foreground">
            Search button
          </p>
          <SearchBar
            {...args}
            icon={MapPinIcon}
            rounded="full"
            trailingSlot={
              <Button size="sm" className="h-7 rounded-full px-3 text-xs">
                Go
              </Button>
            }
          />
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          "The `trailingSlot` prop renders any ReactNode after the clear button. Use it for filter toggles, action buttons, or custom badges. A `Separator` between input and slot keeps visual hierarchy clear.",
      },
    },
  },
}

// ── Voice Input ────────────────────────────────────────────────────────────

export const VoiceInput: Story = {
  render: (args) => {
    const [value, setValue] = React.useState("")
    const [events, setEvents] = React.useState<string[]>([])

    const addEvent = (msg: string) =>
      setEvents((prev) =>
        [`${new Date().toLocaleTimeString()} — ${msg}`, ...prev].slice(0, 6)
      )

    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1.5">
          <p className="text-xs font-medium text-muted-foreground">
            Interactive — click the microphone and speak
          </p>
          <SearchBar
            {...args}
            voice
            value={value}
            onChange={setValue}
            onSearch={(v) => addEvent(`Search: "${v}"`)}
            onClear={() => {
              setValue("")
              addEvent("Cleared")
            }}
            onVoiceStart={() => addEvent("Recording started")}
            onVoiceEnd={() => addEvent("Recording ended")}
            onVoiceError={(err) => addEvent(`Error: ${err}`)}
          />
          <div className="rounded-lg border border-border bg-muted/40 p-3 font-mono text-xs">
            {events.length === 0 ? (
              <p className="text-muted-foreground italic">
                Voice events will appear here…
              </p>
            ) : (
              <ul className="flex flex-col gap-1">
                {events.map((e, i) => (
                  <li key={i} className="text-foreground">
                    {e}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <p className="text-xs font-medium text-muted-foreground">
            All sizes with voice button
          </p>
          <div className="flex flex-col gap-2">
            {(["sm", "md", "lg"] as const).map((size) => (
              <div key={size} className="flex flex-col gap-1">
                <p className="text-xs text-muted-foreground">
                  size=&quot;{size}&quot;
                </p>
                <SearchBar {...args} voice size={size} />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <p className="text-xs font-medium text-muted-foreground">
            Voice + trailing slot
          </p>
          <SearchBar
            {...args}
            voice
            rounded="full"
            trailingSlot={
              <Button size="sm" className="h-7 rounded-full px-3 text-xs">
                Search
              </Button>
            }
          />
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: [
          "Enable voice input with `voice={true}`. A microphone button appears on the trailing edge when the browser supports the Web Speech API.",
          "",
          "- **Idle**: mic icon in muted color, `aria-pressed={false}`",
          "- **Listening**: mic pulses red, `aria-label` switches to *Stop recording*, `aria-pressed={true}`",
          "- **Result**: transcript is written into the input and `onChange` fires — same path as keyboard input",
          "",
          "The button is silently hidden when the browser does not support the Web Speech API, so `voice` is safe to pass unconditionally.",
          "",
          "Use `onVoiceStart`, `onVoiceEnd`, and `onVoiceError` to react to the recognition lifecycle.",
        ].join("\n"),
      },
    },
  },
}

// ── Loading ────────────────────────────────────────────────────────────────

export const Loading: Story = {
  args: { loading: true },
  render: (args) => (
    <div className="flex flex-col gap-3">
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size} className="flex flex-col gap-1.5">
          <p className="text-xs font-medium text-muted-foreground">
            size=&quot;{size}&quot;
          </p>
          <SearchBar {...args} size={size} loading defaultValue="university" />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "When `loading` is true, the leading icon is replaced by an animated spinner and the clear button is hidden. `aria-busy` is set on the container so assistive technologies can announce the state.",
      },
    },
  },
}

// ── Disabled ───────────────────────────────────────────────────────────────

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <div className="flex flex-col gap-3">
      {(["outline", "filled", "ghost"] as const).map((variant) => (
        <div key={variant} className="flex flex-col gap-1.5">
          <p className="text-xs font-medium text-muted-foreground">
            variant=&quot;{variant}&quot;
          </p>
          <SearchBar {...args} variant={variant} disabled />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Disabled state applies `opacity-50` and `pointer-events-none` to the wrapper. All three variants are shown to confirm the token-based appearance holds.",
      },
    },
  },
}

// ── Controlled ────────────────────────────────────────────────────────────

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = React.useState("")
    const [lastSearch, setLastSearch] = React.useState<string | null>(null)

    return (
      <div className="flex flex-col gap-4">
        <SearchBar
          {...args}
          value={value}
          onChange={setValue}
          onSearch={(v) => setLastSearch(v)}
          onClear={() => setLastSearch(null)}
          shortcut="⌘K"
        />
        <div className="flex flex-col gap-1 text-xs text-muted-foreground">
          <span>
            Current value:{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-foreground">
              {value || "(empty)"}
            </code>
          </span>
          {lastSearch !== null && (
            <span>
              Last search:{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-foreground">
                {lastSearch || "(cleared)"}
              </code>
            </span>
          )}
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          "Controlled mode: pass `value` + `onChange` to manage state externally. `onSearch` fires on `Enter`; `onClear` fires when the clear button or `Escape` is pressed. The live readout below the bar shows both the current input value and the last submitted search.",
      },
    },
  },
}

// ── With Debounce ──────────────────────────────────────────────────────────

export const WithDebounce: Story = {
  args: { debounceMs: 500 },
  render: (args) => {
    const [debouncedValue, setDebouncedValue] = React.useState("")
    const [lastEnter, setLastEnter] = React.useState("")
    const [fireCount, setFireCount] = React.useState(0)

    return (
      <div className="flex flex-col gap-4">
        <SearchBar
          {...args}
          onChange={(v) => {
            setDebouncedValue(v)
            setFireCount((n) => n + 1)
          }}
          onSearch={setLastEnter}
        />
        <div className="rounded-lg border border-border bg-muted/40 p-3 font-mono text-xs">
          <div className="flex flex-col gap-1 text-muted-foreground">
            <span>
              onChange fired:{" "}
              <strong className="text-foreground">{fireCount}×</strong>
            </span>
            <span>
              Debounced value:{" "}
              <strong className="text-foreground">
                &quot;{debouncedValue}&quot;
              </strong>
            </span>
            {lastEnter && (
              <span>
                Last Enter:{" "}
                <strong className="text-foreground">
                  &quot;{lastEnter}&quot;
                </strong>
              </span>
            )}
          </div>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          "With `debounceMs={500}`, `onChange` fires only after 500ms of idle typing — not on every keystroke. The input itself remains instantly responsive. Adjust `debounceMs` in the controls to see the effect in real time.",
      },
    },
  },
}

// ── Custom Icon ────────────────────────────────────────────────────────────

export const CustomIcon: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      <SearchBar
        {...args}
        icon={BookOpenIcon}
        rounded="full"
        variant="filled"
      />
      <SearchBar {...args} icon={MapPinIcon} variant="outline" />
      <SearchBar {...args} icon={UserSearchIcon} variant="outline" size="lg" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The `icon` prop accepts any Lucide component. Swap the magnifying glass for a contextual icon that communicates what the search targets.",
      },
    },
  },
}

// ── Skeleton ───────────────────────────────────────────────────────────────

export const Skeleton: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <p className="text-xs font-medium text-muted-foreground">
          Sizes — rounded=&quot;lg&quot; (default)
        </p>
        <div className="flex flex-col gap-2">
          {(["sm", "md", "lg"] as const).map((size) => (
            <SearchBarSkeleton key={size} size={size} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <p className="text-xs font-medium text-muted-foreground">
          Rounded variants — size=&quot;md&quot;
        </p>
        <div className="flex flex-col gap-2">
          {(["none", "md", "xl", "full"] as const).map((rounded) => (
            <SearchBarSkeleton key={rounded} rounded={rounded} />
          ))}
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "`SearchBarSkeleton` mirrors the exact `size` and `rounded` props of `SearchBar`. Use it as a placeholder during server-side data fetching or lazy loading.",
      },
    },
  },
}

// ── Locales ────────────────────────────────────────────────────────────────

export const Locales: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      {(
        [
          { locale: "en-US", label: "English (en-US)" },
          { locale: "pt-BR", label: "Portuguese (pt-BR)" },
          { locale: "es-ES", label: "Español (es-ES)" },
          { locale: "fr-FR", label: "Français (fr-FR)" },
        ] as const
      ).map(({ locale, label }) => (
        <div key={locale} className="flex flex-col gap-1.5">
          <p className="text-xs font-medium text-muted-foreground">{label}</p>
          <SearchBar {...args} locale={locale} defaultValue="UFPB" />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All four supported locales. The `placeholder` and `aria-label` on the input, and `aria-label` on the clear button, are translated via `UI_I18N`. Type to reveal the clear button and inspect its accessible label in each locale.",
      },
    },
  },
}

// ── In Context ────────────────────────────────────────────────────────────

export const InContext: Story = {
  args: {
    placeholder: "Search courses…",
    size: "lg",
    rounded: "xl",
    variant: "filled",
    shortcut: "⌘K",
  },
  render: (args) => {
    const [query, setQuery] = React.useState("")
    const [loading, setLoading] = React.useState(false)

    const handleSearch = (v: string) => {
      if (!v) return
      setLoading(true)
      setTimeout(() => setLoading(false), 1200)
    }

    const results = [
      "Introduction to Computer Science",
      "Advanced Algorithms",
      "Database Systems",
      "Software Engineering",
      "Distributed Systems",
      "Machine Learning Fundamentals",
    ].filter((r) => r.toLowerCase().includes(query.toLowerCase()) && query)

    return (
      <div className="flex flex-col gap-4">
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-base font-semibold text-foreground">
            Course Catalog
          </h2>
          <SearchBar
            {...args}
            value={query}
            onChange={setQuery}
            onSearch={handleSearch}
            onClear={() => setQuery("")}
            loading={loading}
          />
          {results.length > 0 && (
            <ul className="mt-3 flex flex-col gap-0 overflow-hidden rounded-lg border border-border">
              {results.map((r) => (
                <li
                  key={r}
                  className="flex items-center gap-2 border-b border-border px-4 py-3 text-sm last:border-b-0 hover:bg-accent"
                >
                  <BookOpenIcon className="size-4 shrink-0 text-muted-foreground" />
                  {r}
                </li>
              ))}
            </ul>
          )}
          {query && results.length === 0 && !loading && (
            <p className="mt-3 text-center text-sm text-muted-foreground">
              No courses found for &quot;{query}&quot;
            </p>
          )}
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          "Realistic usage inside a card: live filter on `onChange`, simulated async search on `Enter` that triggers the loading spinner for 1.2 s. All visual props (`size`, `variant`, `rounded`, `placeholder`) are fully controllable via the Storybook panel.",
      },
    },
  },
}
