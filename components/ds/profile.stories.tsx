import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Profile } from "./profile"

const meta = {
  title: "Blocks/Profile",
  component: Profile,
  tags: ["autodocs"],
} satisfies Meta<typeof Profile>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: "Ana Silva",
    role: "Designer",
    bio: "Building DS",
    avatarUrl: "https://picsum.photos/100/100",
  },
}

export const Loading: Story = { args: { name: "x", loading: true } }
