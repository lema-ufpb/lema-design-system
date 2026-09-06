import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, within } from "storybook/test"
import { AboutSplitStory } from "./about-split-story"

const meta: Meta<typeof AboutSplitStory> = {
  title: "Blocks/AboutSplitStory",
  component: AboutSplitStory,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    badge: "Nossa História",
    title: "Pesquisa aplicada, rigor estatístico e design de impacto",
    description:
      "Nascido na Universidade Federal da Paraíba, o LEMA une métodos de estatística avançada e engenharia de software para desenvolver soluções que aproximam a academia das necessidades reais da sociedade civil.",
    imageSrc:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&auto=format&fit=crop&q=80",
    imageAlt: "Equipe trabalhando em conjunto no laboratório",
    floatingBadgeText: "+100 Projetos Entregues",
    primaryAction: {
      label: "Conheça nossos projetos",
      href: "#",
    },
    secondaryAction: {
      label: "Ver publicações",
      href: "#",
    },
    reverse: false,
    locale: "pt-BR",
  },
}

export default meta
type Story = StoryObj<typeof AboutSplitStory>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Nossa História")).toBeInTheDocument()
    await expect(
      canvas.getByText(/Pesquisa aplicada, rigor estatístico/i)
    ).toBeInTheDocument()
    await expect(
      canvas.getByText("+100 Projetos Entregues")
    ).toBeInTheDocument()
  },
}

export const Reversed: Story = {
  args: {
    reverse: true,
  },
}

export const Locales: Story = {
  args: {
    locale: "en-US",
    badge: "Our Story",
    title: "Applied research, statistical rigor and impactful design",
    description:
      "Born at the Federal University of Paraíba, LEMA combines advanced statistics with software engineering to deliver open, reliable digital experiences.",
    primaryAction: {
      label: "Explore projects",
      href: "#",
    },
    secondaryAction: {
      label: "Read publications",
      href: "#",
    },
  },
}
