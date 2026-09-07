import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ArrowRightIcon, MailIcon } from "lucide-react"
import { HeaderActions } from "./header-actions"

const meta = {
  title: "Header/HeaderActions",
  component: HeaderActions,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A HeaderActions component for the LEMA Design System.",
          "Supports loading state, skeleton, CVA variants.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `actions` | `HeaderActionItem[]` | — | - |",
          "| `loading` | `boolean` | — | - |",
          '| `gap` | `"sm" \| "md" \| "lg"` | `"md"` | Variant |',
        ].join("\n"),
      },
    },
  },
  argTypes: {
    gap: { control: "inline-radio", options: ["sm", "md", "lg"] },
    loading: { control: "boolean" },
  },
} satisfies Meta<typeof HeaderActions>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    actions: [
      { label: "Log in", variant: "ghost" },
      { label: "Get started", variant: "default" },
    ],
  },
}

export const WithIcons: Story = {
  args: {
    actions: [
      { label: "Contact", variant: "outline", icon: <MailIcon /> },
      {
        label: "Start",
        variant: "default",
        icon: <ArrowRightIcon />,
        iconPosition: "end",
      },
    ],
  },
}

export const SingleAction: Story = {
  args: { actions: [{ label: "Sign up", variant: "default" }] },
}

export const Loading: Story = {
  args: { actions: [{ label: "A" }, { label: "B" }], loading: true },
}

export const Disabled: Story = {
  args: {
    actions: [
      { label: "Primary", variant: "default", disabled: true },
      { label: "Ghost", variant: "ghost" },
    ],
  },
}
