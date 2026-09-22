import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"
import { LoginForm } from "./login-form"

const meta = {
  title: "Auth/LoginForm",
  component: LoginForm,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A LoginForm component for the LEMA Design System.",
          "Supports loading state, i18n support, CVA variants.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `onSubmit` | `(data: LoginFormData) => Promise<boolean \| void> \| void` | — | - |",
          "| `onSocialLogin` | `(provider: SocialProvider) => Promise<void> \| void` | — | - |",
          "| `onForgotPassword` | `() => void` | — | - |",
          "| `onSignUp` | `() => void` | — | - |",
          "| `onPasskeyLogin` | `() => Promise<boolean \| void> \| void` | — | - |",
          "| `socialProviders` | `SocialProvider[]` | — | - |",
          "| `showPasskey` | `boolean` | — | - |",
          "| `loading` | `boolean` | — | - |",
          "| `errorMessage` | `string` | — | - |",
          "| `locale` | `UILocale` | — | - |",
          '| `variant` | `"default" \| "flat"` | `"default"` | Variant |',
        ].join("\n"),
      },
    },
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
      options: ["en-US", "pt-BR", "es-ES", "fr-FR"],
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
      "Invalid credentials. Check your email and institutional password.",
  },
}

export const LoadingState: Story = {
  args: {
    loading: true,
  },
}
