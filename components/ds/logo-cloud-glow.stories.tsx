import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { LogoCloudGlow } from "./logo-cloud-glow"
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
  title: "LogoCloud/LogoCloudGlow",
  component: LogoCloudGlow,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A centered logo wall inside a glowing card that reacts to the pointer — composed from PressWall and CursorSpotlight.",
          "Composable and theme-aware via semantic tokens.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `kicker` | `string` | — | - |",
          "| `tone` | `CursorSpotlightTone` | — | - |",
          "| `children` | `React.ReactNode` | — | - |",
        ].join("\n"),
      },
    },
  },
  args: { kicker: "Trusted by industry leaders", children: [] as never },
} satisfies Meta<typeof LogoCloudGlow>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { kicker: "Trusted by industry leaders", children: [] as never },
  render: (args) => (
    <LogoCloudGlow {...args}>
      {logos.map((name) => (
        <PressWallLogo key={name} label={name}>
          <Wordmark>{name}</Wordmark>
        </PressWallLogo>
      ))}
    </LogoCloudGlow>
  ),
}

export const VioletTone: Story = {
  args: { tone: "violet", children: [] as never },
  render: (args) => (
    <LogoCloudGlow {...args}>
      {logos.map((name) => (
        <PressWallLogo key={name} label={name}>
          <Wordmark>{name}</Wordmark>
        </PressWallLogo>
      ))}
    </LogoCloudGlow>
  ),
}
