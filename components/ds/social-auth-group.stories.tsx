import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"
import { SocialAuthGroup } from "./social-auth-group"

const meta = {
  title: "Actions/SocialAuthGroup",
  component: SocialAuthGroup,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "A SocialAuthGroup component for the LEMA Design System.",
          "Supports loading state, i18n support, CVA variants.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `providers` | `SocialProvider[]` | — | - |",
          '| `size` | `"sm" \| "md" \| "lg"` | — | - |',
          "| `loadingProvider` | `SocialProvider \| null` | — | - |",
          "| `disabled` | `boolean` | — | - |",
          "| `onSelect` | `(provider: SocialProvider) => void` | — | - |",
          "| `locale` | `UILocale` | — | - |",
          '| `layout` | `"stacked" \| "inline" \| "grid"` | `"stacked"` | Variant |',
        ].join("\n"),
      },
    },
    layout: "centered",
  },
  args: {
    onSelect: fn(),
  },
  argTypes: {
    layout: {
      control: "inline-radio",
      options: ["stacked", "inline", "grid"],
    },
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
    },
    disabled: {
      control: "boolean",
    },
    locale: {
      control: "select",
      options: ["pt-BR", "en-US", "es-ES", "fr-FR"],
    },
  },
} satisfies Meta<typeof SocialAuthGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    layout: "stacked",
    providers: ["google", "github"],
  },
  render: (args) => (
    <div className="w-80">
      <SocialAuthGroup {...args} />
    </div>
  ),
}

export const GridWithGovBr: Story = {
  args: {
    layout: "grid",
    providers: ["google", "govbr", "github", "cafe"],
  },
  render: (args) => (
    <div className="w-96">
      <SocialAuthGroup {...args} />
    </div>
  ),
}

export const InlineRow: Story = {
  args: {
    layout: "inline",
    providers: ["google", "github", "microsoft", "apple", "govbr"],
  },
}

export const LoadingState: Story = {
  args: {
    layout: "stacked",
    providers: ["google", "govbr"],
    loadingProvider: "govbr",
  },
  render: (args) => (
    <div className="w-80">
      <SocialAuthGroup {...args} />
    </div>
  ),
}
