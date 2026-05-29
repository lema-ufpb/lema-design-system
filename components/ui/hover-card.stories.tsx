import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { HoverCard, HoverCardTrigger, HoverCardContent } from "./hover-card"
import { Avatar, AvatarImage, AvatarFallback } from "./avatar"

const meta = {
  title: "Shadcn UI/Hover Card",
  component: HoverCard,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A rich hover popover that displays additional content when the user hovers over a trigger element.",
          "",
          'Built on Radix UI\'s HoverCard primitive. Accepts `align` (default `"center"`) and `sideOffset` (default `4`) on the content. Content is portaled to the root.',
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Variant / Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Content background** | `--popover` | Card surface background |",
          "| **Content text** | `--popover-foreground` | Default text color inside card |",
          "| **Ring border** | `--ring` / `--ring/5` | Subtle outer border ring |",
          "| **Animation** | -- | Slide and fade transitions on open/close |",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof HoverCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Displays a profile card with avatar, name, role, and bio when hovering over the underlined trigger text.",
      },
    },
  },
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <span className="cursor-pointer text-sm font-medium underline underline-offset-4">
          Hover over me
        </span>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex items-start gap-3">
          <Avatar>
            <AvatarImage src="https://github.com/example.png" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-sm text-muted-foreground">Software Engineer</p>
            <p className="mt-2 text-xs text-muted-foreground">
              Building tools for the modern web.
            </p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
}
