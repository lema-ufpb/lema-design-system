import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BoxIcon, LayersIcon, SparklesIcon, BarChart3Icon } from "lucide-react"
import { HeaderMega } from "./header-mega"

const brand = { title: "LEMA", logo: <BoxIcon /> }
const nav = [
  {
    label: "Platform",
    href: "#",
    children: [
      {
        label: "Analytics",
        href: "#",
        description: "Real-time dashboards",
        icon: <BarChart3Icon />,
      },
      {
        label: "Automation",
        href: "#",
        description: "Workflows & triggers",
        icon: <SparklesIcon />,
      },
      {
        label: "Integrations",
        href: "#",
        description: "Connect 200+ apps",
        icon: <LayersIcon />,
      },
      {
        label: "API",
        href: "#",
        description: "Build on our platform",
        icon: <BoxIcon />,
      },
    ],
  },
  { label: "Solutions", href: "#" },
  { label: "Resources", href: "#" },
]

const meta = {
  title: "Blocks/HeaderMega",
  component: HeaderMega,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof HeaderMega>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    brand,
    navItems: nav,
    actions: [{ label: "Book demo", variant: "default" as const }],
    feature: {
      title: "New: AI Analytics",
      description:
        "Ask questions in natural language and get instant visualizations.",
      imageSrc: "https://picsum.photos/400/200",
      ctaLabel: "Learn more",
      href: "#",
    },
  },
}

export const WithoutFeature: Story = {
  args: {
    brand,
    navItems: nav,
    actions: [{ label: "Sign in", variant: "ghost" as const }],
  },
}

export const Loading: Story = { args: { brand, navItems: nav, loading: true } }
