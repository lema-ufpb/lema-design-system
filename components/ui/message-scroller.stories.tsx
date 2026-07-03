import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  MessageScrollerProvider,
  MessageScroller,
  MessageScrollerViewport,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerButton,
} from "./message-scroller"
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageHeader,
  MessageFooter,
} from "./message"
import { Bubble, BubbleContent } from "./bubble"

const meta = {
  title: "Shadcn UI/MessageScroller",
  component: MessageScroller,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A scrollable message list container with auto-scrolling, scroll anchoring, and a scroll-to-bottom button.",
          "",
          "Composed of `MessageScrollerProvider`, `MessageScrollerViewport`, `MessageScrollerContent`, `MessageScrollerItem`, and `MessageScrollerButton` sub-components. Built on the `@shadcn/react/message-scroller` primitive.",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Variant / Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Button background** | `--background` | Scroll-to-bottom button fill |",
          "| **Button text** | `--foreground` | Scroll-to-bottom button icon |",
          "| **Button border** | `--border` | Scroll-to-bottom button border |",
          "| **Button hover** | `--muted` | Scroll-to-bottom button hover |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    children: {
      table: { disable: true },
    },
  },
} satisfies Meta<typeof MessageScroller>

export default meta
type Story = StoryObj<typeof meta>

const sampleMessages = [
  {
    name: "Alice Silva",
    initials: "AS",
    text: "Hey everyone! Ready for the meeting?",
    time: "9:00 AM",
  },
  {
    name: "Bruno Lima",
    initials: "BL",
    text: "Almost ready, just finishing the slides.",
    time: "9:02 AM",
  },
  {
    name: "Alice Silva",
    initials: "AS",
    text: "Great, let me know when you're done.",
    time: "9:03 AM",
  },
  {
    name: "Bruno Lima",
    initials: "BL",
    text: "Done! Sharing my screen now.",
    time: "9:05 AM",
  },
  {
    name: "Carla Dias",
    initials: "CD",
    text: "I'll join in a minute.",
    time: "9:06 AM",
  },
  {
    name: "Alice Silva",
    initials: "AS",
    text: "No rush, we're just getting started.",
    time: "9:07 AM",
  },
  { name: "Carla Dias", initials: "CD", text: "On my way!", time: "9:08 AM" },
  {
    name: "Bruno Lima",
    initials: "BL",
    text: "Let me share the agenda first.",
    time: "9:10 AM",
  },
  {
    name: "Alice Silva",
    initials: "AS",
    text: "Perfect, go ahead!",
    time: "9:11 AM",
  },
  {
    name: "Carla Dias",
    initials: "CD",
    text: "I'm in. Great slides, Bruno!",
    time: "9:12 AM",
  },
]

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Message scroller with sample chat messages inside a fixed-height container. Scroll down to see the scroll-to-bottom button appear.",
      },
    },
  },
  render: () => (
    <MessageScrollerProvider>
      <div className="h-[400px] w-full max-w-lg overflow-hidden rounded-lg border bg-background">
        <MessageScroller>
          <MessageScrollerViewport>
            <MessageScrollerContent>
              {sampleMessages.map((msg, i) => (
                <MessageScrollerItem
                  key={i}
                  scrollAnchor={i === sampleMessages.length - 1}
                >
                  <Message align={i % 2 === 0 ? "start" : "end"}>
                    {i % 2 === 0 && (
                      <MessageAvatar>
                        <span className="text-xs font-medium text-muted-foreground">
                          {msg.initials}
                        </span>
                      </MessageAvatar>
                    )}
                    <MessageContent>
                      {i % 2 === 0 && <MessageHeader>{msg.name}</MessageHeader>}
                      <Bubble variant={i % 2 === 0 ? "secondary" : undefined}>
                        <BubbleContent>{msg.text}</BubbleContent>
                      </Bubble>
                      <MessageFooter>{msg.time}</MessageFooter>
                    </MessageContent>
                  </Message>
                </MessageScrollerItem>
              ))}
            </MessageScrollerContent>
          </MessageScrollerViewport>
          <MessageScrollerButton direction="end" />
        </MessageScroller>
      </div>
    </MessageScrollerProvider>
  ),
}
