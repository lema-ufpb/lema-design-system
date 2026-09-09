import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { MarkdownEditor } from "./markdown-editor"

const SAMPLE_MD = `# Getting Started

Welcome to **LEMA Design System**! This editor supports standard Markdown syntax.

## Features

- **Bold** and *italic* text
- \`inline code\` and code blocks
- [Links](https://lema.ufpb.br) and blockquotes
- Ordered and unordered lists

## Code Example

\`\`\`tsx
export function Button({ children }) {
  return <button className="btn">{children}</button>
}
\`\`\`

> This is a blockquote. Use it for highlighting important notes.

1. First item
2. Second item
3. Third item
`

const meta = {
  title: "Form/MarkdownEditor",
  component: MarkdownEditor,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A Markdown editor with formatting toolbar, split-view preview, and fullscreen mode.",
          "No external dependencies — Markdown is rendered using a regex-based parser.",
          "",
          "Modes: `edit` (editor only), `preview` (rendered only), `split` (both side-by-side).",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    mode: { control: "inline-radio", options: ["edit", "preview", "split"] },
    height: { control: { type: "number", min: 200, max: 800, step: 50 } },
  },
} satisfies Meta<typeof MarkdownEditor>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: SAMPLE_MD,
    mode: "split",
    height: 400,
  },
}

export const EditOnly: Story = {
  args: {
    value: SAMPLE_MD,
    mode: "edit",
    height: 400,
  },
}

export const PreviewOnly: Story = {
  args: {
    value: SAMPLE_MD,
    mode: "preview",
    height: 400,
  },
}

export const Empty: Story = {
  args: {
    value: "",
    mode: "split",
    height: 400,
    placeholder: "Start writing…",
  },
}

export const Loading: Story = {
  args: {
    value: "",
    loading: true,
    height: 400,
  },
}

export const Disabled: Story = {
  args: {
    value: SAMPLE_MD,
    disabled: true,
    height: 400,
  },
}

export const NoToolbar: Story = {
  args: {
    value: SAMPLE_MD,
    showToolbar: false,
    mode: "split",
    height: 360,
  },
}
