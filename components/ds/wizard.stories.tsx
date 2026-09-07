import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Wizard } from "./wizard"

const meta = {
  title: "Onboarding/Wizard",
  component: Wizard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A Wizard component for the LEMA Design System.",
          "Supports loading state, skeleton.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `steps` | `WizardStep[]` | — | - |",
          "| `currentId` | `string` | — | - |",
          "| `onStepChange` | `(id: string) => void` | — | - |",
          "| `loading` | `boolean` | — | - |",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof Wizard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    steps: [
      { id: "1", title: "Account", content: "Form 1" },
      { id: "2", title: "Details", content: "Form 2" },
    ],
  },
}

export const Loading: Story = { args: { steps: [], loading: true } }
