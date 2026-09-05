import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { VideoDialog } from "./video-dialog"

const meta = {
  title: "Media/VideoDialog",
  component: VideoDialog,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "minimal", "glow"],
    },
    aspectRatio: {
      control: "select",
      options: ["16/9", "4/3", "1/1", "21/9"],
    },
    locale: {
      control: "select",
      options: ["pt-BR", "en-US", "es-ES", "fr-FR"],
    },
  },
} satisfies Meta<typeof VideoDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: "Apresentação do LEMA Design System",
    thumbnailSrc:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
    thumbnailAlt: "Thumbnail com formas abstratas elegantes",
    videoSrc: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    variant: "default",
    aspectRatio: "16/9",
    locale: "pt-BR",
  },
  render: (args) => (
    <div className="mx-auto max-w-2xl py-6">
      <VideoDialog {...args} />
    </div>
  ),
}

export const GlowVariant: Story = {
  args: {
    title: "Visão Geral da Arquitetura de Componentes",
    thumbnailSrc:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80",
    videoSrc: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    variant: "glow",
    aspectRatio: "16/9",
  },
  render: (args) => (
    <div className="mx-auto max-w-2xl py-8">
      <VideoDialog {...args} />
    </div>
  ),
}

export const MinimalVariant: Story = {
  args: {
    title: "Demo rápida de 30 segundos",
    thumbnailSrc:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80",
    videoSrc: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    variant: "minimal",
    aspectRatio: "16/9",
  },
  render: (args) => (
    <div className="mx-auto max-w-2xl py-6">
      <VideoDialog {...args} />
    </div>
  ),
}
