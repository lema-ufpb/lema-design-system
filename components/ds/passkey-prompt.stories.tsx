import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"
import { PasskeyPrompt } from "./passkey-prompt"

const meta = {
  title: "Actions/PasskeyPrompt",
  component: PasskeyPrompt,
  tags: ["autodocs"],
  parameters: {
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
