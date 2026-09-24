import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BrowserMockup } from "./browser-mockup"

const meta = {
  title: "Media/BrowserMockup",
  component: BrowserMockup,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A BrowserMockup component for the LEMA Design System.",
          "Supports CVA variants.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `url` | `string` | — | - |",
          '| `controls` | `"mac" \| "windows" \| "none"` | — | - |',
          "| `showAddressBar` | `boolean` | — | - |",
          "| `glow` | `boolean` | — | - |",
          '| `variant` | `"default" \| "minimal" \| "glass" \| "terminal"` | `"default"` | Variant |',
        ].join("\n"),
      },
    },
    layout: "padded",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "minimal", "glass", "terminal"],
    },
    controls: {
      control: "inline-radio",
      options: ["mac", "windows", "none"],
    },
    showAddressBar: {
      control: "boolean",
    },
    glow: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof BrowserMockup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    url: "https://lema.ufpb.br/dashboard",
    glow: true,
    children: (
      <div className="flex h-64 flex-col items-center justify-center bg-muted/10 p-8 text-center">
        <h3 className="text-lg font-semibold">Example Dashboard</h3>
        <p className="mt-2 max-w-sm text-xs text-muted-foreground">
          Insert your charts, screenshots or interactive components here for
          product demonstration.
        </p>
      </div>
    ),
  },
}

export const GlassVariant: Story = {
  render: () => (
    <div className="rounded-xl bg-gradient-to-br from-primary/10 via-background to-muted/40 p-8">
      <BrowserMockup variant="glass" url="https://design.lema.ufpb.br" glow>
        <div className="grid grid-cols-3 gap-4 p-6">
          <div className="flex h-28 flex-col justify-between rounded-lg border bg-card/80 p-3">
            <span className="text-xs text-muted-foreground">Active Users</span>
            <span className="text-2xl font-bold">14.820</span>
          </div>
          <div className="flex h-28 flex-col justify-between rounded-lg border bg-card/80 p-3">
            <span className="text-xs text-muted-foreground">
              Average Uptime
            </span>
            <span className="text-2xl font-bold text-success">99.98%</span>
          </div>
          <div className="flex h-28 flex-col justify-between rounded-lg border bg-card/80 p-3">
            <span className="text-xs text-muted-foreground">
              Requests / sec
            </span>
            <span className="text-2xl font-bold">4.2k</span>
          </div>
        </div>
      </BrowserMockup>
    </div>
  ),
}

export const TerminalVariant: Story = {
  render: () => (
    <BrowserMockup variant="terminal" url="zsh — lema-ds-cli">
      <div className="min-h-[160px] space-y-1.5 bg-zinc-950 p-4 text-xs text-zinc-300">
        <p className="text-zinc-500"># Installing the UFPB design system...</p>
        <p>
          <span className="text-emerald-400">➜</span>{" "}
          <span className="text-cyan-400">~</span> npx shadcn@latest add
          https://design.lema.ufpb.br/r/ds-hero-section.json
        </p>
        <p className="text-zinc-400">✔ Resolving dependencies...</p>
        <p className="text-zinc-400">
          ✔ Component added successfully at components/ui/ds-hero-section.tsx
        </p>
        <p className="font-semibold text-emerald-400">
          Ready to create amazing interfaces! ✨
        </p>
      </div>
    </BrowserMockup>
  ),
}

export const WindowsControls: Story = {
  args: {
    controls: "windows",
    variant: "minimal",
    url: "https://intranet.ufpb.br",
    children: (
      <div className="p-8 text-center text-xs text-muted-foreground">
        Minimalist look with classic Windows-style window controls.
      </div>
    ),
  },
}
