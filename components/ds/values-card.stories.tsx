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
    title: "Excelência Científica",
    description:
      "Compromisso rigoroso com métodos científicos transparentes, replicabilidade e inovação de ponta.",
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
    await expect(canvas.getByText("Excelência Científica")).toBeInTheDocument()
    await expect(canvas.getByText("01")).toBeInTheDocument()
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <ValuesCard
        title="Default"
        description="Borda suave e cartão neutro elevado com hover sutil."
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
        description="Superfície sutilmente tingida pela cor primária do tema."
        icon={Heart}
        index="03"
        variant="accent"
      />
      <ValuesCard
        title="Muted"
        description="Fundo atenuado para hierarquia secundária ou repouso visual."
        icon={Lightbulb}
        index="04"
        variant="muted"
      />
    </div>
  ),
}

export const WithIndex: Story = {
  args: {
    title: "Inclusão e Acessibilidade",
    description:
      "Projetamos interfaces e sistemas abertos e acessíveis para toda a sociedade.",
    icon: Heart,
    index: 5,
    variant: "accent",
  },
}

export const WithoutIcon: Story = {
  args: {
    title: "Autonomia Acadêmica",
    description:
      "Pesquisa livre e dedicada à geração de conhecimento transformador.",
    icon: undefined,
    index: "03",
    variant: "default",
  },
}
