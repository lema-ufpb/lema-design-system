import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  RadialMenu,
  RadialMenuTrigger,
  RadialMenuContent,
  RadialMenuItem,
} from "./radial-menu"
import {
  PlusIcon,
  CopyIcon,
  TrashIcon,
  EditIcon,
  ShareIcon,
  DownloadIcon,
  HeartIcon,
  MessageCircleIcon,
} from "lucide-react"

const meta = {
  title: "Actions/RadialMenu",
  component: RadialMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof RadialMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: null },
  render: () => (
    <div className="flex h-[300px] items-center justify-center">
      <RadialMenu radius={80} startAngle={-90} endAngle={270}>
        <RadialMenuTrigger size="md" intent="primary" aria-label="Open menu">
          <PlusIcon className="size-6" />
        </RadialMenuTrigger>
        <RadialMenuContent>
          <RadialMenuItem title="Copy">
            <CopyIcon className="size-4" />
          </RadialMenuItem>
          <RadialMenuItem title="Edit">
            <EditIcon className="size-4" />
          </RadialMenuItem>
          <RadialMenuItem title="Share">
            <ShareIcon className="size-4" />
          </RadialMenuItem>
          <RadialMenuItem
            title="Delete"
            className="text-destructive hover:text-destructive"
          >
            <TrashIcon className="size-4" />
          </RadialMenuItem>
        </RadialMenuContent>
      </RadialMenu>
    </div>
  ),
}

export const HalfCircle: Story = {
  args: { children: null },
  render: () => (
    <div className="flex h-[300px] items-end justify-center pb-12">
      <RadialMenu radius={100} startAngle={180} endAngle={360}>
        <RadialMenuTrigger size="lg" aria-label="Open menu">
          <PlusIcon className="size-6" />
        </RadialMenuTrigger>
        <RadialMenuContent>
          <RadialMenuItem size="lg" title="Heart">
            <HeartIcon className="size-5" />
          </RadialMenuItem>
          <RadialMenuItem size="lg" title="Comment">
            <MessageCircleIcon className="size-5" />
          </RadialMenuItem>
          <RadialMenuItem size="lg" title="Share">
            <ShareIcon className="size-5" />
          </RadialMenuItem>
          <RadialMenuItem size="lg" title="Download">
            <DownloadIcon className="size-5" />
          </RadialMenuItem>
          <RadialMenuItem size="lg" title="Copy">
            <CopyIcon className="size-5" />
          </RadialMenuItem>
        </RadialMenuContent>
      </RadialMenu>
    </div>
  ),
}

export const QuarterCircle: Story = {
  args: { children: null },
  render: () => (
    <div className="flex h-[300px] w-[300px] items-end justify-end p-8">
      <RadialMenu radius={100} startAngle={180} endAngle={270}>
        <RadialMenuTrigger size="md" aria-label="Open menu">
          <PlusIcon className="size-6" />
        </RadialMenuTrigger>
        <RadialMenuContent>
          <RadialMenuItem title="Heart">
            <HeartIcon className="size-4" />
          </RadialMenuItem>
          <RadialMenuItem title="Comment">
            <MessageCircleIcon className="size-4" />
          </RadialMenuItem>
          <RadialMenuItem title="Share">
            <ShareIcon className="size-4" />
          </RadialMenuItem>
        </RadialMenuContent>
      </RadialMenu>
    </div>
  ),
}
