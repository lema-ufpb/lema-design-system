import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { SpotlightCard } from "./spotlight-card"
import { ShieldCheckIcon } from "lucide-react"

const meta: Meta<typeof SpotlightCard> = {
  title: "Effects/SpotlightCard",
  component: SpotlightCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A SpotlightCard component for the LEMA Design System.",
          "Supports loading state, skeleton, CVA variants.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `spotlightColor` | `string` | — | - |",
          "| `spotlightRadius` | `number` | — | - |",
          "| `title` | `string` | — | - |",
          "| `description` | `string` | — | - |",
          "| `loading` | `boolean` | — | - |",
          '| `radius` | `"sm" \| "md" \| "lg" \| "xl"` | `"xl"` | Variant |',
          '| `variant` | `"default" \| "muted" \| "outline"` | `"default"` | Variant |',
        ].join("\n"),
      },
    },
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof SpotlightCard>

export const Default: Story = {
  args: {
    title: "Authentication steps",
    description: "Follow the steps to protect your account",
    children: (
      <ol className="flex flex-col gap-2 text-sm">
        <li>• Enter your email</li>
        <li>• Create a strong password</li>
        <li>• Enable two-factor authentication</li>
        <li>• Verify your identity</li>
      </ol>
    ),
  },
  render: (args) => <SpotlightCard {...args} className="w-96" />,
}

export const CustomColor: Story = {
  args: {
    title: "Security first",
    description: "Your data protected with encryption",
    spotlightColor: "hsl(var(--success) / 0.15)",
    children: (
      <div className="flex items-center gap-3 text-sm">
        <ShieldCheckIcon className="size-5 text-success" />
        <span>Account verified successfully</span>
      </div>
    ),
  },
  render: (args) => <SpotlightCard {...args} className="w-80" />,
}

export const Loading: Story = {
  args: { loading: true },
}

export const AllVariants: Story = {
  render: () => (
    <div className="grid gap-4 md:grid-cols-3">
      {(["default", "muted", "outline"] as const).map((v) => (
        <SpotlightCard
          key={v}
          variant={v}
          title={v}
          description="Hover for spotlight"
        >
          <p className="text-sm text-muted-foreground">
            Move the mouse over the card
          </p>
        </SpotlightCard>
      ))}
    </div>
  ),
}
