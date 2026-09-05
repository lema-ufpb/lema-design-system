import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BlogList } from "./blog-list"

const posts = Array.from({ length: 3 }).map((_, i) => ({
  title: `List post ${i + 1}: The future of content`,
  excerpt: "Exploring how design systems power editorial workflows.",
  imageSrc: `https://picsum.photos/seed/list${i}/400/280`,
  category: "Product",
  href: "#",
  author: { name: "João Costa", avatarUrl: "https://picsum.photos/100/100" },
  publishedAt: "2026-03-10",
  readingTime: 6,
}))

const meta = {
  title: "Blog/BlogList",
  component: BlogList,
  tags: ["autodocs"],
} satisfies Meta<typeof BlogList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { posts } }

export const Loading: Story = { args: { posts, loading: true } }
