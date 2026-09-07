import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Cta } from "./cta"

const meta = {
  title: "CTA/Cta",
  component: Cta,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A Cta component for the LEMA Design System.",
          "Supports loading state, skeleton, CVA variants.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `badge` | `string` | — | - |",
          "| `title` | `string` | — | - |",
          "| `description` | `string` | — | - |",
          "| `primaryAction` | `CtaAction` | — | - |",
          "| `secondaryAction` | `CtaAction` | — | - |",
          "| `loading` | `boolean` | — | - |",
          '| `tone` | `"default" \| "primary" \| "muted" \| "glow"` | `"default"` | Variant |',
          '| `align` | `"left" \| "center"` | `"center"` | Variant |',
          '| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Variant |',
        ].join("\n"),
      },
    },
  },
  argTypes: {
    tone: {
      control: "select",
      options: ["default", "primary", "muted", "glow"],
    },
    align: { control: "inline-radio", options: ["left", "center"] },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof Cta>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    badge: "New",
    title: "Ready to get started?",
    description:
      "Join researchers and developers building modern web apps with LEMA DS.",
    primaryAction: { label: "Get started" },
    secondaryAction: { label: "Learn more" },
  },
}

export const AllTones: Story = {
  args: { title: "Title", description: "Description" },
  render: () => (
    <div className="flex flex-col gap-6">
      {(["default", "primary", "muted", "glow"] as const).map((tone) => (
        <Cta
          key={tone}
          tone={tone}
          title={`Tone ${tone}`}
          description="Description for CTA tone variant."
          primaryAction={{ label: "Primary" }}
          secondaryAction={{ label: "Secondary" }}
        />
      ))}
    </div>
  ),
}

export const AlignLeft: Story = {
  args: {
    title: "Left aligned CTA",
    description: "Content aligns to the left for editorial layouts.",
    align: "left",
    primaryAction: { label: "Get started" },
  },
}

export const Loading: Story = { args: { title: "Loading", loading: true } }
