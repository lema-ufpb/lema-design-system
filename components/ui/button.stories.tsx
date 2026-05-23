import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"
import { Button } from "./button"

const meta = {
  component: Button,
  tags: ["autodocs", "a11y"],
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: "Button" },
}

export const Outline: Story = {
  args: { children: "Outline", variant: "outline" },
}

export const Secondary: Story = {
  args: { children: "Secondary", variant: "secondary" },
}

export const Ghost: Story = {
  args: { children: "Ghost", variant: "ghost" },
}

export const Destructive: Story = {
  args: { children: "Destructive", variant: "destructive" },
}

export const Link: Story = {
  args: { children: "Link", variant: "link" },
}

export const SizeXs: Story = {
  args: { children: "XS", size: "xs" },
}

export const SizeSm: Story = {
  args: { children: "Small", size: "sm" },
}

export const SizeLg: Story = {
  args: { children: "Large", size: "lg" },
}

export const SizeIcon: Story = {
  args: { children: "★", size: "icon", "aria-label": "Star" },
}

export const AsChild: Story = {
  args: { children: <a href="/">Link as Button</a>, asChild: true },
}

export const CssCheck: Story = {
  args: { children: "Css Check" },
  play: async ({ canvas }) => {
    const button = canvas.getByRole("button", { name: /css check/i })
    await expect(button).toBeInTheDocument()
    await expect(getComputedStyle(button).fontSize).toBe("14px")
  },
}
