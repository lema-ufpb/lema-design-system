import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Onboarding } from "./onboarding"

const meta = {
  title: "Onboarding/Onboarding",
  component: Onboarding,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A Onboarding component for the LEMA Design System.",
          "Supports loading state, skeleton.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `steps` | `OnboardingStep[]` | — | - |",
          "| `current` | `number` | — | - |",
          "| `onNext` | `() => void` | — | - |",
          "| `onSkip` | `() => void` | — | - |",
          "| `loading` | `boolean` | — | - |",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof Onboarding>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { steps: [{ title: "Welcome" }, { title: "Setup" }] },
}

export const Loading: Story = { args: { steps: [], loading: true } }
