import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { TracingBeam, TracingBeamItem } from "./tracing-beam"

const meta: Meta<typeof TracingBeam> = {
  title: "Effects/TracingBeam",
  component: TracingBeam,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj<typeof TracingBeam>

export const Default: Story = {
  render: () => (
    <div className="py-10">
      <TracingBeam>
        <TracingBeamItem>
          <h3 className="text-base font-semibold">React</h3>
          <p className="text-sm text-muted-foreground">
            Minim proident non nisi velit non consectetur. Esse adipisicing
            laboris consectetur enim ipsum.
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800"
            alt="Paisagem"
            className="rounded-lg"
          />
        </TracingBeamItem>
        <TracingBeamItem>
          <h3 className="text-base font-semibold">Changelog</h3>
          <p className="text-sm text-muted-foreground">
            Ex irure dolore veniam ex velit non aute nisi labore ipsum occaecat
            deserunt cupidatat.
          </p>
        </TracingBeamItem>
        <TracingBeamItem>
          <h3 className="text-base font-semibold">Launch Week</h3>
          <p className="text-sm text-muted-foreground">
            In dolore veniam excepteur eu est et sunt velit. Ipsum sint esse
            veniam fugiat.
          </p>
        </TracingBeamItem>
      </TracingBeam>
    </div>
  ),
}

export const WithoutInset: Story = {
  args: { inset: false },
  render: (args) => (
    <TracingBeam {...args}>
      <TracingBeamItem>
        <h3 className="text-sm font-semibold">Item 1</h3>
        <p className="text-sm text-muted-foreground">
          Conteúdo com inset false — sem padding lateral.
        </p>
      </TracingBeamItem>
      <TracingBeamItem>
        <h3 className="text-sm font-semibold">Item 2</h3>
        <p className="text-sm text-muted-foreground">
          Segundo bloco para testar progresso.
        </p>
      </TracingBeamItem>
    </TracingBeam>
  ),
}
