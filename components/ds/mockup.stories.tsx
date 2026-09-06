import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Mockup } from "./mockup"
import { Screenshot } from "./screenshot"

const meta: Meta<typeof Mockup> = {
  title: "Media/Mockup",
  component: Mockup,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    frame: { control: "inline-radio", options: ["small", "large", "mobile"] },
    inset: { control: "boolean" },
  },
}

export default meta
type Story = StoryObj<typeof Mockup>

const Img = () => (
  <Screenshot
    src="https://picsum.photos/seed/mockup-light/800/500"
    srcDark="https://picsum.photos/seed/mockup-dark/800/500"
    alt="Dashboard"
    width={800}
    height={500}
    rounded="none"
    shadow="none"
  />
)

export const Small: Story = {
  args: { frame: "small", children: <Img /> },
  render: (args) => (
    <div className="w-[480px]">
      <Mockup {...args} />
    </div>
  ),
}

export const Large: Story = {
  args: { frame: "large", children: <Img /> },
  render: (args) => (
    <div className="w-[560px]">
      <Mockup {...args} />
    </div>
  ),
}

export const Mobile: Story = {
  args: { frame: "mobile" },
  render: (args) => (
    <Mockup {...args}>
      <Screenshot
        src="https://picsum.photos/seed/mobile-light2/400/800"
        srcDark="https://picsum.photos/seed/mobile-dark2/400/800"
        alt="Mobile"
        width={400}
        height={800}
        rounded="none"
        shadow="none"
      />
    </Mockup>
  ),
}

export const Inset: Story = {
  args: { frame: "large", inset: true, children: <Img /> },
  render: (args) => (
    <div className="w-[560px]">
      <Mockup {...args} />
    </div>
  ),
}

export const Loading: Story = {
  args: { loading: true },
}
