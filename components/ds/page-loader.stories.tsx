import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { PageLoader } from "@/components/ds/page-loader"

const meta = {
  title: "Feedback/PageLoader",
  component: PageLoader,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: [
          "Full-page loading overlay with two variants: **bar** (top progress bar) and **spinner** (centered indicator).",
          "Controlled by the `loading` prop — fades in when `true`, fades out when `false`.",
          "",
          "## Variants",
          "",
          "| Variant | Description |",
          "| --- | --- |",
          "| `bar` | 4px shimmer bar fixed at the top of the viewport + overlay |",
          "| `spinner` | XL spinner centered on screen + optional message + overlay |",
          "",
          "## Design Tokens",
          "",
          "| Element | Token |",
          "| --- | --- |",
          "| Overlay background | `--background` |",
          "| Bar / spinner (primary) | `--primary` |",
          "| Bar / spinner (success) | `--success` |",
          "| Bar / spinner (destructive) | `--destructive` |",
          "| Message text | `--muted-foreground` |",
          "",
          "## Component Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `loading` | `boolean` | — | (required) Toggles visibility — fades in/out |",
          '| `variant` | `"bar" \\| "spinner"` | `"bar"` | Visual indicator style |',
          '| `size` | `"sm" \\| "md" \\| "lg" \\| "xl" \\| "2xl" \\| "4xl"` | `"md"` | Spinner or bar thickness |',
          '| `color` | `"primary" \\| "success" \\| "destructive"` | `"primary"` | Accent color |',
          '| `overlay` | `"ghost" \\| "soft" \\| "subtle" \\| "solid" \\| "none"` | `"soft"` | Overlay opacity level |',
          "| `blur` | `boolean` | `false` | Applies backdrop blur to overlay |",
          "| `message` | `string` | — | Custom message (spinner variant only) |",
          '| `locale` | `UILocale` | `"en-US"` | Locale for default loading text |',
        ].join("\n"),
      },
    },
  },
  args: {
    loading: true,
  },
  argTypes: {
    variant: {
      control: "radio",
      options: ["bar", "spinner"],
      table: { defaultValue: { summary: "bar" } },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "2xl", "4xl"],
      table: { defaultValue: { summary: "md" } },
    },
    color: {
      control: "radio",
      options: ["primary", "success", "destructive"],
      table: { defaultValue: { summary: "primary" } },
    },
    overlay: {
      control: "select",
      options: ["ghost", "soft", "subtle", "solid", "none"],
      table: { defaultValue: { summary: "soft" } },
    },
    blur: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    loading: { control: "boolean" },
    message: {
      control: "text",
      table: { defaultValue: { summary: "" } },
    },
    locale: {
      control: "inline-radio",
      options: ["en-US", "pt-BR", "es-ES", "fr-FR"],
      table: { defaultValue: { summary: "en-US" } },
    },
    className: { table: { disable: true } },
  },
} satisfies Meta<typeof PageLoader>

export default meta
type Story = StoryObj<typeof meta>

// ── Wrapper to demonstrate against page content ──

function PageContent({ children }: { children?: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-background p-8">
      <div className="mx-auto flex max-w-2xl flex-col gap-6">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Sample page content behind the loader overlay.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-24 rounded-lg bg-muted" />
          ))}
        </div>
        <div className="h-48 rounded-lg bg-muted" />
      </div>
      {children}
    </div>
  )
}

// ── Interactive (manual control) ──

function InteractiveLoader(args: React.ComponentProps<typeof PageLoader>) {
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    if (!loading) return
    const id = setTimeout(() => setLoading(false), 3000)
    return () => clearTimeout(id)
  }, [loading])

  return (
    <PageContent>
      <div className="fixed right-6 bottom-6 z-40 flex gap-2">
        <Button size="sm" onClick={() => setLoading(true)} disabled={loading}>
          Start loading
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setLoading(false)}
          disabled={!loading}
        >
          Stop
        </Button>
      </div>
      <PageLoader {...args} loading={loading} />
    </PageContent>
  )
}

// ── Stories ──

export const Default: Story = {
  name: "Bar — Default",
  render: (args) => <InteractiveLoader {...args} />,
  args: {
    variant: "bar",
    size: "md",
    color: "primary",
    overlay: "soft",
    blur: false,
    locale: "en-US",
  },
}

export const SpinnerVariant: Story = {
  name: "Spinner — Default",
  render: (args) => <InteractiveLoader {...args} />,
  args: {
    variant: "spinner",
    color: "primary",
    overlay: "soft",
    blur: false,
    locale: "en-US",
  },
}

export const SpinnerWithMessage: Story = {
  name: "Spinner — With Message",
  render: (args) => <InteractiveLoader {...args} />,
  args: {
    variant: "spinner",
    color: "primary",
    overlay: "subtle",
    message: "Saving your changes…",
    locale: "en-US",
  },
}

export const WithBlur: Story = {
  name: "Bar — Frosted Glass",
  render: (args) => <InteractiveLoader {...args} />,
  args: {
    variant: "bar",
    color: "primary",
    overlay: "subtle",
    blur: true,
    locale: "en-US",
  },
}

export const SolidOverlay: Story = {
  name: "Spinner — Solid Overlay",
  render: (args) => <InteractiveLoader {...args} />,
  args: {
    variant: "spinner",
    color: "primary",
    overlay: "solid",
    blur: false,
    locale: "en-US",
  },
}

export const GhostOverlay: Story = {
  name: "Bar — Ghost Overlay (25%)",
  render: (args) => <InteractiveLoader {...args} />,
  args: {
    variant: "bar",
    color: "primary",
    overlay: "ghost",
    blur: false,
    locale: "en-US",
  },
}

export const SoftOverlay: Story = {
  name: "Spinner — Soft Overlay (50%)",
  render: (args) => <InteractiveLoader {...args} />,
  args: {
    variant: "spinner",
    color: "primary",
    overlay: "soft",
    blur: false,
    locale: "en-US",
  },
}

export const ColorSuccess: Story = {
  name: "Bar — Success Color",
  render: (args) => <InteractiveLoader {...args} />,
  args: {
    variant: "bar",
    color: "success",
    overlay: "subtle",
    locale: "en-US",
  },
}

export const ColorDestructive: Story = {
  name: "Spinner — Destructive Color",
  render: (args) => <InteractiveLoader {...args} />,
  args: {
    variant: "spinner",
    color: "destructive",
    overlay: "subtle",
    message: "Something went wrong, retrying…",
    locale: "en-US",
  },
}

export const LocalePTBR: Story = {
  name: "Locale — pt-BR",
  render: (args) => <InteractiveLoader {...args} />,
  args: {
    variant: "spinner",
    color: "primary",
    overlay: "subtle",
    locale: "pt-BR",
  },
}

export const AllSizes: Story = {
  name: "All Sizes — Spinner",
  render: () => (
    <div className="flex min-h-screen flex-row flex-wrap items-center justify-center gap-12 bg-background p-8">
      {(
        [
          { size: "sm", spinnerClass: "size-6" },
          { size: "md", spinnerClass: "size-10" },
          { size: "lg", spinnerClass: "size-14" },
          { size: "xl", spinnerClass: "size-20" },
          { size: "2xl", spinnerClass: "size-28" },
          { size: "4xl", spinnerClass: "size-40" },
        ] as const
      ).map(({ size, spinnerClass }) => (
        <div key={size} className="flex flex-col items-center gap-3">
          <svg
            role="status"
            aria-label="Loading"
            className={`${spinnerClass} animate-spin text-primary`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
          <p className="text-xs font-medium text-muted-foreground">{size}</p>
        </div>
      ))}
    </div>
  ),
  args: { loading: true },
  parameters: { layout: "fullscreen" },
}

export const AllSizesBar: Story = {
  name: "All Sizes — Bar",
  render: () => (
    <div className="flex min-h-screen flex-col justify-center gap-10 bg-background p-12">
      {(
        [
          { size: "sm", heightClass: "h-0.5" },
          { size: "md", heightClass: "h-1" },
          { size: "lg", heightClass: "h-1.5" },
        ] as const
      ).map(({ size, heightClass }) => (
        <div key={size} className="flex flex-col gap-2">
          <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            {size}
          </span>
          <div className={`w-full ${heightClass} overflow-hidden bg-muted`}>
            <div
              className={`h-full origin-left animate-loader-fill bg-primary`}
            />
          </div>
        </div>
      ))}
    </div>
  ),
  args: { loading: true },
  parameters: { layout: "fullscreen" },
}

export const NotLoading: Story = {
  name: "Not Loading (hidden)",
  render: (args) => (
    <PageContent>
      <PageLoader {...args} />
    </PageContent>
  ),
  args: {
    loading: false,
    variant: "bar",
    color: "primary",
    overlay: "subtle",
  },
}
