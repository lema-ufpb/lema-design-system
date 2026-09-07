import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ContactForm } from "./contact-form"
import type { UILocale } from "@/lib/ui-i18n"

const topics = [
  { value: "sales", label: "Sales" },
  { value: "support", label: "Support" },
  { value: "partnerships", label: "Partnerships" },
]

const meta = {
  title: "Contact/ContactForm",
  component: ContactForm,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: [
          "A name/email/message contact form built with FieldGroup + Field, with idle/submitting/success/error states matching WaitlistForm's pattern.",
          "Supports i18n and CVA variants.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `topics` | `ContactFormTopic[]` | — | /** Optional topic/department chips rendered above the message field. */ |",
          "| `showSubject` | `boolean` | — | /** Shows the subject field. Defaults to true when `topics` is omitted. */ |",
          "| `onSubmit` | `(values: ContactFormValues) => Promise<boolean \| void> \| void` | — | - |",
          "| `locale` | `UILocale` | — | - |",
          "| `disabled` | `boolean` | — | - |",
          '| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Variant |',
        ].join("\n"),
      },
    },
  },
  args: {
    size: "md",
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof ContactForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const AllSizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-10">
      <ContactForm {...args} size="sm" />
      <ContactForm {...args} size="md" />
      <ContactForm {...args} size="lg" />
    </div>
  ),
}

export const WithTopics: Story = {
  args: { topics },
}

export const WithoutSubject: Story = {
  args: { showSubject: false },
}

export const SubmitError: Story = {
  args: {
    onSubmit: async () => false,
  },
}

export const Locales: Story = {
  render: () => (
    <div className="flex flex-col gap-10">
      {(["en-US", "pt-BR", "es-ES", "fr-FR"] as UILocale[]).map((locale) => (
        <ContactForm key={locale} locale={locale} topics={topics} />
      ))}
    </div>
  ),
}
