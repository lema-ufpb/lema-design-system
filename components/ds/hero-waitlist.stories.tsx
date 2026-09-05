import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { HeroWaitlist } from "./hero-waitlist"

const meta = {
  title: "Layout/HeroWaitlist",
  component: HeroWaitlist,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Centered hero with an email capture form — composed from HeroSection and WaitlistForm.",
      },
    },
  },
  args: {
    kicker: "Coming soon",
    title: "Be first in line.",
    description: "Join the waitlist and get early access when we launch.",
    socialProof: "Join 2,400+ people already on the list.",
    locale: "pt-BR" as const,
  },
} satisfies Meta<typeof HeroWaitlist>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const WithoutSocialProof: Story = {
  args: { socialProof: undefined },
}
