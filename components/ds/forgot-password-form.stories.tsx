import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"
import { ForgotPasswordForm } from "./forgot-password-form"

const meta = {
  title: "Auth/ForgotPasswordForm",
  component: ForgotPasswordForm,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A ForgotPasswordForm component for the LEMA Design System.",
          "Supports loading state, i18n support, CVA variants.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `onSubmit` | `(email: string) => Promise<boolean \| void> \| void` | — | - |",
          "| `onBackToLogin` | `() => void` | — | - |",
          "| `resendCooldown` | `number` | — | - |",
          "| `loading` | `boolean` | — | - |",
          "| `locale` | `UILocale` | — | - |",
          '| `variant` | `"default" \| "flat"` | `"default"` | Variant |',
        ].join("\n"),
      },
    },
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
      options: ["en-US", "pt-BR", "es-ES", "fr-FR"],
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
