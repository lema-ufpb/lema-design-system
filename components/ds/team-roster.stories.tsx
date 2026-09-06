import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Globe, Mail } from "lucide-react"
import { TeamRoster, TeamRosterCard } from "./team-roster"

const members = [
  {
    name: "Alex Rivera",
    role: "Co-founder & CEO",
    avatarFallback: "AR",
    status: "available" as const,
  },
  {
    name: "Priya Nair",
    role: "Head of Design",
    avatarFallback: "PN",
    status: "busy" as const,
  },
  {
    name: "Diego Souza",
    role: "Engineering Lead",
    avatarFallback: "DS",
    status: "available" as const,
  },
  {
    name: "Mei Chen",
    role: "Product Manager",
    avatarFallback: "MC",
    status: "offline" as const,
  },
]

const social = [
  { label: "Website", href: "#", icon: Globe },
  { label: "Email", href: "#", icon: Mail },
]

const meta = {
  title: "Data Display/TeamRoster",
  component: TeamRosterCard,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A grid of team member cards with avatar, role, availability status, and social links revealed on hover/focus.",
      },
    },
  },
  args: {
    name: "Alex Rivera",
    role: "Co-founder & CEO",
    avatarFallback: "AR",
    size: "md",
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    status: { control: "select", options: ["available", "busy", "offline"] },
  },
} satisfies Meta<typeof TeamRosterCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <TeamRoster columns={4}>
      {members.map((member) => (
        <TeamRosterCard key={member.name} {...member} social={social} />
      ))}
    </TeamRoster>
  ),
}

export const AllSizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-10">
      <TeamRoster columns={4}>
        <TeamRosterCard {...args} size="sm" social={social} />
      </TeamRoster>
      <TeamRoster columns={4}>
        <TeamRosterCard {...args} size="md" social={social} />
      </TeamRoster>
      <TeamRoster columns={4}>
        <TeamRosterCard {...args} size="lg" social={social} />
      </TeamRoster>
    </div>
  ),
}

export const AllStatuses: Story = {
  render: (args) => (
    <TeamRoster columns={3}>
      <TeamRosterCard {...args} name="Alex Rivera" status="available" />
      <TeamRosterCard {...args} name="Priya Nair" status="busy" />
      <TeamRosterCard {...args} name="Diego Souza" status="offline" />
    </TeamRoster>
  ),
}

export const TwoColumns: Story = {
  render: () => (
    <TeamRoster columns={2}>
      {members.map((member) => (
        <TeamRosterCard key={member.name} {...member} social={social} />
      ))}
    </TeamRoster>
  ),
}

export const Loading: Story = {
  render: () => (
    <TeamRoster columns={4}>
      {Array.from({ length: 4 }).map((_, index) => (
        <TeamRosterCard key={index} name="" loading />
      ))}
    </TeamRoster>
  ),
}
