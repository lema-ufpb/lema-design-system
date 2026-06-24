import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ProgressCircular } from "@/components/ds/progress-circular"

const meta = {
  title: "Feedback/ProgressCircular",
  component: ProgressCircular,
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "Progress value (0-1 or 0-100)",
      table: { defaultValue: { summary: "0" } },
    },
    intent: {
      control: "inline-radio",
      options: ["primary", "secondary", "success", "destructive"],
      table: { defaultValue: { summary: "primary" } },
    },
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg", "xl"],
      table: { defaultValue: { summary: "md" } },
    },
    loading: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    title: {
      control: "text",
      table: { defaultValue: { summary: "" } },
    },
    precision: {
      control: { type: "number", min: 0, max: 5 },
      description: "Number of decimal places to display",
      table: { defaultValue: { summary: "0" } },
    },
    locale: {
      control: "inline-radio",
      options: ["en-US", "pt-BR", "es-ES", "fr-FR"],
      table: { defaultValue: { summary: "en-US" } },
    },
    className: { table: { disable: true } },
  },
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A circular progress indicator designed for metric cards, download widgets, and visual KPIs, featuring animated SVGs, customizable center values, and subtitles.",
          "",
          "Includes support for size presets (`sm`, `md`, `lg`, `xl`), loading skeleton animations, customizable decimal precision, and color intent states.",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Primary Stroke** | `--primary` | SVG circle stroke color for primary intent |",
          "| **Secondary Stroke** | `--secondary` | SVG circle stroke color for secondary intent |",
          "| **Success Stroke** | `stroke-green-500` | SVG circle stroke color representing successful operations |",
          "| **Destructive Stroke** | `--destructive` | SVG circle stroke color representing error or critical status |",
          "| **Track Background** | `text-muted/30` | Translucent SVG path color behind the active fill stroke |",
          "| **Center Value label** | `--foreground` | Font color for the numerical percentage text |",
          "| **Sub-text description** | `--muted-foreground` | Font color for description labels under the gauge |",
          "",
          "## Component Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `value` | `number` | — | (required) Progress value (0–1 or 0–100) |",
          "| `title` | `string` | — | Label displayed below the circle |",
          '| `intent` | `"primary" \\| "secondary" \\| "success" \\| "destructive"` | `"primary"` | Stroke color |',
          '| `size` | `"sm" \\| "md" \\| "lg" \\| "xl"` | `"md"` | Circle diameter |',
          "| `loading` | `boolean` | `false` | Skeleton loading state |",
          "| `precision` | `number` | `0` | Decimal places for the center percentage |",
          '| `locale` | `UILocale` | `"en-US"` | Locale for formatting |',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof ProgressCircular>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: 75,
    title: "Upload Progress",
    size: "md",
    intent: "primary",
    loading: false,
    precision: 0,
    locale: "en-US",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Default circular progress at 75% with primary intent and medium size.",
      },
    },
  },
}

export const AllSizes: Story = {
  args: { value: 75 },
  render: () => (
    <div className="flex flex-wrap items-center gap-8">
      <ProgressCircular value={75} size="sm" title="Small" />
      <ProgressCircular value={75} size="md" title="Medium" />
      <ProgressCircular value={75} size="lg" title="Large" />
      <ProgressCircular value={75} size="xl" title="Extra Large" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Comparison of all four size presets — sm, md, lg, and xl.",
      },
    },
  },
}

export const WithPrecision: Story = {
  args: { value: 75.642, precision: 2, title: "Detailed Progress" },
  render: (args) => (
    <div className="flex flex-wrap items-center gap-8">
      <ProgressCircular
        {...args}
        value={75.642}
        precision={2}
        title="2 Decimals"
      />
      <ProgressCircular
        {...args}
        value={75.642}
        precision={1}
        title="1 Decimal"
      />
      <ProgressCircular
        {...args}
        value={75.642}
        precision={0}
        title="0 Decimals (Default)"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Circular progress with varying decimal precision — 2, 1, and 0 decimal places.",
      },
    },
  },
}

export const AllIntents: Story = {
  args: { value: 75.6 },
  render: () => (
    <div className="flex flex-wrap items-center gap-8">
      <ProgressCircular value={25} intent="primary" title="Primary" />
      <ProgressCircular value={50} intent="secondary" title="Secondary" />
      <ProgressCircular value={75} intent="success" title="Success" />
      <ProgressCircular value={90} intent="destructive" title="Destructive" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Comparison of all four intent colors — primary, secondary, success, and destructive.",
      },
    },
  },
}

export const LocalePTBR: Story = {
  args: {
    value: 75.642,
    title: "Progresso do Upload",
    size: "md",
    intent: "primary",
    precision: 2,
    locale: "pt-BR",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Portuguese (pt-BR) locale formatting applied to the progress value.",
      },
    },
  },
}

export const Loading: Story = {
  args: {
    value: 0,
    loading: true,
    title: "Computing...",
  },
  parameters: {
    docs: {
      description: {
        story: "Loading state with skeleton circle replacing the progress arc.",
      },
    },
  },
}

export const ColorTokens: Story = {
  name: "Color Tokens — fillColor & trackColor",
  args: { value: 72 },
  render: () => (
    <div className="flex flex-wrap gap-8">
      <div className="flex flex-col items-center gap-1">
        <p className="text-xs font-medium text-muted-foreground">
          Direct value
        </p>
        <ProgressCircular
          value={72}
          title="Custom Purple"
          fillColor="oklch(0.5 0.2 270)"
          trackColor="oklch(0.92 0.04 270)"
        />
      </div>
      <div className="flex flex-col items-center gap-1">
        <p className="text-xs font-medium text-muted-foreground">
          Success token
        </p>
        <ProgressCircular
          value={85}
          title="Success Token"
          fillColor="var(--color-success)"
        />
      </div>
      <div className="flex flex-col items-center gap-1">
        <p className="text-xs font-medium text-muted-foreground">
          Warning token
        </p>
        <ProgressCircular
          value={40}
          title="Warning Token"
          fillColor="var(--color-warning)"
        />
      </div>
      <div className="flex flex-col items-center gap-1">
        <p className="text-xs font-medium text-muted-foreground">
          External token
        </p>
        <ProgressCircular
          value={60}
          title="Brand Color"
          fillColor="var(--color-brand, oklch(0.4 0.2 240))"
        />
      </div>
      <div className="flex flex-col items-center gap-1">
        <p className="text-xs font-medium text-muted-foreground">
          Custom track
        </p>
        <ProgressCircular
          value={55}
          title="Custom Track"
          fillColor="oklch(0.55 0.18 30)"
          trackColor="oklch(0.93 0.04 30)"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The `fillColor` and `trackColor` props accept any CSS color or `var(--my-token)`. They set `--progress-fill` and `--progress-track` as CSS custom properties. `fillColor` applies via `stroke-(--progress-fill)` on the indicator SVG circle; `trackColor` applies via `text-(--progress-track)` (currentColor) on the track circle — bypassing the `intent` enum for per-instance customization.",
      },
    },
  },
}
