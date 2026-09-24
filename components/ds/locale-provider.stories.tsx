import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, within } from "storybook/test"

import { Badge } from "@/components/ds/badge"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ds/spinner"
import type { UILocale } from "@/lib/ui-i18n"

import {
  DEFAULT_UI_LOCALE,
  UILocaleProvider,
  useUILocale,
} from "./locale-provider"

const meta = {
  title: "Utilities/LocaleProvider",
  component: UILocaleProvider,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "Context provider that sets the default `locale` for every `ds-*` component in its subtree, so an app can declare its language **once** instead of passing `locale` to each component.",
          "",
          "## Precedence",
          "",
          "1. The component's own `locale` prop",
          "2. The nearest `UILocaleProvider`",
          '3. `DEFAULT_UI_LOCALE` (`"en-US"`) — identical to the previous behaviour when there is no provider',
          "",
          "## Usage",
          "",
          "```tsx",
          '<UILocaleProvider locale="pt-BR">{children}</UILocaleProvider>',
          "```",
          "",
          "## Exports",
          "",
          "| Export | Description |",
          "| --- | --- |",
          "| `UILocaleProvider` | Provides `locale` to the subtree; the nearest provider wins |",
          '| `useUILocale(prop?)` | Effective locale: `prop ?? provider ?? "en-US"` |',
          "| `useOptionalUILocale(prop?)` | Like `useUILocale`, but `undefined` when neither prop nor provider is set (for components where an absent locale has its own meaning) |",
          '| `DEFAULT_UI_LOCALE` | `"en-US"` |',
          "",
          '> Components without `"use client"` (`ds-pagination`, `ds-footer-*`, `ds-about-*`, `ds-mission-vision-cards`, `ds-system-status-badge`) cannot read React context in Server Components and keep the `locale` prop only.',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof UILocaleProvider>

export default meta
type Story = StoryObj<typeof meta>

const label = "Loading"

function Sample({ locale }: { locale?: UILocale }) {
  const resolved = useUILocale(locale)
  return (
    <div className="flex items-center gap-3">
      <Spinner locale={locale} />
      <Badge locale={locale} removable onRemove={() => {}}>
        {resolved}
      </Badge>
    </div>
  )
}

export const Default: Story = {
  args: { locale: "en-US", children: null },
  render: () => <Sample />,
  parameters: {
    docs: {
      description: {
        story: `Without a provider the components fall back to \`${DEFAULT_UI_LOCALE}\`.`,
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByLabelText("Loading")).toBeInTheDocument()
    await expect(canvas.getByText(DEFAULT_UI_LOCALE)).toBeInTheDocument()
  },
}

export const PortugueseProvider: Story = {
  args: { locale: "pt-BR", children: null },
  render: (args) => (
    <UILocaleProvider locale={args.locale}>
      <Sample />
    </UILocaleProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByLabelText("Carregando")).toBeInTheDocument()
    await expect(canvas.getByText("pt-BR")).toBeInTheDocument()
    await expect(canvas.queryByLabelText(label)).not.toBeInTheDocument()
  },
}

export const PropOverridesProvider: Story = {
  args: { locale: "pt-BR", children: null },
  render: (args) => (
    <UILocaleProvider locale={args.locale}>
      <Sample locale="es-ES" />
    </UILocaleProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByLabelText("Cargando")).toBeInTheDocument()
    await expect(canvas.getByText("es-ES")).toBeInTheDocument()
  },
}

export const NestedProviders: Story = {
  args: { locale: "pt-BR", children: null },
  render: (args) => (
    <UILocaleProvider locale={args.locale}>
      <div className="flex flex-col gap-3">
        <Sample />
        <UILocaleProvider locale="fr-FR">
          <Sample />
        </UILocaleProvider>
      </div>
    </UILocaleProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByLabelText("Carregando")).toBeInTheDocument()
    await expect(canvas.getByLabelText("Chargement")).toBeInTheDocument()
  },
}

const LOCALES: UILocale[] = ["en-US", "pt-BR", "es-ES", "fr-FR"]

export const SwitchAtRuntime: Story = {
  args: { locale: "en-US", children: null },
  render: () => {
    const [locale, setLocale] = React.useState<UILocale>("en-US")
    return (
      <UILocaleProvider locale={locale}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {LOCALES.map((l) => (
              <Button
                key={l}
                size="sm"
                variant={l === locale ? "default" : "outline"}
                onClick={() => setLocale(l)}
              >
                {l}
              </Button>
            ))}
          </div>
          <Sample />
        </div>
      </UILocaleProvider>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByLabelText("Loading")).toBeInTheDocument()
    await userEvent.click(canvas.getByRole("button", { name: "pt-BR" }))
    await expect(canvas.getByLabelText("Carregando")).toBeInTheDocument()
    await userEvent.click(canvas.getByRole("button", { name: "fr-FR" }))
    await expect(canvas.getByLabelText("Chargement")).toBeInTheDocument()
  },
}
