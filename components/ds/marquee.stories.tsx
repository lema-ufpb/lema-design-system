import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Marquee } from "./marquee"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const meta = {
  title: "Data Display/Marquee",
  component: Marquee,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A Marquee component for the LEMA Design System.",
          "Supports CVA variants.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `pauseOnHover` | `boolean` | — | - |",
          "| `fadeEdges` | `boolean` | — | - |",
          "| `repeat` | `number` | — | - |",
          '| `direction` | `"left" \| "right" \| "up" \| "down"` | `"left"` | Variant |',
          '| `speed` | `"slow" \| "normal" \| "fast"` | `"normal"` | Variant |',
        ].join("\n"),
      },
    },
    layout: "padded",
  },
  argTypes: {
    direction: {
      control: "select",
      options: ["left", "right", "up", "down"],
    },
    speed: {
      control: "inline-radio",
      options: ["slow", "normal", "fast"],
    },
    pauseOnHover: { control: "boolean" },
    fadeEdges: { control: "boolean" },
  },
} satisfies Meta<typeof Marquee>

export default meta
type Story = StoryObj<typeof meta>

const logos = [
  "UFPB",
  "LEMA",
  "Next.js",
  "React",
  "Tailwind",
  "TypeScript",
  "Storybook",
  "Radix UI",
]

export const Default: Story = {
  render: (args) => (
    <div className="mx-auto w-full max-w-2xl py-8">
      <Marquee {...args}>
        {logos.map((logo) => (
          <div
            key={logo}
            className="flex items-center justify-center rounded-lg border border-border/50 bg-muted/30 px-6 py-3 text-sm font-medium text-muted-foreground shadow-xs hover:text-foreground"
          >
            {logo}
          </div>
        ))}
      </Marquee>
    </div>
  ),
}

export const ReverseDirection: Story = {
  render: () => (
    <div className="mx-auto w-full max-w-2xl py-8">
      <Marquee direction="right">
        {logos.map((logo) => (
          <div
            key={logo}
            className="flex items-center justify-center rounded-lg border border-border/50 bg-muted/30 px-6 py-3 text-sm font-medium text-muted-foreground shadow-xs hover:text-foreground"
          >
            {logo}
          </div>
        ))}
      </Marquee>
    </div>
  ),
}

export const TestimonialCards: Story = {
  render: () => (
    <div className="mx-auto w-full max-w-3xl py-8">
      <Marquee speed="slow" pauseOnHover>
        {[
          {
            name: "Ana Silva",
            role: "Frontend Lead",
            text: "LEMA Design System accelerated our delivery by 4x.",
          },
          {
            name: "Carlos Melo",
            role: "Tech Lead",
            text: "High-standard accessibility and typography ready to use.",
          },
          {
            name: "Mariana Costa",
            role: "Product Manager",
            text: "Visual consistency across squads improved dramatically.",
          },
        ].map((item) => (
          <Card
            key={item.name}
            className="w-72 shrink-0 border-border/60 bg-card/60"
          >
            <CardContent className="flex flex-col gap-2 p-4">
              <div className="flex items-center gap-3">
                <Avatar className="size-8">
                  <AvatarFallback className="text-xs">
                    {item.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xs leading-none font-medium">
                    {item.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.role}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground italic">
                &ldquo;{item.text}&rdquo;
              </p>
            </CardContent>
          </Card>
        ))}
      </Marquee>
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div className="mx-auto h-64 w-64 overflow-hidden rounded-xl border py-4">
      <Marquee direction="up" speed="normal" className="h-full">
        {logos.map((logo) => (
          <div
            key={logo}
            className="flex items-center justify-center rounded-lg border border-border/50 bg-muted/40 p-3 text-center text-xs font-medium"
          >
            {logo}
          </div>
        ))}
      </Marquee>
    </div>
  ),
}
