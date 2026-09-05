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
  title: "Navigation/HeaderSimple",
  component: HeaderSimple,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
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
  render: () => (
    <div className="flex flex-col gap-4">
      {(["sm", "md", "lg"] as const).map((s) => (
        <HeaderSimple
          key={s}
          brand={brand}
          navItems={navItems}
          actions={actions}
          size={s}
        />
      ))}
    </div>
  ),
}

export const Loading: Story = {
  args: { brand, navItems, actions, loading: true },
}

export const Locales: Story = {
  args: { brand, navItems, actions },
  render: () => (
    <div className="flex flex-col gap-4">
      {(["en-US", "pt-BR", "es-ES", "fr-FR"] as const).map((l) => (
        <HeaderSimple
          key={l}
          brand={brand}
          navItems={navItems}
          actions={actions}
          locale={l}
        />
      ))}
    </div>
  ),
}
