import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as React from "react"
import { SignaturePad } from "./signature-pad"

const meta = {
  title: "Form/SignaturePad",
  component: SignaturePad,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A signature input using the HTML Canvas API with mouse and touch support.",
          "Exports the signature as a Base64 PNG string.",
          "DPR-aware for crisp rendering on high-density displays.",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof SignaturePad>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: "Your Signature",
    clearLabel: "Clear",
    placeholder: "Sign here",
    width: 480,
    height: 180,
  },
}

export const Loading: Story = {
  args: {
    loading: true,
    width: 480,
    height: 180,
  },
}

export const Disabled: Story = {
  args: {
    label: "Signature (read-only)",
    disabled: true,
    width: 480,
    height: 180,
  },
}

export const Controlled: Story = {
  render: () => {
    const [sig, setSig] = React.useState<string | null>(null)
    return (
      <div className="flex flex-col gap-4">
        <SignaturePad
          label="Sign the agreement"
          value={sig ?? undefined}
          onChange={setSig}
          width={480}
          height={200}
        />
        <div className="text-xs text-muted-foreground">
          {sig
            ? `✓ Signature captured (${Math.round(sig.length / 1024)} KB)`
            : "No signature yet"}
        </div>
      </div>
    )
  },
}

export const CustomStroke: Story = {
  args: {
    label: "Blue Signature",
    strokeColor: "#3b82f6",
    strokeWidth: 3,
    width: 480,
    height: 180,
  },
}
