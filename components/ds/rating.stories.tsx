import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Rating } from "./rating"

const meta = {
  title: "Data Display/Rating",
  component: Rating,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Componente interativo para avaliação baseada em ícones (estrelas).",
      },
    },
  },
  argTypes: {
    value: {
      control: "number",
      description: "Valor atual da avaliação.",
    },
    max: {
      control: "number",
      description: "Valor máximo da escala (quantidade de estrelas).",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Tamanho das estrelas.",
    },
    readonly: {
      control: "boolean",
      description: "Desabilita a interação com o componente.",
    },
    disabled: {
      control: "boolean",
      description: "Desabilita visualmente o componente.",
    },
  },
} satisfies Meta<typeof Rating>

export default meta
type Story = StoryObj<typeof meta>

// Stateful wrapper for interactive stories
function InteractiveRating(props: React.ComponentProps<typeof Rating>) {
  const [value, setValue] = React.useState(props.value)
  return <Rating {...props} value={value} onChange={setValue} />
}

export const Default: Story = {
  render: (args) => <InteractiveRating {...args} />,
  args: {
    value: 3,
    max: 5,
    size: "md",
  },
}

export const Readonly: Story = {
  args: {
    value: 4,
    max: 5,
    size: "md",
    readonly: true,
  },
}

export const AllSizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Rating {...args} size="sm" />
      <Rating {...args} size="md" />
      <Rating {...args} size="lg" />
    </div>
  ),
  args: {
    value: 3,
    readonly: true,
  },
  parameters: {
    docs: {
      description: {
        story: "O componente suporta 3 tamanhos: sm, md e lg.",
      },
    },
  },
}

export const Disabled: Story = {
  args: {
    value: 2,
    max: 5,
    size: "md",
    disabled: true,
  },
}
