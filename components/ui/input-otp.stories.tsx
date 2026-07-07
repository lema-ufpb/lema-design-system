import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "./input-otp"

const meta = {
  title: "Shadcn UI/Input OTP",
  component: InputOTP,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A one-time password (OTP) input for verification codes, PINs, and multi-factor authentication flows.",
          "",
          "Wraps the `input-otp` library. Compose slots using `InputOTPGroup`, `InputOTPSlot` (with an `index` prop), and `InputOTPSeparator` for visual dividers.",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Variant / Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Slot background** | `--input/50` | Default slot fill color |",
          "| **Slot border** | `--input` | Default slot border color |",
          "| **Active border** | `--ring` | Focused slot border color |",
          "| **Active ring** | `--ring/30` | Focus ring glow around active slot |",
          "| **Invalid border** | `--destructive` | Error state slot border |",
          "| **Invalid ring** | `--destructive/20` | Error state ring glow |",
          "| **Caret color** | `--foreground` | Blinking caret in focused slot |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    maxLength: {
      control: { type: "number", min: 4, max: 8 },
      table: { defaultValue: { summary: "6" } },
    },
    containerClassName: {
      table: { disable: true },
    },
  },
} satisfies Meta<typeof InputOTP>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Six-character OTP input split into two groups of three slots separated by a visual divider.",
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  args: { maxLength: 6 } as any,
  render: () => (
    <InputOTP maxLength={6} aria-label="One-time password">
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  ),
}

export const FourDigits: Story = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  args: { maxLength: 4 } as any,
  render: () => (
    <InputOTP maxLength={4} aria-label="One-time password">
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
      </InputOTPGroup>
    </InputOTP>
  ),
}
