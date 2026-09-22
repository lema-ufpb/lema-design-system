import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { AuthSplitScreen } from "./auth-split-screen"
import { LoginForm } from "./login-form"
import { SignUpForm } from "./signup-form"

const meta = {
  title: "Auth/AuthSplitScreen",
  component: AuthSplitScreen,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A AuthSplitScreen component for the LEMA Design System.",
          "Supports CVA variants.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `logo` | `React.ReactNode` | — | - |",
          "| `appName` | `string` | — | - |",
          "| `testimonial` | `AuthTestimonial` | — | - |",
          "| `stats` | `AuthStat[]` | — | - |",
          "| `brandHeadline` | `string` | — | - |",
          "| `brandDescription` | `string` | — | - |",
          '| `reverse` | `"true" \| "false"` | — | Variant |',
        ].join("\n"),
      },
    },
    layout: "fullscreen",
  },
  argTypes: {
    reverse: { control: "boolean" },
  },
} satisfies Meta<typeof AuthSplitScreen>

export default meta
type Story = StoryObj<typeof meta>

export const LoginSplitScreen: Story = {
  render: () => (
    <AuthSplitScreen
      appName="LEMA ID"
      testimonial={{
        quote:
          "The unified UFPB ecosystem reduced the complexity of accessing laboratories and academic research.",
        author: "Dra. Beatriz Fernandes",
        role: "Principal Researcher · CCEN UFPB",
      }}
      stats={[
        { label: "Active Users", value: "32.000+" },
        { label: "Integrated Systems", value: "48" },
      ]}
    >
      <LoginForm
        variant="flat"
        socialProviders={["google", "govbr", "cafe"]}
        showPasskey
      />
    </AuthSplitScreen>
  ),
}

export const SignUpSplitScreen: Story = {
  render: () => (
    <AuthSplitScreen
      appName="LEMA ID"
      brandHeadline="Join the largest academic innovation community in Paraíba"
      brandDescription="Centralized access to laboratories, research grants, calls for proposals and high-productivity institutional tools."
      stats={[
        { label: "Connected Laboratories", value: "24" },
        { label: "Articles and Patents", value: "1.200+" },
      ]}
    >
      <SignUpForm variant="flat" socialProviders={["google", "govbr"]} />
    </AuthSplitScreen>
  ),
}

export const ReversedTestimonialLeft: Story = {
  render: () => (
    <AuthSplitScreen
      reverse
      appName="LEMA Cloud"
      testimonial={{
        quote:
          "The ease of unified login accelerated by days the onboarding of new scientific initiation scholarship holders.",
        author: "Prof. Marcos Andrade",
        role: "IT Coordinator · CI UFPB",
      }}
    >
      <LoginForm variant="flat" socialProviders={["govbr", "google"]} />
    </AuthSplitScreen>
  ),
}
