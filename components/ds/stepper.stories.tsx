import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Stepper } from "./stepper"

const meta = {
  title: "Onboarding/Stepper",
  component: Stepper,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A Stepper component for the LEMA Design System.",
          "Composable and theme-aware via semantic tokens.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `steps` | `StepItem[]` | — | - |",
          "| `currentId` | `string` | — | - |",
          "| `onStepChange` | `(id: string) => void` | — | - |",
          '| `orientation` | `"horizontal" \| "vertical"` | — | - |',
          '| `size` | `"sm" \| "md" \| "lg"` | — | - |',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof Stepper>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    currentId: "1",
    steps: [
      { id: "1", title: "Account" },
      { id: "2", title: "Details" },
      { id: "3", title: "Confirm" },
    ],
  },
}
