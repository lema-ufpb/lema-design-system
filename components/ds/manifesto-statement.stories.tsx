import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, within } from "storybook/test"
import { ManifestoStatement } from "./manifesto-statement"

const meta: Meta<typeof ManifestoStatement> = {
  title: "About/ManifestoStatement",
  component: ManifestoStatement,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    eyebrow: "Nosso Manifesto",
    statement:
      "Acreditamos que o design rigoroso e a ciência aberta são os maiores catalisadores de transformação humana.",
    author: "Laboratório de Estatística e Modelagem Aplicada (LEMA)",
    size: "default",
    align: "left",
  },
}

export default meta
type Story = StoryObj<typeof ManifestoStatement>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Nosso Manifesto")).toBeInTheDocument()
    await expect(
      canvas.getByText(/Acreditamos que o design rigoroso/i)
    ).toBeInTheDocument()
  },
}

export const Centered: Story = {
  args: {
    align: "center",
    size: "lg",
    statement: (
      <>
        A tecnologia deve servir à{" "}
        <span className="text-primary">clareza cognitiva</span> e ao bem
        público, sem ruídos desnecessários.
      </>
    ),
  },
}

export const Large: Story = {
  args: {
    align: "center",
    size: "xl",
    statement: "Construindo o futuro com rigor acadêmico e impacto real.",
    author: "Diretoria Colegiada",
  },
}
