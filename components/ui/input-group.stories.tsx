import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "./input-group"

import { SearchIcon, MailIcon, EyeIcon, UserIcon } from "lucide-react"

const meta = {
  title: "Shadcn UI/InputGroup",
  component: InputGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "An integrated form row component that groups related inputs, text labels, prefix/suffix icons, keyboard shortcuts, and button actions into a unified block structure.",
          "",
          "Supports vertical layout stacking (`block-start`, `block-end`), inline alignment controls (`inline-start`, `inline-end`), custom buttons sizes (`xs`, `icon-sm`), and disabled/invalid validation style propagation.",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Group Container tray** | `bg-input/50` | Translucent background panel container |",
          "| **Focused border outline** | `--ring` / `--border-ring` | Border ring indicator for active group child elements |",
          "| **Focus outline glow** | `--ring/30` | Translucent shadow overlay on active field highlight |",
          "| **Validation failure border** | `--destructive` | Red boundary ring for incorrect entries |",
          "| **Validation failure focus** | `--destructive/20` | Subtle red focus halo for error states |",
          "| **Keyboard addon keycaps** | `bg-muted-foreground/10` | Accent background fill for key shortcuts |",
          "| **Label text & indicators** | `--muted-foreground` | Sub-label and icon stroke color inside addons |",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof InputGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Basic input group wrapping a single input field without any addons or buttons attached.",
      },
    },
  },
  render: () => (
    <InputGroup>
      <InputGroupInput placeholder="Enter text..." />
    </InputGroup>
  ),
}

export const WithAddon: Story = {
  render: () => (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <InputGroup>
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupInput placeholder="Search..." />
      </InputGroup>

      <InputGroup>
        <InputGroupInput placeholder="Email" />
        <InputGroupAddon align="inline-end">
          <MailIcon />
        </InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupAddon>
          <UserIcon />
        </InputGroupAddon>
        <InputGroupInput placeholder="Username" />
        <InputGroupAddon align="inline-end">@example.com</InputGroupAddon>
      </InputGroup>
    </div>
  ),
}

export const WithButton: Story = {
  render: () => (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <InputGroup>
        <InputGroupInput placeholder="Search..." />
        <InputGroupButton>
          <SearchIcon data-icon="inline-start" />
          Search
        </InputGroupButton>
      </InputGroup>

      <InputGroup>
        <InputGroupButton aria-label="Search">
          <SearchIcon data-icon="inline-start" />
        </InputGroupButton>
        <InputGroupInput placeholder="Icon only" />
      </InputGroup>

      <InputGroup>
        <InputGroupInput placeholder="Password" type="password" />
        <InputGroupButton
          variant="ghost"
          aria-label="Toggle password visibility"
        >
          <EyeIcon />
        </InputGroupButton>
      </InputGroup>
    </div>
  ),
}

export const WithText: Story = {
  render: () => (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <InputGroup>
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupInput placeholder="Search..." />
        <InputGroupText>Go</InputGroupText>
      </InputGroup>

      <InputGroup>
        <InputGroupText>$</InputGroupText>
        <InputGroupInput type="number" placeholder="0.00" />
        <InputGroupText>.00</InputGroupText>
      </InputGroup>
    </div>
  ),
}

export const BlockAddon: Story = {
  render: () => (
    <InputGroup>
      <InputGroupAddon align="block-start">First Name</InputGroupAddon>
      <InputGroupInput placeholder="John" />
      <InputGroupAddon align="block-end">Last Name</InputGroupAddon>
      <InputGroupInput placeholder="Doe" />
    </InputGroup>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <InputGroup>
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupInput disabled placeholder="Disabled input" />
      </InputGroup>
    </div>
  ),
}
