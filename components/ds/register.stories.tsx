import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Register } from "./register"

const meta = {
  title: "Auth/Register",
  component: Register,
  tags: ["autodocs"],
  argTypes: { locale: { control: "inline-radio", options: ["en-US", "pt-BR", "es-ES", "fr-FR"] } },
} satisfies Meta<typeof Register>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: {} }

export const WithoutSocial: Story = { args: { showSocial: false } }

export const Loading: Story = { args: { loading: true } }
