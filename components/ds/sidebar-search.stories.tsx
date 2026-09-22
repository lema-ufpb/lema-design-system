import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, within } from "storybook/test"
import { SidebarProvider } from "@/components/ui/sidebar"
import { SidebarSearch } from "./sidebar-search"

const meta: Meta<typeof SidebarSearch> = {
  title: "Navigation/SidebarSearch",
  component: SidebarSearch,
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
    docs: {
      description: {
        component: [
          "A SidebarSearch component for the LEMA Design System.",
          "Supports loading state, skeleton, i18n support.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `placeholder` | `string` | — | - |",
          "| `defaultValue` | `string` | — | - |",
          "| `onSearch` | `(value: string) => void` | — | - |",
          "| `onSubmit` | `(e: React.FormEvent<HTMLFormElement>) => void` | — | - |",
          "| `locale` | `UILocale` | — | - |",
          "| `loading` | `boolean` | — | - |",
          '| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Variant |',
        ].join("\n"),
      },
    },
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof SidebarSearch>

export const Default: Story = {
  args: {},
}

export const Loading: Story = {
  args: { loading: true },
}

export const AllLocales: Story = {
  parameters: { a11y: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-2">
      {(["en-US", "pt-BR", "es-ES", "fr-FR"] as const).map((locale) => (
        <SidebarProvider key={locale}>
          <div className="w-64 border bg-sidebar p-2">
            <SidebarSearch locale={locale} />
            <span className="mt-1 block text-xs text-muted-foreground">
              {locale}
            </span>
          </div>
        </SidebarProvider>
      ))}
    </div>
  ),
}

export const A11y: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("search")).toBeInTheDocument()
    const inputs = canvas.getAllByLabelText(/Search|Buscar|Rechercher/i)
    await expect(inputs[0]).toBeInTheDocument()
  },
}
