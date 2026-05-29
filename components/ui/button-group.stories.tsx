import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "./button-group"
import { Button } from "./button"
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  SearchIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react"

const meta = {
  title: "Shadcn UI/Button Group",
  component: ButtonGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A layout container that visually groups related buttons together with merged or separated borders.",
          "",
          "Supports `horizontal` and `vertical` orientations. Includes `ButtonGroupText` for static labels and `ButtonGroupSeparator` for visual dividers between group segments.",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Variant / Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Group border** | `--border` | Outer and inter-element borders |",
          "| **Text background** | `--muted` | Surface fill for text segments |",
          "| **Separator color** | `--input` | Color of the visual divider |",
          "| **Focus ring** | `--ring` | Focus indicator on focused child buttons |",
          "| **Input group border** | `--border` | Border applied to nested input-group children |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Layout direction of the group",
      table: { defaultValue: { summary: "horizontal" } },
    },
  },
} satisfies Meta<typeof ButtonGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Horizontal button group with outline buttons for bold, italic, and underline formatting actions.",
      },
    },
  },
  render: ({ orientation }) => (
    <ButtonGroup orientation={orientation}>
      <Button variant="outline" size="sm">
        <BoldIcon data-icon="inline-start" />
        Bold
      </Button>
      <Button variant="outline" size="sm">
        <ItalicIcon data-icon="inline-start" />
        Italic
      </Button>
      <Button variant="outline" size="sm">
        <UnderlineIcon data-icon="inline-start" />
        Underline
      </Button>
    </ButtonGroup>
  ),
  args: {
    orientation: "horizontal",
  },
}

export const WithSeparator: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Two tool groups (alignment and formatting) separated by a visual divider.",
      },
    },
  },
  render: () => (
    <ButtonGroup>
      <Button variant="outline" size="sm">
        <AlignLeftIcon />
      </Button>
      <Button variant="outline" size="sm">
        <AlignCenterIcon />
      </Button>
      <Button variant="outline" size="sm">
        <AlignRightIcon />
      </Button>
      <ButtonGroupSeparator />
      <Button variant="outline" size="sm">
        <BoldIcon />
      </Button>
      <Button variant="outline" size="sm">
        <ItalicIcon />
      </Button>
      <Button variant="outline" size="sm">
        <UnderlineIcon />
      </Button>
    </ButtonGroup>
  ),
}

export const Vertical: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Vertically stacked button group with search, settings, and user icon buttons.",
      },
    },
  },
  render: () => (
    <div className="flex justify-center">
      <ButtonGroup orientation="vertical">
        <Button variant="outline" size="sm">
          <SearchIcon />
        </Button>
        <Button variant="outline" size="sm">
          <SettingsIcon />
        </Button>
        <Button variant="outline" size="sm">
          <UserIcon />
        </Button>
      </ButtonGroup>
    </div>
  ),
}

export const WithTextSegment: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Button group combining a static text label segment with an actionable button.",
      },
    },
  },
  render: () => (
    <ButtonGroup>
      <ButtonGroupText>Label</ButtonGroupText>
      <Button variant="outline" size="sm">
        Action
      </Button>
    </ButtonGroup>
  ),
}

export const IconOnly: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Compact icon-only button group using icon-sm size, suitable for toolbars.",
      },
    },
  },
  render: () => (
    <ButtonGroup>
      <Button variant="outline" size="icon-sm">
        <BoldIcon />
      </Button>
      <Button variant="outline" size="icon-sm">
        <ItalicIcon />
      </Button>
      <Button variant="outline" size="icon-sm">
        <UnderlineIcon />
      </Button>
    </ButtonGroup>
  ),
}
