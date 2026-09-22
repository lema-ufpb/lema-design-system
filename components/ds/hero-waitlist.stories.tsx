import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { HeroWaitlist } from "./hero-waitlist"

const meta = {
  title: "Hero/HeroWaitlist",
  component: HeroWaitlist,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: [
          "Centered hero with an email capture form — composed from HeroSection and WaitlistForm.",
          "Supports i18n.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `kicker` | `string` | — | - |",
          "| `title` | `React.ReactNode` | — | - |",
          "| `description` | `string` | — | - |",
          "| `socialProof` | `React.ReactNode` | — | - |",
          '| `onSubmit` | `WaitlistFormProps["onSubmit"]` | — | - |',
          "| `locale` | `UILocale` | — | - |",
        ].join("\n"),
      },
    },
  },
  args: {
    kicker: "Coming soon",
    title: "Be first in line.",
    description: "Join the waitlist and get early access when we launch.",
    socialProof: "Join 2,400+ people already on the list.",
    locale: "en-US" as const,
  },
} satisfies Meta<typeof HeroWaitlist>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const WithoutSocialProof: Story = {
  args: { socialProof: undefined },
}
