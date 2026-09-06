import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { CursorSpotlight } from "./cursor-spotlight"

const meta = {
  title: "Data Display/CursorSpotlight",
  component: CursorSpotlight,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A radial glow that follows the pointer — the interactive counterpart to BackgroundGlow's static spotlight/beam variants. Move your cursor over the box.",
      },
    },
  },
  args: {
    tone: "primary",
  },
  argTypes: {
    tone: { control: "select", options: ["primary", "violet", "sky"] },
  },
} satisfies Meta<typeof CursorSpotlight>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <CursorSpotlight
      {...args}
      className="flex h-64 w-full max-w-lg items-center justify-center rounded-2xl border border-border bg-card"
    >
      <p className="text-sm text-muted-foreground">Move your cursor here</p>
    </CursorSpotlight>
  ),
}

export const AllTones: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {(["primary", "violet", "sky"] as const).map((tone) => (
        <CursorSpotlight
          key={tone}
          tone={tone}
          className="flex h-40 items-center justify-center rounded-2xl border border-border bg-card"
        >
          <p className="text-xs text-muted-foreground">{tone}</p>
        </CursorSpotlight>
      ))}
    </div>
  ),
}
