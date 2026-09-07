import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { OfficeLocations, OfficeLocationItem } from "./office-locations"
import type { UILocale } from "@/lib/ui-i18n"

const offices = [
  {
    city: "São Paulo",
    country: "Brazil",
    address: "Av. Paulista, 1000",
    timeZone: "America/Sao_Paulo",
  },
  {
    city: "Lisbon",
    country: "Portugal",
    address: "Rua Augusta, 200",
    timeZone: "Europe/Lisbon",
  },
  {
    city: "Tokyo",
    country: "Japan",
    address: "Shibuya City",
    timeZone: "Asia/Tokyo",
  },
  {
    city: "San Francisco",
    country: "USA",
    address: "Market Street",
    timeZone: "America/Los_Angeles",
  },
]

const meta = {
  title: "Data Display/OfficeLocations",
  component: OfficeLocations,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A list of office locations with a live local clock per timezone and an open/closed dot computed from business hours.",
          "Supports loading state, skeleton, i18n support.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `city` | `string` | — | - |",
          "| `country` | `string` | — | - |",
          "| `address` | `string` | — | - |",
          '| `timeZone` | `string` | — | /** IANA time zone, e.g. "America/Sao_Paulo". */ |',
          "| `businessHours` | `BusinessHours` | — | /** Local business hours used to compute the open/closed dot. */ |",
          "| `locale` | `UILocale` | — | - |",
          "| `loading` | `boolean` | — | - |",
          '| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Variant |',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof OfficeLocations>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="max-w-lg">
      <OfficeLocations>
        {offices.map((office) => (
          <OfficeLocationItem key={office.city} {...office} />
        ))}
      </OfficeLocations>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex max-w-lg flex-col gap-8">
      {(["sm", "md", "lg"] as const).map((size) => (
        <OfficeLocations key={size}>
          {offices.slice(0, 2).map((office) => (
            <OfficeLocationItem key={office.city} {...office} size={size} />
          ))}
        </OfficeLocations>
      ))}
    </div>
  ),
}

export const CustomBusinessHours: Story = {
  render: () => (
    <div className="max-w-lg">
      <OfficeLocations>
        <OfficeLocationItem
          {...offices[0]}
          businessHours={{ start: 8, end: 12 }}
        />
      </OfficeLocations>
    </div>
  ),
}

export const Loading: Story = {
  render: () => (
    <div className="max-w-lg">
      <OfficeLocations>
        {offices.slice(0, 3).map((office) => (
          <OfficeLocationItem key={office.city} {...office} loading />
        ))}
      </OfficeLocations>
    </div>
  ),
}

export const Locales: Story = {
  render: () => (
    <div className="flex max-w-lg flex-col gap-8">
      {(["en-US", "pt-BR", "es-ES", "fr-FR"] as UILocale[]).map((locale) => (
        <OfficeLocations key={locale}>
          <OfficeLocationItem
            {...offices[0]}
            locale={locale}
            businessHours={{ start: 0, end: 0 }}
          />
        </OfficeLocations>
      ))}
    </div>
  ),
}
