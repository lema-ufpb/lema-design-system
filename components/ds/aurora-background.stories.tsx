import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { AuroraBackground } from "./aurora-background"
import { Button } from "@/components/ui/button"

const meta: Meta<typeof AuroraBackground> = {
  title: "Effects/AuroraBackground",
  component: AuroraBackground,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A AuroraBackground component for the LEMA Design System.",
          "Supports CVA variants.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `showRadial` | `boolean` | — | - |",
          '| `variant` | `"default" \| "muted" \| "dark"` | `"default"` | Variant |',
          '| `intensity` | `"subtle" \| "medium" \| "strong"` | `"medium"` | Variant |',
        ].join("\n"),
      },
    },
    layout: "fullscreen",
  },
  argTypes: {
    variant: { control: "inline-radio", options: ["default", "muted", "dark"] },
    intensity: {
      control: "inline-radio",
      options: ["subtle", "medium", "strong"],
    },
  },
}

export default meta
type Story = StoryObj<typeof AuroraBackground>

export const Default: Story = {
  render: (args) => (
    <AuroraBackground
      {...args}
      className="h-[420px] items-center justify-center p-10 text-center"
    >
      <h2 className="text-3xl font-bold tracking-tight">
        Build faster with Aceternity inspired
      </h2>
      <p className="mt-3 max-w-xl text-sm text-muted-foreground">
        Aurora boreal com gradientes animados, grid sutil e máscara radial —
        100% tokens sem raw.
      </p>
      <Button className="mt-6 rounded-full">Começar agora</Button>
    </AuroraBackground>
  ),
  args: { variant: "default", intensity: "medium" },
}

export const Dark: Story = {
  render: () => (
    <AuroraBackground
      variant="dark"
      intensity="strong"
      className="h-[420px] items-center justify-center p-8 text-center"
    >
      <h2 className="text-3xl font-bold">Dark aurora</h2>
      <p className="mt-2 text-sm text-white/70">
        Para heroes escuros com contraste alto
      </p>
    </AuroraBackground>
  ),
}

export const Subtle: Story = {
  args: { intensity: "subtle" },
  render: (args) => (
    <AuroraBackground
      {...args}
      className="h-[320px] items-center justify-center"
    >
      <p className="text-sm text-muted-foreground">
        Intensidade sutil para fundos de seção
      </p>
    </AuroraBackground>
  ),
}
