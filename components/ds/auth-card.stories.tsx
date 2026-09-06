import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, within } from "storybook/test"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { AuthCard } from "./auth-card"

function DemoForm() {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input id="password" type="password" required />
        </Field>
        <Field>
          <Button type="submit" className="w-full">
            Login
          </Button>
          <Button variant="outline" type="button" className="w-full">
            Login with Google
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}

const meta: Meta<typeof AuthCard> = {
  title: "Layout/AuthCard",
  component: AuthCard,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj<typeof AuthCard>

export const Default: Story = {
  render: () => (
    <AuthCard>
      <DemoForm />
    </AuthCard>
  ),
}

export const Muted: Story = {
  render: () => (
    <AuthCard variant="muted">
      <DemoForm />
    </AuthCard>
  ),
}

export const Split: Story = {
  render: () => (
    <AuthCard layout="split" imageSrc="https://picsum.photos/seed/acme/800/900">
      <DemoForm />
    </AuthCard>
  ),
}

export const Cover: Story = {
  render: () => (
    <AuthCard
      layout="cover"
      imageSrc="https://picsum.photos/seed/acme-cover/600/600"
    >
      <DemoForm />
    </AuthCard>
  ),
}

export const Signup: Story = {
  render: () => (
    <AuthCard mode="signup">
      <DemoForm />
    </AuthCard>
  ),
}

export const Loading: Story = {
  args: { loading: true },
}

export const Locales: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(["pt-BR", "en-US", "es-ES", "fr-FR"] as const).map((locale) => (
        <div key={locale} className="border">
          <AuthCard locale={locale}>
            <DemoForm />
          </AuthCard>
        </div>
      ))}
    </div>
  ),
}

export const A11y: Story = {
  render: () => (
    <AuthCard>
      <DemoForm />
    </AuthCard>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("heading")).toBeInTheDocument()
  },
}
