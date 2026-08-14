import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as React from "react"
import {
  FileTextIcon,
  ClipboardListIcon,
  ShieldCheckIcon,
  GraduationCapIcon,
  BookOpenIcon,
  ActivityIcon,
  UsersIcon,
  BarChart2Icon,
} from "lucide-react"

import { ScoreRow, ScoreRowList } from "@/components/ds/score-row"

const meta = {
  title: "Data Display/ScoreRow",
  component: ScoreRow,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A horizontally laid-out list item that pairs an icon + label block with a score counter.",
          "Designed for audit checklists, evaluation forms, grade lists, and any scored-item display.",
          "",
          "Supports three sizes (`sm`, `md`, `lg`), four status variants (`default`, `success`, `warning`, `destructive`),",
          'automatic status derivation from the score ratio (`status="auto"`), three score display modes (`fraction`, `percent`, `raw`),',
          "an optional thin progress bar at the bottom of the row, and a skeleton loading state.",
          "",
          "Pair with `ScoreRowList` to group items in a bordered, rounded container.",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Icon container (default)** | `--muted` / `--muted-foreground` | Neutral icon background and color |",
          "| **Icon container (success)** | `--success` | Icon background at 10% opacity + success text |",
          "| **Icon container (warning)** | `--warning` | Icon background at 15% opacity + warning text |",
          "| **Icon container (destructive)** | `--destructive` | Icon background at 10% opacity + destructive text |",
          "| **Current score** | `--foreground` / status tokens | Bold tabular number on the right |",
          "| **Separator + total** | `--muted-foreground` | ` / 95` portion rendered at reduced contrast |",
          "| **Progress bar** | status tokens | Colored fill driven by `score / total` ratio |",
          "| **Row border** | `--border` | Bottom separator between items |",
          "| **Hover background** | `--accent` | Interactive row hover state |",
          "",
          "## Component Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `title` | `string` | — | (required) Row title |",
          "| `description` | `string` | — | Subtitle below the title |",
          "| `icon` | `React.ElementType` | `FileTextIcon` | Lucide icon component |",
          "| `score` | `number` | — | (required) Current score value |",
          "| `total` | `number` | — | (required) Maximum possible score |",
          '| `size` | `"sm" \\| "md" \\| "lg"` | `"md"` | Row density and typography |',
          '| `status` | `"default" \\| "success" \\| "warning" \\| "destructive" \\| "auto"` | `"default"` | Semantic color; `"auto"` derives from ratio |',
          '| `scoreDisplay` | `"fraction" \\| "percent" \\| "raw"` | `"fraction"` | Score render mode |',
          "| `showProgress` | `boolean` | `true` | Shows a progress bar at row bottom |",
          "| `loading` | `boolean` | `false` | Skeleton loading state |",
          '| `locale` | `UILocale` | `"en-US"` | Locale for formatting |',
          "| `percentDecimals` | `number` | `0` | Decimal places in percentage tooltip |",
          "| `tooltip` | `ReactNode` | — | Tooltip for the entire row; suppresses the progress-bar tooltip |",
        ].join("\n"),
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
      table: { defaultValue: { summary: "md" } },
    },
    status: {
      control: "select",
      options: ["auto", "default", "success", "warning", "destructive"],
      table: { defaultValue: { summary: "default" } },
    },
    scoreDisplay: {
      control: "inline-radio",
      options: ["fraction", "percent", "raw"],
      table: { defaultValue: { summary: "fraction" } },
    },
    showProgress: {
      control: "boolean",
      table: { defaultValue: { summary: "true" } },
    },
    loading: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    score: { control: { type: "number", min: 0 } },
    total: { control: { type: "number", min: 0 } },
    percentDecimals: {
      control: { type: "number", min: 0, max: 4, step: 1 },
      table: { defaultValue: { summary: "0" } },
    },
    title: { control: "text", table: { defaultValue: { summary: "—" } } },
    description: {
      control: "text",
      table: { defaultValue: { summary: "—" } },
    },
    locale: {
      control: "inline-radio",
      options: ["en-US", "pt-BR", "es-ES", "fr-FR"],
      table: { defaultValue: { summary: "en-US" } },
    },
    icon: { table: { disable: true } },
    onClick: { table: { disable: true } },
    tooltip: {
      control: "text",
      description:
        "Tooltip content for the entire row. Suppresses the progress-bar tooltip to avoid nesting.",
      table: { defaultValue: { summary: "" } },
    },
  },
} satisfies Meta<typeof ScoreRow>

export default meta
type Story = StoryObj<typeof meta>

// ── Default ────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    title: "Standard Audit",
    description: "June 2025 baseline",
    icon: FileTextIcon,
    score: 76,
    total: 95,
    size: "md",
    status: "default",
    scoreDisplay: "fraction",
    showProgress: true,
    loading: false,
    locale: "en-US",
    percentDecimals: 0,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exact replica of the design reference: document icon, title, subtitle, and a `76 / 95` score.",
      },
    },
  },
}

// ── Sizes ──────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  args: { title: "Standard Audit", score: 48, total: 95 },
  render: () => (
    <div className="flex flex-col gap-0">
      {(["sm", "md", "lg"] as const).map((size) => (
        <ScoreRow
          key={size}
          size={size}
          title="Standard Audit"
          description={`June 2025 baseline · size="${size}"`}
          icon={FileTextIcon}
          score={48}
          total={95}
        />
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Three size presets — `sm`, `md`, and `lg` — stacked to compare density and typographic scale.",
      },
    },
  },
}

// ── Status Variants ────────────────────────────────────────────────────────

export const StatusVariants: Story = {
  args: { title: "Standard Audit", score: 72, total: 95 },
  render: () => (
    <ScoreRowList>
      <ScoreRow
        title="Status: default"
        description="No score yet"
        icon={FileTextIcon}
        score={0}
        total={95}
        status="default"
      />
      <ScoreRow
        title="Status: success"
        description="Goal achieved (≥70%)"
        icon={ShieldCheckIcon}
        score={72}
        total={95}
        status="success"
      />
      <ScoreRow
        title="Status: warning"
        description="Attention needed (40–69%)"
        icon={ClipboardListIcon}
        score={42}
        total={95}
        status="warning"
      />
      <ScoreRow
        title="Status: destructive"
        description="Below minimum (<40%)"
        icon={ActivityIcon}
        score={18}
        total={95}
        status="destructive"
      />
    </ScoreRowList>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All four status variants. The icon container background and score color reflect the status token.",
      },
    },
  },
}

// ── Auto Status ────────────────────────────────────────────────────────────

export const AutoStatus: Story = {
  args: { title: "Standard Audit", score: 48, total: 95, status: "auto" },
  render: () => (
    <ScoreRowList>
      {[
        { score: 0, label: "0 / 95 — no responses yet" },
        { score: 18, label: "18 / 95 — below 40%" },
        { score: 42, label: "42 / 95 — between 40–69%" },
        { score: 72, label: "72 / 95 — ≥70%, approved" },
        { score: 95, label: "95 / 95 — maximum score" },
      ].map(({ score, label }) => (
        <ScoreRow
          key={score}
          title={label}
          description={`status="auto" → ${score === 0 ? "default" : score < 38 ? "destructive" : score < 67 ? "warning" : "success"}`}
          icon={BarChart2Icon}
          score={score}
          total={95}
          status="auto"
          showProgress
        />
      ))}
    </ScoreRowList>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'With `status="auto"`, the component derives the color from the ratio: <40% → destructive, 40–69% → warning, ≥70% → success.',
      },
    },
  },
}

// ── Score Display Modes ────────────────────────────────────────────────────

export const ScoreDisplayModes: Story = {
  args: { title: "Teaching Evaluation", score: 68, total: 95 },
  render: () => (
    <ScoreRowList>
      <ScoreRow
        title="Fraction (default)"
        description='scoreDisplay="fraction"'
        icon={FileTextIcon}
        score={68}
        total={95}
        scoreDisplay="fraction"
        status="auto"
      />
      <ScoreRow
        title="Percentage"
        description='scoreDisplay="percent"'
        icon={FileTextIcon}
        score={68}
        total={95}
        scoreDisplay="percent"
        status="auto"
      />
      <ScoreRow
        title="Raw value"
        description='scoreDisplay="raw"'
        icon={FileTextIcon}
        score={68}
        total={95}
        scoreDisplay="raw"
        status="auto"
      />
    </ScoreRowList>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The same score (68/95) rendered as a fraction, a percentage, and a raw number.",
      },
    },
  },
}

// ── With Progress Bar ──────────────────────────────────────────────────────

export const WithProgressBar: Story = {
  args: {
    title: "Standard Audit",
    description: "June 2025 baseline",
    icon: FileTextIcon,
    score: 48,
    total: 95,
    showProgress: true,
    status: "auto",
  },
  parameters: {
    docs: {
      description: {
        story:
          "When `showProgress` is true, a 2px colored progress bar appears at the bottom of each row, filled proportionally to `score / total`.",
      },
    },
  },
}

// ── Without Progress Bar ───────────────────────────────────────────────────

export const WithoutProgressBar: Story = {
  args: {
    title: "Standard Audit",
    description: "June 2025 baseline — hidden progress bar",
    icon: FileTextIcon,
    score: 48,
    total: 95,
    showProgress: false,
    status: "auto",
  },
  parameters: {
    docs: {
      description: {
        story:
          "When `showProgress` is `false`, the progress bar at the bottom of the row is not rendered. This keeps the row more compact — useful for dense lists where the progress bar adds visual noise.",
      },
    },
  },
}

// ── Loading Skeleton ───────────────────────────────────────────────────────

export const Loading: Story = {
  args: { title: "", score: 0, total: 0, loading: true },
  render: () => (
    <ScoreRowList>
      {(["sm", "md", "lg"] as const).map((size) => (
        <ScoreRow key={size} size={size} title="" score={0} total={0} loading />
      ))}
    </ScoreRowList>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Skeleton loading state for all three sizes. Uses `<Skeleton>` from shadcn/ui — no custom `animate-pulse` divs.",
      },
    },
  },
}

// ── Interactive (Clickable) ────────────────────────────────────────────────

export const Interactive: Story = {
  args: {
    title: "Standard Audit",
    description: "June 2025 baseline",
    score: 48,
    total: 95,
    status: "auto",
    showProgress: true,
  },
  render: () => {
    const [selected, setSelected] = React.useState<string | null>(null)

    const items = [
      {
        id: "audit-1",
        title: "Standard Audit",
        description: "June 2025 baseline",
        icon: FileTextIcon,
        score: 68,
        total: 95,
      },
      {
        id: "audit-2",
        title: "Teaching Evaluation",
        description: "2025.1 cycle",
        icon: GraduationCapIcon,
        score: 42,
        total: 80,
      },
      {
        id: "audit-3",
        title: "Infrastructure",
        description: "Academic semester",
        icon: ShieldCheckIcon,
        score: 12,
        total: 60,
      },
      {
        id: "audit-4",
        title: "Library",
        description: "Digital collection",
        icon: BookOpenIcon,
        score: 90,
        total: 100,
      },
    ]

    return (
      <div className="flex flex-col gap-4">
        <ScoreRowList>
          {items.map((item) => (
            <ScoreRow
              key={item.id}
              title={item.title}
              description={item.description}
              icon={item.icon}
              score={item.score}
              total={item.total}
              status="auto"
              showProgress
              onClick={() => setSelected(item.id)}
              className={item.id === selected ? "bg-accent" : ""}
            />
          ))}
        </ScoreRowList>
        {selected && (
          <p className="text-xs text-muted-foreground">
            Selected:{" "}
            <strong>{items.find((i) => i.id === selected)?.title}</strong>
          </p>
        )}
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          "Pass an `onClick` handler to make the row interactive. The row renders as a `<button>` with hover and focus-visible states.",
      },
    },
  },
}

// ── ScoreRowList ───────────────────────────────────────────────────────────

export const AuditList: Story = {
  args: { title: "Standard Audit", score: 0, total: 95 },
  render: () => (
    <ScoreRowList>
      <ScoreRow
        title="Standard Audit"
        description="June 2025 baseline"
        icon={FileTextIcon}
        score={0}
        total={95}
        status="auto"
        showProgress
      />
      <ScoreRow
        title="Teaching Evaluation"
        description="2025.1 cycle"
        icon={GraduationCapIcon}
        score={58}
        total={80}
        status="auto"
        showProgress
      />
      <ScoreRow
        title="Accessibility Conditions"
        description="2025 academic semester"
        icon={UsersIcon}
        score={12}
        total={60}
        status="auto"
        showProgress
      />
      <ScoreRow
        title="Infrastructure & Equipment"
        description="Annual report"
        icon={ShieldCheckIcon}
        score={47}
        total={50}
        status="auto"
        showProgress
      />
      <ScoreRow
        title="Bibliographic Collection"
        description="Central Library"
        icon={BookOpenIcon}
        score={33}
        total={40}
        status="auto"
        showProgress
      />
    </ScoreRowList>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "A realistic audit checklist using `ScoreRowList` as a container. Each row derives its status automatically and shows a progress bar. Items at the bottom have no trailing border.",
      },
    },
  },
}

// ── Custom Icons ───────────────────────────────────────────────────────────

export const CustomIcons: Story = {
  args: { title: "Standard Audit", score: 60, total: 95 },
  render: () => (
    <ScoreRowList>
      {[
        {
          icon: ClipboardListIcon,
          title: "Compliance Checklist",
          score: 60,
          total: 95,
        },
        {
          icon: GraduationCapIcon,
          title: "Teacher Training",
          score: 30,
          total: 60,
        },
        {
          icon: ShieldCheckIcon,
          title: "Security & Privacy",
          score: 18,
          total: 20,
        },
        {
          icon: ActivityIcon,
          title: "Performance Indicators",
          score: 5,
          total: 40,
        },
        {
          icon: UsersIcon,
          title: "Student Engagement",
          score: 75,
          total: 100,
        },
      ].map(({ icon, title, score, total }) => (
        <ScoreRow
          key={title}
          title={title}
          icon={icon}
          score={score}
          total={total}
          status="auto"
        />
      ))}
    </ScoreRowList>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Any Lucide icon can be passed via the `icon` prop. The container adapts its background tint to the resolved status.",
      },
    },
  },
}

// ── Locale pt-BR ───────────────────────────────────────────────────────────

export const LocalePtBR: Story = {
  name: "Locale — pt-BR",
  args: {
    title: "Standard Audit",
    description: "June 2025 baseline",
    score: 68,
    total: 95,
    locale: "pt-BR",
    percentDecimals: 1,
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <p className="text-xs font-medium text-muted-foreground">
          Percentage with pt-BR decimal separator (comma)
        </p>
        <ScoreRowList>
          <ScoreRow
            title="Standard Audit"
            description="June 2025 baseline"
            icon={FileTextIcon}
            score={68}
            total={95}
            locale="pt-BR"
            status="auto"
            showProgress
            percentDecimals={1}
          />
          <ScoreRow
            title="Teaching Evaluation"
            description="2025.1 cycle"
            icon={GraduationCapIcon}
            score={42}
            total={80}
            locale="pt-BR"
            status="auto"
            showProgress
            percentDecimals={1}
          />
          <ScoreRow
            title="Bibliographic Collection"
            description="Central Library"
            icon={BookOpenIcon}
            score={12}
            total={60}
            locale="pt-BR"
            status="auto"
            showProgress
            percentDecimals={1}
          />
        </ScoreRowList>
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-xs font-medium text-muted-foreground">
          scoreDisplay=&quot;percent&quot; — formatting via Intl.NumberFormat (1
          decimal)
        </p>
        <ScoreRowList>
          {(
            [
              { score: 68, total: 95, title: "Standard Audit" },
              { score: 42, total: 80, title: "Teaching Evaluation" },
              { score: 12, total: 60, title: "Infrastructure" },
            ] as const
          ).map(({ score, total, title }) => (
            <ScoreRow
              key={title}
              title={title}
              icon={BarChart2Icon}
              score={score}
              total={total}
              locale="pt-BR"
              status="auto"
              scoreDisplay="percent"
              percentDecimals={1}
            />
          ))}
        </ScoreRowList>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'With `locale="pt-BR"`, the decimal separator in tooltips and `scoreDisplay="percent"` uses a comma (`71,6%`) via `Intl.NumberFormat`. The `scoreLabel` in `aria-label` is translated to *Score*. Hover the progress bar to see the localized tooltip.',
      },
    },
  },
}

// ── Color Tokens ────────────────────────────────────────────────────────────

export const ColorTokens: Story = {
  name: "Color Tokens — accent",
  args: { title: "Categoria", score: 72, total: 100 },
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <p className="text-xs font-medium text-muted-foreground">
          Direct CSS color values
        </p>
        <ScoreRowList>
          <ScoreRow
            title="Vendas"
            description="Ciclo 2025.1"
            icon={BarChart2Icon}
            score={85}
            total={100}
            accent="oklch(0.5 0.2 270)"
          />
          <ScoreRow
            title="Infraestrutura"
            description="Semestre acadêmico"
            icon={ShieldCheckIcon}
            score={40}
            total={100}
            accent="oklch(0.55 0.18 30)"
          />
        </ScoreRowList>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-xs font-medium text-muted-foreground">
          Design system token references
        </p>
        <ScoreRowList>
          <ScoreRow
            title="Produto"
            description="Resultado trimestral"
            icon={ClipboardListIcon}
            score={91}
            total={100}
            accent="var(--color-success)"
          />
          <ScoreRow
            title="Marketing"
            description="Campanha atual"
            icon={ActivityIcon}
            score={62}
            total={100}
            accent="var(--color-warning)"
          />
          <ScoreRow
            title="Suporte"
            description="Chamados abertos"
            icon={UsersIcon}
            score={30}
            total={100}
            accent="var(--color-destructive)"
          />
        </ScoreRowList>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-xs font-medium text-muted-foreground">
          External token with fallback
        </p>
        <ScoreRowList>
          <ScoreRow
            title="Categoria Customizada"
            description="Token externo com fallback"
            icon={FileTextIcon}
            score={74}
            total={100}
            accent="var(--color-brand, oklch(0.4 0.2 240))"
          />
        </ScoreRowList>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The `accent` prop accepts any CSS color or `var(--my-token)`. It sets `--score-accent` as a CSS custom property and drives icon container background/text (`bg-(--score-accent)/10 text-(--score-accent)`), the score value text, and the progress fill — overriding all `status`-based colors for per-instance customization.",
      },
    },
  },
}

// ── Percent Decimals ────────────────────────────────────────────────────────

export const PercentDecimals: Story = {
  args: {
    title: "Standard Audit",
    score: 68,
    total: 95,
    status: "auto",
    showProgress: true,
    percentDecimals: 0,
  },
  render: () => (
    <ScoreRowList>
      {([0, 1, 2] as const).map((decimals) => (
        <ScoreRow
          key={decimals}
          title={`percentDecimals=${decimals}`}
          description={`68 / 95 → ${Math.round((68 / 95) * 100)}% w/ ${decimals} decimal place${decimals !== 1 ? "s" : ""}`}
          icon={BarChart2Icon}
          score={68}
          total={95}
          status="auto"
          showProgress
          percentDecimals={decimals}
        />
      ))}
    </ScoreRowList>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The `percentDecimals` prop controls decimal places in the progress bar tooltip and aria-label. Three presets (0, 1, 2) demonstrate the effect. Hover the progress bar to see the tooltip.",
      },
    },
  },
}

// ── Row Tooltip ────────────────────────────────────────────────────────────

export const RowTooltip: Story = {
  args: {
    title: "Standard Audit",
    description: "June 2025 baseline",
    icon: FileTextIcon,
    score: 68,
    total: 95,
    status: "auto",
    showProgress: true,
    tooltip: "68 of 95 items reviewed against the recommended capacity.",
  },
  render: (args) => (
    <ScoreRowList>
      <ScoreRow {...args} />
      <ScoreRow
        title="Teaching Evaluation"
        description="2025.1 cycle"
        icon={GraduationCapIcon}
        score={42}
        total={80}
        status="auto"
        showProgress
        tooltip="42 of 80 evaluations submitted this cycle."
      />
    </ScoreRowList>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The `tooltip` prop wraps the entire row in a single, keyboard-focusable tooltip trigger and suppresses the progress bar's own tooltip — avoiding the nested-tooltip problem that occurs when hovering the progress bar inside a row that already has an outer tooltip. Tab to a row to reveal the tooltip via focus, or hover anywhere on the row (including the progress bar).",
      },
    },
  },
}
