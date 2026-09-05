import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"
import { LoginForm } from "./login-form"

const meta = {
  title: "Form/LoginForm",
  component: LoginForm,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    onSubmit: fn(),
    onSocialLogin: fn(),
    onForgotPassword: fn(),
    onSignUp: fn(),
    onPasskeyLogin: fn(),
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["default", "flat"],
    },
    showPasskey: { control: "boolean" },
    loading: { control: "boolean" },
    locale: {
      control: "select",
      options: ["pt-BR", "en-US", "es-ES", "fr-FR"],
    },
  },
} satisfies Meta<typeof LoginForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: "default",
    socialProviders: ["google", "github", "govbr"],
  },
}

export const FlatVariant: Story = {
  args: {
    variant: "flat",
    socialProviders: ["google", "govbr"],
  },
}

export const WithError: Story = {
  args: {
    errorMessage:
      "Credenciais inválidas. Verifique seu e-mail e senha institucional.",
  },
}

export const LoadingState: Story = {
  args: {
    loading: true,
  },
}
