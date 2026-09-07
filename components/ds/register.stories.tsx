import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Register } from "./register"

const meta = {
  title: "Auth/Register",
  component: Register,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A Register component for the LEMA Design System.",
          "Supports loading state, skeleton, i18n support.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `onSubmit` | `(data: { name: string` | — | - |",
          "| `showSocial` | `boolean` | — | - |",
          '| `socials` | `("google" \| "github" \| "apple" \| "microsoft")[]` | — | - |',
          "| `locale` | `UILocale` | — | - |",
          "| `loading` | `boolean` | — | - |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    locale: {
      control: "inline-radio",
      options: ["en-US", "pt-BR", "es-ES", "fr-FR"],
    },
  },
} satisfies Meta<typeof Register>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: {} }

export const WithoutSocial: Story = { args: { showSocial: false } }

export const Loading: Story = { args: { loading: true } }
