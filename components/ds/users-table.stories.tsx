import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { UsersTable } from "./users-table"

const meta = {
  title: "ReUI/UsersTable",
  component: UsersTable,
  tags: ["autodocs"],
} satisfies Meta<typeof UsersTable>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { users: [{ name: "Ana Silva", email: "ana@ufpb.br", role: "Admin", status: "active" }] },
}

export const Loading: Story = { args: { users: [], loading: true } }
