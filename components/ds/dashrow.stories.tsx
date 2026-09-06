import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Dashrow } from "@/components/ds/dashrow"
import { Dashbox } from "@/components/ds/dashbox"
import { ProgressBar } from "@/components/ds/progress-bar"

const meta = {
  title: "Blocks/Dashrow",
  component: Dashrow,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "Arranges multiple Dashbox panels into a responsive horizontal grid/row layout on desktop screens, complete with interactive drag-to-resize handlers.",
          "",
          "Supports mobile vertical stacking, mouse/touch listeners, fluid resize transitions without React re-renders, and custom `sessionStorage` persistence.",
          "",
          "## Component Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `children` | `ReactNode` | — | (required) Panel children (typically Dashbox) |",
          "| `alignment` | `left` \\| `right` \\| `equal` | `left` | Width ratio between children on desktop |",
          "| `gap` | `none` \\| `sm` \\| `md` \\| `lg` | `md` | Gap between panels |",
          "| `padding` | `none` \\| `sm` \\| `md` \\| `lg` | `none` | Outer padding of the row container |",
          "| `storageKey` | `string` | — | Persist resize state in sessionStorage |",
          "| `resizable` | `boolean` | `true` | Show draggable divider |",
          "| `locale` | `en-US` \\| `pt-BR` \\| `es-ES` \\| `fr-FR` | `en-US` | Locale for drag-resize tooltips |",
          "| `className` | `string` | — | Additional CSS classes |",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Divider line hover** | `--primary/10` | Hover color overlay behind the drag separator |",
          "| **Divider dragging background** | `--primary/15` | Accent shade indicating active drag resize operation |",
          "| **Divider handle base** | `--border` | Default border fill color of the central drag pill/handle |",
          "| **Divider handle hover** | `--primary/40` | Highlight color of the handle pill when hovered |",
          "| **Focus rings** | `--ring` | Focus indicator when navigating the divider with a keyboard |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    alignment: {
      control: "inline-radio",
      options: ["left", "right", "equal"],
      description:
        "Width ratio between children on desktop. `left` = 60/40, `right` = 40/60, `equal` = 50/50.",
      table: { defaultValue: { summary: "left" } },
    },
    gap: {
      control: "inline-radio",
      options: ["none", "sm", "md", "lg"],
      description: "Gap between panels.",
      table: { defaultValue: { summary: "md" } },
    },
    padding: {
      control: "inline-radio",
      options: ["none", "sm", "md", "lg"],
      description: "Outer padding of the row container.",
      table: { defaultValue: { summary: "none" } },
    },
    resizable: {
      control: "boolean",
      description: "Whether the draggable divider is shown.",
      table: { defaultValue: { summary: "true" } },
    },
    storageKey: {
      control: "text",
      description: "Persist resize state in sessionStorage under this key.",
      table: { defaultValue: { summary: "" } },
    },
    children: { table: { disable: true } },
    className: { table: { disable: true } },
    locale: {
      control: "inline-radio",
      options: ["en-US", "pt-BR", "es-ES", "fr-FR"],
      table: { defaultValue: { summary: "en-US" } },
    },
  },
} satisfies Meta<typeof Dashrow>

export default meta
type Story = StoryObj<typeof meta>

// ── Shared content helpers ──────────────────────────────────────────────────

const SampleContent = () => (
  <p className="text-sm text-muted-foreground">
    Sample dashboard content. Charts, tables, or metrics go here.
  </p>
)

const TallContent = () => (
  <div className="flex flex-col gap-2 text-sm text-muted-foreground">
    <p>This panel has more content to show equal-height stretching.</p>
    <p>Second paragraph with extra context.</p>
    <p>Third paragraph — the shorter sibling will stretch to match.</p>
    <p>Fourth paragraph with even more detail.</p>
  </div>
)

// ── Stories ─────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    alignment: "left",
    gap: "md",
    padding: "none",
    resizable: true,
    locale: "en-US",
    children: (
      <>
        <Dashbox title="Main Panel">
          <SampleContent />
        </Dashbox>
        <Dashbox title="Side Panel">
          <SampleContent />
        </Dashbox>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Default Dashrow with left-aligned split between main and side panels.",
      },
    },
  },
}

export const AllAlignments: Story = {
  args: { children: null },
  render: () => (
    <div className="flex w-full flex-col gap-6">
      {(["left", "right", "equal"] as const).map((align) => (
        <div key={align}>
          <p className="mb-2 font-mono text-xs text-muted-foreground">
            alignment=&quot;{align}&quot;
          </p>
          <Dashrow alignment={align}>
            <Dashbox title="Panel A">
              <SampleContent />
            </Dashbox>
            <Dashbox title="Panel B">
              <SampleContent />
            </Dashbox>
          </Dashrow>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Comparison of all three alignment presets — left (60/40), right (40/60), and equal (50/50).",
      },
    },
  },
}

export const LocalePTBR: Story = {
  args: {
    alignment: "left",
    locale: "pt-BR",
    children: (
      <>
        <Dashbox title="Main Panel">
          <p className="text-sm text-muted-foreground">
            Main panel content. Charts, tables, or metrics.
          </p>
        </Dashbox>
        <Dashbox title="Side Panel">
          <p className="text-sm text-muted-foreground">
            Secondary panel with supplementary information.
          </p>
        </Dashbox>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Portuguese (pt-BR) locale applied to the drag-resize tooltips.",
      },
    },
  },
}

export const EqualHeightStretch: Story = {
  args: {
    alignment: "left",
    children: (
      <>
        <Dashbox title="Short Content">
          <SampleContent />
        </Dashbox>
        <Dashbox title="Tall Content">
          <TallContent />
        </Dashbox>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Dashrow automatically stretches the shorter panel to match the taller sibling's height.",
      },
    },
  },
}

export const ThreePanels: Story = {
  args: {
    alignment: "equal",
    children: (
      <>
        <Dashbox title="Panel A">
          <SampleContent />
        </Dashbox>
        <Dashbox title="Panel B">
          <SampleContent />
        </Dashbox>
        <Dashbox title="Panel C">
          <SampleContent />
        </Dashbox>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Three panels — a divider is placed between each adjacent pair.",
      },
    },
  },
}

export const Persistent: Story = {
  args: {
    alignment: "left",
    storageKey: "storybook-persistent-demo",
    children: (
      <>
        <Dashbox
          title="Persistent Left"
          description="Resize and refresh the page — width is remembered."
        >
          <SampleContent />
        </Dashbox>
        <Dashbox title="Persistent Right">
          <SampleContent />
        </Dashbox>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Resize the panels then refresh — the split is persisted in `sessionStorage`.",
      },
    },
  },
}

export const NotResizable: Story = {
  args: {
    alignment: "left",
    resizable: false,
    children: (
      <>
        <Dashbox title="Fixed Left">
          <SampleContent />
        </Dashbox>
        <Dashbox title="Fixed Right">
          <SampleContent />
        </Dashbox>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "With `resizable={false}`, the divider handle is hidden.",
      },
    },
  },
}

export const WithRealContent: Story = {
  args: { children: null },
  render: () => (
    <Dashrow alignment="left" storageKey="demo-real-content">
      <Dashbox
        title="Performance"
        description="Semester indicators"
        status="live"
        onRefresh={async () => {
          await new Promise((r) => setTimeout(r, 800))
        }}
      >
        <div className="flex flex-col gap-3">
          <ProgressBar
            value={0.88}
            name="Approval Rate"
            intent="success"
            precision={1}
          />
          <ProgressBar
            value={0.62}
            name="Attendance"
            intent="primary"
            precision={1}
          />
          <ProgressBar
            value={0.35}
            name="Dropout Rate"
            intent="destructive"
            precision={1}
          />
        </div>
      </Dashbox>

      <Dashbox title="Q1 Goals" status="warning">
        <div className="flex flex-col gap-3">
          <ProgressBar value={100} name="Enrolled" intent="success" />
          <ProgressBar value={72} name="Active" intent="primary" />
          <ProgressBar value={18} name="Completed" intent="destructive" />
        </div>
      </Dashbox>
    </Dashrow>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Dashrow with live content — progress bars, status badges, and refresh actions inside Dashbox panels.",
      },
    },
  },
}

export const GapVariants: Story = {
  args: { children: null },
  render: () => (
    <div className="flex w-full flex-col gap-8">
      {(["none", "sm", "md", "lg"] as const).map((g) => (
        <div key={g}>
          <p className="mb-2 font-mono text-xs text-muted-foreground">
            gap=&quot;{g}&quot;
          </p>
          <Dashrow gap={g}>
            <Dashbox title="Left">
              <SampleContent />
            </Dashbox>
            <Dashbox title="Right">
              <SampleContent />
            </Dashbox>
          </Dashrow>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Comparison of all four gap presets — none, sm, md, and lg.",
      },
    },
  },
}

export const Mobile: Story = {
  args: {
    alignment: "left",
    children: (
      <>
        <Dashbox title="Top Box">
          <SampleContent />
        </Dashbox>
        <Dashbox title="Bottom Box">
          <SampleContent />
        </Dashbox>
      </>
    ),
  },
  globals: { viewport: { value: "mobile1", isRotated: false } },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "On mobile (<1024px), boxes stack vertically and the divider is hidden.",
      },
    },
  },
}

export const Desktop: Story = {
  args: {
    alignment: "left",
    children: (
      <>
        <Dashbox title="Dashboard Panel A">
          <SampleContent />
        </Dashbox>
        <Dashbox title="Dashboard Panel B">
          <SampleContent />
        </Dashbox>
      </>
    ),
  },
  globals: { viewport: { value: "desktop", isRotated: false } },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "Desktop (1024px+) — panels side-by-side with the draggable divider visible.",
      },
    },
  },
}
