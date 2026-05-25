import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion"

const meta = {
  title: "Shadcn UI/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A vertically stacked set of interactive headings that each reveal a section of content.",
          "",
          "Built on top of **Radix UI Accordion**, it supports single or multiple expanded sections, smooth collapse/expand animations, keyboard accessibility, and standard ARIA attributes.",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Container border** | `--border` | Outer boundary border |",
          "| **Row divider** | `--border` | Separates individual accordion items |",
          "| **Active background** | `--muted` | Light background for the active (open) item |",
          "| **Icon color** | `--muted-foreground` | Chevron indicators color |",
          "| **Text color** | `--foreground` | Content and trigger text color |",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    type: "single",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Single-selection mode with three FAQ-style items, where the first item is expanded by default.",
      },
    },
  },
  render: () => (
    <Accordion type="single" defaultValue="item-1" className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is this component?</AccordionTrigger>
        <AccordionContent>
          This is an accordion component that allows you to collapse and expand
          content sections.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>How does it work?</AccordionTrigger>
        <AccordionContent>
          Click on the trigger to expand or collapse the content. Only one item
          can be open at a time.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Can I customize it?</AccordionTrigger>
        <AccordionContent>
          Yes, you can customize the styling using Tailwind CSS classes and
          semantic color tokens.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const Multiple: Story = {
  args: {
    type: "multiple",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Multiple-selection mode allowing several sections to remain open at the same time.",
      },
    },
  },
  render: () => (
    <Accordion type="multiple" className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Section 1</AccordionTrigger>
        <AccordionContent>
          Content for section 1. You can have multiple sections open at once.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Section 2</AccordionTrigger>
        <AccordionContent>
          Content for section 2. Another section that can be independently
          toggled.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Section 3</AccordionTrigger>
        <AccordionContent>
          Content for section 3. More collapsible content here.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const Collapsible: Story = {
  args: {
    type: "single",
    collapsible: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Collapsible mode where the open item can be closed by clicking its trigger again.",
      },
    },
  },
  render: () => (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Click to expand</AccordionTrigger>
        <AccordionContent>
          This item can be collapsed by clicking on the trigger again.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Another item</AccordionTrigger>
        <AccordionContent>
          This one can also be collapsed. All items are independently
          collapsible.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const DefaultOpen: Story = {
  args: {
    type: "single",
    defaultValue: "item-2",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Single-selection accordion with the second item pre-expanded via the `defaultValue` prop.",
      },
    },
  },
  render: () => (
    <Accordion type="single" defaultValue="item-2" className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>First item (closed)</AccordionTrigger>
        <AccordionContent>This content is hidden by default.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Second item (open)</AccordionTrigger>
        <AccordionContent>
          This content is visible initially because it&apos;s set as the default
          value.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const RichContent: Story = {
  args: {
    type: "single",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates complex content inside accordion panels including lists, links, and multiple paragraphs.",
      },
    },
  },
  render: () => (
    <Accordion type="single" defaultValue="item-1" className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Features</AccordionTrigger>
        <AccordionContent>
          <ul className="list-disc pl-4">
            <li>Keyboard navigation support</li>
            <li>Accessible by default</li>
            <li>Animated transitions</li>
            <li>Customizable styling</li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Links and formatting</AccordionTrigger>
        <AccordionContent>
          <p>
            You can include <a href="#">links</a> and various text formatting.
          </p>
          <p className="mt-2">
            Multiple paragraphs are supported with proper spacing.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}
