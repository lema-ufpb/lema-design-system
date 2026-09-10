import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, within } from "storybook/test"
import { KanbanBoard, type KanbanColumnData } from "./kanban-board"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const sampleColumns: KanbanColumnData[] = [
  {
    id: "todo",
    title: "To Do",
    cards: [
      {
        id: "card-1",
        title: "Design System Specs",
        description:
          "Write specifications for the new data display components.",
        tags: ["Documentation", "Design"],
        footer: (
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Sep 15</span>
            <Avatar className="size-6">
              <AvatarImage
                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                alt="John Doe"
              />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        ),
      },
      {
        id: "card-2",
        title: "Update dependencies",
        description: "Update React and Next.js to the latest versions.",
        tags: ["Chore"],
      },
      {
        id: "card-3",
        title: "Fix navigation bug",
        description:
          "The sidebar is not collapsing properly on mobile devices.",
        tags: ["Bug", "High Priority"],
      },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    cards: [
      {
        id: "card-4",
        title: "Implement FilterBuilder",
        description:
          "Create the complex filter builder component with select and inputs.",
        tags: ["Feature", "Frontend"],
        footer: (
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Sep 12</span>
            <Avatar className="size-6">
              <AvatarImage
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                alt="Marie Curie"
              />
              <AvatarFallback>MC</AvatarFallback>
            </Avatar>
          </div>
        ),
      },
      {
        id: "card-5",
        title: "API Integration",
        description: "Connect the dashboard to the real backend API.",
        tags: ["Backend"],
      },
    ],
  },
  {
    id: "done",
    title: "Done",
    cards: [
      {
        id: "card-6",
        title: "Setup CI/CD",
        description:
          "Configure GitHub actions for automated testing and deployment.",
        tags: ["DevOps"],
      },
    ],
  },
]

const meta = {
  title: "Dashboard/KanbanBoard",
  component: KanbanBoard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: [
          "A drag-and-drop Kanban board (@dnd-kit) — reorder cards within a column or move them across columns by pointer or keyboard.",
          "Composable and theme-aware via semantic tokens.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `columns` | `KanbanColumnData[]` | — | - |",
          "| `onColumnsChange` | `(columns: KanbanColumnData[]) => void` | — | - |",
        ].join("\n"),
      },
    },
  },
  args: {
    columns: sampleColumns,
  },
} satisfies Meta<typeof KanbanBoard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <div className="h-[600px] w-full max-w-[800px] rounded-lg border bg-background p-4">
      <KanbanBoard {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Design System Specs")).toBeInTheDocument()
    await expect(canvas.getByText("To Do")).toBeInTheDocument()
  },
}
