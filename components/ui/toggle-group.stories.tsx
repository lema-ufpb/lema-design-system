import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ToggleGroup, ToggleGroupItem } from "./toggle-group"
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
} from "lucide-react"

const meta = {
  title: "Shadcn UI/Toggle Group",
  component: ToggleGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A set of related toggle buttons that allows single or multiple selection, useful for toolbars, formatting options, or segmented controls.",
          "",
          "Wraps [Radix UI's `ToggleGroup`](https://www.radix-ui.com/primitives/docs/components/toggle-group). Supports `variant` and `size` from `toggleVariants`, configurable `spacing` (set to `0` for a connected segmented-control appearance), and `orientation`.",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Variant / Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Default background** | `transparent` | Default variant button background |",
          "| **Outline border** | `--border` / `--input` | Border for the outline variant |",
          "| **Pressed background** | `--muted` | Background when item is selected (`data-[state=on]`) |",
          "| **Hover background** | `--muted` | Hover state for individual items |",
          "| **Focus ring** | `--ring` / `--ring/30` | Keyboard focus outline |",
          "| **Destructive** | `--destructive` / `--destructive/20` | Invalid/error state |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    type: {
      control: "select",
      options: ["single", "multiple"],
      description: "Selection behavior",
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    spacing: {
      control: "number",
      description: "Gap between items (0 = connected/segmented)",
    },
    variant: {
      control: "select",
      options: ["default", "outline"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
    },
  },
} satisfies Meta<typeof ToggleGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  args: { type: "multiple" } as any,
  render: () => (
    <ToggleGroup type="multiple">
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <BoldIcon data-icon="inline-start" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <ItalicIcon data-icon="inline-start" />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <UnderlineIcon data-icon="inline-start" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}

export const Variants: Story = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  args: { type: "multiple" } as any,
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-2 text-sm text-muted-foreground">Default variant</p>
        <ToggleGroup type="multiple" variant="default">
          <ToggleGroupItem value="bold" aria-label="Bold">
            <BoldIcon data-icon="inline-start" />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Italic">
            <ItalicIcon data-icon="inline-start" />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Underline">
            <UnderlineIcon data-icon="inline-start" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div>
        <p className="mb-2 text-sm text-muted-foreground">Outline variant</p>
        <ToggleGroup type="multiple" variant="outline">
          <ToggleGroupItem value="bold" aria-label="Bold">
            <BoldIcon data-icon="inline-start" />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Italic">
            <ItalicIcon data-icon="inline-start" />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Underline">
            <UnderlineIcon data-icon="inline-start" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  ),
}

export const Sizes: Story = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  args: { type: "multiple" } as any,
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-2 text-sm text-muted-foreground">Small</p>
        <ToggleGroup type="multiple" size="sm">
          <ToggleGroupItem value="left" aria-label="Align left">
            <AlignLeftIcon data-icon="inline-start" />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Align center">
            <AlignCenterIcon data-icon="inline-start" />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Align right">
            <AlignRightIcon data-icon="inline-start" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div>
        <p className="mb-2 text-sm text-muted-foreground">Large</p>
        <ToggleGroup type="multiple" size="lg">
          <ToggleGroupItem value="left" aria-label="Align left">
            <AlignLeftIcon data-icon="inline-start" />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Align center">
            <AlignCenterIcon data-icon="inline-start" />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Align right">
            <AlignRightIcon data-icon="inline-start" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  ),
}

export const Segmented: Story = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  args: { type: "single" } as any,
  render: () => (
    <ToggleGroup type="single" variant="outline" spacing={0}>
      <ToggleGroupItem value="left" aria-label="Align left">
        <AlignLeftIcon data-icon="inline-start" />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        <AlignCenterIcon data-icon="inline-start" />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <AlignRightIcon data-icon="inline-start" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}

export const Vertical: Story = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  args: { type: "multiple" } as any,
  render: () => (
    <ToggleGroup type="multiple" orientation="vertical">
      <ToggleGroupItem value="bold" aria-label="Bold">
        <BoldIcon data-icon="inline-start" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Italic">
        <ItalicIcon data-icon="inline-start" />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Underline">
        <UnderlineIcon data-icon="inline-start" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}

export const Single: Story = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  args: { type: "single" } as any,
  render: () => (
    <ToggleGroup type="single" defaultValue="center">
      <ToggleGroupItem value="left" aria-label="Align left">
        <AlignLeftIcon data-icon="inline-start" />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        <AlignCenterIcon data-icon="inline-start" />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <AlignRightIcon data-icon="inline-start" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}
