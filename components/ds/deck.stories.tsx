import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Deck } from "./deck"

const meta = {
  title: "Navigation/Deck",
  component: Deck,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A Deck component for the LEMA Design System.",
          "Composable and theme-aware via semantic tokens.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `cards` | `React.ReactNode[]` | — | - |",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof Deck>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    cards: [
      <div key="1" className="p-4">
        Card 1
      </div>,
      <div key="2" className="p-4">
        Card 2
      </div>,
      <div key="3" className="p-4">
        Card 3
      </div>,
    ],
  },
}
