import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { TeamCard } from "./team-card"

const meta = {
  title: "Team/TeamCard",
  component: TeamCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A TeamCard component for the LEMA Design System.",
          "Supports loading state, skeleton, CVA variants.",
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
          "| `socials` | `SocialLinkItem[]` | — | - |",
          "| `loading` | `boolean` | — | - |",
          '| `size` | `"sm" \| "md"` | `"md"` | Variant |',
        ].join("\n"),
      },
    },
  },
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
