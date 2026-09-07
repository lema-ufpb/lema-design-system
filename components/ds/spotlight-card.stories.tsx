import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { SpotlightCard } from "./spotlight-card"
import { ShieldCheckIcon } from "lucide-react"

const meta: Meta<typeof SpotlightCard> = {
  title: "Effects/SpotlightCard",
  component: SpotlightCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A SpotlightCard component for the LEMA Design System.",
          "Supports loading state, skeleton, CVA variants.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `spotlightColor` | `string` | — | - |",
          "| `spotlightRadius` | `number` | — | - |",
          "| `title` | `string` | — | - |",
          "| `description` | `string` | — | - |",
          "| `loading` | `boolean` | — | - |",
          '| `radius` | `"sm" \| "md" \| "lg" \| "xl"` | `"xl"` | Variant |',
          '| `variant` | `"default" \| "muted" \| "outline"` | `"default"` | Variant |',
        ].join("\n"),
      },
    },
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof SpotlightCard>

export const Default: Story = {
  args: {
    title: "Passos de autenticação",
    description: "Siga os passos para proteger sua conta",
    children: (
      <ol className="flex flex-col gap-2 text-sm">
        <li>• Digite seu e-mail</li>
        <li>• Crie uma senha forte</li>
        <li>• Ative a verificação em duas etapas</li>
        <li>• Verifique sua identidade</li>
      </ol>
    ),
  },
  render: (args) => <SpotlightCard {...args} className="w-96" />,
}

export const CustomColor: Story = {
  args: {
    title: "Segurança em primeiro lugar",
    description: "Seus dados protegidos com criptografia",
    spotlightColor: "hsl(var(--success) / 0.15)",
    children: (
      <div className="flex items-center gap-3 text-sm">
        <ShieldCheckIcon className="size-5 text-success" />
        <span>Conta verificada com sucesso</span>
      </div>
    ),
  },
  render: (args) => <SpotlightCard {...args} className="w-80" />,
}

export const Loading: Story = {
  args: { loading: true },
}

export const AllVariants: Story = {
  render: () => (
    <div className="grid gap-4 md:grid-cols-3">
      {(["default", "muted", "outline"] as const).map((v) => (
        <SpotlightCard
          key={v}
          variant={v}
          title={v}
          description="Hover para spotlight"
        >
          <p className="text-sm text-muted-foreground">
            Mova o mouse sobre o card
          </p>
        </SpotlightCard>
      ))}
    </div>
  ),
}
