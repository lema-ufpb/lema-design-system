import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Avatar, AvatarImage, AvatarFallback } from "./avatar"

const meta = {
  title: "Shadcn UI/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "An image element representing a user or entity, with a fallback display for when the image fails to load.",
          "",
          "Built on top of **Radix UI Avatar**, it supports custom size variations, standard status badge positioning, and group layouts with automatic overlapping ring borders.",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Image overlay boundary** | `--border` | Subtle overlay border around the avatar image |",
          "| **Fallback background** | `--muted` | Background color for fallback text when image fails to load |",
          "| **Fallback text** | `--muted-foreground` | Color of fallback initials text |",
          "| **Status badge background** | `--primary` | Default background color of the status badge |",
          "| **Status badge text** | `--primary-foreground` | Text/icon color inside the status badge |",
          "| **Group border spacing** | `--background` | Ring separator border for grouped/stacked avatars |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    className: { control: "text" },
    size: {
      control: "inline-radio",
      options: ["default", "sm", "lg"],
      description: "Avatar size preset",
      table: { defaultValue: { summary: "default" } },
    },
  },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Single avatar with a successfully loaded image and initials fallback for accessibility.",
      },
    },
  },
  render: () => (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
}

export const Fallback: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Avatar with an empty image source URL, demonstrating the initials fallback display.",
      },
    },
  },
  render: () => (
    <Avatar>
      <AvatarImage src="" alt="@shadcn" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
}

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Three avatars at 32px (sm), 48px (md), and 64px (lg) showcasing size customization via className.",
      },
    },
  },
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar className="size-8">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>SM</AvatarFallback>
      </Avatar>
      <Avatar className="size-12">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>
      <Avatar className="size-16">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
    </div>
  ),
}
