import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Typewriter } from "./typewriter"

const meta: Meta<typeof Typewriter> = {
  title: "Effects/Typewriter",
  component: Typewriter,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["typewriter", "flip", "generate"],
    },
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg", "xl", "display"],
    },
    loop: { control: "boolean" },
    cursor: { control: "boolean" },
  },
}

export default meta
type Story = StoryObj<typeof Typewriter>

export const TypewriterEffect: Story = {
  args: {
    words: ["Design System", "LEMA-DS", "UFPB", "Aceternity inspirado"],
    variant: "typewriter",
    size: "lg",
    loop: true,
  },
}

export const FlipWords: Story = {
  args: {
    words: ["rápido", "moderno", "acessível", "lindo"],
    variant: "flip",
    size: "display",
    loop: true,
  },
  render: (args) => (
    <p className="text-xl">
      Construa produtos <Typewriter {...args} className="text-primary" /> em
      segundos
    </p>
  ),
}

export const GenerateEffect: Story = {
  args: {
    words: ["O que este componente resolve? Quando usar vs alternativas?"],
    variant: "generate",
    size: "md",
    speed: 30,
  },
}

export const WithoutCursor: Story = {
  args: {
    words: ["Sem cursor", "Apenas texto"],
    variant: "typewriter",
    cursor: false,
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {(["typewriter", "flip", "generate"] as const).map((v) => (
        <div key={v} className="flex flex-col gap-1">
          <span className="text-xs font-medium text-muted-foreground">{v}</span>
          <Typewriter words={["Hello", "World", "LEMA"]} variant={v} />
        </div>
      ))}
    </div>
  ),
}
