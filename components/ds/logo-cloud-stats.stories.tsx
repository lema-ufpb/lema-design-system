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
  title: "LogoCloud/LogoCloudStats",
  component: LogoCloudStats,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A big headline stat sitting above a logo wall — composed from PressWall.",
          "Composable and theme-aware via semantic tokens.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          '| `headline` | `React.ReactNode` | — | /** Big headline, e.g. "Trusted by 500+ companies". */ |',
          "| `description` | `string` | — | - |",
          "| `kicker` | `string` | — | - |",
          "| `children` | `React.ReactNode` | — | /** `PressWallLogo` items rendered below. */ |",
        ].join("\n"),
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
