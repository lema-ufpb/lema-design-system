import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { CopyBlock } from "./copy-block"

const meta = {
  title: "Data Display/CopyBlock",
  component: CopyBlock,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Exibe um trecho de texto ou código com um botão acoplado para cópia rápida.",
      },
    },
  },
  argTypes: {
    value: {
      control: "text",
      description: "O texto a ser exibido e copiado.",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Tamanho do bloco.",
    },
    truncate: {
      control: "boolean",
      description:
        "Se o texto deve ser truncado (com reticências) quando exceder a largura.",
    },
    locale: {
      control: "radio",
      options: ["pt-BR", "en-US", "es-ES", "fr-FR"],
      description: "Idioma para as tooltips e aria-labels.",
    },
  },
} satisfies Meta<typeof CopyBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: "npm install @lema-ufpb/design-system",
    size: "md",
  },
}

export const AllSizes: Story = {
  args: {
    value: "",
  },
  render: (args) => (
    <div className="flex w-full max-w-md flex-col gap-4">
      <CopyBlock {...args} size="sm" value="token_abc123_sm" />
      <CopyBlock {...args} size="md" value="token_abc123_md" />
      <CopyBlock {...args} size="lg" value="token_abc123_lg" />
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
  args: {
    value: "",
  },
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-4">
      <CopyBlock locale="pt-BR" value="npm install pacote" />
      <CopyBlock locale="en-US" value="npm install package" />
      <CopyBlock locale="es-ES" value="npm install paquete" />
      <CopyBlock locale="fr-FR" value="npm install paquet" />
    </div>
  ),
}

export const Truncated: Story = {
  render: (args) => (
    <div className="w-64">
      <CopyBlock {...args} />
    </div>
  ),
  args: {
    value:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ",
    truncate: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Use `truncate={true}` se o bloco puder estar em um container menor que o conteúdo e você quiser forçar apenas 1 linha. Se for `false`, o texto quebrará em várias linhas.",
      },
    },
  },
}
