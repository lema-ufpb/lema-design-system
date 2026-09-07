import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BentoGridItem } from "./bento-grid"
import { ContactBento } from "./contact-bento"
import { OfficeLocationItem, OfficeLocations } from "./office-locations"

const meta = {
  title: "Contact/ContactBento",
  component: ContactBento,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A bento grid with a contact form as its hero tile, plus satellite tiles — composed from BentoGrid and ContactForm.",
          "Composable and theme-aware via semantic tokens.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `formProps` | `ContactFormProps` | — | - |",
          "| `children` | `React.ReactNode` | — | /** Additional `BentoGridItem` tiles rendered beside the form (office locations, stats...). */ |",
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof ContactBento>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <ContactBento>
      <BentoGridItem
        colSpan={2}
        className="items-stretch justify-center border-0 bg-transparent p-0 hover:translate-y-0 hover:shadow-none"
      >
        <OfficeLocations className="w-full rounded-2xl border border-border bg-card p-6">
          <OfficeLocationItem
            city="São Paulo"
            country="Brazil"
            timeZone="America/Sao_Paulo"
          />
        </OfficeLocations>
      </BentoGridItem>
      <BentoGridItem
        title="Response time"
        description="Under 24 hours, every day."
      />
      <BentoGridItem title="Support" description="Real humans, no bots." />
    </ContactBento>
  ),
}
