import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BentoShowcase } from "./bento-showcase"

const meta = {
  title: "Blocks/BentoShowcase",
  component: BentoShowcase,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A bento grid showcasing a product screenshot, a terminal preview and an install snippet — composed from BentoGrid, FloatingCard, BrowserMockup and CopyBlock.",
      },
    },
  },
  args: {
    screenshot: (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80"
        alt="Product screenshot"
        className="size-full object-cover"
      />
    ),
    browserUrl: "https://lema.ufpb.br/app",
    browserContent: (
      <div className="flex h-full items-center justify-center p-6 font-mono text-sm text-zinc-400">
        $ npx shadcn add ds-hero-bento
      </div>
    ),
    codeSnippet: "npx shadcn@latest add ds-bento-showcase",
  },
} satisfies Meta<typeof BentoShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const WithoutSnippet: Story = {
  args: { codeSnippet: undefined },
}
