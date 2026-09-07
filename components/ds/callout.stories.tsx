import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Callout } from "./callout"
import { RocketIcon } from "lucide-react"

const meta = {
  title: "Data Display/Callout",
  component: Callout,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: [
          "An alert component with semantic variants for callouts.",
          "Supports CVA variants.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `title` | `string` | — | - |",
          "| `icon` | `React.ReactNode` | — | - |",
          '| `variant` | `"default" \| "info" \| "success" \| "warning" \| "destructive"` | `"default"` | Variant |',
        ].join("\n"),
      },
    },
  },
  args: {
    title: "Update Available",
    children: "A new version of the application is available for download.",
    variant: "default",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "info", "success", "warning", "destructive"],
    },
  },
} satisfies Meta<typeof Callout>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const Info: Story = {
  args: {
    variant: "info",
    title: "Did you know?",
    children: "You can use keyboard shortcuts to navigate faster.",
  },
}

export const Success: Story = {
  args: {
    variant: "success",
    title: "Payment successful",
    children: "Your subscription has been renewed for another year.",
  },
}

export const Warning: Story = {
  args: {
    variant: "warning",
    title: "Storage almost full",
    children: "You have used 90% of your allocated storage space.",
  },
}

export const Destructive: Story = {
  args: {
    variant: "destructive",
    title: "Error connecting to server",
    children: "Please check your internet connection and try again.",
  },
}

export const CustomIcon: Story = {
  args: {
    variant: "info",
    title: "New Feature",
    icon: <RocketIcon className="size-4" />,
    children: "We just launched our new API dashboard.",
  },
}
