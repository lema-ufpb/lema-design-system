import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { TeamGrid } from "./team-grid"

const members = Array.from({ length: 6 }).map((_, i) => ({
  name: `Member ${i + 1}`,
  role: "Engineer",
  bio: "Bio text",
  avatarUrl: `https://picsum.photos/seed/${i}/200/200`,
}))

const meta = {
  title: "Team/TeamGrid",
  component: TeamGrid,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A TeamGrid component for the LEMA Design System.",
          "Supports loading state, i18n support.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `title` | `string` | — | - |",
          "| `description` | `string` | — | - |",
          "| `members` | `TeamMember[]` | — | - |",
          "| `columns` | `3 \| 4` | — | - |",
          "| `locale` | `UILocale` | — | - |",
          "| `loading` | `boolean` | — | - |",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof TeamGrid>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { members } }

export const FourCols: Story = { args: { members, columns: 4 } }

export const Loading: Story = { args: { members, loading: true } }
