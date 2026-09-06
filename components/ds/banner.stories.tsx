import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Banner } from "./banner"

const meta = {
  title: "Navigation/Banner",
  component: Banner,
  tags: ["autodocs"],
  argTypes: {
    intent: {
      control: "select",
      options: [
        "default",
        "info",
        "success",
        "warning",
        "destructive",
        "promo",
      ],
    },
    variant: {
      control: "select",
      options: ["default", "outline", "ghost", "filled"],
    },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    position: {
      control: "select",
      options: ["inline", "top", "bottom", "floating"],
    },
    dismissible: { control: "boolean" },
    locale: {
      control: "inline-radio",
      options: ["en-US", "pt-BR", "es-ES", "fr-FR"],
    },
    loading: { control: "boolean" },
  },
} satisfies Meta<typeof Banner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: "New feature",
    description: "Explore the new dashboard with real-time insights.",
    action: { label: "Explore" },
    intent: "default",
  },
}

export const AllIntents: Story = {
  args: { title: "Title", description: "Description" },
  render: () => (
    <div className="flex flex-col gap-3">
      {(
        [
          "default",
          "info",
          "success",
          "warning",
          "destructive",
          "promo",
        ] as const
      ).map((intent) => (
        <Banner
          key={intent}
          intent={intent}
          title={intent}
          description="This is a banner description."
          action={{ label: "Action" }}
        />
      ))}
    </div>
  ),
}

export const AllSizes: Story = {
  args: { title: "Banner", description: "Description" },
  render: () => (
    <div className="flex flex-col gap-3">
      {(["sm", "md", "lg"] as const).map((size) => (
        <Banner
          key={size}
          size={size}
          title={`Size ${size}`}
          description="Adjustable banner height and typography."
          action={{ label: "CTA" }}
        />
      ))}
    </div>
  ),
}

export const WithActions: Story = {
  args: {
    title: "Update available",
    description: "A new version is ready to install.",
    intent: "info",
    action: { label: "Update" },
    secondaryAction: { label: "Later" },
  },
}

export const Loading: Story = {
  args: { loading: true, title: "x", description: "x" },
}

export const Locales: Story = {
  args: {
    title: "We use cookies",
    description: "We use cookies to improve your experience.",
  },
  render: () => (
    <div className="flex flex-col gap-3">
      {(["en-US", "pt-BR", "es-ES", "fr-FR"] as const).map((locale) => (
        <Banner
          key={locale}
          locale={locale}
          title="Announcement"
          description="Dismiss label is localized."
        />
      ))}
    </div>
  ),
}
