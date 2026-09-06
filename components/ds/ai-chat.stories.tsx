import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { AiChat } from "./ai-chat"

const meta = {
  title: "Blocks/AiChat",
  component: AiChat,
  tags: ["autodocs"],
} satisfies Meta<typeof AiChat>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    messages: [
      { id: "1", role: "assistant", content: "Hi! How can I help you today?" },
      { id: "2", role: "user", content: "Can you summarize this PR?" },
      {
        id: "3",
        role: "assistant",
        content: "Sure — give me a moment to look at the diff.",
      },
    ],
  },
}

export const Empty: Story = { args: { messages: [] } }

export const Loading: Story = { args: { loading: true } }
