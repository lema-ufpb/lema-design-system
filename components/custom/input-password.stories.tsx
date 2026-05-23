import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { PasswordInput } from "./input-password"

const meta = {
  title: "Forms/PasswordInput",
  component: PasswordInput,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A secure password text field featuring a built-in visibility toggle button.",
          "",
          "Includes support for size variants (`sm`, `default`, `lg`), border radius presets (`pill`, `rounded`, `square`), disabled states, validation highlighting, and custom toggle accessibility labels.",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Boundary border** | `--input` | Default outer border line color |",
          "| **Focus ring outline** | `--ring` | Keyboard interaction highlighting boundary |",
          "| **Eye Icon (Idle)** | `--muted-foreground` | Icon stroke color inside the toggle trigger |",
          "| **Eye Icon (Hover)** | `--foreground` | Toggle hover active stroke color |",
          "| **Error state border** | `--destructive` | Red outer boundary ring for validation failure |",
          "| **Error focus ring** | `--destructive/20` | Subtle red focus ring for invalid validation inputs |",
          "| **Disabled background** | `--muted` | Light background fill indicating read-only / disabled state |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    disabled: {
      control: "boolean",
    },
    placeholder: {
      control: "text",
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
    },
    radius: {
      control: "select",
      options: ["pill", "rounded", "square"],
    },
  },
} satisfies Meta<typeof PasswordInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: "Enter your password...",
  },
}

export const Small: Story = {
  args: {
    size: "sm",
    placeholder: "Enter your password...",
  },
}

export const Large: Story = {
  args: {
    size: "lg",
    placeholder: "Enter your password...",
  },
}

export const LocalePTBR: Story = {
  args: {
    placeholder: "Digite sua senha...",
    locale: "pt-BR",
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-3">
      <PasswordInput size="sm" placeholder="Small" />
      <PasswordInput size="default" placeholder="Default" />
      <PasswordInput size="lg" placeholder="Large" />
    </div>
  ),
}

export const AllRadius: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-3">
      <PasswordInput radius="pill" placeholder="Pill" />
      <PasswordInput radius="rounded" placeholder="Rounded" />
      <PasswordInput radius="square" placeholder="Square" />
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Enter your password...",
    value: "super_secret_password",
  },
}

export const WithValue: Story = {
  args: {
    value: "secret_password_123",
  },
}

export const Invalid: Story = {
  args: {
    "aria-invalid": true,
    placeholder: "Enter your password...",
  },
}
