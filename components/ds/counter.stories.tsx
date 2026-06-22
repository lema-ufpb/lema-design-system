import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Counter } from "@/components/ds/counter"
import { useEffect, useState } from "react"

const meta = {
  title: "Form/Counter",
  component: Counter,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "An input component designed to increment or decrement numeric values within established bounds.",
          "",
          "By default the counter fills the width of its parent container. Use the `maxWidth` prop to cap the maximum width.",
          "",
          "Supports various size presets (`sm`, `md`, `lg`), border variants (`default`, `ghost`, `outline`), step configuration, custom constraints (`min`/`max`), and keyboard arrow-key navigation.",
          "",
          "## Component Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `value` | `number` | — | Controlled value |",
          "| `defaultValue` | `number` | `0` | Uncontrolled initial value |",
          "| `min` | `number` | `-Infinity` | Minimum allowed value |",
          "| `max` | `number` | `Infinity` | Maximum allowed value |",
          "| `step` | `number` | `1` | Increment/decrement step |",
          "| `size` | `sm` \\| `md` \\| `lg` | `md` | Size preset |",
          "| `variant` | `default` \\| `ghost` \\| `outline` | `default` | Border variant |",
          "| `loading` | `boolean` | `false` | Show skeleton while value is fetching |",
          "| `disabled` | `boolean` | `false` | Disable all interaction |",
          "| `label` | `string` | — | Accessible `aria-label` for the group |",
          "| `maxWidth` | `CSSProperties['maxWidth']` | — | Cap the counter width |",
          "| `locale` | `en-US` \\| `pt-BR` \\| `es-ES` \\| `fr-FR` | `en-US` | Locale for button labels |",
          "| `onChange` | `(value: number) => void` | — | Called when value changes |",
          "| `onBlur` | `(e: FocusEvent) => void` | — | Called on input blur |",
          "| `onKeyDown` | `(e: KeyboardEvent) => void` | — | Called on input keydown |",
          "| `id` | `string` | — | Input `id` attribute |",
          "| `className` | `string` | — | Additional CSS classes |",
          "",
          "## Design Tokens & Semantic Variables",
          "",
          "| Variant / Element | CSS Variable | Purpose |",
          "| --- | --- | --- |",
          "| **Outer boundary** | `--input` | Default outer border line color |",
          "| **Background fill** | `--background` | Default container background |",
          "| **Button hover state** | `--accent` | Hover background highlight for addition/subtraction buttons |",
          "| **Ghost background** | `--muted/50` | Translucent background for ghost variant |",
          "| **Outline border** | `--primary/20` | Subtle primary color border for outline variant |",
          "| **Focus rings** | `--ring` | Ring outline when navigating or typing inside the field |",
          "| **Text color** | `--foreground` | Counter value and icon label colors |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      table: { defaultValue: { summary: "md" } },
    },
    variant: {
      control: "select",
      options: ["default", "ghost", "outline"],
      table: { defaultValue: { summary: "default" } },
    },
    disabled: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    loading: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    min: {
      control: "number",
      table: { defaultValue: { summary: "-Infinity" } },
    },
    max: {
      control: "number",
      table: { defaultValue: { summary: "Infinity" } },
    },
    step: {
      control: "number",
      table: { defaultValue: { summary: "1" } },
    },
    maxWidth: {
      control: "text",
      table: { defaultValue: { summary: "" } },
    },
    locale: {
      control: "inline-radio",
      options: ["en-US", "pt-BR", "es-ES", "fr-FR"],
      table: { defaultValue: { summary: "en-US" } },
    },
  },
} satisfies Meta<typeof Counter>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    defaultValue: 0,
    min: 0,
    max: 10,
    step: 1,
    size: "md",
    variant: "default",
    loading: false,
    disabled: false,
    locale: "en-US",
  },
  parameters: {
    docs: {
      description: {
        story: "Default counter with min=0, max=10, and step=1 constraints.",
      },
    },
  },
}

export const MaxWidth: Story = {
  args: {
    defaultValue: 5,
    min: 0,
    max: 100,
    maxWidth: "320px",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Use `maxWidth` to cap how wide the counter grows. Accepts any valid CSS value (`px`, `%`, `rem`, etc.).",
      },
    },
  },
}

export const LocalePTBR: Story = {
  args: {
    defaultValue: 0,
    min: 0,
    max: 10,
    step: 1,
    locale: "pt-BR",
  },
  parameters: {
    docs: {
      description: {
        story: "Portuguese (pt-BR) locale applied to the counter.",
      },
    },
  },
}

export const FluidWidth: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-2 text-xs text-muted-foreground">
          Full width (default)
        </p>
        <Counter defaultValue={5} min={0} max={100} />
      </div>
      <div>
        <p className="mb-2 text-xs text-muted-foreground">maxWidth: 400px</p>
        <Counter defaultValue={5} min={0} max={100} maxWidth="400px" />
      </div>
      <div>
        <p className="mb-2 text-xs text-muted-foreground">maxWidth: 50%</p>
        <Counter defaultValue={5} min={0} max={100} maxWidth="50%" />
      </div>
      <div>
        <p className="mb-2 text-xs text-muted-foreground">maxWidth: 200px</p>
        <Counter defaultValue={5} min={0} max={100} maxWidth="200px" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The counter fills its container by default. `maxWidth` constrains the growth.",
      },
    },
  },
}

export const Controlled: Story = {
  render: () => {
    const [count, setCount] = useState(5)
    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">
          Controlled value: <strong>{count}</strong>
        </p>
        <Counter
          value={count}
          onChange={setCount}
          min={0}
          max={20}
          maxWidth="320px"
        />
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          "Controlled counter — value managed externally with an onChange handler.",
      },
    },
  },
}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(["default", "ghost", "outline"] as const).map((variant) => (
        <div key={variant} className="flex items-center gap-4">
          <span className="w-16 shrink-0 text-sm font-medium capitalize">
            {variant}
          </span>
          <Counter variant={variant} defaultValue={10} />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Comparison of all three border variants — default, ghost, and outline.",
      },
    },
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size} className="flex items-center gap-4">
          <span className="w-16 shrink-0 text-sm font-medium capitalize">
            {size}
          </span>
          <Counter size={size} defaultValue={5} />
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

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: 5,
    maxWidth: "320px",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Disabled state preventing user interaction with the increment and decrement buttons.",
      },
    },
  },
}

export const Loading: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size} className="flex items-center gap-4">
          <span className="w-8 shrink-0 text-sm font-medium">{size}</span>
          <Counter loading size={size} maxWidth="320px" />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Pass `loading={true}` while the initial value is being fetched. The control is replaced by a `Skeleton` that matches the size variant — no layout shift when the value arrives.",
      },
    },
  },
}

export const SimulatedLoading: Story = {
  render: () => {
    const [loading, setLoading] = useState(true)
    const [value, setValue] = useState(0)

    useEffect(() => {
      const timer = setTimeout(() => {
        setValue(42)
        setLoading(false)
      }, 2000)
      return () => clearTimeout(timer)
    }, [])

    return (
      <div className="flex flex-col gap-3">
        <Counter
          loading={loading}
          value={value}
          onChange={setValue}
          min={0}
          max={100}
          maxWidth="320px"
        />
        <p className="text-xs text-muted-foreground">
          {loading ? "Fetching value…" : `Loaded with value ${value}`}
        </p>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          "Simulates a 2-second async fetch. The skeleton holds space, then the counter appears pre-filled with the loaded value.",
      },
    },
  },
}
