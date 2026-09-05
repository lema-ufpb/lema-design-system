import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"
import { MagicLinkForm } from "./magic-link-form"

const meta = {
  title: "Form/MagicLinkForm",
  component: MagicLinkForm,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    onSendLink: fn(),
    onBack: fn(),
  },
  argTypes: {
    resendCooldown: { control: "number" },
    locale: {
      control: "select",
      options: ["pt-BR", "en-US", "es-ES", "fr-FR"],
    },
  },
} satisfies Meta<typeof MagicLinkForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    resendCooldown: 30,
  },
  render: (args) => (
    <div className="w-80 rounded-xl border bg-card p-6 shadow-sm">
      <MagicLinkForm {...args} />
    </div>
  ),
}
