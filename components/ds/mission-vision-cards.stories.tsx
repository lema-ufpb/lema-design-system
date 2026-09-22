import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, within } from "storybook/test"
import { MissionVisionCards } from "./mission-vision-cards"

const meta: Meta<typeof MissionVisionCards> = {
  title: "About/MissionVisionCards",
  component: MissionVisionCards,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A MissionVisionCards component for the LEMA Design System.",
          "Supports i18n and CVA variants.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `missionTitle` | `string` | — | - |",
          "| `missionText` | `string` | — | - |",
          "| `visionTitle` | `string` | — | - |",
          "| `visionText` | `string` | — | - |",
          "| `locale` | `UILocale` | — | - |",
          '| `variant` | `"default" \| "elevated"` | `"default"` | Variant |',
        ].join("\n"),
      },
    },
    layout: "centered",
  },
  args: {
    locale: "en-US",
  },
}

export default meta
type Story = StoryObj<typeof MissionVisionCards>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Our Mission")).toBeInTheDocument()
    await expect(canvas.getByText("Our Vision")).toBeInTheDocument()
  },
}

export const CustomContent: Story = {
  args: {
    missionTitle: "Our Mission",
    missionText:
      "Develop high-impact public software and promote the training of qualified human resources.",
    visionTitle: "Our Vision for the Future",
    visionText:
      "To be a national reference in design systems and applied statistical modeling by 2030.",
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
