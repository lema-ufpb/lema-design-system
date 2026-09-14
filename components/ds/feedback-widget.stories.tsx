import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { FeedbackWidget } from "./feedback-widget"

const meta = {
  title: "Feedback/FeedbackWidget",
  component: FeedbackWidget,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="relative flex h-[600px] w-full items-center justify-center overflow-hidden bg-muted/20">
        <div className="max-w-md p-8 text-center text-muted-foreground">
          <h1 className="mb-4 text-2xl font-bold text-foreground">
            Main Content Area
          </h1>
          <p>
            The feedback widget is fixed to the bottom right of the screen (or
            bottom left depending on the position prop).
          </p>
        </div>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FeedbackWidget>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    position: "br",
    intent: "primary",
    onSubmit: async (data) => {
      console.log("Feedback submitted:", data)
      await new Promise((resolve) => setTimeout(resolve, 1500))
    },
  },
}

export const BottomLeft: Story = {
  args: {
    position: "bl",
    intent: "default",
  },
}
