import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./select"

const meta = {
  title: "Shadcn UI/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A native-like select control with full keyboard navigation, grouped options, and scroll-aware indicators.",
          "",
          'Built on Radix Select. The `SelectTrigger` accepts a `size` prop (`"sm"` | `"default"`). `SelectContent` accepts a `position` prop (`"item-aligned"` | `"popper"`). Supports labels, separators, and scroll-up/scroll-down buttons for long lists.',
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Variant / Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Trigger background** | `--input` / `--input/50` | Background fill of the trigger button |",
          "| **Trigger text** | `--muted-foreground` | Placeholder text when no value is selected |",
          "| **Dropdown background** | `--popover` | Background of the content popover |",
          "| **Dropdown text** | `--popover-foreground` | Text color inside the dropdown |",
          "| **Accent highlight** | `--accent` / `--accent-foreground` | Hover/focus highlight on items |",
          "| **Separator color** | `--border` | Dividing line between option groups |",
          "| **Focus ring** | `--ring` / `--ring/30` | Focus outline on trigger and items |",
          "| **Error state** | `--destructive` / `--destructive/20` | Border/ring for invalid state |",
          "| **Placeholder** | `--muted-foreground` | Text color for the placeholder state |",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="orange">Orange</SelectItem>
        <SelectItem value="grape">Grape</SelectItem>
      </SelectContent>
    </Select>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Select defaultValue="sm">
        <SelectTrigger size="sm" className="w-40">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="sm">Small (sm)</SelectItem>
          <SelectItem value="default">Default</SelectItem>
        </SelectContent>
      </Select>
      <Select defaultValue="default">
        <SelectTrigger size="default" className="w-40">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="default">Default</SelectItem>
          <SelectItem value="sm">Small (sm)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
}

export const WithGroups: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Vegetables</SelectLabel>
          <SelectItem value="carrot">Carrot</SelectItem>
          <SelectItem value="broccoli">Broccoli</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
}

export const PopperPosition: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Popper position" />
      </SelectTrigger>
      <SelectContent position="popper">
        <SelectItem value="1">Option 1</SelectItem>
        <SelectItem value="2">Option 2</SelectItem>
        <SelectItem value="3">Option 3</SelectItem>
      </SelectContent>
    </Select>
  ),
}
