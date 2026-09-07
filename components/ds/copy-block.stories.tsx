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
        component: [
          "Displays a text or code snippet with an attached button for quick copying.",
          "Supports i18n and CVA variants.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `value` | `string` | — | The text to display and copy. |",
          '| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Defines the size of the block. |',
          '| `truncate` | `"true" \| "false"` | — | Whether the text should truncate if it exceeds the container width. If false, it will wrap to the next line. |',
          "| `locale` | `UILocale` | — | Localization for the tooltip texts. |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    value: {
      control: "text",
      description: "The text to display and copy.",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Block size.",
    },
    truncate: {
      control: "boolean",
      description:
        "Whether the text should truncate with ellipsis when it overflows.",
    },
    locale: {
      control: "radio",
      options: ["pt-BR", "en-US", "es-ES", "fr-FR"],
      description: "Locale for tooltips and aria-labels.",
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
        story: "The component supports 3 sizes: sm, md and lg.",
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
          "Use `truncate={true}` when the block may be in a container smaller than the content and you want to force a single line. When `false`, the text wraps to multiple lines.",
      },
    },
  },
}
