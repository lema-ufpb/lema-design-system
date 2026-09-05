import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, within } from "storybook/test"
import { CultureGallery } from "./culture-gallery"

const sampleItems = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80",
    alt: "Equipe reunida em sessão de ideação e design",
    caption: "Sessão de design colaborativo no LEMA",
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&auto=format&fit=crop&q=80",
    alt: "Pesquisadora programando no laboratório",
    caption: "Desenvolvimento e modelagem estatística",
  },
  {
    id: "3",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=80",
    alt: "Apresentação de resultados científicos no auditório",
    caption: "Apresentação para a comunidade universitária",
  },
  {
    id: "4",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&auto=format&fit=crop&q=80",
    alt: "Oficina prática com estudantes de graduação",
    caption: "Mentoria e formação de novos pesquisadores",
  },
]

const meta: Meta<typeof CultureGallery> = {
  title: "About/CultureGallery",
  component: CultureGallery,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  args: {
    items: sampleItems,
    layout: "mosaic",
  },
}

export default meta
type Story = StoryObj<typeof CultureGallery>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(
      canvas.getByAltText("Equipe reunida em sessão de ideação e design")
    ).toBeInTheDocument()
  },
}

export const GridLayout: Story = {
  args: {
    layout: "grid",
  },
}
