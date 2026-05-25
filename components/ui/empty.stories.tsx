import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "./empty"
import { InboxIcon } from "lucide-react"

const meta = {
  title: "Shadcn UI/Empty",
  component: Empty,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "An empty state placeholder used when a list, table, or view has no data to display.",
          "",
          "Composed of `EmptyHeader`, `EmptyMedia`, `EmptyTitle`, `EmptyDescription`, and `EmptyContent` sub-components. Media supports a `variant` prop (`default` | `icon`) to control icon wrapping style.",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Variant / Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Description text** | `--muted-foreground` | Secondary descriptive text |",
          "| **Icon background** | `--muted` | Background for icon variant media |",
          "| **Icon color** | `--foreground` | Icon fill / stroke color |",
          "| **Title** | `--foreground` | Primary heading text color |",
          "| **Link hover** | `--primary` | Link color on hover in description |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    children: {
      table: { disable: true },
    },
  },
} satisfies Meta<typeof Empty>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Empty state with an inbox icon, title, and description prompting the user to create their first item.",
      },
    },
  },
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <InboxIcon />
        </EmptyMedia>
        <EmptyTitle>No data yet</EmptyTitle>
        <EmptyDescription>
          Get started by creating your first item. It will appear here once
          available.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
}

export const WithContent: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Empty state with an additional action link below the description for clearing filters or retrying.",
      },
    },
  },
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <InboxIcon />
        </EmptyMedia>
        <EmptyTitle>No results found</EmptyTitle>
        <EmptyDescription>
          Try adjusting your search or filters to find what you are looking for.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <button className="text-sm font-medium text-primary underline underline-offset-4 hover:text-primary/80">
          Clear Filters
        </button>
      </EmptyContent>
    </Empty>
  ),
}
