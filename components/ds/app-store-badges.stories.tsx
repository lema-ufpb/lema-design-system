import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { AppStoreBadges } from "./app-store-badges"

const links = [
  { href: "#", store: "apple" as const },
  { href: "#", store: "google" as const },
]

const meta = {
  title: "Actions/AppStoreBadges",
  component: AppStoreBadges,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Download badges for the App Store and Google Play. Icons and copy are overridable per-link for brand-compliant assets.",
      },
    },
  },
  args: {
    links,
    size: "md",
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof AppStoreBadges>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const AllSizes: Story = {
  render: (args) => (
    <div className="flex flex-col items-center gap-6">
      <AppStoreBadges {...args} size="sm" />
      <AppStoreBadges {...args} size="md" />
      <AppStoreBadges {...args} size="lg" />
    </div>
  ),
}

export const AppleOnly: Story = {
  args: {
    links: [{ href: "#", store: "apple" }],
  },
}
