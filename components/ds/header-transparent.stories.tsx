import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BoxIcon } from "lucide-react"
import { HeaderTransparent } from "./header-transparent"

const brand = { title: "LEMA", logo: <BoxIcon /> }
const nav = [
  { label: "Home", href: "#" },
  { label: "Features", href: "#" },
  { label: "Contact", href: "#" },
]

const meta = {
  title: "Header/HeaderTransparent",
  component: HeaderTransparent,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A HeaderTransparent component for the LEMA Design System.",
          "Supports loading state, i18n support.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `brand` | `HeaderBrandProps` | — | - |",
          "| `navItems` | `HeaderNavItem[]` | — | - |",
          "| `actions` | `HeaderActionItem[]` | — | - |",
          "| `threshold` | `number` | — | - |",
          '| `size` | `"sm" \| "md" \| "lg"` | — | - |',
          "| `sticky` | `boolean` | — | - |",
          "| `locale` | `UILocale` | — | - |",
          "| `loading` | `boolean` | — | - |",
        ].join("\n"),
      },
    },
    layout: "fullscreen",
  },
} satisfies Meta<typeof HeaderTransparent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    brand,
    navItems: nav,
    actions: [{ label: "Get started", variant: "default" as const }],
  },
  decorators: [
    (Story) => (
      <div>
        <div className="relative bg-slate-900">
          <Story />
          <div className="flex h-80 items-center justify-center p-8 text-center">
            <div className="max-w-lg">
              <h1 className="text-3xl font-bold text-white">
                Hero overlay — header is transparent
              </h1>
              <p className="mt-2 text-white/70">
                Scroll down to see it turn blurred with shadow.
              </p>
            </div>
          </div>
        </div>
        <div className="h-[800px] bg-muted/30 p-8 text-sm text-muted-foreground">
          Scroll content — header becomes blurred after {`8px`}
        </div>
      </div>
    ),
  ],
}

export const InHero: Story = {
  args: {
    brand,
    navItems: nav,
    threshold: 0,
    actions: [{ label: "Sign in", variant: "ghost" as const }],
  },
  decorators: [
    (Story) => (
      <div className="bg-gradient-to-br from-violet-600 to-indigo-800">
        <Story />
        <div className="h-64" />
      </div>
    ),
  ],
}
