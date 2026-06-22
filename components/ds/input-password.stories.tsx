import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { PasswordInput } from "./input-password"

const meta = {
  title: "Form/PasswordInput",
  component: PasswordInput,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A secure password text field featuring a built-in visibility toggle button.",
          "",
          "Includes support for size variants (`sm`, `default`, `lg`), border radius presets (`pill`, `rounded`, `square`), disabled states, validation highlighting, and custom toggle accessibility labels.",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Boundary border** | `--input` | Default outer border line color |",
          "| **Focus ring outline** | `--ring` | Keyboard interaction highlighting boundary |",
          "| **Eye Icon (Idle)** | `--muted-foreground` | Icon stroke color inside the toggle trigger |",
          "| **Eye Icon (Hover)** | `--foreground` | Toggle hover active stroke color |",
          "| **Error state border** | `--destructive` | Red outer boundary ring for validation failure |",
          "| **Error focus ring** | `--destructive/20` | Subtle red focus ring for invalid validation inputs |",
          "| **Disabled background** | `--muted` | Light background fill indicating read-only / disabled state |",
          "",
          "## Component Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          '| `size` | `"sm" \\| "default" \\| "lg"` | `"default"` | Controls height and button size |',
          '| `radius` | `"pill" \\| "rounded" \\| "square"` | `"pill"` | Border radius preset |',
          '| `variant` | `"default" \\| "white"` | `"default"` | Background fill variant |',
          '| `locale` | `UILocale` | `"en-US"` | Locale for toggle button aria-label |',
          '| (All native input props) | `ComponentProps<"input">` | — | Inherited HTML input attributes |',
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
      control: "inline-radio",
      options: ["sm", "default", "lg"],
      table: { defaultValue: { summary: "default" } },
    },
    radius: {
      control: "inline-radio",
      options: ["pill", "rounded", "square"],
      table: { defaultValue: { summary: "pill" } },
    },
    variant: {
      control: "inline-radio",
      options: ["default", "white"],
      table: { defaultValue: { summary: "default" } },
    },
    defaultValue: {
      control: "text",
      table: { defaultValue: { summary: "" } },
    },
    locale: {
      control: "inline-radio",
      options: ["en-US", "pt-BR", "es-ES", "fr-FR"],
      table: { defaultValue: { summary: "en-US" } },
    },
  },
} satisfies Meta<typeof PasswordInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: "Enter your password...",
    size: "default",
    radius: "pill",
    variant: "default",
    locale: "en-US",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Default password input with pill border radius and a visibility toggle button.",
      },
    },
  },
}

export const Small: Story = {
  args: {
    size: "sm",
    placeholder: "Enter your password...",
  },
  parameters: {
    docs: {
      description: {
        story: "Password input in small size with compact padding.",
      },
    },
  },
}

export const Large: Story = {
  args: {
    size: "lg",
    placeholder: "Enter your password...",
  },
  parameters: {
    docs: {
      description: {
        story: "Password input in large size with spacious padding.",
      },
    },
  },
}

export const LocalePTBR: Story = {
  args: {
    placeholder: "Enter your password...",
    locale: "pt-BR",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Portuguese (pt-BR) localization — toggle button aria-label translated.",
      },
    },
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-3">
      <PasswordInput size="sm" placeholder="Small" />
      <PasswordInput size="default" placeholder="Default" />
      <PasswordInput size="lg" placeholder="Large" />
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
      <PasswordInput radius="pill" placeholder="Pill" />
      <PasswordInput radius="rounded" placeholder="Rounded" />
      <PasswordInput radius="square" placeholder="Square" />
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
      <PasswordInput variant="default" placeholder="Default" />
      <PasswordInput variant="white" placeholder="White" />
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
    placeholder: "Enter your password...",
    defaultValue: "super_secret_password",
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
    defaultValue: "secret_password_123",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Password input pre-filled with a default password value — initially hidden.",
      },
    },
  },
}

export const Invalid: Story = {
  args: {
    "aria-invalid": true,
    placeholder: "Enter your password...",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Invalid state with aria-invalid attribute triggering red border and focus ring.",
      },
    },
  },
}
