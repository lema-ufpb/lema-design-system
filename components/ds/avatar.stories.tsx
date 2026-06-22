import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Avatar, AvatarGroup } from "./avatar"

const meta = {
  title: "Data Display/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "Circular avatar with image, initials fallback, status indicator, optional tooltip, and group composition.",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `src` | `string` | — | Image URL for the avatar |",
          "| `alt` | `string` | — | Alt text for accessibility (required) |",
          "| `fallback` | `string` | — | Fallback initials when no image |",
          '| `size` | `"sm" \\| "md" \\| "lg" \\| "xl" \\| "2xl"` | `"md"` | Avatar size preset |',
          '| `status` | `"online" \\| "busy" \\| "away" \\| "offline"` | — | Presence indicator dot |',
          "| `tooltip` | `string` | — | Tooltip text shown on hover |",
          "| `loading` | `boolean` | `false` | Show skeleton placeholder |",
          '| `locale` | `string` | `"pt-BR"` | Locale for i18n strings |',
        ].join("\n"),
      },
    },
  },
  argTypes: {
    src: { control: "text" },
    alt: { control: "text" },
    fallback: { control: "text" },
    tooltip: { control: "text" },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "2xl"],
      table: { defaultValue: { summary: "md" } },
    },
    status: {
      control: "select",
      options: [undefined, "online", "busy", "away", "offline"],
      table: { defaultValue: { summary: "—" } },
    },
    loading: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    locale: { control: "text" },
  },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    src: "https://i.pravatar.cc/150?u=default",
    alt: "John Doe",
    size: "md",
    loading: false,
    locale: "pt-BR",
  },
}

export const WithInitials: Story = {
  args: {
    alt: "Maria Silva",
    fallback: "MS",
  },
}

export const WithSingleInitial: Story = {
  args: {
    alt: "Ana",
    fallback: "AN",
  },
}

export const AllSizes: Story = {
  args: { alt: "" },
  render: () => (
    <div className="flex items-end gap-4">
      <Avatar size="sm" alt="Small" fallback="SM" />
      <Avatar size="md" alt="Medium" fallback="MD" />
      <Avatar size="lg" alt="Large" fallback="LG" />
      <Avatar size="xl" alt="X Large" fallback="XL" />
      <Avatar size="2xl" alt="2X Large" fallback="2X" />
    </div>
  ),
}

export const StatusIndicators: Story = {
  args: { alt: "" },
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar size="lg" alt="Alice" status="online" fallback="AL" />
      <Avatar size="lg" alt="Bob" status="busy" fallback="BO" />
      <Avatar size="lg" alt="Carol" status="away" fallback="CA" />
      <Avatar size="lg" alt="Dave" status="offline" fallback="DA" />
    </div>
  ),
}

export const AvatarGroupStory: Story = {
  args: { alt: "" },
  render: () => (
    <AvatarGroup>
      <Avatar size="md" alt="Alice" src="https://i.pravatar.cc/150?u=alice" />
      <Avatar size="md" alt="Bob" src="https://i.pravatar.cc/150?u=bob" />
      <Avatar size="md" alt="Carol" src="https://i.pravatar.cc/150?u=carol" />
    </AvatarGroup>
  ),
}

export const AvatarGroupMax: Story = {
  args: { alt: "" },
  render: () => (
    <AvatarGroup max={3}>
      <Avatar size="md" alt="Alice" fallback="AL" />
      <Avatar size="md" alt="Bob" fallback="BO" />
      <Avatar size="md" alt="Carol" fallback="CA" />
      <Avatar size="md" alt="Dave" fallback="DA" />
      <Avatar size="md" alt="Eve" fallback="EV" />
    </AvatarGroup>
  ),
}

export const WithTooltip: Story = {
  args: {
    alt: "John Developer",
    fallback: "JD",
    size: "lg",
    tooltip: "John Developer (john@example.com)",
  },
}

export const Loading: Story = {
  args: { alt: "" },
  render: () => (
    <div className="flex items-end gap-4">
      <Avatar loading size="sm" alt="Loading" />
      <Avatar loading size="md" alt="Loading" />
      <Avatar loading size="lg" alt="Loading" />
      <Avatar loading size="xl" alt="Loading" />
      <Avatar loading size="2xl" alt="Loading" />
    </div>
  ),
}

export const WithImageAndStatus: Story = {
  args: {
    src: "https://i.pravatar.cc/150?u=admin",
    alt: "Admin User",
    size: "xl",
    status: "online",
    tooltip: "Admin User (Online)",
  },
}
