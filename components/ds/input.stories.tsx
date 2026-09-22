import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Input } from "./input"
import { SearchIcon, MailIcon } from "lucide-react"

const meta = {
  title: "Form/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A versatile text input with built-in icon slots, clearable functionality, character count display, loading spinner, error validation, and optional label.",
          "",
          "## Props",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          '| `size` | `"sm" \\| "md" \\| "lg"` | `"md"` | Input height and font size |',
          "| `icon` | `ReactNode` | — | Leading or trailing icon element |",
          '| `iconPlacement` | `"left" \\| "right"` | `"left"` | Icon alignment |',
          '| `rounded` | `"none" \\| "light" \\| "full"` | `"light"` | Border radius of the input wrapper |',
          "| `bordered` | `boolean` | `true` | Shows a visible border |",
          "| `clearable` | `boolean` | `false` | Shows a clear button when value is present |",
          "| `showCount` | `boolean` | `false` | Shows character count when `maxLength` is set |",
          "| `loading` | `boolean` | `false` | Replaces the leading icon with a spinner |",
          '| `type` | `string` | `"text"` | Native `type` attribute |',
          "| `error` | `string` | — | Error message displayed below the input |",
          "| `label` | `string` | — | Label text above the input |",
          "| `maxLength` | `number` | — | Maximum character length |",
          "| `disabled` | `boolean` | `false` | Disables the input |",
          '| `locale` | `UILocale` | `"en-US"` | Locale for i18n strings |',
          '| `placeholder` | `string` | `""` | Placeholder text |',
          "",
          "---",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
      table: { defaultValue: { summary: "md" } },
    },
    iconPlacement: {
      control: "inline-radio",
      options: ["left", "right"],
      table: { defaultValue: { summary: "left" } },
    },
    rounded: {
      control: "inline-radio",
      options: ["none", "light", "full"],
      table: { defaultValue: { summary: "full" } },
    },
    bordered: {
      control: "boolean",
      table: { defaultValue: { summary: "true" } },
    },
    clearable: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    showCount: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    loading: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    type: {
      control: "text",
      table: { defaultValue: { summary: "text" } },
    },
    placeholder: {
      control: "text",
      table: { defaultValue: { summary: "" } },
    },
    icon: { table: { disable: true } },
    error: { control: "text" },
    label: { control: "text" },
    maxLength: { control: "number" },
    disabled: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    locale: {
      control: "inline-radio",
      options: ["en-US", "pt-BR", "es-ES", "fr-FR"],
      table: { defaultValue: { summary: "en-US" } },
    },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: "Type something…",
  },
}

export const WithIcon: Story = {
  args: {
    placeholder: "Search…",
    icon: <SearchIcon />,
    iconPlacement: "left",
  },
}

export const IconRight: Story = {
  args: {
    placeholder: "Email",
    icon: <MailIcon />,
    iconPlacement: "right",
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Input size="sm" placeholder="Small (no icon)" />
      <Input size="md" placeholder="Medium (no icon)" />
      <Input size="lg" placeholder="Large (no icon)" />
    </div>
  ),
}

export const SizesWithIcon: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Input size="sm" placeholder="Small" icon={<SearchIcon />} />
      <Input size="md" placeholder="Medium" icon={<SearchIcon />} />
      <Input size="lg" placeholder="Large" icon={<SearchIcon />} />
    </div>
  ),
}

export const SizesComparison: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-muted-foreground">
          Without icon
        </span>
        <Input size="md" placeholder="No icon — text flush left" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-muted-foreground">
          With left icon
        </span>
        <Input
          size="md"
          placeholder="With icon — padded left"
          icon={<SearchIcon />}
          iconPlacement="left"
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-muted-foreground">
          With right icon
        </span>
        <Input
          size="md"
          placeholder="With icon — padded right"
          icon={<MailIcon />}
          iconPlacement="right"
        />
      </div>
    </div>
  ),
}

export const RoundedVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-muted-foreground">None</span>
        <Input rounded="none" placeholder="rounded-none" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-muted-foreground">Light</span>
        <Input rounded="light" placeholder="rounded-lg" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-muted-foreground">Full</span>
        <Input rounded="full" placeholder="rounded-full" />
      </div>
    </div>
  ),
}

export const BorderedVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-muted-foreground">
          Bordered (default)
        </span>
        <Input placeholder="Visible border" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-muted-foreground">
          Borderless
        </span>
        <Input bordered={false} placeholder="No border" />
      </div>
    </div>
  ),
}

export const WithError: Story = {
  args: {
    placeholder: "Email",
    "aria-label": "Email",
    error: "Please enter a valid email address.",
    defaultValue: "invalid",
  },
}

export const WithCharCount: Story = {
  args: {
    placeholder: "Username",
    "aria-label": "Username",
    maxLength: 20,
    showCount: true,
    defaultValue: "myuser",
  },
}

export const Clearable: Story = {
  args: {
    placeholder: "Type to see clear button…",
    clearable: true,
    defaultValue: "Some value",
  },
}

export const Loading: Story = {
  args: {
    placeholder: "Loading…",
    loading: true,
  },
}

export const WithLabel: Story = {
  args: {
    label: "Full name",
    placeholder: "Enter your full name",
  },
}

export const WithAllFeatures: Story = {
  args: {
    label: "Search users",
    placeholder: "Search by name or email…",
    icon: <SearchIcon />,
    clearable: true,
    maxLength: 50,
    showCount: true,
  },
}
