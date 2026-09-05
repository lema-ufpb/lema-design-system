import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { LogoCloudQuotes } from "./logo-cloud-quotes"

function Wordmark({ children }: { children: string }) {
  return (
    <span className="text-base font-semibold tracking-tight text-foreground">
      {children}
    </span>
  )
}

const items = [
  {
    logo: <Wordmark>Acme</Wordmark>,
    quote:
      "This cut our build time in half. We ship features, not boilerplate.",
    name: "Alex Rivera",
    role: "CTO, Acme",
    avatarFallback: "AR",
  },
  {
    logo: <Wordmark>Globex</Wordmark>,
    quote: "The best-documented component library we've adopted.",
    name: "Priya Nair",
    role: "Lead Designer, Globex",
    avatarFallback: "PN",
  },
]

const meta = {
  title: "Layout/LogoCloudQuotes",
  component: LogoCloudQuotes,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Customer logo paired with a short testimonial, in a card grid — composed from PullQuote.",
      },
    },
  },
  args: { items },
} satisfies Meta<typeof LogoCloudQuotes>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
