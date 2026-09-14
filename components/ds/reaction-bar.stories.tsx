import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ReactionBar } from "./reaction-bar"
import { MessageCircleIcon, ShareIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

const meta = {
  title: "Actions/ReactionBar",
  component: ReactionBar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ReactionBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    size: "md",
    intent: "default",
  },
}

export const Interactive: Story = {
  render: () => {
    const [reaction, setReaction] = React.useState<string | null>(null)

    return (
      <div className="flex h-[200px] items-end justify-center pb-8">
        <ReactionBar value={reaction} onReact={setReaction} intent="default" />
      </div>
    )
  },
}

export const PostFooter: Story = {
  render: () => {
    const [reaction, setReaction] = React.useState<string | null>("heart")

    return (
      <div className="w-full max-w-[400px] rounded-2xl border bg-card p-4 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <div className="size-10 rounded-full bg-muted" />
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Design Team</span>
            <span className="text-xs text-muted-foreground">2 hours ago</span>
          </div>
        </div>
        <p className="mb-6 text-sm">
          We just shipped the new ReactionBar component! What do you all think?
          🚀
        </p>

        <div className="flex items-center justify-between border-t pt-4">
          <ReactionBar value={reaction} onReact={setReaction} size="sm" />
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 rounded-full text-muted-foreground"
            >
              <MessageCircleIcon className="size-4" />
              12
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 rounded-full text-muted-foreground"
            >
              <ShareIcon className="size-4" />
              Share
            </Button>
          </div>
        </div>
      </div>
    )
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex h-[150px] items-end gap-6 pb-4">
      <ReactionBar size="sm" />
      <ReactionBar size="md" />
      <ReactionBar size="lg" />
    </div>
  ),
}
