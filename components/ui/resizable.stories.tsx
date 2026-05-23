import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./resizable"

const meta = {
  title: "Shadcn UI/Resizable",
  component: ResizablePanelGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A resizable split-panel layout for dividing horizontal or vertical space with draggable handles.",
          "",
          "Built on `react-resizable-panels`. `ResizablePanelGroup` defines the orientation and container. `ResizablePanel` represents each resizable region. `ResizableHandle` is the draggable divider between panels and accepts a `withHandle` boolean to render a visible grip indicator.",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Variant / Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Handle background** | `--border` | Color of the dividing line and optional grip handle |",
          "| **Focus ring** | `--ring` | Outline visible when the handle receives keyboard focus |",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof ResizablePanelGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  render: () => (
    <ResizablePanelGroup
      orientation="horizontal"
      className="min-h-48 max-w-lg rounded-2xl border"
    >
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-4">
          <span className="text-sm text-muted-foreground">Panel 1</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-4">
          <span className="text-sm text-muted-foreground">Panel 2</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
}

export const Vertical: Story = {
  render: () => (
    <ResizablePanelGroup
      orientation="vertical"
      className="min-h-48 max-w-lg rounded-2xl border"
    >
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-4">
          <span className="text-sm text-muted-foreground">Top</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-4">
          <span className="text-sm text-muted-foreground">Bottom</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
}

export const ThreePanels: Story = {
  render: () => (
    <ResizablePanelGroup
      orientation="horizontal"
      className="min-h-48 max-w-2xl rounded-2xl border"
    >
      <ResizablePanel defaultSize={25} minSize={15}>
        <div className="flex h-full items-center justify-center p-4">
          <span className="text-sm text-muted-foreground">Sidebar</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-4">
          <span className="text-sm text-muted-foreground">Content</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={25} minSize={15}>
        <div className="flex h-full items-center justify-center p-4">
          <span className="text-sm text-muted-foreground">Details</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
}
