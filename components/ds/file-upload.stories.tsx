import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { FileUpload } from "./file-upload"

const meta = {
  title: "Form/FileUpload",
  component: FileUpload,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "File upload area with drag-and-drop support and a progress indicator.",
          "Supports loading state, i18n support, CVA variants.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `onUpload` | `(file: File) => void` | — | - |",
          "| `accept` | `string` | — | - |",
          "| `maxSizeMB` | `number` | — | - |",
          "| `progress` | `number` | — | - |",
          '| `disabled` | `"true" \| "false"` | — | - |',
          "| `locale` | `UILocale` | — | - |",
          '| `isDragActive` | `"true" \| "false"` | — | Variant |',
          '| `size` | `"sm" \| "md"` | `"md"` | Variant |',
        ].join("\n"),
      },
    },
  },
  argTypes: {
    disabled: {
      control: "boolean",
    },
    maxSizeMB: {
      control: "number",
    },
    progress: {
      control: { type: "range", min: 0, max: 100 },
    },
    size: {
      control: "radio",
      options: ["sm", "md"],
    },
    locale: {
      control: "radio",
      options: ["en-US", "pt-BR", "es-ES", "fr-FR"],
    },
  },
} satisfies Meta<typeof FileUpload>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    maxSizeMB: 10,
    onUpload: (file) => console.log(file),
  },
}

export const AllSizes: Story = {
  render: (args) => (
    <div className="flex w-full max-w-md flex-col gap-6">
      <FileUpload {...args} size="sm" />
      <FileUpload {...args} size="md" />
    </div>
  ),
  args: {
    maxSizeMB: 10,
    onUpload: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: "The component supports 2 sizes: sm and md.",
      },
    },
  },
}

export const Locales: Story = {
  render: (args) => (
    <div className="flex w-full max-w-md flex-col gap-6">
      <FileUpload {...args} locale="en-US" />
      <FileUpload {...args} locale="pt-BR" />
      <FileUpload {...args} locale="es-ES" />
      <FileUpload {...args} locale="fr-FR" />
    </div>
  ),
  args: {
    maxSizeMB: 10,
    onUpload: () => {},
  },
}

export const Loading: Story = {
  render: (args) => {
    const [progress, setProgress] = React.useState(0)

    // Simulate upload
    React.useEffect(() => {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 10
        })
      }, 500)
      return () => clearInterval(interval)
    }, [])

    return (
      <FileUpload
        {...args}
        progress={progress}
        onUpload={(file) => {
          console.log("uploading", file)
          setProgress(0)
        }}
      />
    )
  },
  args: {
    maxSizeMB: 50,
    onUpload: () => {},
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    onUpload: () => {},
  },
}
