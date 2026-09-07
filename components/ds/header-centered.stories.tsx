import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BoxIcon } from "lucide-react"
import { HeaderCentered } from "./header-centered"

const brand = { title: "LEMA", subtitle: "UFPB", logo: <BoxIcon /> }
const nav = [
  {
    label: "Shop",
    href: "#",
    children: [
      { label: "Men", href: "#" },
      { label: "Women", href: "#" },
    ],
  },
  { label: "Collections", href: "#" },
  { label: "About", href: "#" },
]

const meta = {
  title: "Header/HeaderCentered",
  component: HeaderCentered,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A HeaderCentered component for the LEMA Design System.",
          "Supports loading state, i18n support, CVA variants.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `brand` | `HeaderBrandProps` | — | - |",
          "| `navItems` | `HeaderNavItem[]` | — | - |",
          "| `leftActions` | `HeaderActionItem[]` | — | - |",
          "| `rightActions` | `HeaderActionItem[]` | — | - |",
          "| `locale` | `UILocale` | — | - |",
          "| `loading` | `boolean` | — | - |",
          "| `sticky` | `boolean` | — | - |",
          '| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Variant |',
        ].join("\n"),
      },
    },
    layout: "fullscreen",
  },
} satisfies Meta<typeof HeaderCentered>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    brand,
    navItems: nav,
    rightActions: [{ label: "Cart (0)", variant: "outline" as const }],
  },
}

export const WithSplitActions: Story = {
  args: {
    brand,
    navItems: nav,
    leftActions: [{ label: "Search", variant: "ghost" as const }],
    rightActions: [
      { label: "Sign in", variant: "ghost" as const },
      { label: "Cart", variant: "default" as const },
    ],
  },
}

export const Loading: Story = { args: { brand, navItems: nav, loading: true } }
