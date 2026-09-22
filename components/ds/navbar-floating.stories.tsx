import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { NavbarFloating } from "./navbar-floating"
import { Button } from "@/components/ui/button"

const meta: Meta<typeof NavbarFloating> = {
  title: "Navigation/NavbarFloating",
  component: NavbarFloating,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A NavbarFloating component for the LEMA Design System.",
          "Supports loading state, skeleton, CVA variants.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `brand` | `React.ReactNode` | — | - |",
          "| `links` | `NavbarFloatingLink[]` | — | - |",
          "| `actions` | `React.ReactNode` | — | - |",
          "| `loading` | `boolean` | — | - |",
          '| `variant` | `"default" \| "muted"` | `"default"` | Variant |',
          '| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Variant |',
        ].join("\n"),
      },
    },
    layout: "fullscreen",
  },
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
          Sign in
        </Button>
        <Button size="sm" className="rounded-full">
          Get started
        </Button>
      </>
    ),
  },
}

export const Loading: Story = {
  args: { loading: true },
}
