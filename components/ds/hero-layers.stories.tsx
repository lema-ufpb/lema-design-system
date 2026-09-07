import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { HeroLayers } from "./hero-layers"
import { Button } from "@/components/ui/button"

const meta: Meta<typeof HeroLayers> = {
  title: "Hero/HeroLayers",
  component: HeroLayers,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A HeroLayers component for the LEMA Design System.",
          "Supports loading state, skeleton, CVA variants.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `badge` | `string` | — | - |",
          "| `title` | `string` | — | - |",
          "| `description` | `string` | — | - |",
          "| `actions` | `React.ReactNode` | — | - |",
          "| `layers` | `HeroLayersItem[]` | — | - |",
          "| `loading` | `boolean` | — | - |",
          '| `inset` | `"true" \| "false"` | — | Variant |',
        ].join("\n"),
      },
    },
    layout: "fullscreen",
  },
}

export default meta
type Story = StoryObj<typeof HeroLayers>

export const Default: Story = {
  args: {},
  render: (args) => (
    <HeroLayers
      {...args}
      actions={
        <>
          <Button className="rounded-full">Get Started</Button>
          <Button variant="outline" className="rounded-full">
            GitHub
          </Button>
        </>
      }
    />
  ),
}

export const Inset: Story = {
  args: { inset: true },
  render: (args) => (
    <div className="bg-muted/30 p-6">
      <HeroLayers
        {...args}
        actions={<Button className="rounded-full">Get Started</Button>}
      />
    </div>
  ),
}

export const Loading: Story = {
  args: { loading: true },
}
