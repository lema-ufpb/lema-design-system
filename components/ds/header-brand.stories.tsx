import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BoxIcon } from "lucide-react"
import { HeaderBrand } from "./header-brand"

const meta = {
  title: "Blocks/HeaderBrand",
  component: HeaderBrand,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    loading: { control: "boolean" },
    title: { control: "text" },
    subtitle: { control: "text" },
  },
} satisfies Meta<typeof HeaderBrand>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { title: "LEMA", subtitle: "UFPB", logo: <BoxIcon /> },
}

export const AllSizes: Story = {
  args: { title: "LEMA", subtitle: "UFPB", logo: <BoxIcon /> },
  render: () => (
    <div className="flex flex-col gap-4">
      {(["sm", "md", "lg"] as const).map((s) => (
        <HeaderBrand
          key={s}
          title="LEMA"
          subtitle="UFPB"
          size={s}
          logo={<BoxIcon />}
        />
      ))}
    </div>
  ),
}

export const WithLogoSrc: Story = {
  args: {
    title: "LEMA",
    logoSrc: "https://picsum.photos/80/80",
    logoAlt: "LEMA logo",
  },
}

export const Loading: Story = {
  args: { title: "LEMA", subtitle: "Subtitle", loading: true },
  render: () => (
    <div className="flex flex-col gap-4">
      {(["sm", "md", "lg"] as const).map((s) => (
        <HeaderBrand
          key={s}
          title="LEMA"
          subtitle="Subtitle"
          size={s}
          loading
        />
      ))}
    </div>
  ),
}

export const LongTitle: Story = {
  args: {
    title: "Laboratório de Engenharia e Mídias Avançadas da UFPB",
    subtitle: "Universidade Federal da Paraíba",
    logo: <BoxIcon />,
  },
  render: (args) => (
    <div className="max-w-[260px] border p-4">
      <HeaderBrand {...args} />
    </div>
  ),
}
