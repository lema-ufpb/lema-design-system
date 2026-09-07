import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { WaitlistForm } from "./waitlist-form"

const meta = {
  title: "Auth/WaitlistForm",
  component: WaitlistForm,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A WaitlistForm component for the LEMA Design System.",
          "Supports i18n and CVA variants.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `onSubmit` | `(email: string) => Promise<boolean \| void> \| void` | — | - |",
          "| `socialProof` | `React.ReactNode` | — | - |",
          "| `locale` | `UILocale` | — | - |",
          "| `disabled` | `boolean` | — | - |",
          "| `autoFocus` | `boolean` | — | - |",
          '| `variant` | `"default" \| "pill" \| "floating" \| "minimal"` | `"default"` | Variant |',
          '| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Variant |',
        ].join("\n"),
      },
    },
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "pill", "floating", "minimal"],
    },
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
    },
    disabled: {
      control: "boolean",
    },
    locale: {
      control: "select",
      options: ["pt-BR", "en-US", "es-ES", "fr-FR"],
    },
  },
} satisfies Meta<typeof WaitlistForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: "default",
    size: "md",
    locale: "pt-BR",
  },
}

export const PillVariant: Story = {
  args: {
    variant: "pill",
    size: "md",
    socialProof:
      "🎉 Junte-se a mais de 1.200 desenvolvedores na lista de espera.",
  },
}

export const FloatingCard: Story = {
  args: {
    variant: "floating",
    size: "lg",
    socialProof:
      "🔒 Garantimos que seus dados não serão compartilhados com terceiros.",
  },
}

export const EnglishLocale: Story = {
  args: {
    locale: "en-US",
    variant: "pill",
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    variant: "pill",
    socialProof: "Inscrições temporariamente encerradas para a turma atual.",
  },
}
