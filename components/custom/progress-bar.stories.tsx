import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ProgressBar } from "@/components/custom/progress-bar"

const meta = {
  title: "Data Display/ProgressBar",
  component: ProgressBar,
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "Progress value (0–1 or 0–100)",
    },
    intent: {
      control: "select",
      options: ["primary", "secondary", "success", "destructive"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    total: {
      control: { type: "number", min: 1 },
      description:
        "Total value. When set, the bar fill is `value / total` and the label shows `value / total` instead of a percentage.",
    },
    loading: { control: "boolean" },
    precision: {
      control: { type: "number", min: 0, max: 5 },
      description: "Number of decimal places to display",
      defaultValue: 0,
    },
    name: { control: "text" },
    namePosition: {
      control: { type: "radio" },
      options: ["left", "right"],
    },
    upper: { control: "boolean" },
    showLabel: { control: "boolean" },
    tooltip: {
      control: "text",
      description:
        "Content to display in a tooltip when hovering over the progress bar.",
    },
    labelPosition: {
      control: { type: "radio" },
      options: ["left", "right"],
    },
    labelLayout: {
      control: "select",
      options: ["inline", "above", "below"],
      description: "Position of the name/label row relative to the bar.",
    },
    labelWidth: {
      control: "number",
      description: "Fixed width in pixels for the name slot.",
    },
    locale: {
      control: "text",
      description:
        "Locale used for formatting the percentage (e.g. pt-BR, en-US).",
    },
  },
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A horizontal progress indicator displaying structured values with animated fills, configurable labels, custom layouts, and semantic styling.",
          "",
          "Includes support for size variants (`sm`, `md`, `lg`), uppercase toggle labels, loading animations, custom numeric precision configurations, and tooltip wrappers.",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Primary Fill** | `--primary` | Background color for the primary progress indicator fill |",
          "| **Secondary Fill** | `--secondary` | Background color for the secondary progress indicator fill |",
          "| **Success Fill** | `bg-emerald-500` | Accent green color indicating successful completion |",
          "| **Destructive Fill** | `--destructive` | Background color representing error or critical status fill |",
          "| **Track Background** | `--muted` | Outer background bar track fill |",
          "| **Name text label** | `--muted-foreground` | Font color for left-positioned name descriptions |",
          "| **Active text label** | `--foreground` | Font color for right-positioned status titles |",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof ProgressBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: 65,
    name: "Progress",
    size: "sm",
    intent: "primary",
  },
}

export const AllIntents: Story = {
  args: { value: 75 },
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <ProgressBar value={75} intent="primary" name="Primary" />
      <ProgressBar value={60} intent="secondary" name="Secondary" />
      <ProgressBar value={85} intent="success" name="Success" />
      <ProgressBar value={40} intent="destructive" name="Destructive" />
    </div>
  ),
}

export const AllSizes: Story = {
  args: { value: 70 },
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <ProgressBar value={70} size="sm" name="Small" />
      <ProgressBar value={70} size="md" name="Medium" />
      <ProgressBar value={70} size="lg" name="Large" />
    </div>
  ),
}

export const WithPrecision: Story = {
  args: {
    value: 75.642,
    precision: 2,
    name: "Detailed Progress",
  },
  render: (args) => (
    <div className="flex w-96 flex-col gap-4">
      <ProgressBar {...args} value={75.642} precision={2} name="2 Decimals" />
      <ProgressBar {...args} value={75.642} precision={1} name="1 Decimal" />
      <ProgressBar
        {...args}
        value={75.642}
        precision={0}
        name="0 Decimals (Default)"
      />
    </div>
  ),
}

export const DifferentLocales: Story = {
  args: { value: 75.642 },
  parameters: {
    docs: {
      description: {
        story:
          "By default, `ProgressBar` uses `en-US` to format percentages (e.g., `75.64%`). Passing other locales like `pt-BR` or `fr-FR` changes the decimal separator and symbol spacing.",
      },
    },
  },
  render: (args) => (
    <div className="flex w-96 flex-col gap-4">
      <ProgressBar
        {...args}
        value={75.642}
        precision={2}
        locale="en-US"
        name="en-US (Default)"
      />
      <ProgressBar
        {...args}
        value={75.642}
        precision={2}
        locale="pt-BR"
        name="pt-BR"
      />
      <ProgressBar
        {...args}
        value={75.642}
        precision={2}
        locale="fr-FR"
        name="fr-FR"
      />
    </div>
  ),
}

export const Loading: Story = {
  args: {
    value: 50,
    name: "Loading",
    loading: true,
  },
}

export const LoadingStates: Story = {
  args: { value: 50 },
  parameters: {
    docs: {
      description: {
        story:
          "Skeleton placeholders rendered by `loading={true}` across all three `labelLayout` values and all three sizes. Each skeleton matches the dimensions of the real content it replaces.",
      },
    },
  },
  render: () => (
    <div className="flex w-96 flex-col gap-8">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted-foreground">inline</p>
        <ProgressBar value={60} name="Auditoria Normal" loading size="sm" />
        <ProgressBar value={60} name="Auditoria Normal" loading size="md" />
        <ProgressBar value={60} name="Auditoria Normal" loading size="lg" />
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted-foreground">above</p>
        <ProgressBar
          value={60}
          name="Auditoria Normal"
          labelLayout="above"
          loading
          size="sm"
        />
        <ProgressBar
          value={60}
          name="Auditoria Normal"
          labelLayout="above"
          loading
          size="md"
        />
        <ProgressBar
          value={60}
          name="Auditoria Normal"
          labelLayout="above"
          loading
          size="lg"
        />
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted-foreground">below</p>
        <ProgressBar
          value={60}
          name="Auditoria Normal"
          labelLayout="below"
          loading
          size="sm"
        />
        <ProgressBar
          value={60}
          name="Auditoria Normal"
          labelLayout="below"
          loading
          size="md"
        />
        <ProgressBar
          value={60}
          name="Auditoria Normal"
          labelLayout="below"
          loading
          size="lg"
        />
      </div>
    </div>
  ),
}

export const WithTooltip: Story = {
  args: {
    value: 85,
    name: "Storage",
    tooltip: "85 GB of 100 GB used",
  },
}

export const NoLabel: Story = {
  args: {
    value: 50,
    name: "Hidden Label",
    showLabel: false,
  },
}

export const LabelRight: Story = {
  args: {
    value: 60,
    name: "Progress",
    labelPosition: "right",
  },
}

export const NameRight: Story = {
  args: {
    value: 70,
    name: "Progress",
    namePosition: "right",
  },
}

export const Uppercase: Story = {
  args: {
    value: 55,
    name: "Progress Status",
    upper: true,
  },
}

export const LabelLayoutInline: Story = {
  args: { value: 72 },
  parameters: {
    docs: {
      description: {
        story:
          '`labelLayout="inline"` (default) — name and percentage share the same row as the bar.',
      },
    },
  },
  render: () => (
    <div className="flex w-96 flex-col gap-4">
      <ProgressBar
        value={72}
        name="Auditoria Normal"
        labelLayout="inline"
        intent="primary"
      />
      <ProgressBar
        value={45}
        name="Documentos Fiscais"
        labelLayout="inline"
        intent="success"
      />
      <ProgressBar
        value={20}
        name="Pendências"
        labelLayout="inline"
        intent="destructive"
      />
    </div>
  ),
}

export const LabelLayoutAbove: Story = {
  args: { value: 72 },
  parameters: {
    docs: {
      description: {
        story:
          '`labelLayout="above"` — name (left) and percentage (right) appear in a row above the full-width bar.',
      },
    },
  },
  render: () => (
    <div className="flex w-96 flex-col gap-6">
      <ProgressBar
        value={72}
        name="Auditoria Normal"
        labelLayout="above"
        intent="primary"
      />
      <ProgressBar
        value={45}
        name="Documentos Fiscais"
        labelLayout="above"
        intent="success"
      />
      <ProgressBar
        value={20}
        name="Pendências"
        labelLayout="above"
        intent="destructive"
      />
    </div>
  ),
}

export const LabelLayoutBelow: Story = {
  args: { value: 72 },
  parameters: {
    docs: {
      description: {
        story:
          '`labelLayout="below"` — bar renders first, then name (left) and percentage (right) appear below it.',
      },
    },
  },
  render: () => (
    <div className="flex w-96 flex-col gap-6">
      <ProgressBar
        value={72}
        name="Auditoria Normal"
        labelLayout="below"
        intent="primary"
      />
      <ProgressBar
        value={45}
        name="Documentos Fiscais"
        labelLayout="below"
        intent="success"
      />
      <ProgressBar
        value={20}
        name="Pendências"
        labelLayout="below"
        intent="destructive"
      />
    </div>
  ),
}

export const LabelLayoutComparison: Story = {
  args: { value: 60 },
  parameters: {
    docs: {
      description: {
        story:
          "Side-by-side comparison of all three `labelLayout` values with the same data.",
      },
    },
  },
  render: () => (
    <div className="flex w-96 flex-col gap-8">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-muted-foreground">inline</p>
        <ProgressBar value={60} name="Auditoria Normal" labelLayout="inline" />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-muted-foreground">above</p>
        <ProgressBar value={60} name="Auditoria Normal" labelLayout="above" />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-muted-foreground">below</p>
        <ProgressBar value={60} name="Auditoria Normal" labelLayout="below" />
      </div>
    </div>
  ),
}

export const RatioLabel: Story = {
  args: {
    value: 20,
    total: 95,
    size: "sm",
    name: "Auditoria Normal",
    labelLayout: "above",
  },
  parameters: {
    docs: {
      description: {
        story:
          "When `total` is provided the bar fill is calculated as `value / total` and the label switches from percentage to `value / total` format. Compatible with all `labelLayout` values.",
      },
    },
  },
  render: () => (
    <div className="flex w-96 flex-col gap-6">
      <ProgressBar
        value={20}
        total={95}
        name="Auditoria Normal"
        labelLayout="above"
      />
      <ProgressBar
        value={38}
        total={95}
        name="Documentos Fiscais"
        labelLayout="above"
        intent="success"
      />
      <ProgressBar
        value={91}
        total={95}
        name="Concluídos"
        labelLayout="above"
        intent="success"
      />
      <ProgressBar
        value={12}
        total={95}
        name="Pendências"
        labelLayout="above"
        intent="destructive"
      />
    </div>
  ),
}

export const FixedLabelWidth: Story = {
  args: { value: 75 },
  render: () => (
    <div className="flex w-96 flex-col gap-4">
      <ProgressBar value={75} name="Inflation" labelWidth={90} />
      <ProgressBar value={42} name="GDP Growth" labelWidth={90} />
      <ProgressBar
        value={88}
        intent="success"
        name="Employment"
        labelWidth={90}
      />
    </div>
  ),
}
