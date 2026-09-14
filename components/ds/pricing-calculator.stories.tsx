import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { PricingCalculator } from "./pricing-calculator"

const meta = {
  title: "SaaS/PricingCalculator",
  component: PricingCalculator,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PricingCalculator>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    basePrice: 0,
    unitLabel: "usuários",
    unitPrice: 45.5,
    minUnits: 1,
    maxUnits: 50,
    step: 1,
    discountPercent: 15,
    title: "Plano Corporativo",
    description:
      "Arraste o slider para simular o custo mensal para o seu time.",
    className: "w-full max-w-4xl mx-auto",
  },
}

export const HighVolumeAPI: Story = {
  args: {
    basePrice: 99,
    unitLabel: "milhões de requisições",
    unitPrice: 5,
    minUnits: 1,
    maxUnits: 100,
    step: 5,
    discountPercent: 25,
    currency: "$",
    title: "Plataforma de APIs",
    description:
      "Escale suas aplicações sem preocupações. O plano base inclui 1 milhão de requisições.",
    features: [
      "Rate limits personalizados",
      "SLA de 99.99%",
      "IPs dedicados",
      "Suporte via Slack",
    ],
    className: "w-full max-w-4xl mx-auto",
  },
}
