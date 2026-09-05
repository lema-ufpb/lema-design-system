import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"
import { TwoFactorAuth } from "./two-factor-auth"

const meta = {
  title: "Form/TwoFactorAuth",
  component: TwoFactorAuth,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    onVerify: fn(),
    onResend: fn(),
    onAlternativeMethod: fn(),
  },
  argTypes: {
    method: {
      control: "inline-radio",
      options: ["email", "authenticator", "sms"],
    },
    variant: {
      control: "inline-radio",
      options: ["default", "clean"],
    },
    resendCooldown: { control: "number" },
    locale: {
      control: "select",
      options: ["pt-BR", "en-US", "es-ES", "fr-FR"],
    },
  },
} satisfies Meta<typeof TwoFactorAuth>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    destination: "estudante@ufpb.br",
    method: "email",
    resendCooldown: 45,
  },
}

export const AuthenticatorApp: Story = {
  args: {
    method: "authenticator",
    destination: "Google Authenticator",
    resendCooldown: 30,
  },
}

export const CleanVariant: Story = {
  args: {
    variant: "clean",
    destination: "(83) 9****-9988",
    method: "sms",
  },
}
