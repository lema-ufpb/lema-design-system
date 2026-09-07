import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"
import { SignUpForm } from "./signup-form"

const meta = {
  title: "Auth/SignUpForm",
  component: SignUpForm,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A SignupForm component for the LEMA Design System.",
          "Supports loading state, i18n support, CVA variants.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `onSubmit` | `(data: SignUpFormData) => Promise<boolean \| void> \| void` | — | - |",
          "| `onSocialSignUp` | `(provider: SocialProvider) => Promise<void> \| void` | — | - |",
          "| `onLogin` | `() => void` | — | - |",
          "| `socialProviders` | `SocialProvider[]` | — | - |",
          "| `termsUrl` | `string` | — | - |",
          "| `privacyUrl` | `string` | — | - |",
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
    onSocialSignUp: fn(),
    onLogin: fn(),
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["default", "flat"],
    },
    loading: { control: "boolean" },
    locale: {
      control: "select",
      options: ["pt-BR", "en-US", "es-ES", "fr-FR"],
    },
  },
} satisfies Meta<typeof SignUpForm>

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
      "Este e-mail já está cadastrado no sistema. Tente fazer login ou recuperar sua senha.",
  },
}
