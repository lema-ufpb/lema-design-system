import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"
import { NavDots } from "./nav-dots"

// ── Shared data ────────────────────────────────────────────────────────────

const sections = [
  { id: "s-intro", label: "Introduction" },
  { id: "s-process", label: "Process" },
  { id: "s-features", label: "Features" },
  { id: "s-tips", label: "Tips" },
]

const SECTION_COLORS = [
  "bg-highlight-sky/10",
  "bg-success/10",
  "bg-warning/10",
  "bg-highlight-violet/10",
]

// ── Scrollable section renderer ────────────────────────────────────────────

/**
 * Renders tall coloured sections inside a scrollable container.
 * The container itself is the scroll root, so IntersectionObserver works
 * inside the Storybook canvas iframe.
 */
function ScrollDemo({
  children,
  height = 400,
  navPosition = "before",
}: {
  children: React.ReactNode
  height?: number
  /** "before" renders nav above sections (sticky top/side), "after" renders below (sticky bottom) */
  navPosition?: "before" | "after"
}) {
  const sectionElements = sections.map((s, i) => (
    <section
      key={s.id}
      id={s.id}
      className={`flex min-h-[400px] items-center justify-center ${SECTION_COLORS[i % SECTION_COLORS.length]}`}
    >
      <p className="text-xl font-semibold text-foreground">{s.label}</p>
    </section>
  ))

  return (
    <div
      className="relative overflow-auto rounded-xl border border-border"
      style={{ height }}
    >
      {navPosition === "before" && children}
      {sectionElements}
      {navPosition === "after" && children}
    </div>
  )
}

// ── Meta ────────────────────────────────────────────────────────────────────

const meta: Meta<typeof NavDots> = {
  title: "Navigation/NavDots",
  component: NavDots,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "Dot-based section navigation with automatic scroll tracking and shadcn Tooltip labels.",
          "",
          "Tracks which section is visible via `IntersectionObserver` — works inside any scrollable container, not just the viewport.",
          "",
          "## Orientations",
          "- **vertical** — pinned to the left or right edge (default)",
          "- **horizontal** — pinned to the bottom center",
          "",
          "## Scroll detection",
          "The component walks up the DOM to find the nearest scrollable ancestor and uses it as the `IntersectionObserver` root. Override with `scrollContainer`.",
          "",
          "## Component Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `sections` | `NavDotsSection[]` | — | (required) Array of sections to navigate |",
          "| `active` | `number` | `0` | Initially active section index |",
          "| `scrollOnClick` | `boolean` | `true` | Enable smooth scroll on dot click |",
          '| `scrollContainer` | `RefObject<HTMLElement> \\| "window" \\| null` | `null` | Scroll container override (auto-detected by default) |',
          '| `scrollMargin` | `string` | `"0px"` | IntersectionObserver rootMargin |',
          "| `onActiveChange` | `(index: number) => void` | — | Callback when active section changes |",
          '| `orientation` | `"vertical" \\| "horizontal"` | `"vertical"` | Layout direction |',
          '| `position` | `"left" \\| "right"` | `"right"` | Side alignment (vertical only) |',
          '| `locale` | `UILocale` | `"en-US"` | Locale for aria-labels |',
        ].join("\n"),
      },
    },
  },
  argTypes: {
    orientation: {
      control: "radio",
      options: ["vertical", "horizontal"],
      table: { defaultValue: { summary: "vertical" } },
    },
    position: {
      control: "radio",
      options: ["left", "right"],
      table: { defaultValue: { summary: "right" } },
    },
    active: {
      control: "number",
      table: { defaultValue: { summary: "0" } },
    },
    scrollOnClick: {
      control: "boolean",
      table: { defaultValue: { summary: "true" } },
    },
    onActiveChange: { table: { disable: true } },
    scrollContainer: { table: { disable: true } },
    sections: { table: { disable: true } },
    scrollMargin: {
      control: "text",
      table: { defaultValue: { summary: "0px" } },
    },
    locale: {
      control: "inline-radio",
      options: ["en-US", "pt-BR", "es-ES", "fr-FR"],
      table: { defaultValue: { summary: "en-US" } },
    },
  },
}

export default meta
type Story = StoryObj<typeof NavDots>

// ── Stories ─────────────────────────────────────────────────────────────────

/**
 * Default vertical navigation — scroll the container below to see the
 * active dot change automatically.
 */
export const Default: Story = {
  args: {
    sections,
    position: "right",
    orientation: "vertical",
    active: 0,
    scrollOnClick: true,
    scrollMargin: "0px",
    locale: "en-US",
  },
  render: (args) => (
    <ScrollDemo>
      <NavDots
        {...args}
        className="sticky top-1/2 right-3 z-50 ml-auto -translate-y-1/2"
        style={{ position: "sticky", right: 12, float: "right" }}
      />
    </ScrollDemo>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Vertical dot navigation on the right side — scroll the container to see active dot tracking.",
      },
    },
  },
}

/**
 * Horizontal orientation — dots appear at the bottom center.
 * Scroll the container to see state changes.
 */
export const Horizontal: Story = {
  args: {
    sections,
    orientation: "horizontal",
    position: "right",
  },
  render: (args) => (
    <ScrollDemo navPosition="before">
      <NavDots
        {...args}
        className="sticky top-3 left-1/2 z-50 -translate-x-1/2"
        style={{ position: "sticky", top: 12 }}
      />
    </ScrollDemo>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Horizontal dot navigation at the top center — active state changes as sections scroll into view.",
      },
    },
  },
}

/** Pinned to the left side of the container */
export const LeftPosition: Story = {
  args: {
    sections,
    position: "left",
    orientation: "vertical",
  },
  render: (args) => (
    <ScrollDemo>
      <NavDots
        {...args}
        className="sticky top-1/2 left-3 z-50 -translate-y-1/2"
        style={{ position: "sticky", left: 12, float: "left" }}
      />
    </ScrollDemo>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Vertical dot navigation pinned to the left edge of the scrollable container.",
      },
    },
  },
}

/** Initial active section set to index 2 (Features) */
export const WithActive: Story = {
  args: {
    sections,
    active: 2,
  },
  render: (args) => (
    <ScrollDemo>
      <NavDots
        {...args}
        className="sticky top-1/2 right-3 z-50 ml-auto -translate-y-1/2"
        style={{ position: "sticky", right: 12, float: "right" }}
      />
    </ScrollDemo>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Dot navigation with initial active section set to index 2 (Features).",
      },
    },
  },
}

/** Fires `onActiveChange` callback logged in the Actions panel */
export const WithCallback: Story = {
  args: {
    sections,
    onActiveChange: fn(),
  },
  render: (args) => (
    <ScrollDemo>
      <NavDots
        {...args}
        className="sticky top-1/2 right-3 z-50 ml-auto -translate-y-1/2"
        style={{ position: "sticky", right: 12, float: "right" }}
      />
    </ScrollDemo>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Dot navigation that fires an onActiveChange callback logged in the Actions panel.",
      },
    },
  },
}

/** Dots are display-only — clicking does not scroll */
export const DisabledScroll: Story = {
  args: {
    sections,
    scrollOnClick: false,
  },
  render: (args) => (
    <ScrollDemo>
      <NavDots
        {...args}
        className="sticky top-1/2 right-3 z-50 ml-auto -translate-y-1/2"
        style={{ position: "sticky", right: 12, float: "right" }}
      />
    </ScrollDemo>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Dot navigation with scrollOnClick={false} — dots are display-only without scroll behavior.",
      },
    },
  },
}

/** pt-BR locale example */
export const LocalePTBR: Story = {
  args: {
    sections: sections.map((s) => ({
      ...s,
      label:
        s.id === "s-intro"
          ? "Introduction"
          : s.id === "s-process"
            ? "Process"
            : s.id === "s-features"
              ? "Features"
              : "Tips",
    })),
    position: "right",
    orientation: "vertical",
    locale: "pt-BR",
  },
  render: (args) => (
    <ScrollDemo>
      <NavDots
        {...args}
        className="sticky top-1/2 right-3 z-50 ml-auto -translate-y-1/2"
        style={{ position: "sticky", right: 12, float: "right" }}
      />
    </ScrollDemo>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Portuguese (pt-BR) localization — section labels and tooltip text translated.",
      },
    },
  },
}

/** Side-by-side comparison of all active states */
export const AllStates: Story = {
  args: {
    sections,
  },
  render: () => (
    <div className="flex flex-wrap gap-8">
      {sections.map((_, idx) => (
        <div key={idx} className="flex flex-col items-center gap-2">
          <p className="text-xs text-muted-foreground">Active: {idx}</p>
          <NavDots
            sections={sections}
            active={idx}
            scrollOnClick={false}
            orientation="vertical"
            className="relative"
            style={{ position: "relative" }}
          />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Side-by-side comparison of all active states (0–3) in a single view.",
      },
    },
  },
}
