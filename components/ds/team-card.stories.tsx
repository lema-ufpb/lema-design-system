import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { TeamCard } from "./team-card"

const meta = {
  title: "Blocks/TeamCard",
  component: TeamCard,
  tags: ["autodocs"],
  argTypes: { size: { control: "inline-radio", options: ["sm", "md"] } },
} satisfies Meta<typeof TeamCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: "Ana Silva",
    role: "Design Lead",
    bio: "Building design systems at LEMA.",
    avatarUrl: "https://picsum.photos/200/200",
    socials: [{ platform: "github", href: "https://github.com" }],
  },
}

export const Loading: Story = { args: { name: "x", loading: true } }
