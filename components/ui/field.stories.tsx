import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
  FieldTitle,
} from "./field"
import { Input } from "./input"

const meta = {
  title: "Shadcn UI/Field",
  component: Field,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A flexible form field layout for composing labels, inputs, descriptions, and validation errors.",
          "",
          "Supports `orientation` variants (`vertical`, `horizontal`, `responsive`) and aggregates multiple errors into a deduplicated list. The `FieldSet` / `FieldLegend` pair mirrors native `<fieldset>` / `<legend>` semantics.",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Variant / Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Error text** | `--destructive` | Validation error message color |",
          "| **Description text** | `--muted-foreground` | Helper description text |",
          "| **Separator** | `--border` | Horizontal rule between fields |",
          "| **Disabled field** | `--foreground` / reduced opacity | Dimmed appearance when disabled |",
          "| **Background** | `--background` | Separator text background |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    orientation: {
      control: "select",
      options: ["vertical", "horizontal", "responsive"],
      description: "Layout orientation of label and content",
      table: { defaultValue: { summary: "vertical" } },
    },
  },
} satisfies Meta<typeof Field>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Vertical field layout with a label, text input, and helper description text beneath the input.",
      },
    },
  },
  render: () => (
    <Field className="max-w-sm">
      <FieldLabel>Name</FieldLabel>
      <FieldContent>
        <Input placeholder="Enter your name" />
        <FieldDescription>Your full name as it appears on ID.</FieldDescription>
      </FieldContent>
    </Field>
  ),
}

export const Horizontal: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Horizontal field orientation with the label positioned beside the input for inline form layouts.",
      },
    },
  },
  render: () => (
    <Field orientation="horizontal" className="max-w-sm">
      <FieldLabel>Email</FieldLabel>
      <FieldContent>
        <Input type="email" placeholder="you@example.com" />
      </FieldContent>
    </Field>
  ),
}

export const WithError: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Field displaying multiple validation errors with data-invalid state and aria-invalid on the input.",
      },
    },
  },
  render: () => (
    <Field className="max-w-sm" data-invalid>
      <FieldLabel>Password</FieldLabel>
      <FieldContent>
        <Input type="password" defaultValue="abc" aria-invalid />
        <FieldError
          errors={[
            { message: "Password must be at least 8 characters." },
            { message: "Password must contain a number." },
          ]}
        />
      </FieldContent>
    </Field>
  ),
}

export const FieldSetExample: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Grouped fieldset with a legend title, separator between fields, and horizontal field layout.",
      },
    },
  },
  render: () => (
    <FieldSet className="max-w-md">
      <FieldLegend>Contact Information</FieldLegend>
      <FieldGroup>
        <Field orientation="horizontal">
          <FieldTitle>First Name</FieldTitle>
          <FieldContent>
            <Input placeholder="John" />
          </FieldContent>
        </Field>
        <FieldSeparator />
        <Field orientation="horizontal">
          <FieldTitle>Last Name</FieldTitle>
          <FieldContent>
            <Input placeholder="Doe" />
          </FieldContent>
        </Field>
      </FieldGroup>
    </FieldSet>
  ),
}
