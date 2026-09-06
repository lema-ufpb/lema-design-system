import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { DsOtpInput } from "./otp-input"

const meta = {
  title: "Form/OtpInput",
  component: DsOtpInput,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "An OTP input component for verification codes, built on top of the shadcn `input-otp` primitive.",
      },
    },
  },
  args: {
    maxLength: 6,
    "aria-label": "One-time password",
  },
  argTypes: {
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Sets the size of the OTP slots.",
      table: {
        defaultValue: { summary: '"md"' },
      },
    },
    invalid: {
      control: "boolean",
      description: "Applies invalid styling.",
    },
    loading: {
      control: "boolean",
      description: "Shows a skeleton loading state.",
    },
    disabled: {
      control: "boolean",
      description: "Disables the input.",
    },
  },
} satisfies Meta<typeof DsOtpInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-muted-foreground">
          Small (sm)
        </span>
        <DsOtpInput {...args} size="sm" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-muted-foreground">
          Medium (md)
        </span>
        <DsOtpInput {...args} size="md" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-muted-foreground">
          Large (lg)
        </span>
        <DsOtpInput {...args} size="lg" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "The component supports `sm`, `md`, and `lg` sizes.",
      },
    },
  },
}

export const Invalid: Story = {
  args: {
    invalid: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Set `invalid` to true to apply error styling.",
      },
    },
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Set `disabled` to true to disable interactions.",
      },
    },
  },
}

export const Loading: Story = {
  args: {
    loading: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Set `loading` to true to render skeleton placeholders.",
      },
    },
  },
}
