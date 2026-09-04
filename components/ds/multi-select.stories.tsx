import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  MonitorIcon,
  SmartphoneIcon,
  TabletIcon,
  WatchIcon,
} from "lucide-react"

import { MultiSelect } from "./multi-select"

const meta = {
  title: "Form/MultiSelect",
  component: MultiSelect,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Combobox que permite selecionar múltiplos itens de uma lista.",
      },
    },
  },
  argTypes: {
    disabled: {
      control: "boolean",
    },
    maxCount: {
      control: "number",
      description:
        "Número máximo de badges exibidos antes de agrupar (+X selecionados).",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
    },
    locale: {
      control: "radio",
      options: ["pt-BR", "en-US", "es-ES", "fr-FR"],
    },
  },
} satisfies Meta<typeof MultiSelect>

export default meta
type Story = StoryObj<typeof meta>

const MOCK_OPTIONS = [
  { label: "Mobile", value: "mobile", icon: SmartphoneIcon },
  { label: "Tablet", value: "tablet", icon: TabletIcon },
  { label: "Desktop", value: "desktop", icon: MonitorIcon },
  { label: "Watch", value: "watch", icon: WatchIcon },
  { label: "TV", value: "tv" },
]

function InteractiveMultiSelect(
  props: React.ComponentProps<typeof MultiSelect>
) {
  const [value, setValue] = React.useState<string[]>(props.value || [])
  return (
    <div className="w-[300px]">
      <MultiSelect {...props} value={value} onChange={setValue} />
    </div>
  )
}

export const Default: Story = {
  render: (args) => <InteractiveMultiSelect {...args} />,
  args: {
    options: MOCK_OPTIONS,
    value: [],
    onChange: () => {},
  },
}

export const MaxCount: Story = {
  render: (args) => <InteractiveMultiSelect {...args} />,
  args: {
    options: MOCK_OPTIONS,
    value: ["mobile", "tablet", "desktop", "watch"],
    maxCount: 2,
    onChange: () => {},
  },
  parameters: {
    docs: {
      description: {
        story:
          "Com `maxCount=2`, ao selecionar 3 itens, ele mostrará os 2 primeiros e '+1 selecionados'.",
      },
    },
  },
}

export const Disabled: Story = {
  render: (args) => <InteractiveMultiSelect {...args} />,
  args: {
    options: MOCK_OPTIONS,
    value: ["mobile"],
    disabled: true,
    onChange: () => {},
  },
}

export const AllSizes: Story = {
  render: (args) => (
    <div className="flex w-[300px] flex-col gap-4">
      <InteractiveMultiSelect {...args} size="sm" />
      <InteractiveMultiSelect {...args} size="md" />
      <InteractiveMultiSelect {...args} size="lg" />
    </div>
  ),
  args: {
    options: MOCK_OPTIONS,
    value: ["mobile", "tablet"],
    onChange: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: "O componente suporta 3 tamanhos de badge: sm, md e lg.",
      },
    },
  },
}

export const Locales: Story = {
  render: (args) => (
    <div className="flex w-[300px] flex-col gap-4">
      <InteractiveMultiSelect {...args} locale="pt-BR" />
      <InteractiveMultiSelect {...args} locale="en-US" />
      <InteractiveMultiSelect {...args} locale="es-ES" />
      <InteractiveMultiSelect {...args} locale="fr-FR" />
    </div>
  ),
  args: {
    options: MOCK_OPTIONS,
    value: ["mobile"],
    onChange: () => {},
  },
}
