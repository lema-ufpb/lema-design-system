import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, within } from "storybook/test"
import { AboutSplitStory } from "./about-split-story"

const meta: Meta<typeof AboutSplitStory> = {
  title: "About/AboutSplitStory",
  component: AboutSplitStory,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A AboutSplitStory component for the LEMA Design System.",
          "Supports loading state, i18n support, CVA variants.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `title` | `string` | — | - |",
          "| `description` | `string` | — | - |",
          "| `badge` | `string` | — | - |",
          "| `imageSrc` | `string` | — | - |",
          "| `imageAlt` | `string` | — | - |",
          "| `floatingBadgeText` | `string` | — | - |",
          "| `primaryAction` | `AboutSplitStoryAction` | — | - |",
          "| `secondaryAction` | `AboutSplitStoryAction` | — | - |",
          "| `reverse` | `boolean` | — | - |",
          "| `locale` | `UILocale` | — | - |",
          '| `variant` | `"default" \| "muted"` | `"default"` | Variant |',
        ].join("\n"),
      },
    },
    layout: "fullscreen",
  },
  args: {
    badge: "Our History",
    title: "Applied research, statistical rigor and impactful design",
    description:
      "Born at the Federal University of Paraíba, LEMA combines advanced statistical methods and software engineering to develop solutions that bridge academia and the real needs of civil society.",
    imageSrc:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&auto=format&fit=crop&q=80",
    imageAlt: "Team working together in the laboratory",
    floatingBadgeText: "+100 Projects Delivered",
    primaryAction: {
      label: "Explore our projects",
      href: "#",
    },
    secondaryAction: {
      label: "View publications",
      href: "#",
    },
    reverse: false,
    locale: "en-US",
  },
}

export default meta
type Story = StoryObj<typeof AboutSplitStory>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Our History")).toBeInTheDocument()
    await expect(
      canvas.getByText(/Applied research, statistical rigor/i)
    ).toBeInTheDocument()
    await expect(
      canvas.getByText("+100 Projects Delivered")
    ).toBeInTheDocument()
  },
}

export const Reversed: Story = {
  args: {
    reverse: true,
  },
}

export const Locales: Story = {
  args: {
    locale: "en-US",
    badge: "Our Story",
    title: "Applied research, statistical rigor and impactful design",
    description:
      "Born at the Federal University of Paraíba, LEMA combines advanced statistics with software engineering to deliver open, reliable digital experiences.",
    primaryAction: {
      label: "Explore projects",
      href: "#",
    },
    secondaryAction: {
      label: "Read publications",
      href: "#",
    },
  },
}
