import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BubbleGroup, Bubble, BubbleContent, BubbleReactions } from "./bubble"
import { ThumbsUpIcon, HeartIcon, SmileIcon } from "lucide-react"

const meta = {
  title: "Shadcn UI/Bubble",
  component: Bubble,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A chat bubble component used for displaying conversational messages with variant styling.",
          "",
          "Composed of `BubbleGroup`, `BubbleContent`, and `BubbleReactions` sub-components. Supports variant (`default` | `secondary` | `muted` | `tinted` | `outline` | `ghost` | `destructive`) and align (`start` | `end`).",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Variant / Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Default background** | `--primary` | Bubble background for default variant |",
          "| **Default text** | `--primary-foreground` | Text color for default variant |",
          "| **Secondary background** | `--secondary` | Bubble background for secondary variant |",
          "| **Secondary text** | `--secondary-foreground` | Text color for secondary variant |",
          "| **Muted background** | `--muted` | Bubble background for muted variant |",
          "| **Outline border** | `--border` | Border for outline variant |",
          "| **Destructive** | `--destructive` | Text and background for destructive variant |",
          "| **Tinted** | `--primary` at low opacity | Light tinted background matching the primary hue |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "secondary",
        "muted",
        "tinted",
        "outline",
        "ghost",
        "destructive",
      ],
      table: { defaultValue: { summary: "default" } },
    },
    align: {
      control: "inline-radio",
      options: ["start", "end"],
      table: { defaultValue: { summary: "start" } },
    },
  },
} satisfies Meta<typeof Bubble>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Default primary variant bubble aligned to the start with a sample message.",
      },
    },
  },
  render: () => (
    <Bubble>
      <BubbleContent>Hey, how are you doing?</BubbleContent>
    </Bubble>
  ),
}

export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "All bubble variants (default, secondary, muted, tinted, outline, ghost, destructive) displayed in a column.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-3">
      <Bubble variant="default">
        <BubbleContent>Default bubble</BubbleContent>
      </Bubble>
      <Bubble variant="secondary">
        <BubbleContent>Secondary bubble</BubbleContent>
      </Bubble>
      <Bubble variant="muted">
        <BubbleContent>Muted bubble</BubbleContent>
      </Bubble>
      <Bubble variant="tinted">
        <BubbleContent>Tinted bubble</BubbleContent>
      </Bubble>
      <Bubble variant="outline">
        <BubbleContent>Outline bubble</BubbleContent>
      </Bubble>
      <Bubble variant="ghost">
        <BubbleContent>Ghost bubble</BubbleContent>
      </Bubble>
      <Bubble variant="destructive">
        <BubbleContent>Destructive bubble</BubbleContent>
      </Bubble>
    </div>
  ),
}

export const Alignment: Story = {
  parameters: {
    docs: {
      description: {
        story: "Bubbles aligned to start and end within a conversation layout.",
      },
    },
  },
  render: () => (
    <div className="flex max-w-md flex-col gap-3">
      <Bubble align="start" variant="secondary">
        <BubbleContent>Hello! How can I help you?</BubbleContent>
      </Bubble>
      <Bubble align="end">
        <BubbleContent>Hi! I need some assistance.</BubbleContent>
      </Bubble>
      <Bubble align="start" variant="secondary">
        <BubbleContent>Sure, what do you need?</BubbleContent>
      </Bubble>
      <Bubble align="end">
        <BubbleContent>I need help with my account.</BubbleContent>
      </Bubble>
    </div>
  ),
}

export const WithReactions: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Bubble with reaction badges displayed at the bottom-end corner.",
      },
    },
  },
  render: () => (
    <div className="flex max-w-md flex-col gap-3 pt-6">
      <Bubble align="start" variant="secondary">
        <BubbleContent>
          That&apos;s great news! Let me know if you need anything else.
        </BubbleContent>
        <BubbleReactions side="bottom" align="end">
          <button
            type="button"
            aria-label="Like"
            className="flex items-center gap-1 rounded-full px-1.5 py-0.5 text-xs transition-colors hover:bg-muted-foreground/10"
          >
            <ThumbsUpIcon className="size-3.5" />
          </button>
          <button
            type="button"
            aria-label="Love"
            className="flex items-center gap-1 rounded-full px-1.5 py-0.5 text-xs transition-colors hover:bg-muted-foreground/10"
          >
            <HeartIcon className="size-3.5" />
          </button>
        </BubbleReactions>
      </Bubble>
      <Bubble align="end">
        <BubbleContent>Thanks, will do! 😊</BubbleContent>
        <BubbleReactions side="bottom" align="start">
          <button
            type="button"
            aria-label="Smile"
            className="flex items-center gap-1 rounded-full px-1.5 py-0.5 text-xs transition-colors hover:bg-muted-foreground/10"
          >
            <SmileIcon className="size-3.5" />
          </button>
        </BubbleReactions>
      </Bubble>
    </div>
  ),
}

export const Group: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Related bubbles grouped together using BubbleGroup with consecutive messages from the same sender.",
      },
    },
  },
  render: () => (
    <div className="flex max-w-md flex-col gap-4">
      <BubbleGroup>
        <Bubble align="start" variant="secondary">
          <BubbleContent>I have a few options for you.</BubbleContent>
        </Bubble>
        <Bubble align="start" variant="secondary">
          <BubbleContent>
            Option A: Standard plan with all basic features.
          </BubbleContent>
        </Bubble>
        <Bubble align="start" variant="secondary">
          <BubbleContent>
            Option B: Premium plan with additional support.
          </BubbleContent>
        </Bubble>
      </BubbleGroup>
      <Bubble align="end">
        <BubbleContent>Let me go with Option B, please.</BubbleContent>
      </Bubble>
    </div>
  ),
}
