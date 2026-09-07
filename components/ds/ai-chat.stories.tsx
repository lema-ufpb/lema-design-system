import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { AiChat } from "./ai-chat"

const meta = {
  title: "Chat/AiChat",
  component: AiChat,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A AiChat component for the LEMA Design System.",
          "Supports loading state, skeleton, i18n support.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `messages` | `ChatMessage[]` | — | - |",
          "| `onSend` | `(message: string) => void` | — | - |",
          "| `loading` | `boolean` | — | - |",
          "| `locale` | `UILocale` | — | - |",
          "| `placeholder` | `string` | — | - |",
        ].join("\n"),
      },
    },
  },
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
