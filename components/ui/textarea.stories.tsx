import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Textarea } from "./textarea"

const meta = {
  title: "Shadcn UI/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A multi-line text input field supporting dynamic sizing (`field-sizing-content`), transition glows, and custom invalid validation borders.",
          "",
          "Built on top of standard native `<textarea>`, it conforms to focus states and design token system definitions.",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Field Background** | `bg-input/50` | Translucent backing fill for the textarea input area |",
          "| **Placeholder text** | `--muted-foreground` | Sub-label font color when empty |",
          "| **Focused outline ring** | `--ring` / `--border-ring` | Focus ring color bounding the textarea border |",
          "| **Focused outline glow** | `--ring/30` | Translucent glow halo around active fields |",
          "| **Validation failure border** | `--destructive` | Red border indicating verification issues |",
          "| **Validation failure glow** | `--destructive/20` | Light red outer glow for invalid inputs (dark mode: `destructive/40`) |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    disabled: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    placeholder: {
      control: "text",
      table: { defaultValue: { summary: "" } },
    },
  },
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: "Enter your message...",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Multi-line text input with a placeholder prompting the user to enter a message.",
      },
    },
  },
}

export const WithValue: Story = {
  args: {
    "aria-label": "Message content",
    value: "This is a pre-filled textarea with some content.",
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Disabled textarea",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Textarea in a disabled state with a placeholder indicating it cannot be edited.",
      },
    },
  },
}

export const Invalid: Story = {
  args: {
    "aria-invalid": true,
    placeholder: "Invalid textarea",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Textarea in an invalid state with destructive border styling indicated by aria-invalid.",
      },
    },
  },
}

export const Rows: Story = {
  render: () => (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Textarea placeholder="Default rows" aria-label="Default rows" />
      <Textarea rows={3} placeholder="3 rows" aria-label="3 rows" />
      <Textarea rows={5} placeholder="5 rows" aria-label="5 rows" />
      <Textarea rows={10} placeholder="10 rows" aria-label="10 rows" />
    </div>
  ),
}
