import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { StarShower } from "./star-shower"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Zap, EyeOff } from "lucide-react"

const meta = {
  title: "Effects/StarShower",
  component: StarShower,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "Céu estrelado vivo — estrelas que **pulsam**, **cintilam** e **riscam** o céu como cadentes. Canvas 2D com DPR 2x, pausa fora da viewport e frame estático sob `prefers-reduced-motion`.",
          "Inspirado em `ParticleField` mas orgânico: 18% das estrelas são *cross* (4 pontas) com halo, parallax sutil no `interactive`, e cauda degradê nas cadentes.",
          "Posicione com `absolute inset-0` atrás do conteúdo (`relative z-10`). Fundo recomendado: `bg-zinc-950` para heros noturnos ou `bg-background` para contraste claro.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          '| `tone` | `"primary" \\| "violet" \\| "sky" \\| "warm" \\| "cool" \\| "neutral"` | `"primary"` | Matiz via `--star-color` |',
          '| `density` | `"sm" \\| "md" \\| "lg"` | `"md"` | 45 / 90 / 140 estrelas |',
          '| `speed` | `"slow" \\| "normal" \\| "fast"` | `"normal"` | 0.55x / 1x / 1.65x |',
          "| `twinkle` | `boolean` | `true` | Cintilação aleatória |",
          "| `shootingStars` | `boolean` | `true` | Cadentes a cada 3-6s |",
          "| `interactive` | `boolean` | `false` | Parallax no mousemove |",
          "",
          "---",
        ].join("\n"),
      },
    },
    layout: "fullscreen",
  },
  argTypes: {
    tone: {
      control: "select",
      options: ["primary", "violet", "sky", "warm", "cool", "neutral"],
    },
    density: { control: "inline-radio", options: ["sm", "md", "lg"] },
    speed: { control: "inline-radio", options: ["slow", "normal", "fast"] },
    twinkle: { control: "boolean" },
    shootingStars: { control: "boolean" },
    interactive: { control: "boolean" },
  },
} satisfies Meta<typeof StarShower>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <div className="relative flex min-h-[480px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-zinc-950 p-8">
      <StarShower {...args} />
      {/* Subtle nebula vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_0%,oklch(0.55_0.22_290/0.12),transparent_70%)]" />
      <div className="relative z-10 max-w-xl text-center">
        <Badge
          variant="secondary"
          className="mb-4 gap-1.5 bg-white/10 text-white backdrop-blur hover:bg-white/15"
        >
          <Sparkles className="size-3.5" />
          Novo · Fundo vivo
        </Badge>
        <h2 className="text-3xl font-bold tracking-tight text-balance text-white sm:text-4xl">
          Um céu que respira
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-pretty text-white/65">
          Cada estrela tem fase, brilho e profundidade próprios. As *cross*
          cintilam mais forte. A cada poucos segundos, uma cadente risca — sem
          JS pesado, sem `use client` no consumidor.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button>Lançar agora</Button>
          <Button
            variant="outline"
            className="bg-white text-zinc-900 hover:bg-white/90"
          >
            Ver código
          </Button>
        </div>
        <p className="mt-4 text-xs text-white/40">
          Passe o mouse para parallax · `interactive`
        </p>
      </div>
    </div>
  ),
  args: {
    tone: "primary",
    density: "md",
    speed: "normal",
    twinkle: true,
    shootingStars: true,
    interactive: true,
  } as never,
}

export const AllTones: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {(["primary", "violet", "sky", "warm", "cool", "neutral"] as const).map(
        (tone) => (
          <div
            key={tone}
            className="relative flex h-44 items-center justify-center overflow-hidden rounded-2xl border border-border bg-zinc-950"
          >
            <StarShower tone={tone} density="md" />
            <span className="relative z-10 rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-white capitalize backdrop-blur-sm">
              {tone}
            </span>
          </div>
        )
      )}
    </div>
  ),
}

export const AllDensities: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {(["sm", "md", "lg"] as const).map((density) => (
        <div
          key={density}
          className="relative flex h-48 items-center justify-center overflow-hidden rounded-2xl border border-border bg-zinc-950"
        >
          <StarShower density={density} shootingStars={false} />
          <span className="relative z-10 rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {density} ·{" "}
            {density === "sm" ? "45" : density === "md" ? "90" : "140"} estrelas
          </span>
        </div>
      ))}
    </div>
  ),
}

export const AllSpeeds: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {(["slow", "normal", "fast"] as const).map((speed) => (
        <div
          key={speed}
          className="relative flex h-48 items-center justify-center overflow-hidden rounded-2xl border border-border bg-zinc-950"
        >
          <StarShower speed={speed} />
          <span className="relative z-10 rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-white capitalize backdrop-blur-sm">
            {speed}
          </span>
        </div>
      ))}
    </div>
  ),
}

export const WithoutTwinkle: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <div className="relative flex h-64 flex-col items-center justify-center overflow-hidden rounded-2xl border border-border bg-zinc-950 p-4">
        <StarShower twinkle />
        <span className="relative z-10 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur">
          <Sparkles className="size-3" /> com cintilação
        </span>
      </div>
      <div className="relative flex h-64 flex-col items-center justify-center overflow-hidden rounded-2xl border border-border bg-zinc-950 p-4">
        <StarShower twinkle={false} />
        <span className="relative z-10 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur">
          <EyeOff className="size-3" /> só pulso
        </span>
      </div>
    </div>
  ),
}

export const WithoutShooting: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <div className="relative flex h-64 items-center justify-center overflow-hidden rounded-2xl border border-border bg-zinc-950">
        <StarShower shootingStars />
        <Badge className="relative z-10 gap-1 bg-white/10 text-white backdrop-blur">
          <Zap className="size-3" /> com cadentes
        </Badge>
      </div>
      <div className="relative flex h-64 items-center justify-center overflow-hidden rounded-2xl border border-border bg-zinc-950">
        <StarShower shootingStars={false} />
        <Badge
          variant="secondary"
          className="relative z-10 bg-white/10 text-white backdrop-blur"
        >
          só pulso
        </Badge>
      </div>
    </div>
  ),
}

export const Interactive: Story = {
  render: () => (
    <div className="relative flex min-h-[420px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-zinc-950 p-8">
      <StarShower interactive tone="violet" density="lg" />
      <div className="relative z-10 max-w-md rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-md">
        <h3 className="font-semibold tracking-tight text-white">
          Parallax por profundidade
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-white/60">
          Mova o cursor. Estrelas maiores (cross) deslocam até 6px; as menores,
          quase nada. Profundidade = `0.4 + (raio/2.8)*0.6`.
        </p>
        <div className="mt-4 flex gap-2">
          <Badge className="bg-white text-zinc-900">interactive</Badge>
          <Badge variant="outline" className="border-white/20 text-white">
            lg · violet
          </Badge>
        </div>
      </div>
    </div>
  ),
}

export const LightBackground: Story = {
  render: () => (
    <div className="relative flex min-h-[420px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-border bg-background p-8">
      <StarShower tone="primary" density="md" />
      <div className="relative z-10 max-w-xl text-center">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Também funciona no claro
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Em `bg-background`, o `tone=primary` usa `var(--primary)` escuro. As
          cadentes ainda riscam — teste em `bg-zinc-950` para o efeito hero
          noturno completo.
        </p>
      </div>
    </div>
  ),
}

export const WarmCool: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <div className="relative flex h-64 items-center justify-center overflow-hidden rounded-2xl bg-[#1a1300] p-4">
        <StarShower tone="warm" />
        <span className="relative z-10 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-medium text-amber-200">
          warm · amber
        </span>
      </div>
      <div className="relative flex h-64 items-center justify-center overflow-hidden rounded-2xl bg-[#001a2e] p-4">
        <StarShower tone="cool" />
        <span className="relative z-10 rounded-full bg-sky-500/20 px-3 py-1 text-xs font-medium text-sky-200">
          cool · sky
        </span>
      </div>
    </div>
  ),
}
