import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination"

const meta = {
  title: "Shadcn UI/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A navigation component used to paginate through sets of data across multiple pages.",
          "",
          "Composed of sub-components: `Pagination` (wrapper `<nav>`), `PaginationContent`, `PaginationItem`, `PaginationLink` (with `isActive` and `size` props), `PaginationPrevious` / `PaginationNext` (each with a customizable `text` prop), and `PaginationEllipsis`. Internally, `PaginationLink` renders a `Button` via `asChild`.",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Variant / Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Link backgrounds** | `--primary` / `--primary-foreground` | Active page button variant |",
          "| **Link outline/ghost** | `--border` / `--muted` | Inactive page button and hover states |",
          "| **Focus ring** | `--ring` / `--ring/30` | Keyboard focus outline on page buttons |",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Pagination with five page links, page 2 marked as active, previous/next arrows, and an ellipsis indicator for truncated pages.",
      },
    },
  },
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">8</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
}

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Two pagination examples demonstrating small and default page link sizes with custom previous/next labels.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" text="Previous" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" size="sm">
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive size="sm">
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" size="sm">
              3
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" text="Next" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" text="Previous" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" size="default">
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive size="default">
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" size="default">
              3
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" text="Next" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  ),
}
