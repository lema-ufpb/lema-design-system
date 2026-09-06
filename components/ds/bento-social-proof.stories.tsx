import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BentoSocialProof } from "./bento-social-proof"

function Wordmark({ children }: { children: string }) {
  return (
    <span className="text-lg font-semibold tracking-tight text-foreground">
      {children}
    </span>
  )
}

const quotes = [
  {
    quote:
      "This design system cut our build time in half. We ship features, not boilerplate.",
    name: "Alex Rivera",
    role: "CTO, Acme",
    avatarFallback: "AR",
  },
  {
    quote: "The best-documented component library we've adopted.",
    name: "Priya Nair",
    role: "Lead Designer, Globex",
    avatarFallback: "PN",
  },
]

const logos = ["Forbes", "TechCrunch", "Wired", "The Verge"].map((name) => ({
  label: name,
  content: <Wordmark>{name}</Wordmark>,
}))

const meta = {
  title: "Blocks/BentoSocialProof",
  component: BentoSocialProof,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A bento grid mixing testimonial tiles with a press/logo wall tile — composed from BentoGrid, PullQuote and PressWall.",
      },
    },
  },
  args: { quotes, logos, logosLabel: "As seen in" },
} satisfies Meta<typeof BentoSocialProof>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const WithoutLogos: Story = {
  args: { logos: [] },
}
