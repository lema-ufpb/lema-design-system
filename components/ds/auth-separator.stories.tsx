import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { AuthSeparator } from "./auth-separator"

const meta = {
  title: "Data Display/AuthSeparator",
  component: AuthSeparator,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["default", "badge", "gradient"],
    },
  },
} satisfies Meta<typeof AuthSeparator>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "ou continue com e-mail",
    variant: "default",
  },
  render: (args) => (
    <div className="w-80">
      <AuthSeparator {...args} />
    </div>
  ),
}

export const BadgeVariant: Story = {
  args: {
    children: "ou entre com SSO",
    variant: "badge",
  },
  render: (args) => (
    <div className="w-80">
      <AuthSeparator {...args} />
    </div>
  ),
}

export const GradientVariant: Story = {
  args: {
    children: "ou",
    variant: "gradient",
  },
  render: (args) => (
    <div className="w-80">
      <AuthSeparator {...args} />
    </div>
  ),
}
