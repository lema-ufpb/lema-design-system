import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { EmailInput } from "./input-email"

const meta = {
  title: "Forms/EmailInput",
  component: EmailInput,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "An email text field component pre-configured with a native email keyboard layout, validation states, and a semantic mail suffix icon.",
          "",
          "Supports various size variants (`sm`, `default`, `lg`), border radius presets (`pill`, `rounded`, `square`), disabled styles, and standard error invalid states.",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Boundary border** | `--input` | Default outer border line color |",
          "| **Focus ring outline** | `--ring` | Keyboard interaction highlighting boundary |",
          "| **Mail indicator icon** | `--muted-foreground` | Icon stroke color inside the text field |",
          "| **Error state border** | `--destructive` | Red outer boundary ring for validation failure |",
          "| **Error focus ring** | `--destructive/20` | Subtle red focus ring for invalid validation inputs |",
          "| **Disabled background** | `--muted` | Light background fill indicating read-only / disabled state |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    disabled: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    placeholder: {
      control: "text",
      table: { defaultValue: { summary: "" } },
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
      table: { defaultValue: { summary: "default" } },
    },
    radius: {
      control: "select",
      options: ["pill", "rounded", "square"],
      table: { defaultValue: { summary: "pill" } },
    },
    variant: {
      control: "select",
      options: ["default", "white"],
      table: { defaultValue: { summary: "default" } },
    },
  },
} satisfies Meta<typeof EmailInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: "e.g., user@example.com",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Default email input with pill border radius and a placeholder example.",
      },
    },
  },
}

export const Small: Story = {
  args: {
    size: "sm",
    placeholder: "e.g., user@example.com",
  },
  parameters: {
    docs: {
      description: {
        story: "Email input in small size with compact padding.",
      },
    },
  },
}

export const Large: Story = {
  args: {
    size: "lg",
    placeholder: "e.g., user@example.com",
  },
  parameters: {
    docs: {
      description: {
        story: "Email input in large size with spacious padding.",
      },
    },
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-3">
      <EmailInput size="sm" placeholder="Small" />
      <EmailInput size="default" placeholder="Default" />
      <EmailInput size="lg" placeholder="Large" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Comparison of all three size presets — sm, default, and lg.",
      },
    },
  },
}

export const AllRadius: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-3">
      <EmailInput radius="pill" placeholder="Pill" />
      <EmailInput radius="rounded" placeholder="Rounded" />
      <EmailInput radius="square" placeholder="Square" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Comparison of all three border radius presets — pill, rounded, and square.",
      },
    },
  },
}

export const Variants: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-3">
      <EmailInput variant="default" placeholder="Default" />
      <EmailInput variant="white" placeholder="White" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Comparison of default and white background variants.",
      },
    },
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "e.g., user@example.com",
    defaultValue: "disabled.user@example.com",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Disabled state — input is non-interactive with muted background styling.",
      },
    },
  },
}

export const WithValue: Story = {
  args: {
    defaultValue: "support@lema.ufpb.br",
  },
  parameters: {
    docs: {
      description: {
        story: "Email input pre-filled with a default email address.",
      },
    },
  },
}

export const Invalid: Story = {
  args: {
    "aria-invalid": true,
    placeholder: "e.g., user@example.com",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Invalid state with aria-invalid attribute triggering red border and focus ring styling.",
      },
    },
  },
}
