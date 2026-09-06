import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Header, HeaderContainer } from "./header"
import { HeaderBrand } from "./header-brand"
import { HeaderNav } from "./header-nav"
import { HeaderActions } from "./header-actions"

const nav = [
  { label: "Home", href: "#", active: true },
  { label: "Products", href: "#" },
  { label: "Docs", href: "#" },
  { label: "Pricing", href: "#" },
]

const meta = {
  title: "Blocks/Header",
  component: Header,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "blurred", "transparent", "solid"],
    },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    sticky: { control: "boolean" },
    bordered: { control: "boolean" },
    locale: {
      control: "inline-radio",
      options: ["en-US", "pt-BR", "es-ES", "fr-FR"],
    },
  },
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Header {...args} variant="default" size="md">
      <HeaderContainer>
        <HeaderBrand title="LEMA" subtitle="UFPB" />
        <HeaderNav items={nav} className="hidden md:flex" />
        <HeaderActions
          actions={[
            { label: "Login", variant: "ghost" },
            { label: "Get started", variant: "default" },
          ]}
        />
      </HeaderContainer>
    </Header>
  ),
}

export const AllVariants: Story = {
  parameters: { a11y: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-4 p-4">
      {(["default", "blurred", "solid"] as const).map((v, idx) => (
        <div key={v}>
          <Header
            variant={v}
            size="md"
            role={idx === 0 ? "banner" : "region"}
            aria-label={idx === 0 ? undefined : `Header variant ${v}`}
          >
            <HeaderContainer>
              <HeaderBrand title="LEMA" />
              <span className="text-xs text-muted-foreground">{v}</span>
            </HeaderContainer>
          </Header>
        </div>
      ))}
      <div className="bg-slate-900 p-4">
        <Header
          variant="transparent"
          size="md"
          className="border-white/20"
          role="region"
          aria-label="Header variant transparent"
        >
          <HeaderContainer>
            <HeaderBrand title="LEMA" className="[&_span]:text-white" />
            <span className="text-xs text-white/70">transparent over hero</span>
          </HeaderContainer>
        </Header>
      </div>
    </div>
  ),
}

export const AllSizes: Story = {
  parameters: { a11y: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-4 p-4">
      {(["sm", "md", "lg"] as const).map((s, idx) => (
        <div key={s}>
          <Header
            size={s}
            role={idx === 0 ? "banner" : "region"}
            aria-label={idx === 0 ? undefined : `Header size ${s}`}
          >
            <HeaderContainer size={s}>
              <HeaderBrand title="LEMA" size={s} />
              <HeaderNav items={nav} size={s} className="hidden md:flex" />
            </HeaderContainer>
          </Header>
        </div>
      ))}
    </div>
  ),
}

export const Sticky: Story = {
  render: () => (
    <div className="h-[300px] overflow-auto border">
      <Header sticky size="md">
        <HeaderContainer>
          <HeaderBrand title="LEMA" />
          <span className="text-xs text-muted-foreground">sticky top-0</span>
        </HeaderContainer>
      </Header>
      <div className="h-[600px] bg-muted/30 p-6 text-sm text-muted-foreground">
        Scroll content
      </div>
    </div>
  ),
}
