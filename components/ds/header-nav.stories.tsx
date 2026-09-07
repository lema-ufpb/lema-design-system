import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BoxIcon, SparklesIcon } from "lucide-react"
import { HeaderNav } from "./header-nav"

const baseItems = [
  { label: "Home", href: "#", active: true },
  {
    label: "Products",
    href: "#",
    children: [
      {
        label: "Analytics",
        href: "#",
        description: "Real-time insights",
        icon: <BoxIcon />,
      },
      {
        label: "Reports",
        href: "#",
        description: "Exportable reports",
        icon: <SparklesIcon />,
      },
    ],
  },
  { label: "Docs", href: "#" },
  { label: "Pricing", href: "#", badge: "New" },
]

const meta = {
  title: "Header/HeaderNav",
  component: HeaderNav,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A HeaderNav component for the LEMA Design System.",
          "Supports loading state, skeleton, CVA variants.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `items` | `HeaderNavItem[]` | — | - |",
          "| `onNavigate` | `(item: HeaderNavItem) => void` | — | - |",
          "| `loading` | `boolean` | — | - |",
          "| `ariaLabel` | `string` | — | /** Accessible label for nav */ |",
          '| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Variant |',
        ].join("\n"),
      },
    },
  },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    loading: { control: "boolean" },
  },
} satisfies Meta<typeof HeaderNav>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { items: baseItems } }

export const ActiveState: Story = {
  args: { items: baseItems.map((i, idx) => ({ ...i, active: idx === 2 })) },
}

export const WithMegaContent: Story = {
  args: {
    items: [
      { label: "Home", href: "#" },
      {
        label: "Features",
        href: "#",
        content: (
          <div className="grid grid-cols-2 gap-2 p-2">
            <div className="rounded-lg bg-muted p-4 text-sm">
              Custom mega content
            </div>
            <div className="rounded-lg bg-muted p-4 text-sm">Promo card</div>
          </div>
        ),
      },
    ],
  },
}

export const Loading: Story = { args: { items: baseItems, loading: true } }

export const AllSizes: Story = {
  args: { items: baseItems },
  render: () => (
    <div className="flex flex-col gap-6">
      {(["sm", "md", "lg"] as const).map((s) => (
        <div key={s} className="flex flex-col gap-2">
          <span className="text-xs text-muted-foreground">{s}</span>
          <HeaderNav items={baseItems} size={s} />
        </div>
      ))}
    </div>
  ),
}
