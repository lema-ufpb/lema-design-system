import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BlogCard } from "./blog-card"

const post = {
  title: "Design Systems at Scale: Lessons from LEMA",
  excerpt: "How we built a 200+ component design system with Tailwind v4, CVA and Storybook.",
  imageSrc: "https://picsum.photos/600/400",
  category: "Design",
  href: "#",
  author: { name: "Ana Silva", avatarUrl: "https://picsum.photos/100/100", role: "Design Lead" },
  publishedAt: "2026-03-10",
  readingTime: 5,
  tags: ["Design System", "Tailwind"],
}

const meta = {
  title: "Blog/BlogCard",
  component: BlogCard,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    locale: { control: "inline-radio", options: ["en-US", "pt-BR", "es-ES", "fr-FR"] },
    loading: { control: "boolean" },
  },
} satisfies Meta<typeof BlogCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { post } }

export const AllSizes: Story = {
  args: { post },
  render: () => (
    <div className="grid gap-6 md:grid-cols-3">
      <BlogCard post={post} size="sm" />
      <BlogCard post={post} size="md" />
      <BlogCard post={post} size="lg" />
    </div>
  ),
}

export const Featured: Story = { args: { post: { ...post, featured: true } } }

export const WithoutImage: Story = { args: { post: { ...post, imageSrc: undefined } } }

export const Loading: Story = { args: { post, loading: true } }
