import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { TagInput } from "./tag-input"

const meta: Meta<typeof TagInput> = {
  title: "Form/TagInput",
  component: TagInput,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A TagInput component for the LEMA Design System.",
          "Supports loading state, skeleton, i18n support.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `value` | `string[]` | — | - |",
          "| `onChange` | `(tags: string[]) => void` | — | - |",
          "| `maxTags` | `number` | — | - |",
          "| `allowDuplicates` | `boolean` | — | - |",
          "| `separator` | `string \| RegExp \| (string \| RegExp)[]` | — | - |",
          "| `placeholder` | `string` | — | - |",
          "| `loading` | `boolean` | — | - |",
          '| `disabled` | `"true"` | — | - |',
          '| `invalid` | `"true"` | — | - |',
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
} satisfies Meta<typeof TagInput>

export default meta
type Story = StoryObj<typeof TagInput>

// Wrapper to manage state in the story
const TagInputWithState = (args: React.ComponentProps<typeof TagInput>) => {
  const [tags, setTags] = React.useState<string[]>(args.value || [])

  return (
    <div className="w-full max-w-sm">
      <TagInput {...args} value={tags} onChange={setTags} />
    </div>
  )
}

export const Default: Story = {
  render: (args) => <TagInputWithState {...args} />,
  args: {
    value: [],
    placeholder: "Type tags and press Enter",
  },
}

export const AllSizes: Story = {
  render: (args) => (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <TagInputWithState {...args} size="sm" placeholder="Size sm" />
      <TagInputWithState {...args} size="md" placeholder="Size md" />
      <TagInputWithState {...args} size="lg" placeholder="Size lg" />
    </div>
  ),
  args: {
    value: ["React", "Next.js"],
  },
}

export const MaxTags: Story = {
  render: (args) => <TagInputWithState {...args} />,
  args: {
    value: ["Design", "System"],
    maxTags: 3,
    placeholder: "Maximum 3 tags",
  },
}

export const WithInitialValues: Story = {
  render: (args) => <TagInputWithState {...args} />,
  args: {
    value: ["Frontend", "Backend", "Fullstack", "DevOps", "UX", "UI", "QA"],
  },
}

export const Disabled: Story = {
  render: (args) => <TagInputWithState {...args} />,
  args: {
    value: ["Inactive", "Not clickable"],
    disabled: true,
  },
}

export const Invalid: Story = {
  render: (args) => <TagInputWithState {...args} />,
  args: {
    value: ["Error"],
    invalid: true,
  },
}

export const Loading: Story = {
  render: (args) => (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <TagInput {...args} size="sm" value={[]} onChange={() => {}} loading />
      <TagInput {...args} size="md" value={[]} onChange={() => {}} loading />
      <TagInput {...args} size="lg" value={[]} onChange={() => {}} loading />
    </div>
  ),
  args: {
    loading: true,
  },
}
