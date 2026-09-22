import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { MagneticElement } from "./magnetic-element"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const meta = {
  title: "Delight/MagneticElement",
  component: MagneticElement,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    strengthValue: {
      control: { type: "range", min: 5, max: 100, step: 1 },
      description:
        "Magnetic attraction strength (the higher, the more it follows the cursor)",
    },
    asChild: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof MagneticElement>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    strengthValue: 30,
    children: (
      <Button size="lg" className="rounded-full shadow-lg">
        Hover Me
      </Button>
    ),
  },
}

export const Strong: Story = {
  args: {
    strengthValue: 60,
    children: (
      <Card className="w-64 cursor-pointer overflow-hidden border-2 transition-colors hover:border-primary">
        <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            ✨
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">Magnetic Effect</h3>
            <p className="text-sm text-muted-foreground">
              This card reacts strongly to cursor movement.
            </p>
          </div>
        </CardContent>
      </Card>
    ),
  },
}

export const AsChild: Story = {
  args: {
    asChild: true,
    strengthValue: 40,
    children: (
      <Button variant="outline" size="lg">
        Using asChild
      </Button>
    ),
  },
}
