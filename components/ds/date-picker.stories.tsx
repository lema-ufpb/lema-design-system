import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { DatePicker } from "./date-picker"

const meta = {
  title: "Form/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Seletor de data combinando um botão e um calendário (Popover).",
      },
    },
  },
  argTypes: {
    date: {
      control: "date",
      description: "Data selecionada.",
    },
    disabled: {
      control: "boolean",
      description: "Desabilita o seletor.",
    },
    locale: {
      control: "radio",
      options: ["pt-BR", "en-US", "es-ES", "fr-FR"],
      description: "Idioma de formatação da data.",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Tamanho do botão disparador.",
    },
  },
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

function InteractiveDatePicker(props: React.ComponentProps<typeof DatePicker>) {
  const [date, setDate] = React.useState<Date | undefined>(
    props.date ? new Date(props.date) : undefined
  )
  return <DatePicker {...props} date={date} onSelect={setDate} />
}

export const Default: Story = {
  render: (args) => <InteractiveDatePicker {...args} />,
  args: {
    locale: "pt-BR",
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const WithPreset: Story = {
  render: (args) => <InteractiveDatePicker {...args} />,
  args: {
    date: new Date(2025, 0, 1),
  },
}

export const AllSizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <DatePicker {...args} size="sm" date={new Date(2025, 0, 1)} />
      <DatePicker {...args} size="md" date={new Date(2025, 0, 1)} />
      <DatePicker {...args} size="lg" date={new Date(2025, 0, 1)} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "O componente suporta 3 tamanhos: sm, md e lg.",
      },
    },
  },
}

export const Locales: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <DatePicker locale="pt-BR" date={new Date(2025, 0, 1)} />
      <DatePicker locale="en-US" date={new Date(2025, 0, 1)} />
      <DatePicker locale="es-ES" date={new Date(2025, 0, 1)} />
      <DatePicker locale="fr-FR" date={new Date(2025, 0, 1)} />
    </div>
  ),
}
