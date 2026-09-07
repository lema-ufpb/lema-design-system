import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BackgroundGlow } from "./background-glow"
import { Button } from "@/components/ui/button"

const meta = {
  title: "Data Display/BackgroundGlow",
  component: BackgroundGlow,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A BackgroundGlow component for the LEMA Design System.",
          "Supports CVA variants.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          '| `variant` | `"aurora" \| "spotlight" \| "beam"` | `"aurora"` | Variant |',
          '| `tone` | `"primary" \| "violet" \| "sky" \| "neutral"` | `"primary"` | Variant |',
        ].join("\n"),
      },
    },
    layout: "fullscreen",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["aurora", "spotlight", "beam", "grid-dots"],
    },
    tone: {
      control: "select",
      options: ["primary", "violet", "sky", "neutral"],
    },
  },
} satisfies Meta<typeof BackgroundGlow>

export default meta
type Story = StoryObj<typeof meta>

export const AuroraDefault: Story = {
  render: (args) => (
    <div className="relative flex min-h-[400px] w-full flex-col items-center justify-center overflow-hidden bg-background p-8">
      <BackgroundGlow {...args} />
      <div className="relative z-10 max-w-xl text-center">
        <h2 className="text-3xl font-bold tracking-tight">
          Efeito Aurora Suave
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Iluminação orgânica difusa posicionada no topo para enriquecer o
          contraste e foco do hero.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button>Começar Agora</Button>
          <Button variant="outline">Documentação</Button>
        </div>
      </div>
    </div>
  ),
}

export const Spotlight: Story = {
  render: () => (
    <div className="relative flex min-h-[400px] w-full flex-col items-center justify-center overflow-hidden bg-background p-8">
      <BackgroundGlow variant="spotlight" tone="violet" />
      <div className="relative z-10 max-w-xl text-center">
        <h2 className="text-3xl font-bold tracking-tight">
          Feixe de Spotlight
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Foco direcional cônico trazendo sensação de profundidade e elegância
          para o produto.
        </p>
      </div>
    </div>
  ),
}

export const GridDots: Story = {
  render: () => (
    <div className="relative flex min-h-[400px] w-full flex-col items-center justify-center overflow-hidden bg-background p-8">
      <BackgroundGlow variant="grid-dots" />
      <div className="relative z-10 max-w-xl text-center">
        <h2 className="text-3xl font-bold tracking-tight">
          Grid Reticulado Tecnológico
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Textura de precisão matemática atenuada radialmente nas bordas.
        </p>
      </div>
    </div>
  ),
}

export const Beam: Story = {
  render: () => (
    <div className="relative flex min-h-[400px] w-full flex-col items-center justify-center overflow-hidden bg-background p-8">
      <BackgroundGlow variant="beam" tone="sky" />
      <div className="relative z-10 max-w-xl text-center">
        <h2 className="text-3xl font-bold tracking-tight">
          Eixo de Luz Linear
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Linha central etérea para guiar o olhar pelo fluxo visual.
        </p>
      </div>
    </div>
  ),
}
