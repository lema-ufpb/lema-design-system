import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Input } from "./input"

const meta = {
  title: "Shadcn UI/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A fundamental form text input element styling standard inputs such as text, passwords, emails, numbers, search bars, and files.",
          "",
          "Includes out-of-the-box support for dark theme adaptations, standard input placeholder styles, disabled/readonly states, validation highlights, and keyboard navigation outlines.",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Input background** | `bg-input/50` | Translucent background input tray |",
          "| **Input text** | `--foreground` | Main font color for typed input values |",
          "| **Input placeholders** | `--muted-foreground` | Idle hint font color |",
          "| **Focused border outline** | `--ring` / `--border-ring` | Highlight ring when selecting the input field |",
          "| **Error state border** | `--destructive` | Red outer boundary ring for invalid entries |",
          "| **Error focus ring** | `--destructive/20` | Subtle red outer halo for validation failures |",
          "| **File upload trigger** | `--foreground` | Text color for browser file triggers |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    type: {
      control: "select",
      options: ["text", "password", "email", "number", "search", "tel", "url"],
      table: { defaultValue: { summary: "text" } },
    },
    disabled: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    placeholder: {
      control: "text",
      table: { defaultValue: { summary: "" } },
    },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Basic text input with a placeholder prompting the user to enter text.",
      },
    },
  },
}

export const Types: Story = {
  render: () => (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Input type="text" placeholder="Text input" aria-label="Text input" />
      <Input type="email" placeholder="Email input" aria-label="Email input" />
      <Input
        type="password"
        placeholder="Password input"
        aria-label="Password input"
      />
      <Input
        type="number"
        placeholder="Number input"
        aria-label="Number input"
      />
      <Input
        type="search"
        placeholder="Search input"
        aria-label="Search input"
      />
      <Input type="tel" placeholder="Phone input" aria-label="Phone input" />
      <Input type="url" placeholder="URL input" aria-label="URL input" />
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Disabled input",
    value: "Disabled value",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Input in a disabled state with a pre-filled value that cannot be modified.",
      },
    },
  },
}

export const WithValue: Story = {
  args: {
    "aria-label": "Filled input",
    value: "Filled input value",
  },
}

export const Invalid: Story = {
  args: {
    "aria-invalid": true,
    placeholder: "Invalid input",
  },
}

export const File: Story = {
  args: {
    type: "file",
    "aria-label": "File input",
  },
}
