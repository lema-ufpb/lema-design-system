import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, within, userEvent } from "storybook/test"
import {
  GalleryVerticalEndIcon,
  AudioWaveformIcon,
  CommandIcon,
} from "lucide-react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { TeamSwitcher } from "./team-switcher"

const meta: Meta<typeof TeamSwitcher> = {
  title: "Navigation/TeamSwitcher",
  component: TeamSwitcher,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <SidebarProvider>
        <div className="w-64 border bg-sidebar p-2">
          <Story />
        </div>
      </SidebarProvider>
    ),
  ],
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof TeamSwitcher>

const teams = [
  { name: "Acme Inc", logo: GalleryVerticalEndIcon, plan: "Enterprise" },
  { name: "Acme Corp.", logo: AudioWaveformIcon, plan: "Startup" },
  { name: "Evil Corp.", logo: CommandIcon, plan: "Free" },
]

export const Default: Story = {
  args: { teams },
}

export const Loading: Story = {
  args: { teams, loading: true },
}

export const AllLocales: Story = {
  parameters: { a11y: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-4">
      {(["pt-BR", "en-US", "es-ES", "fr-FR"] as const).map((locale) => (
        <SidebarProvider key={locale}>
          <div className="w-64 border bg-sidebar p-2">
            <TeamSwitcher teams={teams} locale={locale} />
            <span className="mt-1 block text-xs text-muted-foreground">
              {locale}
            </span>
          </div>
        </SidebarProvider>
      ))}
    </div>
  ),
}

export const Interaction: Story = {
  args: { teams },
  parameters: { a11y: { disable: true } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const btn = canvas.getByRole("button")
    await expect(btn).toBeInTheDocument()
    await userEvent.click(btn)
    const menu = await within(document.body).findByText("Acme Corp.")
    await expect(menu).toBeInTheDocument()
  },
}
