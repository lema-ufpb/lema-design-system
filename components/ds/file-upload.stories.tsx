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
        component:
          "Área de upload de arquivos com suporte a arrastar e soltar (drag and drop) e barra de progresso.",
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
      options: ["pt-BR", "en-US", "es-ES", "fr-FR"],
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
        story: "O componente suporta 2 tamanhos: sm e md.",
      },
    },
  },
}

export const Locales: Story = {
  render: (args) => (
    <div className="flex w-full max-w-md flex-col gap-6">
      <FileUpload {...args} locale="pt-BR" />
      <FileUpload {...args} locale="en-US" />
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
