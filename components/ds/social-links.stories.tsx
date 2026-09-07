import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { SocialLinks, type SocialLinkItem } from "./social-links"

const sampleLinks: SocialLinkItem[] = [
  { platform: "github", href: "https://github.com" },
  { platform: "x", href: "https://x.com" },
  { platform: "linkedin", href: "https://linkedin.com" },
  { platform: "youtube", href: "https://youtube.com" },
  { platform: "discord", href: "https://discord.com" },
  { platform: "bluesky", href: "https://bsky.app" },
]

const meta: Meta<typeof SocialLinks> = {
  title: "Actions/SocialLinks",
  component: SocialLinks,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A SocialLinks component for the LEMA Design System.",
          "Supports CVA variants.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `links` | `SocialLinkItem[]` | — | - |",
          '| `shape` | `"circle" \| "rounded" \| "square"` | — | - |',
          '| `gap` | `"sm" \| "md" \| "lg"` | — | - |',
          "| `navLabel` | `string` | — | - |",
          '| `variant` | `"ghost" \| "outline" \| "muted"` | `"ghost"` | Variant |',
          '| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Variant |',
        ].join("\n"),
      },
    },
  },
  args: {
    links: sampleLinks,
    variant: "ghost",
    size: "md",
    shape: "circle",
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-muted-foreground">
          Ghost:
        </span>
        <SocialLinks links={sampleLinks} variant="ghost" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-muted-foreground">
          Outline:
        </span>
        <SocialLinks links={sampleLinks} variant="outline" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-muted-foreground">
          Muted:
        </span>
        <SocialLinks links={sampleLinks} variant="muted" />
      </div>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <span className="w-12 text-xs font-medium text-muted-foreground">
          SM:
        </span>
        <SocialLinks links={sampleLinks} size="sm" variant="outline" />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-12 text-xs font-medium text-muted-foreground">
          MD:
        </span>
        <SocialLinks links={sampleLinks} size="md" variant="outline" />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-12 text-xs font-medium text-muted-foreground">
          LG:
        </span>
        <SocialLinks links={sampleLinks} size="lg" variant="outline" />
      </div>
    </div>
  ),
}

export const Shapes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <span className="w-16 text-xs font-medium text-muted-foreground">
          Circle:
        </span>
        <SocialLinks links={sampleLinks} shape="circle" variant="outline" />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-16 text-xs font-medium text-muted-foreground">
          Rounded:
        </span>
        <SocialLinks links={sampleLinks} shape="rounded" variant="outline" />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-16 text-xs font-medium text-muted-foreground">
          Square:
        </span>
        <SocialLinks links={sampleLinks} shape="square" variant="outline" />
      </div>
    </div>
  ),
}
