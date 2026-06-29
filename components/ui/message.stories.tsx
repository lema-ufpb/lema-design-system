import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  MessageGroup,
  Message,
  MessageAvatar,
  MessageContent,
  MessageHeader,
  MessageFooter,
} from "./message"
import { Bubble, BubbleContent } from "./bubble"

const meta = {
  title: "Shadcn UI/Message",
  component: Message,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A message layout component for chat interfaces with avatar, header, content, and footer slots.",
          "",
          "Composed of `MessageGroup`, `MessageAvatar`, `MessageContent`, `MessageHeader`, and `MessageFooter` sub-components. Supports align (`start` | `end`) to position messages on the left or right side of a conversation.",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Variant / Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Avatar background** | `--muted` | Avatar placeholder background |",
          "| **Header/Footer text** | `--muted-foreground` | Sender name and timestamp |",
          "| **Content text** | `--foreground` | Primary message text |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    align: {
      control: "inline-radio",
      options: ["start", "end"],
      table: { defaultValue: { summary: "start" } },
    },
    children: {
      table: { disable: true },
    },
  },
} satisfies Meta<typeof Message>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Default start-aligned message with an avatar, sender name, and a chat bubble.",
      },
    },
  },
  render: () => (
    <Message>
      <MessageAvatar>
        <span className="text-xs font-medium text-muted-foreground">JD</span>
      </MessageAvatar>
      <MessageContent>
        <MessageHeader>John Doe</MessageHeader>
        <Bubble variant="secondary">
          <BubbleContent>Hey, have you seen the latest updates?</BubbleContent>
        </Bubble>
        <MessageFooter>10:42 AM</MessageFooter>
      </MessageContent>
    </Message>
  ),
}

export const Alignment: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Conversation layout showing start-aligned (incoming) and end-aligned (outgoing) messages.",
      },
    },
  },
  render: () => (
    <div className="flex max-w-lg flex-col gap-4">
      <Message align="start">
        <MessageAvatar>
          <span className="text-xs font-medium text-muted-foreground">AS</span>
        </MessageAvatar>
        <MessageContent>
          <MessageHeader>Alice Silva</MessageHeader>
          <Bubble variant="secondary">
            <BubbleContent>Hi! Are you free for a quick call?</BubbleContent>
          </Bubble>
          <MessageFooter>11:30 AM</MessageFooter>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageContent>
          <Bubble>
            <BubbleContent>Sure, give me 5 minutes!</BubbleContent>
          </Bubble>
          <MessageFooter>11:31 AM</MessageFooter>
        </MessageContent>
      </Message>
      <Message align="start">
        <MessageAvatar>
          <span className="text-xs font-medium text-muted-foreground">AS</span>
        </MessageAvatar>
        <MessageContent>
          <MessageHeader>Alice Silva</MessageHeader>
          <Bubble variant="secondary">
            <BubbleContent>
              Great, I&apos;ll send you the meeting link.
            </BubbleContent>
          </Bubble>
          <MessageFooter>11:31 AM</MessageFooter>
        </MessageContent>
      </Message>
    </div>
  ),
}

export const Group: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Consecutive messages from the same sender grouped together using MessageGroup.",
      },
    },
  },
  render: () => (
    <MessageGroup>
      <Message align="start">
        <MessageAvatar>
          <span className="text-xs font-medium text-muted-foreground">MC</span>
        </MessageAvatar>
        <MessageContent>
          <MessageHeader>Maria Costa</MessageHeader>
          <Bubble variant="secondary">
            <BubbleContent>I&apos;ve reviewed the proposal.</BubbleContent>
          </Bubble>
          <Bubble variant="secondary">
            <BubbleContent>
              Everything looks good, but we need to adjust the timeline.
            </BubbleContent>
          </Bubble>
          <Bubble variant="secondary">
            <BubbleContent>Can we discuss this tomorrow?</BubbleContent>
          </Bubble>
          <MessageFooter>2:15 PM</MessageFooter>
        </MessageContent>
      </Message>
    </MessageGroup>
  ),
}

export const WithBubbleVariants: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Message combining different bubble variants within the same message content area.",
      },
    },
  },
  render: () => (
    <Message align="start">
      <MessageAvatar>
        <span className="text-xs font-medium text-muted-foreground">SK</span>
      </MessageAvatar>
      <MessageContent>
        <MessageHeader>Support Team</MessageHeader>
        <Bubble variant="secondary">
          <BubbleContent>
            Here is the confirmation for your request:
          </BubbleContent>
        </Bubble>
        <Bubble variant="outline">
          <BubbleContent>Ticket #1234 — Account Recovery</BubbleContent>
        </Bubble>
        <Bubble variant="destructive">
          <BubbleContent>
            Please verify your identity within 24 hours.
          </BubbleContent>
        </Bubble>
        <MessageFooter>3:00 PM · Urgent</MessageFooter>
      </MessageContent>
    </Message>
  ),
}
