import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { GridPulse } from "./grid-pulse"
import { Button } from "@/components/ui/button"

const meta = {
  title: "Effects/GridPulse",
  component: GridPulse,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "Grid de pontos que pulsa de tamanho e opacidade perto do cursor. Fica ocioso (sem RAF) enquanto o ponteiro não está sobre o container.",
          "Sob `prefers-reduced-motion`, desenha apenas o grid estático e não escuta eventos de ponteiro.",
          "Posicione com `absolute inset-0` atrás do conteúdo (`relative z-10`). Mova o cursor sobre a área para ver o efeito.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          '| `tone` | `"primary" \\| "violet" \\| "sky" \\| "neutral"` | `"primary"` | Cor dos pontos |',
          '| `radius` | `"sm" \\| "md" \\| "lg"` | `"md"` | Espaçamento do grid e raio de influência do cursor |',
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
    radius: { control: "inline-radio", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof GridPulse>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <div className="relative flex min-h-[420px] w-full flex-col items-center justify-center overflow-hidden bg-background p-8">
      <GridPulse {...args} />
      <div className="relative z-10 max-w-xl text-center">
        <h2 className="text-3xl font-bold tracking-tight">
          Passe o cursor por aqui
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Grid interativo que só consome CPU enquanto o ponteiro está sobre a
          área — parado o resto do tempo.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button>Começar agora</Button>
          <Button variant="outline">Ver documentação</Button>
        </div>
      </div>
    </div>
  ),
  args: { tone: "primary", radius: "md" },
}

export const AllTones: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {(["primary", "violet", "sky", "neutral"] as const).map((tone) => (
        <div
          key={tone}
          className="relative flex h-48 items-center justify-center overflow-hidden rounded-2xl border border-border bg-background"
        >
          <GridPulse tone={tone} />
          <p className="relative z-10 text-xs font-medium text-muted-foreground">
            {tone}
          </p>
        </div>
      ))}
    </div>
  ),
}

export const AllRadii: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {(["sm", "md", "lg"] as const).map((radius) => (
        <div
          key={radius}
          className="relative flex h-48 items-center justify-center overflow-hidden rounded-2xl border border-border bg-background"
        >
          <GridPulse radius={radius} />
          <p className="relative z-10 text-xs font-medium text-muted-foreground">
            {radius}
          </p>
        </div>
      ))}
    </div>
  ),
}
