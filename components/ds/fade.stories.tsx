import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Fade } from "./fade"

const meta: Meta<typeof Fade> = {
  title: "Utilities/Fade",
  component: Fade,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A Fade component for the LEMA Design System.",
          "Supports CVA variants.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          '| `variant` | `"x" \| "y" \| "top" \| "bottom" \| "left" \| "right"` | `"x"` | Variant |',
        ].join("\n"),
      },
    },
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: [
        "x",
        "y",
        "top",
        "bottom",
        "left",
        "right",
        "top-lg",
        "bottom-lg",
        "left-lg",
        "right-lg",
      ],
    },
  },
}

export default meta
type Story = StoryObj<typeof Fade>

export const X: Story = {
  render: (args) => (
    <Fade
      {...args}
      className="w-80 overflow-x-auto border py-4 whitespace-nowrap"
    >
      <div className="flex gap-3 px-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-16 w-24 shrink-0 rounded-lg bg-primary/20"
          />
        ))}
      </div>
    </Fade>
  ),
  args: { variant: "x" },
}

export const Y: Story = {
  render: (args) => (
    <Fade {...args} className="h-48 overflow-y-auto border py-2">
      <div className="flex flex-col gap-2 px-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="h-10 rounded-lg bg-primary/15" />
        ))}
      </div>
    </Fade>
  ),
  args: { variant: "y" },
}

export const AllVariants: Story = {
  render: () => (
    <div className="grid gap-4 md:grid-cols-2">
      {(["top", "bottom", "left", "right"] as const).map((v) => (
        <Fade
          key={v}
          variant={v}
          className="h-24 overflow-hidden rounded-xl border bg-muted p-4 text-xs font-medium"
        >
          fade-{v}
        </Fade>
      ))}
    </div>
  ),
}
