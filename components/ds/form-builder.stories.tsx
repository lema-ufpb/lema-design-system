import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, within } from "storybook/test"
import { z } from "zod"
import { FormBuilder, type FormFieldConfig } from "./form-builder"

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.email("Enter a valid email address."),
  role: z.string().min(1, "Please select a role."),
  bio: z.string().max(200, "Keep it under 200 characters.").optional(),
  newsletter: z.boolean().optional(),
})

const signupFields: FormFieldConfig[] = [
  { name: "name", label: "Name", placeholder: "Ada Lovelace" },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "ada@example.com",
  },
  {
    name: "role",
    label: "Role",
    type: "select",
    placeholder: "Select a role",
    options: [
      { label: "Engineer", value: "engineer" },
      { label: "Designer", value: "designer" },
      { label: "Product Manager", value: "pm" },
    ],
  },
  {
    name: "bio",
    label: "Bio",
    type: "textarea",
    placeholder: "Tell us about yourself",
    description: "Optional — shown on your public profile.",
  },
  {
    name: "newsletter",
    label: "Subscribe to the newsletter",
    type: "switch",
  },
]

const meta = {
  title: "Form/FormBuilder",
  component: FormBuilder,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Generates a validated form from a zod schema (validation) plus a fields list (rendering meta). Built on react-hook-form + the project's Field/FieldGroup primitives.",
      },
    },
  },
  args: {
    schema: signupSchema,
    fields: signupFields,
    defaultValues: { role: "" },
    onSubmit: () => {},
  },
} satisfies Meta<typeof FormBuilder>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByLabelText("Name")).toBeInTheDocument()
    await expect(canvas.getByLabelText("Email")).toBeInTheDocument()
    await expect(canvas.getByText("Submit")).toBeInTheDocument()
  },
}

export const ValidationErrors: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByText("Submit"))
    await expect(
      await canvas.findByText("Name must be at least 2 characters.")
    ).toBeInTheDocument()
  },
}

export const Loading: Story = {
  args: { loading: true },
}
