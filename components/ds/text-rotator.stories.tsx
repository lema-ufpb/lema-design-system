import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { TextRotator } from "./text-rotator"

const meta = {
  title: "Data Display/TextRotator",
  component: TextRotator,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A TextRotator component for the LEMA Design System.",
          "Supports CVA variants.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `words` | `string[]` | — | - |",
          "| `interval` | `number` | — | - |",
          "| `pauseOnHover` | `boolean` | — | - |",
          '| `transition` | `"slide" \| "fade"` | `"slide"` | Variant |',
        ].join("\n"),
      },
    },
    layout: "centered",
  },
  argTypes: {
    transition: {
      control: "inline-radio",
      options: ["slide", "fade"],
    },
    interval: {
      control: "number",
    },
    pauseOnHover: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof TextRotator>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    words: ["inovadores", "acessíveis", "escaláveis", "consistentes"],
    interval: 2500,
    transition: "slide",
  },
}

export const FadeTransition: Story = {
  args: {
    words: [
      "desenvolvedores",
      "designers",
      "gerentes de produto",
      "pesquisadores",
    ],
    interval: 2000,
    transition: "fade",
  },
}

export const InHeadline: Story = {
  args: {
    words: ["mais rápidos", "acessíveis", "modernos", "robustos"],
  },
  render: () => (
    <div className="max-w-xl py-6 text-center">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Crie produtos digitais{" "}
        <TextRotator
          words={["mais rápidos", "acessíveis", "modernos", "robustos"]}
          interval={2500}
        />
        <br />
        para toda a universidade.
      </h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Passe o mouse sobre a palavra em destaque para pausar a rotação
        automática.
      </p>
    </div>
  ),
}
