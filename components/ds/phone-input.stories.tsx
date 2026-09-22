import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { PhoneInput } from "./phone-input"

const meta: Meta<typeof PhoneInput> = {
  title: "Form/PhoneInput",
  component: PhoneInput,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A PhoneInput component for the LEMA Design System.",
          "Supports loading state, skeleton, i18n support.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `value` | `string` | — | - |",
          "| `onChange` | `(value: string) => void` | — | - |",
          "| `country` | `string` | — | - |",
          "| `onCountryChange` | `(country: string) => void` | — | - |",
          "| `countries` | `CountryData[]` | — | - |",
          "| `loading` | `boolean` | — | - |",
          '| `invalid` | `"true"` | — | - |',
          '| `disabled` | `"true"` | — | - |',
          "| `locale` | `UILocale` | — | - |",
          '| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Variant |',
        ].join("\n"),
      },
    },
  },
  args: {
    size: "md",
    disabled: false,
    invalid: false,
    loading: false,
    locale: "en-US",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    locale: {
      control: "select",
      options: ["en-US", "pt-BR", "es-ES", "fr-FR"],
    },
  },
}

export default meta
type Story = StoryObj<typeof PhoneInput>

// Wrapper to manage state in the story
const PhoneInputWithState = (args: React.ComponentProps<typeof PhoneInput>) => {
  const [value, setValue] = React.useState(args.value || "")
  const [country, setCountry] = React.useState(args.country || "BR")

  return (
    <div className="w-full max-w-sm">
      <PhoneInput
        {...args}
        value={value}
        onChange={setValue}
        country={country}
        onCountryChange={setCountry}
      />
    </div>
  )
}

export const Default: Story = {
  render: (args) => <PhoneInputWithState {...args} />,
  args: {
    placeholder: "(00) 00000-0000",
    "aria-label": "Phone number",
  },
}

export const AllSizes: Story = {
  render: (args) => (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <PhoneInputWithState {...args} size="sm" placeholder="Size sm" />
      <PhoneInputWithState {...args} size="md" placeholder="Size md" />
      <PhoneInputWithState {...args} size="lg" placeholder="Size lg" />
    </div>
  ),
  args: {},
}

export const Disabled: Story = {
  render: (args) => <PhoneInputWithState {...args} />,
  args: {
    disabled: true,
    value: "11 98888-8888",
  },
}

export const Invalid: Story = {
  render: (args) => <PhoneInputWithState {...args} />,
  args: {
    invalid: true,
    value: "numero_invalido",
  },
}

export const Loading: Story = {
  render: (args) => (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <PhoneInput {...args} size="sm" loading />
      <PhoneInput {...args} size="md" loading />
      <PhoneInput {...args} size="lg" loading />
    </div>
  ),
  args: {
    loading: true,
  },
}
