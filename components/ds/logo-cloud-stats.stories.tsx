import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { LogoCloudStats } from "./logo-cloud-stats"
import { PressWallLogo } from "./press-wall"

function Wordmark({ children }: { children: string }) {
  return (
    <span className="text-lg font-semibold tracking-tight text-foreground">
      {children}
    </span>
  )
}

const logos = ["Forbes", "TechCrunch", "Wired", "The Verge"]

const meta = {
  title: "Blocks/LogoCloudStats",
  component: LogoCloudStats,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A big headline stat sitting above a logo wall — composed from PressWall.",
      },
    },
  },
  args: {
    headline: "Trusted by 500+ companies",
    description: "From startups to Fortune 500 enterprises.",
    kicker: "As seen in",
    children: [] as never,
  },
} satisfies Meta<typeof LogoCloudStats>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    headline: "Trusted by 500+ companies",
    description: "From startups to Fortune 500 enterprises.",
    kicker: "As seen in",
    children: [] as never,
  },
  render: (args) => (
    <LogoCloudStats {...args}>
      {logos.map((name) => (
        <PressWallLogo key={name} label={name}>
          <Wordmark>{name}</Wordmark>
        </PressWallLogo>
      ))}
    </LogoCloudStats>
  ),
}
