import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { QrCode } from "./qr-code"

const meta = {
  title: "Kibo/QrCode",
  component: QrCode,
  tags: ["autodocs"],
} satisfies Meta<typeof QrCode>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { value: "https://lema.ufpb.br", size: 128 },
}
