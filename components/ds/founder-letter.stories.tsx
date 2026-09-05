import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, within } from "storybook/test"
import { FounderLetter } from "./founder-letter"

const meta: Meta<typeof FounderLetter> = {
  title: "About/FounderLetter",
  component: FounderLetter,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    title: "Uma carta à nossa comunidade acadêmica e técnica",
    paragraphs: [
      "Quando fundamos o laboratório, tínhamos uma certeza primordial: a de que interfaces públicas e sistemas computacionais devem ser projetados com a mesma elegância matemática e precisão técnica dispensadas à pesquisa científica fundamental.",
      "Hoje, nosso design system é a síntese viva desse propósito. Ele reflete dezenas de iterações, diálogos contínuos com pesquisadores, estudantes e a sociedade, estabelecendo um ecossistema digital inclusivo, acessível e esteticamente refinado.",
      "Seguimos dedicados a expandir essas fronteiras com integridade e paixão contínua pela excelência.",
    ],
    authorName: "Prof. Dr. Hilton Filho",
    authorRole: "Coordenador Geral e Pesquisador Chefe",
    authorAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
    authorSignature:
      "https://upload.wikimedia.org/wikipedia/commons/e/ea/John_Hancock_signature.svg",
    withDropCap: true,
    variant: "default",
  },
}

export default meta
type Story = StoryObj<typeof FounderLetter>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Prof. Dr. Hilton Filho")).toBeInTheDocument()
    await expect(
      canvas.getByText(/Uma carta à nossa comunidade/i)
    ).toBeInTheDocument()
  },
}

export const WithoutDropCap: Story = {
  args: {
    withDropCap: false,
  },
}

export const Elevated: Story = {
  args: {
    variant: "elevated",
  },
}
