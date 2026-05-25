import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { StepProgress } from "@/components/custom/step-progress"
import { User, CreditCard, CheckCircle, Truck } from "lucide-react"
import * as React from "react"

const meta = {
  title: "Navigation/StepProgress",
  component: StepProgress,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A multi-step workflow progress tracker displaying step items, icons, titles, line connectors, and interaction buttons.",
          "",
          "Supports size adjustments (`sm`, `md`, `lg`), orientation layout flow changes (`horizontal`, `vertical`), complete/current/upcoming state variations, and custom click handler bindings.",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Complete background** | `--primary` | Background color for completed step nodes |",
          "| **Complete text** | `--primary-foreground` | Font color inside completed step nodes |",
          "| **Active step boundary** | `--primary` | Border color for current active step node |",
          "| **Active label text** | `--primary` | Title text font color of the current active step |",
          "| **Connector bar (Complete)** | `--primary` | Background color for line links between completed steps |",
          "| **Connector bar (Pending)** | `--border` | Background color for line links of upcoming steps |",
          "| **Pending text & icon** | `--muted-foreground` | Font color for upcoming labels and details |",
          "| **Active pulse glow** | `theme(colors.primary.DEFAULT/20%)` | Accent shadow opacity glow on the active step circular node |",
        ].join("\n"),
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      table: { defaultValue: { summary: "horizontal" } },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      table: { defaultValue: { summary: "md" } },
    },
  },
} satisfies Meta<typeof StepProgress>

export default meta
type Story = StoryObj<typeof meta>

const steps = [
  {
    id: "1",
    title: "Account",
    description: "Create your account",
    icon: <User className="size-4" />,
  },
  {
    id: "2",
    title: "Payment",
    description: "Add payment method",
    icon: <CreditCard className="size-4" />,
  },
  {
    id: "3",
    title: "Review",
    description: "Review your order",
    icon: <CheckCircle className="size-4" />,
  },
  {
    id: "4",
    title: "Delivery",
    description: "Tracking your delivery",
    icon: <Truck className="size-4" />,
  },
]

export const Horizontal: Story = {
  args: { steps, currentStepId: "2", orientation: "horizontal" },
  parameters: {
    docs: {
      description: {
        story:
          "Horizontal step progress with step 2 (Payment) as the current active step.",
      },
    },
  },
}

export const Vertical: Story = {
  args: { steps, currentStepId: "2", orientation: "vertical" },
  parameters: {
    docs: {
      description: {
        story:
          "Vertical step progress with step 2 (Payment) as the current active step.",
      },
    },
  },
}

export const Interactive: Story = {
  args: { steps, currentStepId: "1" },
  render: () => {
    const [currentStepId, setCurrentStepId] = React.useState("1")
    return (
      <div className="mx-auto max-w-4xl p-8">
        <StepProgress
          steps={steps}
          currentStepId={currentStepId}
          onStepClick={setCurrentStepId}
        />
        <div className="mt-12 rounded-xl border bg-muted/30 p-8 text-center">
          <p className="text-lg font-medium">
            Current Step: {steps.find((s) => s.id === currentStepId)?.title}
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <button
              className="rounded-lg bg-primary px-4 py-2 text-primary-foreground disabled:opacity-50"
              onClick={() => {
                const idx = steps.findIndex((s) => s.id === currentStepId)
                if (idx > 0) setCurrentStepId(steps[idx - 1].id)
              }}
              disabled={currentStepId === "1"}
            >
              Previous
            </button>
            <button
              className="rounded-lg bg-primary px-4 py-2 text-primary-foreground disabled:opacity-50"
              onClick={() => {
                const idx = steps.findIndex((s) => s.id === currentStepId)
                if (idx < steps.length - 1) setCurrentStepId(steps[idx + 1].id)
              }}
              disabled={currentStepId === "4"}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive step progress with Previous/Next buttons to navigate between steps.",
      },
    },
  },
}

export const LocalePTBR: Story = {
  args: {
    steps: [
      {
        id: "1",
        title: "Conta",
        description: "Crie sua conta",
        icon: <User className="size-4" />,
      },
      {
        id: "2",
        title: "Pagamento",
        description: "Adicione método de pagamento",
        icon: <CreditCard className="size-4" />,
      },
      {
        id: "3",
        title: "Revisão",
        description: "Revise seu pedido",
        icon: <CheckCircle className="size-4" />,
      },
      {
        id: "4",
        title: "Entrega",
        description: "Acompanhe sua entrega",
        icon: <Truck className="size-4" />,
      },
    ],
    currentStepId: "2",
    orientation: "horizontal",
    locale: "pt-BR",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Portuguese (pt-BR) localization with translated step titles and descriptions.",
      },
    },
  },
}

export const Sizes: Story = {
  args: { steps, currentStepId: "2" },
  render: () => (
    <div className="flex flex-col gap-16">
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size} className="flex flex-col gap-4">
          <span className="text-sm font-medium text-muted-foreground">
            {size === "sm"
              ? "Small (sm)"
              : size === "md"
                ? "Medium (md)"
                : "Large (lg)"}
          </span>
          <StepProgress steps={steps} currentStepId="2" size={size} />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Comparison of all three size presets — sm, md, and lg.",
      },
    },
  },
}
