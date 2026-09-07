import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Profile } from "./profile"

const meta = {
  title: "Dashboard/Profile",
  component: Profile,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A Profile component for the LEMA Design System.",
          "Supports loading state, skeleton.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `name` | `string` | — | - |",
          "| `role` | `string` | — | - |",
          "| `bio` | `string` | — | - |",
          "| `avatarUrl` | `string` | — | - |",
          "| `stats` | `{ label: string` | — | - |",
          "| `loading` | `boolean` | — | - |",
        ].join("\n"),
      },
    },
  },
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
