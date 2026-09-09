import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, within } from "storybook/test"

import { SkeletonLayout } from "./skeleton-layout"

const meta = {
  title: "Feedback/SkeletonLayout",
  component: SkeletonLayout,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Pre-composed full-screen and section skeleton layouts (Dashboard, Table, Profile, Form, List) ensuring exact layout matching without custom animate-pulse divs.",
      },
    },
  },
  args: {
    pattern: "dashboard",
  },
  argTypes: {
    pattern: {
      control: "select",
      options: ["dashboard", "table", "profile", "form", "list"],
      description: "Layout skeleton pattern.",
    },
    rows: {
      control: "number",
      description: "Number of rows (for table/list).",
    },
    columns: {
      control: "number",
      description: "Number of columns (for table).",
    },
  },
} satisfies Meta<typeof SkeletonLayout>

export default meta
type Story = StoryObj<typeof meta>

export const Dashboard: Story = {
  args: {
    pattern: "dashboard",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const el = canvas.getByRole("status")
    await expect(el).toHaveAttribute("aria-busy", "true")
  },
}

export const Table: Story = {
  args: {
    pattern: "table",
    rows: 5,
    columns: 4,
  },
}

export const Profile: Story = {
  args: {
    pattern: "profile",
  },
}

export const Form: Story = {
  args: {
    pattern: "form",
  },
}

export const List: Story = {
  args: {
    pattern: "list",
    rows: 4,
  },
}
