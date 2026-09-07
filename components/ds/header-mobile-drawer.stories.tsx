import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BoxIcon } from "lucide-react"
import { HeaderMobileDrawer } from "./header-mobile-drawer"
import { HeaderBrand } from "./header-brand"

const items = [
  { label: "Home", href: "#" },
  {
    label: "Products",
    href: "#",
    children: [
      { label: "Analytics", href: "#", description: "Insights" },
      { label: "Reports", href: "#", description: "Exportable" },
    ],
  },
  { label: "Pricing", href: "#", badge: "New" },
]

const meta = {
  title: "Header/HeaderMobileDrawer",
  component: HeaderMobileDrawer,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A HeaderMobileDrawer component for the LEMA Design System.",
          "Supports i18n.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `items` | `HeaderNavItem[]` | — | - |",
          "| `actions` | `HeaderActionItem[]` | — | - |",
          "| `brand` | `React.ReactNode` | — | - |",
          "| `open` | `boolean` | — | - |",
          "| `onOpenChange` | `(open: boolean) => void` | — | - |",
          "| `locale` | `UILocale` | — | - |",
          '| `side` | `"left" \| "right"` | — | - |',
          "| `className` | `string` | — | - |",
          "| `onNavigate` | `(item: HeaderNavItem) => void` | — | - |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    side: { control: "inline-radio", options: ["left", "right"] },
    locale: {
      control: "inline-radio",
      options: ["en-US", "pt-BR", "es-ES", "fr-FR"],
    },
  },
} satisfies Meta<typeof HeaderMobileDrawer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items,
    actions: [
      { label: "Log in", variant: "ghost" },
      { label: "Get started", variant: "default" },
    ],
    brand: <HeaderBrand title="LEMA" logo={<BoxIcon />} />,
  },
}

export const WithBrandAndActions: Story = {
  args: {
    items,
    brand: (
      <HeaderBrand
        title="LEMA UFPB"
        subtitle="Design System"
        logo={<BoxIcon />}
      />
    ),
    actions: [{ label: "Contact sales", variant: "outline" }],
  },
}
