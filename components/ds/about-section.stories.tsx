import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { AboutSection } from "./about-section"

const stats = [
  { label: "Customers", value: "4.2K" },
  { label: "Uptime", value: "99.9%" },
  { label: "Countries", value: 38 },
  { label: "Team members", value: 24 },
]

const team = [
  { name: "Alex Rivera", role: "Co-founder & CEO", avatarFallback: "AR" },
  { name: "Priya Nair", role: "Head of Design", avatarFallback: "PN" },
  { name: "Diego Souza", role: "Engineering Lead", avatarFallback: "DS" },
  { name: "Mei Chen", role: "Product Manager", avatarFallback: "MC" },
]

const meta = {
  title: "Layout/AboutSection",
  component: AboutSection,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A composed 'About' page block — story + founder quote + stats strip + team grid — built from existing ds/ atoms (HeroSection, PullQuote, CardStat, TeamRoster). A reference for composing full page sections from the atomized catalog.",
      },
    },
  },
  args: {
    kicker: "About us",
    title: "Built to ship, not to demo.",
    description:
      "We started this company because we believed teams deserved software that respects their time.",
    quote:
      "Every pixel has a reason. We design each section the way we'd design a feature for a paying customer.",
    quoteName: "Alex Rivera",
    quoteRole: "Co-founder & CEO",
    quoteAvatarFallback: "AR",
    stats,
    team,
  },
} satisfies Meta<typeof AboutSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const WithoutQuote: Story = {
  args: {
    quote: undefined,
  },
}

export const WithoutTeam: Story = {
  args: {
    team: [],
  },
}

export const StoryOnly: Story = {
  args: {
    quote: undefined,
    stats: [],
    team: [],
  },
}
