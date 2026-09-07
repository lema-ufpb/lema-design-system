import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BlogGrid } from "./blog-grid"

const posts = Array.from({ length: 6 }).map((_, i) => ({
  title: `Post ${i + 1}: Building with Tailwind v4`,
  excerpt: "A deep dive into new CSS-first theming and CVA patterns.",
  imageSrc: `https://picsum.photos/seed/${i}/600/400`,
  category: i % 2 === 0 ? "Design" : "Engineering",
  href: "#",
  author: { name: "Ana Silva", avatarUrl: "https://picsum.photos/100/100" },
  publishedAt: "2026-03-10",
  readingTime: 4 + i,
}))

const meta = {
  title: "Blog/BlogGrid",
  component: BlogGrid,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A BlogGrid component for the LEMA Design System.",
          "Supports loading state, i18n support.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `posts` | `BlogPost[]` | — | - |",
          "| `categories` | `string[]` | — | - |",
          "| `activeCategory` | `string` | — | - |",
          "| `onCategoryChange` | `(category: string \| null) => void` | — | - |",
          "| `search` | `string` | — | - |",
          "| `onSearchChange` | `(value: string) => void` | — | - |",
          "| `locale` | `UILocale` | — | - |",
          "| `loading` | `boolean` | — | - |",
        ].join("\n"),
      },
    },
    layout: "padded",
  },
} satisfies Meta<typeof BlogGrid>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { posts, categories: ["Design", "Engineering", "Product"] },
}

export const Filtered: Story = {
  args: {
    posts: posts.filter((p) => p.category === "Design"),
    categories: ["Design", "Engineering"],
    activeCategory: "Design",
  },
}

export const Empty: Story = { args: { posts: [], categories: ["Design"] } }

export const Loading: Story = { args: { posts, loading: true } }
