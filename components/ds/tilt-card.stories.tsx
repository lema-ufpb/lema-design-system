import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { TiltCard } from "./tilt-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const meta: Meta<typeof TiltCard> = {
  title: "Effects/TiltCard",
  component: TiltCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A TiltCard component for the LEMA Design System.",
          "Supports loading state, skeleton, CVA variants.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `glare` | `boolean` | — | - |",
          "| `intensity` | `number` | — | - |",
          "| `scaleOnHover` | `boolean` | — | - |",
          "| `loading` | `boolean` | — | - |",
          '| `variant` | `"default" \| "muted" \| "ghost"` | `"default"` | Variant |',
          '| `radius` | `"sm" \| "md" \| "lg" \| "xl"` | `"xl"` | Variant |',
        ].join("\n"),
      },
    },
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["default", "muted", "ghost"],
    },
    radius: { control: "inline-radio", options: ["sm", "md", "lg", "xl"] },
    glare: { control: "boolean" },
    intensity: { control: { type: "range", min: 5, max: 20, step: 1 } },
  },
}

export default meta
type Story = StoryObj<typeof TiltCard>

export const Default: Story = {
  render: (args) => (
    <TiltCard {...args} className="w-80 p-6">
      <Badge variant="secondary" className="w-fit">
        Novo
      </Badge>
      <h3 className="mt-3 text-base font-semibold">
        Gippity AI potencializa o universo
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">
        With 100k active users, the most popular platform for
        desenvolvedores.
      </p>
      <Button size="sm" className="mt-4 w-fit">
        Explorar
      </Button>
    </TiltCard>
  ),
  args: { variant: "default", radius: "xl", glare: true, intensity: 12 },
}

export const Muted: Story = {
  render: () => (
    <TiltCard variant="muted" className="w-80 p-6">
      <h3 className="text-base font-semibold">No shirt, no shoes</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        If someone shouts &quot;stop!&quot;, the fight ends.
      </p>
    </TiltCard>
  ),
}

export const Loading: Story = {
  args: { loading: true },
}

export const AllVariants: Story = {
  render: () => (
    <div className="grid gap-4 md:grid-cols-3">
      {(["default", "muted", "ghost"] as const).map((v) => (
        <TiltCard key={v} variant={v} className="p-6">
          <h3 className="text-sm font-semibold">{v}</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Hover para tilt 3D + glare
          </p>
        </TiltCard>
      ))}
    </div>
  ),
}
