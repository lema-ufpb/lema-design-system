import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, within } from "storybook/test"

import { Changelog, type ChangelogRelease } from "./changelog"

const sampleReleases: ChangelogRelease[] = [
  {
    version: "v1.11.0",
    date: new Date(2025, 10, 15),
    title: "Component Family Expansion and New Charts",
    isLatest: true,
    changes: [
      {
        type: "feature",
        description:
          "Added native support for the new DateRangePicker with smart shortcuts.",
      },
      {
        type: "feature",
        description:
          "Standalone Sparkline component for high-density tables.",
      },
      {
        type: "improvement",
        description:
          "Render time optimization in the SVG and Recharts engine.",
      },
      {
        type: "fix",
        description:
          "Accessibility and keyboard focus fix in ConfirmDialog.",
      },
    ],
  },
  {
    version: "v1.10.0",
    date: new Date(2025, 9, 2),
    title: "Migration to Tailwind CSS v4 and Shadcn Luma",
    changes: [
      {
        type: "breaking",
        description:
          "CSS variables migrated from HSL to Tailwind v4 oklch standard.",
      },
      {
        type: "improvement",
        description:
          "Full support for 4 languages (pt-BR, en-US, es-ES, fr-FR) via ui-i18n.",
      },
      {
        type: "fix",
        description:
          "Adjustment to sm/md/lg typographic scale on buttons and data badges.",
      },
    ],
  },
]

const meta = {
  title: "Data Display/Changelog",
  component: Changelog,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Visual release notes timeline categorizing features, improvements, fixes, and breaking changes.",
      },
    },
  },
  args: {
    releases: sampleReleases,
  },
  argTypes: {
    loading: {
      control: "boolean",
      description: "Shows skeleton loading state.",
    },
    locale: {
      control: "radio",
      options: ["pt-BR", "en-US", "es-ES", "fr-FR"],
      description: "Language locale.",
    },
  },
} satisfies Meta<typeof Changelog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    locale: "en-US",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("v1.11.0")).toBeInTheDocument()
    await expect(canvas.getByText("v1.10.0")).toBeInTheDocument()
  },
}

export const Loading: Story = {
  args: {
    loading: true,
  },
}

export const Locales: Story = {
  render: () => (
    <div className="flex max-w-xl flex-col gap-8">
      <div>
        <span className="block pb-2 text-xs font-semibold text-muted-foreground">
          pt-BR:
        </span>
        <Changelog locale="pt-BR" releases={sampleReleases.slice(0, 1)} />
      </div>
      <div>
        <span className="block pb-2 text-xs font-semibold text-muted-foreground">
          en-US:
        </span>
        <Changelog locale="en-US" releases={sampleReleases.slice(0, 1)} />
      </div>
    </div>
  ),
}
