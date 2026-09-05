import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { KanbanBoard, KanbanColumn, KanbanCard } from "./kanban-board"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const meta = {
  title: "Data Display/KanbanBoard",
  component: KanbanBoard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A presentation component for Kanban boards.",
      },
    },
  },
} satisfies Meta<typeof KanbanBoard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="h-[600px] w-[800px] rounded-lg border bg-background p-4">
      <KanbanBoard>
        <KanbanColumn title="To Do" count={3}>
          <KanbanCard
            title="Design System Specs"
            description="Write specifications for the new data display components."
            tags={["Documentation", "Design"]}
          >
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Sep 15</span>
              <Avatar className="size-6">
                <AvatarImage
                  src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                  alt="John Doe"
                />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </KanbanCard>
          <KanbanCard
            title="Update dependencies"
            description="Update React and Next.js to the latest versions."
            tags={["Chore"]}
          />
          <KanbanCard
            title="Fix navigation bug"
            description="The sidebar is not collapsing properly on mobile devices."
            tags={["Bug", "High Priority"]}
          />
        </KanbanColumn>

        <KanbanColumn title="In Progress" count={2}>
          <KanbanCard
            title="Implement FilterBuilder"
            description="Create the complex filter builder component with select and inputs."
            tags={["Feature", "Frontend"]}
          >
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Sep 12</span>
              <Avatar className="size-6">
                <AvatarImage
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                  alt="Marie Curie"
                />
                <AvatarFallback>MC</AvatarFallback>
              </Avatar>
            </div>
          </KanbanCard>
          <KanbanCard
            title="API Integration"
            description="Connect the dashboard to the real backend API."
            tags={["Backend"]}
          />
        </KanbanColumn>

        <KanbanColumn title="Done" count={1}>
          <KanbanCard
            title="Setup CI/CD"
            description="Configure GitHub actions for automated testing and deployment."
            tags={["DevOps"]}
          />
        </KanbanColumn>
      </KanbanBoard>
    </div>
  ),
}
