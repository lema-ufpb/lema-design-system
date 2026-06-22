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
          "It uses the `Button` component internally for links and handles states like active pages and disabled navigation. The `PaginationLink` accepts an `isActive` prop to highlight the current page and a `rounded` prop (`full` / `light` / `none`) to control button border radius.",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Active Link** | `--background` / `--border` | Highlights the current page using the `outline` Button variant |",
          "| **Inactive Links** | `transparent` | Uses the `ghost` Button variant for unselected pages |",
          "| **Hover state** | `--accent` | Subtle gray background when hovering over pagination items |",
          "| **Text color** | `--foreground` | Default text color for page numbers and labels |",
          "",
          "## Component Props — Pagination",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          '| `locale` | `UILocale` | `"en-US"` | Locale for nav aria-label |',
          "",
          "### PaginationLink",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `isActive` | `boolean` | — | Highlights the current page |",
          '| `rounded` | `"full" \\| "light" \\| "none"` | `"full"` | Border radius of the button |',
          "",
          "### PaginationPrevious / PaginationNext",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `text` | `string` | — | Custom label text |",
          '| `rounded` | `"full" \\| "light" \\| "none"` | `"full"` | Border radius |',
          '| `locale` | `UILocale` | `"en-US"` | Locale for aria-label |',
          "",
          "### PaginationEllipsis",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          '| `locale` | `UILocale` | `"en-US"` | Locale for sr-only text |',
        ].join("\n"),
      },
    },
  },
  argTypes: {
    locale: {
      control: "inline-radio",
      options: ["en-US", "pt-BR", "es-ES", "fr-FR"],
      table: { defaultValue: { summary: "en-US" } },
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
          <PaginationPrevious href="#" text="Previous" />
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
          <PaginationNext href="#" text="Next" />
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

export const RoundedFull: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" rounded="full" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" rounded="full">
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive rounded="full">
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" rounded="full">
            3
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" rounded="full" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Fully rounded buttons via `rounded="full"` (default).',
      },
    },
  },
}

export const RoundedLight: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" rounded="light" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" rounded="light">
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive rounded="light">
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" rounded="light">
            3
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" rounded="light" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lightly rounded buttons via `rounded="light"`.',
      },
    },
  },
}

export const RoundedNone: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" rounded="none" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" rounded="none">
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive rounded="none">
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" rounded="none">
            3
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" rounded="none" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Square buttons via `rounded="none"`.',
      },
    },
  },
}

export const CustomText: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" text="Previous" />
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
          <PaginationNext href="#" text="Next" />
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
