import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ScrollArea } from "./scroll-area"

const meta = {
  title: "Shadcn UI/ScrollArea",
  component: ScrollArea,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A custom scroll wrapper that replaces browser scrollbars with cross-browser consistent, styling-flexible scroll rails.",
          "",
          "Built on top of **Radix UI Scroll Area**, it hides native desktop scroll controls and introduces vertical/horizontal custom-styled handles with focus indicators.",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Scroll thumb** | `--border` | Fill color for the draggable scrollbar handle |",
          "| **Viewport Focus outline** | `--ring/50` | Focus shadow indicator when interacting via keyboard |",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof ScrollArea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Custom scroll area with long lorem ipsum text, demonstrating custom scrollbar styling and keyboard focus support.",
      },
    },
  },
  render: () => (
    <ScrollArea className="h-40 w-full rounded-lg border p-4">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
      <p>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
        illo inventore veritatis et quasi architecto beatae vitae dicta sunt
        explicabo.
      </p>
    </ScrollArea>
  ),
}

export const Horizontal: Story = {
  render: () => (
    <ScrollArea className="h-20 w-full rounded-lg border p-4">
      <div className="flex w-max gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
          <div
            key={i}
            className="flex h-12 w-24 items-center justify-center rounded-md bg-muted"
          >
            Item {i}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
}

export const Small: Story = {
  render: () => (
    <ScrollArea className="h-24 w-64 rounded-lg border p-4">
      <p>
        Short content that might not overflow but shows the scroll area styling.
      </p>
    </ScrollArea>
  ),
}

export const LongContent: Story = {
  render: () => (
    <ScrollArea className="h-60 w-full max-w-sm rounded-lg border p-4">
      {Array.from({ length: 20 }, (_, i) => (
        <p key={i} className="mb-2">
          Line {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      ))}
    </ScrollArea>
  ),
}
