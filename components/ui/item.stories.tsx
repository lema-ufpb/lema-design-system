import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  Item,
  ItemGroup,
  ItemMedia,
  ItemContent,
  ItemActions,
  ItemTitle,
  ItemDescription,
  ItemHeader,
  ItemFooter,
  ItemSeparator,
} from "./item"
import { Button } from "./button"
import { StarIcon, EllipsisVerticalIcon } from "lucide-react"

const meta = {
  title: "Shadcn UI/Item",
  component: Item,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A versatile list item composable for building structured list rows, cards, or selection entries.",
          "",
          "Supports `variant` (`default`, `outline`, `muted`) and `size` (`default`, `sm`, `xs`) props. The `asChild` prop enables rendering as a custom element. Sub-components include media (with `default`, `icon`, `image` variants), content, title, description, actions, header, and footer.",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Variant / Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Focus ring** | `--ring` / `--ring/50` | Keyboard focus indicator |",
          "| **Outline border** | `--border` | Border for outline variant |",
          "| **Muted background** | `--muted/50` | Subtle background for muted variant |",
          "| **Description text** | `--muted-foreground` | Secondary text below title |",
          "| **Hover background** | `--muted` | Background on row hover |",
          "| **Separator** | `--border` | Divider between items |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["default", "outline", "muted"],
      description: "Visual style variant",
      table: { defaultValue: { summary: "default" } },
    },
    size: {
      control: "inline-radio",
      options: ["default", "sm", "xs"],
      description: "Size preset",
      table: { defaultValue: { summary: "default" } },
    },
    asChild: {
      table: { disable: true },
    },
  },
} satisfies Meta<typeof Item>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "List of two items with icon media, title, description, and a ghost action button.",
      },
    },
  },
  render: () => (
    <ItemGroup className="max-w-md">
      <Item>
        <ItemMedia variant="icon">
          <StarIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Getting Started</ItemTitle>
          <ItemDescription>
            Learn the basics and set up your first project.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="xs" variant="ghost">
            Open
          </Button>
        </ItemActions>
      </Item>
      <ItemSeparator />
      <Item>
        <ItemMedia variant="icon">
          <StarIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Advanced Guide</ItemTitle>
          <ItemDescription>
            Deep dive into advanced features and configuration.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="xs" variant="ghost">
            Open
          </Button>
        </ItemActions>
      </Item>
    </ItemGroup>
  ),
}

export const Outline: Story = {
  args: {
    variant: "outline",
  },
  render: () => (
    <ItemGroup className="max-w-md">
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Project Alpha</ItemTitle>
          <ItemDescription>Last updated 2 days ago</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="icon-xs" variant="ghost">
            <EllipsisVerticalIcon />
          </Button>
        </ItemActions>
      </Item>
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Project Beta</ItemTitle>
          <ItemDescription>Last updated 5 days ago</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="icon-xs" variant="ghost">
            <EllipsisVerticalIcon />
          </Button>
        </ItemActions>
      </Item>
    </ItemGroup>
  ),
}

export const WithHeader: Story = {
  render: () => (
    <ItemGroup className="max-w-md">
      <ItemHeader>
        <ItemTitle>Projects</ItemTitle>
      </ItemHeader>
      <Item>
        <ItemMedia variant="icon">
          <StarIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Design System</ItemTitle>
          <ItemDescription>Component library and style guide.</ItemDescription>
        </ItemContent>
      </Item>
      <ItemFooter>
        <span className="text-xs text-muted-foreground">3 items</span>
      </ItemFooter>
    </ItemGroup>
  ),
}
