import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, within } from "storybook/test"

import {
  DSLink,
  DSLinkProvider,
  type DSLinkComponent,
  type DSLinkProps,
} from "./link-provider"

const meta = {
  title: "Utilities/LinkProvider",
  component: DSLinkProvider,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "Sets the **link component** used by the navigation `ds-*` components (`ds-header-*`, `ds-footer-menu`), so the design system stays independent of any router.",
          "",
          "Without a provider, links render a plain `<a>` and work in any React framework. To get client-side navigation, pass your router's link once:",
          "",
          "```tsx",
          "// Next.js",
          'import Link from "next/link"',
          "<DSLinkProvider link={Link}>{children}</DSLinkProvider>",
          "",
          "// React Router / TanStack Start",
          "<DSLinkProvider link={({ href, ...p }) => <RouterLink to={href} {...p} />}>",
          "  {children}",
          "</DSLinkProvider>",
          "```",
          "",
          "| Export | Description |",
          "| --- | --- |",
          "| `DSLinkProvider` | Provides the link component to the subtree; the nearest provider wins |",
          "| `DSLink` | Link used internally by `ds-*`; delegates to the provider (default `<a>`) |",
          "| `useDSLink()` | Returns the effective link component |",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof DSLinkProvider>

export default meta
type Story = StoryObj<typeof meta>

const Tagged: DSLinkComponent = ({ href, ...props }: DSLinkProps) => (
  <a href={href} data-router="custom" {...props} />
)

export const Default: Story = {
  args: { link: Tagged, children: null },
  render: () => (
    <DSLink href="/docs" data-testid="default-link">
      Plain anchor (no provider)
    </DSLink>
  ),
  play: async ({ canvasElement }) => {
    const link = within(canvasElement).getByTestId("default-link")
    await expect(link.tagName).toBe("A")
    await expect(link).toHaveAttribute("href", "/docs")
    await expect(link).not.toHaveAttribute("data-router")
  },
}

export const CustomLink: Story = {
  args: { link: Tagged, children: null },
  render: (args) => (
    <DSLinkProvider link={args.link}>
      <DSLink href="/docs" data-testid="custom-link">
        Rendered by the provider&apos;s link
      </DSLink>
    </DSLinkProvider>
  ),
  play: async ({ canvasElement }) => {
    const link = within(canvasElement).getByTestId("custom-link")
    await expect(link).toHaveAttribute("data-router", "custom")
  },
}

export const ClientSideNavigation: Story = {
  args: { link: Tagged, children: null },
  render: () => {
    const [path, setPath] = React.useState("/")
    const RouterLink: DSLinkComponent = ({ href, onClick, ...props }) => (
      <a
        href={href}
        onClick={(e) => {
          e.preventDefault()
          setPath(href)
          onClick?.(e)
        }}
        {...props}
      />
    )
    return (
      <DSLinkProvider link={RouterLink}>
        <div className="flex flex-col gap-2 text-sm">
          <DSLink href="/pricing">Go to pricing</DSLink>
          <span data-testid="path">Current path: {path}</span>
        </div>
      </DSLinkProvider>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByText("Go to pricing"))
    await expect(canvas.getByTestId("path")).toHaveTextContent("/pricing")
  },
}
