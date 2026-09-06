import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ContactSplit } from "./contact-split"
import { OfficeLocationItem, OfficeLocations } from "./office-locations"
import { TeamRoster, TeamRosterCard } from "./team-roster"

const offices = [
  {
    city: "São Paulo",
    country: "Brazil",
    address: "Av. Paulista, 1000",
    timeZone: "America/Sao_Paulo",
  },
  {
    city: "Lisbon",
    country: "Portugal",
    address: "Rua Augusta, 200",
    timeZone: "Europe/Lisbon",
  },
]

const team = [
  { name: "Alex Rivera", role: "Sales", avatarFallback: "AR" },
  { name: "Priya Nair", role: "Support", avatarFallback: "PN" },
]

const meta = {
  title: "Blocks/ContactSplit",
  component: ContactSplit,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Split contact section — form on one side, a flexible aside slot on the other — composed from HeroSection and ContactForm.",
      },
    },
  },
  args: {
    kicker: "Get in touch",
    title: "We'd love to hear from you.",
    description: "Fill out the form and our team will get back to you.",
  },
} satisfies Meta<typeof ContactSplit>

export default meta
type Story = StoryObj<typeof meta>

export const WithOfficeLocations: Story = {
  args: {
    aside: (
      <OfficeLocations>
        {offices.map((office) => (
          <OfficeLocationItem key={office.city} {...office} />
        ))}
      </OfficeLocations>
    ),
  },
}

export const WithTeam: Story = {
  args: {
    aside: (
      <TeamRoster columns={2}>
        {team.map((member) => (
          <TeamRosterCard key={member.name} {...member} />
        ))}
      </TeamRoster>
    ),
  },
}
