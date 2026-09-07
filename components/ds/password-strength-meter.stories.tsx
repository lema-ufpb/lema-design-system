import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { PasswordStrengthMeter } from "./password-strength-meter"

const meta = {
  title: "Feedback/PasswordStrengthMeter",
  component: PasswordStrengthMeter,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A PasswordStrengthMeter component for the LEMA Design System.",
          "Supports i18n and CVA variants.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `password` | `string` | — | - |",
          "| `showChecklist` | `boolean` | — | - |",
          "| `minLength` | `number` | — | - |",
          "| `locale` | `UILocale` | — | - |",
          '| `size` | `"sm" \| "md"` | `"md"` | Variant |',
        ].join("\n"),
      },
    },
    layout: "centered",
  },
  argTypes: {
    password: { control: "text" },
    showChecklist: { control: "boolean" },
    minLength: { control: "number" },
    locale: {
      control: "select",
      options: ["pt-BR", "en-US", "es-ES", "fr-FR"],
    },
  },
} satisfies Meta<typeof PasswordStrengthMeter>

export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {
  args: {
    password: "",
  },
  render: (args) => (
    <div className="w-80">
      <PasswordStrengthMeter {...args} />
    </div>
  ),
}

export const WeakPassword: Story = {
  args: {
    password: "senha",
  },
  render: (args) => (
    <div className="w-80">
      <PasswordStrengthMeter {...args} />
    </div>
  ),
}

export const MediumPassword: Story = {
  args: {
    password: "SenhaLonga",
  },
  render: (args) => (
    <div className="w-80">
      <PasswordStrengthMeter {...args} />
    </div>
  ),
}

export const StrongPassword: Story = {
  args: {
    password: "SenhaForte123",
  },
  render: (args) => (
    <div className="w-80">
      <PasswordStrengthMeter {...args} />
    </div>
  ),
}

export const ExcellentPassword: Story = {
  args: {
    password: "SenhaExcepcional@2026",
  },
  render: (args) => (
    <div className="w-80">
      <PasswordStrengthMeter {...args} />
    </div>
  ),
}

export const WithoutChecklist: Story = {
  args: {
    password: "MinhaSenha@456",
    showChecklist: false,
  },
  render: (args) => (
    <div className="w-80">
      <PasswordStrengthMeter {...args} />
    </div>
  ),
}
