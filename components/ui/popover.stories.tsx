import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as React from "react"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "./popover"
import { Button } from "./button"

const meta = {
  title: "Shadcn UI/Popover",
  component: Popover,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A rich information bubble popover displaying contextual content triggered by focus/click events on a parent element.",
          "",
          "Built on top of **Radix UI Popover**, it provides positioning portals, customized alignment triggers, and accessible content wrappers.",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Card Background** | `--popover` | Interior container background fill color |",
          "| **Card Content Text** | `--popover-foreground` | Main font color for inner elements and headings |",
          "| **Context labels** | `--muted-foreground` | Sub-label description text color |",
          "| **Outer Border Border** | `ring-1 ring-foreground/5` | Faded boundary ring on light/dark themes |",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Popover with a header containing title and description, plus additional content below, triggered by an outline button.",
      },
    },
  },
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Popover Title</PopoverTitle>
          <PopoverDescription>
            This is a popover description with some additional context.
          </PopoverDescription>
        </PopoverHeader>
        <div className="mt-2">
          <p className="text-sm">Popover content goes here.</p>
        </div>
      </PopoverContent>
    </Popover>
  ),
}

export const AlignStart: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Align Start</Button>
      </PopoverTrigger>
      <PopoverContent align="start">
        <PopoverTitle>Aligned Start</PopoverTitle>
        <p className="text-sm text-muted-foreground">
          This popover is aligned to the start.
        </p>
      </PopoverContent>
    </Popover>
  ),
}

export const AlignEnd: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Align End</Button>
      </PopoverTrigger>
      <PopoverContent align="end">
        <PopoverTitle>Aligned End</PopoverTitle>
        <p className="text-sm text-muted-foreground">
          This popover is aligned to the end.
        </p>
      </PopoverContent>
    </Popover>
  ),
}

export const NoHeader: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Simple Content</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col gap-2">
          <button className="text-sm hover:underline">Dashboard</button>
          <button className="text-sm hover:underline">Settings</button>
          <button className="text-sm hover:underline">Logout</button>
        </div>
      </PopoverContent>
    </Popover>
  ),
}
