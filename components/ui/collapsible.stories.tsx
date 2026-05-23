import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./collapsible"
import { Button } from "./button"
import { ChevronDownIcon } from "lucide-react"

const meta = {
  title: "Shadcn UI/Collapsible",
  component: Collapsible,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "An expandable section that toggles content visibility using a trigger element.",
          "",
          "Built on Radix UI's Collapsible primitive. Use `CollapsibleTrigger` to toggle and `CollapsibleContent` for the collapsible region.",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Variant / Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Default** | `--primary` | Inherits via child button/trigger styling |",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof Collapsible>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Collapsible className="w-80">
      <CollapsibleTrigger asChild>
        <Button variant="outline" className="flex w-full items-center gap-2">
          <span>Toggle Content</span>
          <ChevronDownIcon
            data-icon="inline-start"
            className="transition-transform group-data-open/collapsible:rotate-180"
          />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2 rounded-3xl bg-muted p-4 text-sm text-muted-foreground">
        This content is collapsible. Click the trigger to show or hide it.
      </CollapsibleContent>
    </Collapsible>
  ),
}
