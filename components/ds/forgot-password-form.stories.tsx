import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"
import { ForgotPasswordForm } from "./forgot-password-form"

const meta = {
  title: "Form/ForgotPasswordForm",
  component: ForgotPasswordForm,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    onSubmit: fn(),
    onBackToLogin: fn(),
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["default", "flat"],
    },
    resendCooldown: { control: "number" },
    loading: { control: "boolean" },
    locale: {
      control: "select",
      options: ["pt-BR", "en-US", "es-ES", "fr-FR"],
    },
  },
} satisfies Meta<typeof ForgotPasswordForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: "default",
    resendCooldown: 60,
  },
}

export const FlatVariant: Story = {
  args: {
    variant: "flat",
  },
}
