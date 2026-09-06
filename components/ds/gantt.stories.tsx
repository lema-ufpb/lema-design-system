import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Gantt } from "./gantt"

const tasks = [
  { id: "1", name: "Design", start: 0, end: 3, progress: 100 },
  { id: "2", name: "Build", start: 2, end: 6, progress: 60 },
  { id: "3", name: "Test", start: 5, end: 8, progress: 20 },
]

const meta = {
  title: "Kibo/Gantt",
  component: Gantt,
  tags: ["autodocs"],
} satisfies Meta<typeof Gantt>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { tasks } }

export const Loading: Story = { args: { tasks, loading: true } }
