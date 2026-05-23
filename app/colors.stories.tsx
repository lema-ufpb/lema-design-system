import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const ColorSwatch = ({
  name,
  variable,
}: {
  name: string
  variable: string
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="flex h-20 w-full items-center justify-center rounded-md border shadow-sm"
        style={{ backgroundColor: `var(${variable})` }}
      >
        <span
          className="rounded border bg-background/50 px-2 py-1 text-xs font-bold backdrop-blur-sm"
          style={{
            color: `var(${variable}-foreground, var(--color-foreground))`,
          }}
        >
          Aa
        </span>
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-medium">{name}</span>
        <code
          className="truncate text-[10px] text-muted-foreground"
          title={variable}
        >
          {variable}
        </code>
      </div>
    </div>
  )
}

const ColorGroup = ({
  title,
  colors,
}: {
  title: string
  colors: { name: string; variable: string }[]
}) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="border-b pb-2 text-lg font-semibold tracking-tight">
        {title}
      </h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {colors.map((color) => (
          <ColorSwatch key={color.variable} {...color} />
        ))}
      </div>
    </div>
  )
}

const ColorsGallery = () => {
  const groups = [
    {
      title: "Base Colors",
      colors: [
        { name: "Background", variable: "--color-background" },
        { name: "Foreground", variable: "--color-foreground" },
        { name: "Card", variable: "--color-card" },
        { name: "Card Foreground", variable: "--color-card-foreground" },
        { name: "Popover", variable: "--color-popover" },
        { name: "Popover Foreground", variable: "--color-popover-foreground" },
      ],
    },
    {
      title: "Brand Colors",
      colors: [
        { name: "Primary", variable: "--color-primary" },
        { name: "Primary Foreground", variable: "--color-primary-foreground" },
        { name: "Secondary", variable: "--color-secondary" },
        {
          name: "Secondary Foreground",
          variable: "--color-secondary-foreground",
        },
        { name: "Muted", variable: "--color-muted" },
        { name: "Muted Foreground", variable: "--color-muted-foreground" },
        { name: "Accent", variable: "--color-accent" },
        { name: "Accent Foreground", variable: "--color-accent-foreground" },
      ],
    },
    {
      title: "Status & UI",
      colors: [
        { name: "Destructive", variable: "--color-destructive" },
        { name: "Border", variable: "--color-border" },
        { name: "Input", variable: "--color-input" },
        { name: "Ring", variable: "--color-ring" },
      ],
    },
    {
      title: "Charts",
      colors: [
        { name: "Chart 1", variable: "--color-chart-1" },
        { name: "Chart 2", variable: "--color-chart-2" },
        { name: "Chart 3", variable: "--color-chart-3" },
        { name: "Chart 4", variable: "--color-chart-4" },
        { name: "Chart 5", variable: "--color-chart-5" },
      ],
    },
    {
      title: "Sidebar",
      colors: [
        { name: "Sidebar", variable: "--color-sidebar" },
        { name: "Sidebar Foreground", variable: "--color-sidebar-foreground" },
        { name: "Sidebar Primary", variable: "--color-sidebar-primary" },
        {
          name: "Sidebar Primary Foreground",
          variable: "--color-sidebar-primary-foreground",
        },
        { name: "Sidebar Accent", variable: "--color-sidebar-accent" },
        {
          name: "Sidebar Accent Foreground",
          variable: "--color-sidebar-accent-foreground",
        },
        { name: "Sidebar Border", variable: "--color-sidebar-border" },
        { name: "Sidebar Ring", variable: "--color-sidebar-ring" },
      ],
    },
  ]

  return (
    <div className="flex flex-col gap-10 p-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Design System Colors
        </h1>
        <p className="text-muted-foreground">
          This gallery displays the semantic color tokens defined in{" "}
          <code>globals.css</code>. These colors automatically adapt when
          switching between Light and Dark mode.
        </p>
      </div>
      {groups.map((group) => (
        <ColorGroup key={group.title} {...group} />
      ))}
    </div>
  )
}

const meta: Meta = {
  title: "Foundation/Colors",
  component: ColorsGallery,
  parameters: {
    layout: "fullscreen",
  },
}

export default meta

type Story = StoryObj

export const Default: Story = {}
