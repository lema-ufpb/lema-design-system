import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { DiffViewer } from "./diff-viewer"

const meta = {
  title: "Data Display/DiffViewer",
  component: DiffViewer,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A line-level diff viewer for comparing two text values.",
          "Supports unified and split modes. Uses an LCS algorithm internally — no external dependencies.",
          "",
          "Added lines use `text-success` / `bg-success/10`; removed lines use `text-destructive` / `bg-destructive/10`.",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    mode: { control: "inline-radio", options: ["unified", "split"] },
  },
} satisfies Meta<typeof DiffViewer>

export default meta
type Story = StoryObj<typeof meta>

const OLD_JSON = `{
  "name": "lema-ds",
  "version": "1.2.0",
  "description": "LEMA Design System",
  "author": "LEMA/UFPB",
  "license": "MIT",
  "scripts": {
    "dev": "storybook dev -p 6006",
    "test": "vitest"
  }
}`

const NEW_JSON = `{
  "name": "lema-ds",
  "version": "1.3.0",
  "description": "LEMA Design System — UFPB",
  "author": "LEMA/UFPB",
  "license": "MIT",
  "homepage": "https://ds.lema.ufpb.br",
  "scripts": {
    "dev": "storybook dev -p 6006",
    "build": "storybook build",
    "test": "vitest --reporter verbose"
  }
}`

export const Default: Story = {
  args: {
    title: "package.json",
    oldValue: OLD_JSON,
    newValue: NEW_JSON,
    oldLabel: "v1.2.0",
    newLabel: "v1.3.0",
    mode: "unified",
  },
}

export const SplitMode: Story = {
  args: {
    title: "package.json — Split View",
    oldValue: OLD_JSON,
    newValue: NEW_JSON,
    oldLabel: "v1.2.0",
    newLabel: "v1.3.0",
    mode: "split",
  },
}

export const Loading: Story = {
  args: {
    title: "Loading diff…",
    oldValue: "",
    newValue: "",
    loading: true,
  },
}

export const NoChanges: Story = {
  args: {
    title: "No Changes",
    oldValue: OLD_JSON,
    newValue: OLD_JSON,
    oldLabel: "Before",
    newLabel: "After",
  },
}

export const CodeDiff: Story = {
  args: {
    title: "button.tsx",
    oldLabel: "main",
    newLabel: "feat/icon-button",
    oldValue: `export function Button({ children, variant = "default", ...props }) {
  return (
    <button
      className={cn(buttonVariants({ variant }), props.className)}
      {...props}
    >
      {children}
    </button>
  )
}`,
    newValue: `export function Button({ children, variant = "default", size = "md", icon, ...props }) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), props.className)}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  )
}`,
  },
}

export const LongDiff: Story = {
  args: {
    title: "Large file diff (truncated at 30 lines)",
    maxLines: 30,
    oldValue: Array.from(
      { length: 50 },
      (_, i) => `line ${i + 1}: original content here`
    ).join("\n"),
    newValue: Array.from({ length: 55 }, (_, i) =>
      i % 7 === 0
        ? `line ${i + 1}: MODIFIED content here`
        : i >= 50
          ? `line ${i + 1}: new line added`
          : `line ${i + 1}: original content here`
    ).join("\n"),
  },
}
