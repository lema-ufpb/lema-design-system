import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BoxIcon } from "lucide-react"
import { HeaderSimple } from "./header-simple"

const brand = { title: "LEMA", subtitle: "UFPB", logo: <BoxIcon /> }
const navItems = [
  { label: "Home", href: "#", active: true },
  {
    label: "Products",
    href: "#",
    children: [
      { label: "Analytics", href: "#", description: "Real-time insights" },
      { label: "Reports", href: "#", description: "Exportable reports" },
    ],
  },
  { label: "Docs", href: "#" },
  { label: "Pricing", href: "#", badge: "New" },
]
const actions = [
  { label: "Log in", variant: "ghost" as const },
  { label: "Get started", variant: "default" as const },
]

const meta = {
  title: "Header/HeaderSimple",
  component: HeaderSimple,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A HeaderSimple component for the LEMA Design System.",
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
          "| `actions` | `HeaderActionItem[]` | — | - |",
          "| `showSearch` | `boolean` | — | - |",
          "| `onSearch` | `(value: string) => void` | — | - |",
          "| `searchPlaceholder` | `string` | — | - |",
          "| `locale` | `UILocale` | — | - |",
          "| `loading` | `boolean` | — | - |",
          "| `sticky` | `boolean` | — | - |",
          '| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Variant |',
        ].join("\n"),
      },
    },
    layout: "fullscreen",
  },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    variant: {
      control: "select",
      options: ["default", "blurred", "transparent", "solid"],
    },
    locale: {
      control: "inline-radio",
      options: ["en-US", "pt-BR", "es-ES", "fr-FR"],
    },
    loading: { control: "boolean" },
    showSearch: { control: "boolean" },
  },
} satisfies Meta<typeof HeaderSimple>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { brand, navItems, actions, size: "md" } }

export const WithSearch: Story = {
  args: {
    brand,
    navItems,
    actions,
    showSearch: true,
    searchPlaceholder: "Search docs...",
    size: "md",
  },
}

export const AllSizes: Story = {
  args: { brand, navItems, actions },
  parameters: { a11y: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-4">
      {(["sm", "md", "lg"] as const).map((s, idx) => (
        <div key={s}>
          <HeaderSimple
            brand={brand}
            navItems={navItems}
            actions={actions}
            size={s}
            role={idx === 0 ? "banner" : "region"}
            aria-label={idx === 0 ? undefined : `HeaderSimple size ${s}`}
          />
        </div>
      ))}
    </div>
  ),
}

export const Loading: Story = {
  args: { brand, navItems, actions, loading: true },
}

export const Locales: Story = {
  args: { brand, navItems, actions },
  parameters: { a11y: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-4">
      {(["en-US", "pt-BR", "es-ES", "fr-FR"] as const).map((l, idx) => (
        <div key={l}>
          <HeaderSimple
            brand={brand}
            navItems={navItems}
            actions={actions}
            locale={l}
            role={idx === 0 ? "banner" : "region"}
            aria-label={idx === 0 ? undefined : `HeaderSimple locale ${l}`}
          />
        </div>
      ))}
    </div>
  ),
}
