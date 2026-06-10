import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Spinner } from "./spinner"
import { Button } from "@/components/ui/button"

const meta = {
  title: "Feedback/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "An animated loader icon used to represent background processing, async submission delays, or loading data sequences.",
          "",
          "Extends the base `ui/spinner` with semantic `tone` tokens, a seven-step `size` scale (`sm` → `4xl`), an optional visible `label`, and locale-aware accessible names.",
          "",
          "By default it adapts color from the surrounding text via CSS `currentColor` inheritance.",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Element | Token | Purpose |",
          "| --- | --- | --- |",
          "| **Icon (tone: current)** | `currentColor` | Inherits text color from the parent context |",
          "| **Icon (tone: primary…destructive)** | `text-primary`, `text-success`, `text-warning`, `text-destructive`, `text-muted-foreground` | Semantic spinner colors |",
          "| **Label** | `text-muted-foreground` | Secondary text alongside the spinner |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    size: {
      control: "inline-radio",
      options: [
        "sm",
        "md",
        "lg",
        "xl",
        "2xl",
        "3xl",
        "4xl",
        "5xl",
        "6xl",
        "7xl",
      ],
      table: { defaultValue: { summary: "md" } },
    },
    tone: {
      control: "select",
      options: [
        "current",
        "muted",
        "primary",
        "success",
        "warning",
        "destructive",
      ],
      table: { defaultValue: { summary: "current" } },
    },
    thickness: {
      control: "inline-radio",
      options: ["thin", "regular", "bold", "bolder"],
      table: { defaultValue: { summary: "regular" } },
    },
    label: { control: "text" },
    locale: {
      control: "select",
      options: ["en-US", "pt-BR", "es-ES", "fr-FR"],
      table: { defaultValue: { summary: "en-US" } },
    },
  },
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          "Default spinner with no additional props — renders at default size, inheriting the current text color.",
      },
    },
  },
}

export const WithLabel: Story = {
  args: {
    label: "Carregando indicadores…",
    tone: "primary",
  },
  parameters: {
    docs: {
      description: {
        story:
          'Optional visible label. The wrapper carries `role="status"` and the label provides the accessible name.',
      },
    },
  },
}

export const LocalePTBR: Story = {
  args: {
    locale: "pt-BR",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Portuguese (pt-BR) localization applied to the accessible name (no visible label).",
      },
    },
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-6">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size="xl" />
      <Spinner size="2xl" />
      <Spinner size="3xl" />
      <Spinner size="4xl" />
      <Spinner size="5xl" />
      <Spinner size="6xl" />
      <Spinner size="7xl" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The full size scale: `sm` (14px), `md` (16px), `lg` (20px), `xl` (24px), `2xl` (32px), `3xl` (40px), `4xl` (48px), `5xl` (64px), `6xl` (80px), `7xl` (96px).",
      },
    },
  },
}

export const Tones: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-6">
      <Spinner size="xl" tone="muted" />
      <Spinner size="xl" tone="primary" />
      <Spinner size="xl" tone="success" />
      <Spinner size="xl" tone="warning" />
      <Spinner size="xl" tone="destructive" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Semantic color tones — `muted`, `primary`, `success`, `warning`, and `destructive`.",
      },
    },
  },
}

export const Thickness: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-6">
      <Spinner size="3xl" thickness="thin" />
      <Spinner size="3xl" thickness="regular" />
      <Spinner size="3xl" thickness="bold" />
      <Spinner size="3xl" thickness="bolder" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Ring stroke thickness — `thin` (1.5), `regular` (2), `bold` (2.5), `bolder` (3).",
      },
    },
  },
}

export const LargeWithLabel: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-3">
      <Spinner size="3xl" tone="primary" />
      <span className="text-sm text-muted-foreground">
        Processando dados da Agenda 2030…
      </span>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "A large, centered spinner suitable for full-section or page-level loading states.",
      },
    },
  },
}

export const InButton: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button disabled>
        <Spinner data-icon="inline-start" />
        Loading
      </Button>
      <Button variant="outline" disabled>
        <Spinner data-icon="inline-start" />
        Processing
      </Button>
      <Button variant="secondary" disabled>
        <Spinner data-icon="inline-start" />
        Saving
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Spinner used inline inside disabled buttons. With `tone: current` it inherits each button's text color automatically.",
      },
    },
  },
}
