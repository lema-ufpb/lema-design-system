import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { CronBuilder } from "./cron-builder"

const meta = {
  title: "Form/CronBuilder",
  component: CronBuilder,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A visual cron expression builder with simple (preset + picker) and advanced (raw input) modes.",
          "Displays a human-readable description and the next 3 scheduled execution times.",
          "No external dependencies — cron parsing and scheduling is done in pure TypeScript.",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    mode: { control: "inline-radio", options: ["simple", "advanced"] },
    locale: {
      control: "inline-radio",
      options: ["en-US", "pt-BR", "es-ES", "fr-FR"],
    },
  },
} satisfies Meta<typeof CronBuilder>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: "0 9 * * 1-5",
    mode: "simple",
  },
}

export const Advanced: Story = {
  args: {
    value: "30 14 * * 3",
    mode: "advanced",
  },
}

export const Loading: Story = {
  args: {
    value: "* * * * *",
    loading: true,
  },
}

export const Disabled: Story = {
  args: {
    value: "0 0 1 * *",
    disabled: true,
  },
}

export const Controlled: Story = {
  render: () => {
    const [cron, setCron] = React.useState("0 8 * * 1")
    return (
      <div className="flex flex-col gap-4">
        <CronBuilder value={cron} onChange={setCron} />
        <div className="rounded-lg border border-border bg-muted p-3 text-sm">
          Current value: <strong>{cron}</strong>
        </div>
      </div>
    )
  },
}

import * as React from "react"
