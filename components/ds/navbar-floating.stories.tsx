import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { NavbarFloating } from "./navbar-floating"
import { Button } from "@/components/ui/button"

const meta: Meta<typeof NavbarFloating> = {
  title: "Navigation/NavbarFloating",
  component: NavbarFloating,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj<typeof NavbarFloating>

export const Default: Story = {
  args: {},
}

export const Muted: Story = {
  args: { variant: "muted" },
}

export const WithActions: Story = {
  args: {
    actions: (
      <>
        <Button variant="ghost" size="sm" className="rounded-full">
          Entrar
        </Button>
        <Button size="sm" className="rounded-full">
          Começar
        </Button>
      </>
    ),
  },
}

export const Loading: Story = {
  args: { loading: true },
}
