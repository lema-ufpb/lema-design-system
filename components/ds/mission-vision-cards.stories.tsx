import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, within } from "storybook/test"
import { MissionVisionCards } from "./mission-vision-cards"

const meta: Meta<typeof MissionVisionCards> = {
  title: "About/MissionVisionCards",
  component: MissionVisionCards,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    locale: "pt-BR",
  },
}

export default meta
type Story = StoryObj<typeof MissionVisionCards>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Nossa Missão")).toBeInTheDocument()
    await expect(canvas.getByText("Nossa Visão")).toBeInTheDocument()
  },
}

export const CustomContent: Story = {
  args: {
    missionTitle: "Nossa Missão",
    missionText:
      "Desenvolver software público de alto impacto e promover a formação de recursos humanos qualificados.",
    visionTitle: "Nossa Visão de Futuro",
    visionText:
      "Ser referência nacional em design systems e modelagem estatística aplicada até 2030.",
  },
}

export const Locales: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-2 text-xs font-bold tracking-wider text-muted-foreground uppercase">
          English (en-US)
        </p>
        <MissionVisionCards locale="en-US" />
      </div>
      <div>
        <p className="mb-2 text-xs font-bold tracking-wider text-muted-foreground uppercase">
          Español (es-ES)
        </p>
        <MissionVisionCards locale="es-ES" />
      </div>
      <div>
        <p className="mb-2 text-xs font-bold tracking-wider text-muted-foreground uppercase">
          Français (fr-FR)
        </p>
        <MissionVisionCards locale="fr-FR" />
      </div>
    </div>
  ),
}
