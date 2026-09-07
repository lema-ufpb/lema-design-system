import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BoxIcon, SparklesIcon, LayersIcon } from "lucide-react"
import { HowItWorks } from "./how-it-works"

const steps = [
  {
    title: "Create account",
    description: "Sign up in seconds with your email.",
    icon: <BoxIcon />,
  },
  {
    title: "Configure",
    description: "Set up your workspace and preferences.",
    icon: <SparklesIcon />,
  },
  {
    title: "Launch",
    description: "Deploy and share with your team.",
    icon: <LayersIcon />,
  },
]

const meta = {
  title: "Marketing/HowItWorks",
  component: HowItWorks,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A HowItWorks component for the LEMA Design System.",
          "Supports loading state, skeleton, i18n support.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `title` | `string` | — | - |",
          "| `description` | `string` | — | - |",
          "| `steps` | `HowItWorksStep[]` | — | - |",
          '| `variant` | `"number" \| "icon" \| "card"` | — | - |',
          '| `orientation` | `"horizontal" \| "vertical"` | — | - |',
          "| `locale` | `UILocale` | — | - |",
          "| `loading` | `boolean` | — | - |",
          '| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Variant |',
        ].join("\n"),
      },
    },
  },
  argTypes: {
    variant: { control: "select", options: ["number", "icon", "card"] },
    orientation: {
      control: "inline-radio",
      options: ["horizontal", "vertical"],
    },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    locale: {
      control: "inline-radio",
      options: ["en-US", "pt-BR", "es-ES", "fr-FR"],
    },
  },
} satisfies Meta<typeof HowItWorks>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    steps,
    title: "How it works",
    description: "Three simple steps to get started.",
  },
}

export const WithIcons: Story = { args: { steps, variant: "icon" } }

export const Vertical: Story = { args: { steps, orientation: "vertical" } }

export const AllSizes: Story = {
  args: { steps },
  render: () => (
    <div className="flex flex-col gap-8">
      <HowItWorks steps={steps} size="sm" title="Small" />
      <HowItWorks steps={steps} size="md" title="Medium" />
      <HowItWorks steps={steps} size="lg" title="Large" />
    </div>
  ),
}

export const Loading: Story = { args: { steps, loading: true } }
