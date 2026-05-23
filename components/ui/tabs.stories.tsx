import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs"

const meta = {
  title: "Shadcn UI/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A set of layered sections that display one panel at a time, triggered by a tab bar.",
          "",
          "Wraps [Radix UI's `Tabs`](https://www.radix-ui.com/primitives/docs/components/tabs) primitive. Supports both `horizontal` and `vertical` orientations, and two list variants (`default` with filled background, `line` with an underline indicator). Each `TabsTrigger` accepts inline-start/end icons via the `data-icon` attribute.",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Variant / Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **List background** | `--muted` | Background fill for the default variant |",
          "| **Inactive trigger text** | `--foreground` / 60% opacity | Text color for non-selected tabs |",
          "| **Active trigger background** | `--background` | Background when the tab is selected |",
          "| **Active trigger text** | `--foreground` | Text color for the selected tab |",
          "| **Line indicator** | `--foreground` | Underline (line variant) active indicator |",
          "| **Focus ring** | `--ring` / `--ring/50` | Keyboard focus outline on triggers |",
          "| **Border** | `--border` | Container and trigger border lines |",
          "| **Active border (dark)** | `--input` / `--input/30` | Subtle border on active tab in dark mode |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Layout direction of tabs vs content",
    },
    defaultValue: {
      control: "text",
      description: "Default active tab value",
    },
  },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="tab-1" className="w-full max-w-md">
      <TabsList>
        <TabsTrigger value="tab-1">Account</TabsTrigger>
        <TabsTrigger value="tab-2">Password</TabsTrigger>
        <TabsTrigger value="tab-3">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="tab-1">Account settings content.</TabsContent>
      <TabsContent value="tab-2">Password settings content.</TabsContent>
      <TabsContent value="tab-3">Notification preferences.</TabsContent>
    </Tabs>
  ),
}

export const Variants: Story = {
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-8">
      <div>
        <p className="mb-2 text-sm text-muted-foreground">Default variant</p>
        <Tabs defaultValue="tab-1">
          <TabsList variant="default">
            <TabsTrigger value="tab-1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab-2">Tab 2</TabsTrigger>
            <TabsTrigger value="tab-3">Tab 3</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div>
        <p className="mb-2 text-sm text-muted-foreground">Line variant</p>
        <Tabs defaultValue="tab-1">
          <TabsList variant="line">
            <TabsTrigger value="tab-1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab-2">Tab 2</TabsTrigger>
            <TabsTrigger value="tab-3">Tab 3</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <Tabs defaultValue="tab-1" orientation="vertical" className="max-w-sm">
      <TabsList>
        <TabsTrigger value="tab-1">Profile</TabsTrigger>
        <TabsTrigger value="tab-2">Security</TabsTrigger>
        <TabsTrigger value="tab-3">Billing</TabsTrigger>
      </TabsList>
      <TabsContent value="tab-1">Profile information.</TabsContent>
      <TabsContent value="tab-2">Security settings.</TabsContent>
      <TabsContent value="tab-3">Billing details.</TabsContent>
    </Tabs>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Tabs defaultValue="tab-1" className="w-full max-w-md">
      <TabsList>
        <TabsTrigger value="tab-1">Active</TabsTrigger>
        <TabsTrigger value="tab-2" disabled>
          Disabled
        </TabsTrigger>
        <TabsTrigger value="tab-3">Available</TabsTrigger>
      </TabsList>
    </Tabs>
  ),
}
