import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { UsersTable } from "./users-table"

const meta = {
  title: "Data Display/UsersTable",
  component: UsersTable,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A UsersTable component for the LEMA Design System.",
          "Supports loading state, skeleton.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `users` | `UserRow[]` | — | - |",
          "| `loading` | `boolean` | — | - |",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof UsersTable>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    users: [
      {
        name: "Ana Silva",
        email: "ana@ufpb.br",
        role: "Admin",
        status: "active",
      },
    ],
  },
}

export const Loading: Story = { args: { users: [], loading: true } }
