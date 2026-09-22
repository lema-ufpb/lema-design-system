import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, within, userEvent } from "storybook/test"

import { TransferList, type TransferListItem } from "./transfer-list"

const sampleVariables: TransferListItem[] = [
  {
    id: "gdp",
    label: "GDP Per Capita",
    description: "IPCA-deflated series",
  },
  {
    id: "inflation",
    label: "Inflation Rate",
    description: "12m cumulative IPCA",
  },
  {
    id: "selic",
    label: "Selic Base Rate",
    description: "Copom target (% p.a.)",
  },
  {
    id: "exchange",
    label: "Exchange Rate",
    description: "USD/BRL PTAX closing",
  },
  {
    id: "unemp",
    label: "PNAD Unemployment",
    description: "Quarterly unemployment rate",
  },
  {
    id: "fisc_debt",
    label: "Gross Debt / GDP",
    description: "General government debt",
  },
  {
    id: "exports",
    label: "Export Volume",
    description: "MDIC trade balance",
  },
]

const meta = {
  title: "Form/TransferList",
  component: TransferList,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Dual-panel selector for picking and ordering variables or items between Available and Selected sets.",
      },
    },
  },
  args: {
    items: sampleVariables,
    value: ["gdp", "selic"],
    onChange: () => {},
  },
  argTypes: {
    searchable: {
      control: "boolean",
      description: "Shows quick search inside panels.",
    },
    disabled: {
      control: "boolean",
      description: "Disables interaction.",
    },
    locale: {
      control: "radio",
      options: ["en-US", "pt-BR", "es-ES", "fr-FR"],
      description: "Localization language.",
    },
  },
} satisfies Meta<typeof TransferList>

export default meta
type Story = StoryObj<typeof meta>

function InteractiveTransferList(
  props: Partial<React.ComponentProps<typeof TransferList>>
) {
  const [selected, setSelected] = React.useState<string[]>(
    props.value ?? ["gdp", "selic"]
  )

  return (
    <div className="w-full max-w-2xl">
      <TransferList
        items={sampleVariables}
        value={selected}
        onChange={(newVals) => {
          setSelected(newVals)
          props.onChange?.(newVals)
        }}
        {...props}
      />
    </div>
  )
}

export const Default: Story = {
  render: (args) => <InteractiveTransferList {...args} />,
  args: {
    locale: "en-US",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const item = canvas.getByText("Inflation Rate")
    await expect(item).toBeInTheDocument()
    await expect(canvas.getByText("GDP Per Capita")).toBeInTheDocument()
    await userEvent.click(item)
  },
}

export const CustomTitles: Story = {
  render: (args) => (
    <InteractiveTransferList
      {...args}
      titles={["Explanatory Variables", "Model Regressors"]}
    />
  ),
}

export const Disabled: Story = {
  render: (args) => <InteractiveTransferList {...args} disabled />,
  args: {
    disabled: true,
  },
}

export const Locales: Story = {
  render: () => (
    <div className="flex w-full max-w-2xl flex-col gap-6">
      <div>
        <span className="block pb-1 text-xs font-semibold text-muted-foreground">
          en-US:
        </span>
        <InteractiveTransferList locale="en-US" />
      </div>
      <div>
        <span className="block pb-1 text-xs font-semibold text-muted-foreground">
          pt-BR:
        </span>
        <InteractiveTransferList locale="pt-BR" />
      </div>
    </div>
  ),
}
