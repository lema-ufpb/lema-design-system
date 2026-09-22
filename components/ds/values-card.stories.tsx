import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, within } from "storybook/test"
import { Shield, Sparkles, Heart, Lightbulb } from "lucide-react"
import { ValuesCard } from "./values-card"

const meta: Meta<typeof ValuesCard> = {
  title: "About/ValuesCard",
  component: ValuesCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A ValuesCard component for the LEMA Design System.",
          "Supports CVA variants.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `title` | `string` | — | - |",
          "| `description` | `string` | — | - |",
          "| `icon` | `React.ComponentType<{ className?: string }>` | — | - |",
          "| `index` | `string \| number` | — | - |",
          '| `variant` | `"default" \| "outline" \| "accent" \| "muted"` | `"default"` | Variant |',
        ].join("\n"),
      },
    },
    layout: "centered",
  },
  args: {
    title: "Scientific Excellence",
    description:
      "Rigorous commitment to transparent scientific methods, replicability and cutting-edge innovation.",
    icon: Sparkles,
    index: "01",
    variant: "default",
  },
}

export default meta
type Story = StoryObj<typeof ValuesCard>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Scientific Excellence")).toBeInTheDocument()
    await expect(canvas.getByText("01")).toBeInTheDocument()
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <ValuesCard
        title="Default"
        description="Soft border and elevated neutral card with subtle hover."
        icon={Sparkles}
        index="01"
        variant="default"
      />
      <ValuesCard
        title="Outline"
        description="Fundo transparente e borda delineada com contraste moderado."
        icon={Shield}
        index="02"
        variant="outline"
      />
      <ValuesCard
        title="Accent"
        description="Surface subtly tinted by the theme primary color."
        icon={Heart}
        index="03"
        variant="accent"
      />
      <ValuesCard
        title="Muted"
        description="Muted background for secondary hierarchy or visual rest."
        icon={Lightbulb}
        index="04"
        variant="muted"
      />
    </div>
  ),
}

export const WithIndex: Story = {
  args: {
    title: "Inclusion and Accessibility",
    description:
      "We design open and accessible interfaces and systems for all of society.",
    icon: Heart,
    index: 5,
    variant: "accent",
  },
}

export const WithoutIcon: Story = {
  args: {
    title: "Autonomia Acadêmica",
    description:
      "Free research dedicated to generating transformative knowledge.",
    icon: undefined,
    index: "03",
    variant: "default",
  },
}
