import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, within } from "storybook/test"
import { AnimatedNumber } from "./animated-number"

const meta = {
  title: "Data Display/AnimatedNumber",
  component: AnimatedNumber,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Counts up to a numeric value on mount. Renders the animated digits as decorative and exposes the final value once via a sr-only span. Jumps to the final value under prefers-reduced-motion.",
      },
    },
  },
  args: {
    value: 128400,
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof AnimatedNumber>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("128,400")).toBeInTheDocument()
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      {(["sm", "md", "lg"] as const).map((size) => (
        <AnimatedNumber key={size} value={1024} size={size} />
      ))}
    </div>
  ),
}

export const WithPrefixSuffix: Story = {
  args: { value: 42.5, prefix: "$", suffix: "K", decimals: 1 },
}

export const Locales: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      {(["en-US", "pt-BR", "es-ES", "fr-FR"] as const).map((locale) => (
        <AnimatedNumber
          key={locale}
          value={128400.5}
          decimals={1}
          locale={locale}
        />
      ))}
    </div>
  ),
}
