import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { TreeView, type TreeDataItem } from "./tree-view"
import { FileIcon, FolderIcon, FileTextIcon, ImageIcon } from "lucide-react"

const sampleData: TreeDataItem[] = [
  {
    id: "components",
    name: "components",
    icon: <FolderIcon className="size-4 text-muted-foreground" />,
    children: [
      {
        id: "ui",
        name: "ui",
        icon: <FolderIcon className="size-4 text-muted-foreground" />,
        children: [
          {
            id: "button",
            name: "button.tsx",
            icon: <FileIcon className="size-4 text-muted-foreground" />,
          },
          {
            id: "input",
            name: "input.tsx",
            icon: <FileIcon className="size-4 text-muted-foreground" />,
          },
        ],
      },
      {
        id: "ds",
        name: "ds",
        icon: <FolderIcon className="size-4 text-muted-foreground" />,
        children: [
          {
            id: "tree-view",
            name: "tree-view.tsx",
            icon: <FileIcon className="size-4 text-muted-foreground" />,
          },
        ],
      },
    ],
  },
  {
    id: "public",
    name: "public",
    icon: <FolderIcon className="size-4 text-muted-foreground" />,
    children: [
      {
        id: "logo",
        name: "logo.png",
        icon: <ImageIcon className="size-4 text-muted-foreground" />,
      },
      {
        id: "favicon",
        name: "favicon.ico",
        icon: <ImageIcon className="size-4 text-muted-foreground" />,
      },
    ],
  },
  {
    id: "readme",
    name: "README.md",
    icon: <FileTextIcon className="size-4 text-muted-foreground" />,
  },
]

const meta = {
  title: "Data Display/TreeView",
  component: TreeView,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A tree view component for displaying hierarchical data like file systems.",
          "Supports CVA variants.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `data` | `TreeDataItem[]` | — | - |",
          "| `onSelect` | `(item: TreeDataItem) => void` | — | - |",
          "| `selectedId` | `string` | — | - |",
          "| `defaultExpandedIds` | `string[]` | — | - |",
          "| `expandAll` | `boolean` | — | - |",
          "| `className` | `string` | — | - |",
        ].join("\n"),
      },
    },
  },
  args: {
    data: sampleData,
  },
} satisfies Meta<typeof TreeView>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const Selected: Story = {
  args: {
    selectedId: "tree-view",
    defaultExpandedIds: ["components", "ds"],
  },
}

export const ExpandAll: Story = {
  args: {
    expandAll: true,
  },
}
