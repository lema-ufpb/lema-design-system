import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { QrCode } from "./qr-code"

const meta = {
  title: "Data Display/QrCode",
  component: QrCode,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A QrCode component for the LEMA Design System.",
          "Composable and theme-aware via semantic tokens.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `value` | `string` | — | - |",
          "| `size` | `number` | — | - |",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof QrCode>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { value: "https://lema.ufpb.br", size: 128 },
}
