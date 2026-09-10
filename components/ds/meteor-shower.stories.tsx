import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { MeteorShower } from "./meteor-shower"
import { Button } from "@/components/ui/button"

const meta = {
  title: "Effects/MeteorShower",
  component: MeteorShower,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "Chuva de meteoros 100% CSS para fundo de hero — sem canvas, sem RAF, sem `use client`. Posições geradas de forma determinística (sem mismatch de hidratação).",
          "`motion-reduce:hidden` remove os meteoros sob `prefers-reduced-motion`.",
          "Posicione com `absolute inset-0` atrás do conteúdo (`relative z-10`).",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          '| `tone` | `"primary" \\| "violet" \\| "sky" \\| "neutral"` | `"primary"` | Cor dos meteoros |',
          '| `density` | `"sm" \\| "md" \\| "lg"` | `"md"` | Quantidade de meteoros simultâneos |',
        ].join("\n"),
      },
    },
    layout: "fullscreen",
  },
  argTypes: {
    tone: {
      control: "select",
      options: ["primary", "violet", "sky", "neutral"],
    },
    density: { control: "inline-radio", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof MeteorShower>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <div className="relative flex min-h-[420px] w-full flex-col items-center justify-center overflow-hidden bg-background p-8">
      <MeteorShower {...args} />
      <div className="relative z-10 max-w-xl text-center">
        <h2 className="text-3xl font-bold tracking-tight">
          Lançamentos em queda livre
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Efeito puramente CSS, praticamente sem custo de CPU — ideal para
          heroes de tráfego alto.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button>Começar agora</Button>
          <Button variant="outline">Ver documentação</Button>
        </div>
      </div>
    </div>
  ),
  args: { tone: "primary", density: "md" },
}

export const AllTones: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {(["primary", "violet", "sky", "neutral"] as const).map((tone) => (
        <div
          key={tone}
          className="relative flex h-48 items-center justify-center overflow-hidden rounded-2xl border border-border bg-background"
        >
          <MeteorShower tone={tone} />
          <p className="relative z-10 text-xs font-medium text-muted-foreground">
            {tone}
          </p>
        </div>
      ))}
    </div>
  ),
}

export const AllDensities: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {(["sm", "md", "lg"] as const).map((density) => (
        <div
          key={density}
          className="relative flex h-48 items-center justify-center overflow-hidden rounded-2xl border border-border bg-background"
        >
          <MeteorShower density={density} />
          <p className="relative z-10 text-xs font-medium text-muted-foreground">
            {density}
          </p>
        </div>
      ))}
    </div>
  ),
}
