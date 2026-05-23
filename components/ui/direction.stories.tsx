import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { DirectionProvider } from "./direction"

const meta = {
  title: "Shadcn UI/Direction",
  component: DirectionProvider,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "Provides right-to-left (RTL) or left-to-right (LTR) direction context to its descendants.",
          "",
          'Built on Radix UI\'s Direction primitive. Accepts a `dir` prop (`"ltr"` | `"rtl"`) and wraps children in the direction provider.',
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Variant / Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Direction** | N/A | No CSS variables — sets the `dir` attribute on the document |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    dir: {
      control: "select",
      options: ["ltr", "rtl"],
      description: "Text direction",
    },
  },
} satisfies Meta<typeof DirectionProvider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    dir: "ltr",
    children: (
      <div className="text-sm text-muted-foreground">
        Content with left-to-right direction.
      </div>
    ),
  },
}

export const RTL: Story = {
  args: {
    dir: "rtl",
    children: (
      <div className="text-sm text-muted-foreground">
        محتوى باتجاه من اليمين إلى اليسار.
      </div>
    ),
  },
}
