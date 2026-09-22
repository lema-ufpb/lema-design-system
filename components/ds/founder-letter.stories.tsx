import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, within } from "storybook/test"
import { FounderLetter } from "./founder-letter"

const meta: Meta<typeof FounderLetter> = {
  title: "About/FounderLetter",
  component: FounderLetter,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A FounderLetter component for the LEMA Design System.",
          "Supports loading state, CVA variants.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `title` | `string` | — | - |",
          "| `paragraphs` | `string[]` | — | - |",
          "| `authorName` | `string` | — | - |",
          "| `authorRole` | `string` | — | - |",
          "| `authorAvatar` | `string` | — | - |",
          "| `authorSignature` | `string` | — | - |",
          "| `withDropCap` | `boolean` | — | - |",
          '| `variant` | `"default" \| "elevated" \| "muted"` | `"default"` | Variant |',
        ].join("\n"),
      },
    },
    layout: "centered",
  },
  args: {
    title: "A letter to our academic and technical community",
    paragraphs: [
      "When we founded the laboratory, we had a primordial certainty: that public interfaces and computational systems must be designed with the same mathematical elegance and technical precision devoted to fundamental scientific research.",
      "Today, our design system is the living synthesis of that purpose. It reflects dozens of iterations, continuous dialogues with researchers, students, and society, establishing an inclusive, accessible, and aesthetically refined digital ecosystem.",
      "We remain dedicated to expanding these frontiers with integrity and continuous passion for excellence.",
    ],
    authorName: "Prof. Dr. Hilton Filho",
    authorRole: "General Coordinator and Lead Researcher",
    authorAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
    authorSignature:
      "https://upload.wikimedia.org/wikipedia/commons/e/ea/John_Hancock_signature.svg",
    withDropCap: true,
    variant: "default",
  },
}

export default meta
type Story = StoryObj<typeof FounderLetter>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Prof. Dr. Hilton Filho")).toBeInTheDocument()
    await expect(
      canvas.getByText(/A letter to our academic/i)
    ).toBeInTheDocument()
  },
}

export const WithoutDropCap: Story = {
  args: {
    withDropCap: false,
  },
}

export const Elevated: Story = {
  args: {
    variant: "elevated",
  },
}
