import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"
import { PasskeyPrompt } from "./passkey-prompt"

const meta = {
  title: "Actions/PasskeyPrompt",
  component: PasskeyPrompt,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A PasskeyPrompt component for the LEMA Design System.",
          "Supports loading state, i18n support, CVA variants.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `onAuthenticate` | `() => Promise<boolean \| void> \| void` | — | - |",
          "| `loading` | `boolean` | — | - |",
          "| `supported` | `boolean` | — | - |",
          "| `locale` | `UILocale` | — | - |",
          '| `variant` | `"card" \| "button"` | `"card"` | Variant |',
        ].join("\n"),
      },
    },
    layout: "centered",
  },
  args: {
    onAuthenticate: fn(),
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["card", "button"],
    },
    loading: {
      control: "boolean",
    },
    supported: {
      control: "boolean",
    },
    locale: {
      control: "select",
      options: ["pt-BR", "en-US", "es-ES", "fr-FR"],
    },
  },
} satisfies Meta<typeof PasskeyPrompt>

export default meta
type Story = StoryObj<typeof meta>

export const CardVariant: Story = {
  args: {
    variant: "card",
  },
  render: (args) => (
    <div className="w-96">
      <PasskeyPrompt {...args} />
    </div>
  ),
}

export const ButtonVariant: Story = {
  args: {
    variant: "button",
  },
  render: (args) => (
    <div className="w-80">
      <PasskeyPrompt {...args} />
    </div>
  ),
}

export const Loading: Story = {
  args: {
    variant: "card",
    loading: true,
  },
  render: (args) => (
    <div className="w-96">
      <PasskeyPrompt {...args} />
    </div>
  ),
}
