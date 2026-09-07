import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  RichTextEditor,
  RichTextToolbar,
  RichTextContent,
} from "./rich-text-editor"
import { Toggle } from "@/components/ui/toggle"
import { Separator } from "@/components/ui/separator"
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  ListIcon,
  ListOrderedIcon,
} from "lucide-react"

const meta = {
  title: "Form/RichTextEditor",
  component: RichTextEditor,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A presentation component that provides the structure for a rich text editor.",
          "Composable and theme-aware via semantic tokens.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `invalid` | `boolean` | — | - |",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof RichTextEditor>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="w-full max-w-[600px]">
      <RichTextEditor>
        <RichTextToolbar>
          <Toggle size="sm" aria-label="Toggle bold">
            <BoldIcon className="size-4" />
          </Toggle>
          <Toggle size="sm" aria-label="Toggle italic">
            <ItalicIcon className="size-4" />
          </Toggle>
          <Toggle size="sm" aria-label="Toggle underline">
            <UnderlineIcon className="size-4" />
          </Toggle>
          <Separator orientation="vertical" className="mx-1 h-6" />
          <Toggle size="sm" aria-label="Toggle bullet list">
            <ListIcon className="size-4" />
          </Toggle>
          <Toggle size="sm" aria-label="Toggle ordered list">
            <ListOrderedIcon className="size-4" />
          </Toggle>
        </RichTextToolbar>
        <RichTextContent contentEditable suppressContentEditableWarning>
          <p>
            This is a <strong>presentation component</strong>.
          </p>
          <p>
            It provides the visual shell for a rich text editor. The consumer
            should wire it up with a library like TipTap, Slate, or Lexical.
          </p>
          <ul>
            <li>Customizable toolbar</li>
            <li>Focus and error states</li>
            <li>Ready for integration</li>
          </ul>
        </RichTextContent>
      </RichTextEditor>
    </div>
  ),
}

export const Invalid: Story = {
  render: () => (
    <div className="w-full max-w-[600px]">
      <RichTextEditor invalid>
        <RichTextToolbar>
          <Toggle size="sm" aria-label="Toggle bold">
            <BoldIcon className="size-4" />
          </Toggle>
        </RichTextToolbar>
        <RichTextContent contentEditable suppressContentEditableWarning>
          <p>Please enter a description.</p>
        </RichTextContent>
      </RichTextEditor>
      <p className="mt-2 text-sm text-destructive">Description is required.</p>
    </div>
  ),
}
