import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BlogAuthor } from "./blog-author"

const meta = {
  title: "Blog/BlogAuthor",
  component: BlogAuthor,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A BlogAuthor component for the LEMA Design System.",
          "Supports loading state, skeleton, CVA variants.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `name` | `string` | — | - |",
          "| `avatarUrl` | `string` | — | - |",
          "| `role` | `string` | — | - |",
          "| `href` | `string` | — | - |",
          "| `loading` | `boolean` | — | - |",
          '| `size` | `"sm" \| "md"` | `"md"` | Variant |',
        ].join("\n"),
      },
    },
  },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md"] },
  },
} satisfies Meta<typeof BlogAuthor>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { name: "Ana Silva", avatarUrl: "https://picsum.photos/100/100" },
}

export const WithRole: Story = {
  args: {
    name: "Carlos Mendes",
    avatarUrl: "https://picsum.photos/100/100",
    role: "Editor",
  },
}

export const Loading: Story = {
  args: { name: "Name", loading: true, role: "Role" },
}
