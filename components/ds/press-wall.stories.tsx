import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Award, Star, Trophy } from "lucide-react"
import {
  PressWall,
  PressWallAward,
  PressWallLogo,
  PressWallSkeleton,
} from "./press-wall"

const logos = [
  "Forbes",
  "TechCrunch",
  "Wired",
  "The Verge",
  "Fast Company",
  "Bloomberg",
]

function Wordmark({ children }: { children: string }) {
  return (
    <span className="text-lg font-semibold tracking-tight text-foreground">
      {children}
    </span>
  )
}

const meta = {
  title: "Data Display/PressWall",
  component: PressWall,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A static grid of press mentions or award logos, the non-scrolling counterpart to Marquee. Logos grow to color on hover/focus.",
      },
    },
  },
} satisfies Meta<typeof PressWall>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <PressWall kicker="As seen in">
      {logos.map((name) => (
        <PressWallLogo key={name} label={name}>
          <Wordmark>{name}</Wordmark>
        </PressWallLogo>
      ))}
    </PressWall>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-10">
      {(["sm", "md", "lg"] as const).map((size) => (
        <PressWall key={size} kicker={`size="${size}"`}>
          {logos.slice(0, 4).map((name) => (
            <PressWallLogo key={name} label={name} size={size}>
              <Wordmark>{name}</Wordmark>
            </PressWallLogo>
          ))}
        </PressWall>
      ))}
    </div>
  ),
}

export const AsLinks: Story = {
  render: () => (
    <PressWall kicker="Featured on">
      {logos.slice(0, 4).map((name) => (
        <PressWallLogo key={name} label={`Read the ${name} article`} href="#">
          <Wordmark>{name}</Wordmark>
        </PressWallLogo>
      ))}
    </PressWall>
  ),
}

export const WithAwards: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-6">
      <PressWall kicker="Recognized by">
        {logos.slice(0, 3).map((name) => (
          <PressWallLogo key={name} label={name}>
            <Wordmark>{name}</Wordmark>
          </PressWallLogo>
        ))}
      </PressWall>
      <div className="flex flex-wrap justify-center gap-2">
        <PressWallAward label="Product of the Year" icon={Trophy} />
        <PressWallAward label="Editor's Choice" icon={Award} />
        <PressWallAward label="4.9/5 rating" icon={Star} />
      </div>
    </div>
  ),
}

export const Loading: Story = {
  render: () => <PressWallSkeleton count={6} />,
}

export const Labeled: Story = {
  render: () => (
    <PressWall kicker="Industry recognition">
      {logos.slice(0, 4).map((name) => (
        <PressWallLogo key={name} label={name} showLabel>
          <Wordmark>{name}</Wordmark>
        </PressWallLogo>
      ))}
    </PressWall>
  ),
}
