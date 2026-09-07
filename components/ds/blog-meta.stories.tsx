import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BlogMeta } from "./blog-meta"

const meta = {
  title: "Blog/BlogMeta",
  component: BlogMeta,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A BlogMeta component for the LEMA Design System.",
          "Supports loading state, skeleton, i18n support.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `publishedAt` | `string \| Date` | — | - |",
          "| `readingTime` | `number` | — | - |",
          "| `category` | `string` | — | - |",
          "| `locale` | `UILocale` | — | - |",
          "| `loading` | `boolean` | — | - |",
          '| `size` | `"sm" \| "md"` | `"md"` | Variant |',
        ].join("\n"),
      },
    },
  },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md"] },
    locale: {
      control: "inline-radio",
      options: ["en-US", "pt-BR", "es-ES", "fr-FR"],
    },
  },
} satisfies Meta<typeof BlogMeta>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { publishedAt: "2026-03-10", readingTime: 5, category: "Design" },
}

export const WithoutCategory: Story = {
  args: { publishedAt: "2026-03-10", readingTime: 3 },
}

export const Loading: Story = { args: { loading: true } }
