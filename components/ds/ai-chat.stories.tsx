import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { AiChat } from "./ai-chat"

const meta = {
  title: "ReUI/AiChat",
  component: AiChat,
  tags: ["autodocs"],
} satisfies Meta<typeof AiChat>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { messages: [{ id: "1", role: "assistant", content: "Hello!" }] } }

export const Loading: Story = { args: { loading: true } }
