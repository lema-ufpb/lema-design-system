import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BlogFeatured } from "./blog-featured"

const featured = {
  title: "Featured: The Design System Handbook",
  excerpt: "Everything you need to ship consistent UIs at scale.",
  imageSrc: "https://picsum.photos/800/500",
  category: "Featured",
  href: "#",
  author: { name: "Lina Wu", avatarUrl: "https://picsum.photos/100/100" },
  publishedAt: "2026-03-12",
  readingTime: 8,
  featured: true,
}
const side = [
  {
    title: "Side 1: Tokens in Tailwind v4",
    excerpt: "CSS variables done right.",
    imageSrc: "https://picsum.photos/seed/a/600/400",
    href: "#",
    publishedAt: "2026-03-10",
    readingTime: 4,
  },
  {
    title: "Side 2: CVA patterns",
    excerpt: "Composable variants.",
    imageSrc: "https://picsum.photos/seed/b/600/400",
    href: "#",
    publishedAt: "2026-03-09",
    readingTime: 3,
  },
]

const meta = {
  title: "Blog/BlogFeatured",
  component: BlogFeatured,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A BlogFeatured component for the LEMA Design System.",
          "Supports loading state, skeleton, i18n support.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `featured` | `BlogPost` | — | - |",
          "| `posts` | `BlogPost[]` | — | - |",
          "| `locale` | `UILocale` | — | - |",
          "| `loading` | `boolean` | — | - |",
        ].join("\n"),
      },
    },
    layout: "padded",
  },
} satisfies Meta<typeof BlogFeatured>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { featured, posts: side } }

export const OnlyFeatured: Story = { args: { featured } }

export const Loading: Story = { args: { featured, loading: true } }
