import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { useState } from "react"
import { TextScramble } from "./text-scramble"
import { Button } from "@/components/ui/button"

const meta = {
  title: "Delight/TextScramble",
  component: TextScramble,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    speed: {
      control: { type: "range", min: 10, max: 200, step: 10 },
      description: "Velocidade em ms para cada frame de texto",
    },
    characters: {
      control: "text",
      description: "Quais caracteres usar para a distorção",
    },
  },
} satisfies Meta<typeof TextScramble>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "SISTEMA DESBLOQUEADO",
    className: "text-4xl font-mono font-bold tracking-widest text-primary",
  },
}

export const Trigger: Story = {
  render: (args) => {
    const [trigger, setTrigger] = useState(true)

    return (
      <div className="flex flex-col items-center gap-8">
        <div className="flex h-12 items-center justify-center">
          <TextScramble
            {...args}
            trigger={trigger}
            className="font-mono text-2xl text-muted-foreground"
          >
            {args.children}
          </TextScramble>
        </div>
        <Button onClick={() => setTrigger(!trigger)}>Re-animar</Button>
      </div>
    )
  },
  args: {
    children: "Hover para decodificar...",
  },
}
