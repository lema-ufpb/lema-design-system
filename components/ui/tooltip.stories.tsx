import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip"
import { Button } from "./button"

const meta = {
  title: "Shadcn UI/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: [
          "A lightweight popup hint displaying auxiliary text descriptions when a cursor hovers over or focus lands on trigger targets.",
          "",
          "Built on top of **Radix UI Tooltip**, it offers position adjustments (sides, offset offsets) and high-contrast color styles.",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Tooltip Background** | `--foreground` | Main backing background color for high contrast |",
          "| **Tooltip Text** | `--background` | Main text color contrast against high-contrast background |",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
}

export const Sides: Story = {
  render: () => (
    <TooltipProvider>
      <div className="flex gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Top</Button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>Tooltip on top</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Right</Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Tooltip on right</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Bottom</Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Tooltip on bottom</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Left</Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Tooltip on left</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
}

export const Delay: Story = {
  render: () => (
    <TooltipProvider delayDuration={700}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">700ms delay</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Delayed tooltip</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
}
