import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { RiskLevelBar } from "@/components/ds/risk-level-bar"

const meta = {
  title: "Feedback/RiskLevelBar",
  component: RiskLevelBar,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A segmented indicator bar displaying custom risk levels and current value positions using a sliding pointer marker.",
          "",
          "Includes support for custom risk step segment configurations, loading animation frames, tooltip indicators, and side subtitle labels.",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Low Risk Segment** | `--risk-1` | Color fill representing low risk (default: oklch-based orange/red values) |",
          "| **Medium-Low Risk** | `--risk-2` | Color fill representing medium-low risk |",
          "| **Medium-High Risk** | `--risk-3` | Color fill representing medium-high risk |",
          "| **High Risk Segment** | `--risk-4` | Color fill representing high risk |",
          "| **Track Base** | `--muted` | Outer background bar container track fill |",
          "| **Main Label Text** | `--foreground` | Font color for key left-side indicators |",
          "| **Sub-Label Text** | `--muted-foreground` | Font color for description status subtitles |",
          "",
          "## Component Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `labelLeft` | `string` | — | (required) Left-side label text |",
          "| `labelRight` | `string` | — | (required) Right-side label text |",
          "| `value` | `number` | `0` | Risk value from 0 to 1 |",
          "| `loading` | `boolean` | `false` | Skeleton loading state |",
          "| `segments` | `RiskSegment[]` | Default 4 risk segments | Custom segment configuration |",
          '| `locale` | `UILocale` | `"en-US"` | Locale for percentage label |',
          '| `size` | `"sm" \\| "md" \\| "lg"` | `"sm"` | Bar height and label size |',
        ].join("\n"),
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 1, step: 0.01 },
      description: "Risk value from 0 to 1",
      table: { defaultValue: { summary: "0" } },
    },
    loading: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
      table: { defaultValue: { summary: "sm" } },
    },
    labelLeft: {
      control: "text",
      table: { defaultValue: { summary: "" } },
    },
    labelRight: {
      control: "text",
      table: { defaultValue: { summary: "" } },
    },
    segments: { table: { disable: true } },
    locale: {
      control: "inline-radio",
      options: ["en-US", "pt-BR", "es-ES", "fr-FR"],
      table: { defaultValue: { summary: "en-US" } },
    },
    className: { table: { disable: true } },
  },
} satisfies Meta<typeof RiskLevelBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    labelLeft: "Risk Level Indicator",
    labelRight: "Current Score",
    value: 0.65,
    loading: false,
    locale: "en-US",
    size: "sm",
  },
  parameters: {
    docs: {
      description: {
        story: "Default risk level bar at 0.65 with four risk segments.",
      },
    },
  },
}

export const LowRisk: Story = {
  args: {
    labelLeft: "Project Health",
    labelRight: "Status",
    value: 0.15,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Low risk value (0.15) — marker positioned near the left (low-risk) end of the bar.",
      },
    },
  },
}

export const HighRisk: Story = {
  args: {
    labelLeft: "System Alert Level",
    labelRight: "Severity",
    value: 0.9,
  },
  parameters: {
    docs: {
      description: {
        story:
          "High risk value (0.9) — marker positioned near the right (high-risk) end of the bar.",
      },
    },
  },
}

export const Loading: Story = {
  args: {
    labelLeft: "Risk Level Indicator",
    labelRight: "Current Score",
    value: 0.65,
    loading: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Loading state with skeleton placeholder replacing the bar and labels.",
      },
    },
  },
}

export const AllSizes: Story = {
  render: (args) => (
    <div className="flex w-full flex-col gap-6">
      <RiskLevelBar {...args} size="sm" />
      <RiskLevelBar {...args} size="md" />
      <RiskLevelBar {...args} size="lg" />
    </div>
  ),
  args: {
    labelLeft: "Risk Level Indicator",
    labelRight: "Current Score",
    value: 0.65,
  },
  parameters: {
    docs: {
      description: {
        story: "Comparison of all three size presets — sm, md, and lg.",
      },
    },
  },
}

export const LocalePTBR: Story = {
  args: {
    labelLeft: "Risk Level",
    labelRight: "Score",
    value: 0.65,
    locale: "pt-BR",
  },
  parameters: {
    docs: {
      description: {
        story: "Portuguese (pt-BR) localization applied to labels.",
      },
    },
  },
}

export const CustomSegments: Story = {
  args: {
    labelLeft: "Custom Scale",
    labelRight: "Value",
    value: 0.5,
    segments: [
      { color: "oklch(0.6 0.2 250)", range: [0, 0.5] },
      { color: "oklch(0.6 0.2 150)", range: [0.5, 1] },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Custom two-segment configuration with blue and green color overrides.",
      },
    },
  },
}
