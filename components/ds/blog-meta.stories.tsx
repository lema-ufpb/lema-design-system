import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BlogMeta } from "./blog-meta"

const meta = {
  title: "Blog/BlogMeta",
  component: BlogMeta,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md"] },
    locale: { control: "inline-radio", options: ["en-US", "pt-BR", "es-ES", "fr-FR"] },
  },
} satisfies Meta<typeof BlogMeta>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { publishedAt: "2026-03-10", readingTime: 5, category: "Design" } }

export const WithoutCategory: Story = { args: { publishedAt: "2026-03-10", readingTime: 3 } }

export const Loading: Story = { args: { loading: true } }
