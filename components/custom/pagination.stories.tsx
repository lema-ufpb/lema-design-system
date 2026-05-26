import * as React from "react"
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
  title: "Navigation/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A semantic pagination component built with native `<nav>` and `<ul>` elements for accessibility.",
          "",
          "It uses the `Button` component internally for links and handles states like active pages and disabled navigation. The `PaginationLink` accepts an `isActive` prop to highlight the current page.",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Active Link** | `--background` / `--border` | Highlights the current page using the `outline` Button variant |",
          "| **Inactive Links** | `transparent` | Uses the `ghost` Button variant for unselected pages |",
          "| **Hover state** | `--accent` | Subtle gray background when hovering over pagination items |",
          "| **Text color** | `--foreground` | Default text color for page numbers and labels |",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
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
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Default pagination with previous, page numbers (1–3), ellipsis, and next buttons.",
      },
    },
  },
}

export const LocalePTBR: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" text="Anterior" />
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
          <PaginationNext href="#" text="Próxima" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
  args: { locale: "pt-BR" },
  parameters: {
    docs: {
      description: {
        story:
          "Portuguese (pt-BR) localization — previous/next button text translated.",
      },
    },
  },
}

export const CustomText: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" text="Anterior" />
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
          <PaginationNext href="#" text="Próxima" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Pagination with custom text labels for previous and next buttons.",
      },
    },
  },
}
