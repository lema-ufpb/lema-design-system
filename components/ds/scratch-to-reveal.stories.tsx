import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ScratchToReveal } from "./scratch-to-reveal"

const meta = {
  title: "Delight/ScratchToReveal",
  component: ScratchToReveal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    coverColor: { control: "color" },
    brushSize: { control: { type: "range", min: 10, max: 100, step: 5 } },
    revealThreshold: { control: { type: "range", min: 10, max: 90, step: 10 } },
  },
} satisfies Meta<typeof ScratchToReveal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    width: 320,
    height: 120,
    coverColor: "#475569", // slate-600
    brushSize: 40,
    className: "rounded-xl shadow-lg border border-border bg-muted/50",
    children: (
      <div className="flex h-full w-full flex-col items-center justify-center p-4 text-center">
        <p className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">
          Your Coupon
        </p>
        <p className="mt-1 text-3xl font-black text-primary">WELCOME20</p>
      </div>
    ),
  },
}

export const RewardReveal: Story = {
  args: {
    width: 250,
    height: 250,
    coverColor: "#eab308", // yellow-500
    brushSize: 50,
    revealThreshold: 40,
    className: "rounded-full shadow-2xl overflow-hidden ring-4 ring-primary/20",
    children: (
      <div className="flex h-full w-full flex-col items-center justify-center bg-linear-to-br from-violet-500 to-fuchsia-500 p-4 text-center text-white">
        <div className="text-5xl">🎁</div>
        <p className="mt-4 text-xl leading-tight font-bold">
          You won 1 Month Free!
        </p>
      </div>
    ),
  },
}
