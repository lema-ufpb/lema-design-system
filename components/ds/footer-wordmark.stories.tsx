import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { FooterWordmark } from "./footer-wordmark"

const meta: Meta<typeof FooterWordmark> = {
  title: "Footer/FooterWordmark",
  component: FooterWordmark,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A FooterWordmark component for the LEMA Design System.",
          "Supports CVA variants.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `text` | `string` | — | - |",
          "| `decorative` | `boolean` | — | - |",
          '| `align` | `"center" \| "left"` | `"center"` | Variant |',
          '| `variant` | `"outline" \| "muted" \| "gradient"` | `"outline"` | Variant |',
        ].join("\n"),
      },
    },
  },
  args: {
    text: "LEMA",
    variant: "outline",
    align: "center",
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const AllVariants: Story = {
  render: () => (
    <div className="flex w-full flex-col gap-12">
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold text-muted-foreground uppercase">
          Outline:
        </span>
        <FooterWordmark text="LEMA" variant="outline" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold text-muted-foreground uppercase">
          Muted Fill:
        </span>
        <FooterWordmark text="LEMA" variant="muted" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold text-muted-foreground uppercase">
          Gradient:
        </span>
        <FooterWordmark text="LEMA" variant="gradient" />
      </div>
    </div>
  ),
}

export const CustomInstitution: Story = {
  args: {
    text: "UFPB",
    variant: "outline",
  },
}
