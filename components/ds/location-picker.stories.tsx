import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as React from "react"
import { LocationPicker, type LocationSuggestion } from "./location-picker"

const MOCK_LOCATIONS: LocationSuggestion[] = [
  {
    id: "1",
    label: "Universidade Federal da Paraíba",
    description: "Campus I, João Pessoa - PB",
    lat: -7.1465,
    lng: -34.9425,
    meta: { city: "João Pessoa", state: "PB", country: "Brasil" },
  },
  {
    id: "2",
    label: "Praia de Tambaú",
    description: "João Pessoa - PB, Brasil",
    lat: -7.118,
    lng: -34.863,
    meta: { city: "João Pessoa", state: "PB" },
  },
  {
    id: "3",
    label: "Aeroporto Presidente Castro Pinto",
    description: "Bayeux - PB",
    lat: -7.145,
    lng: -34.948,
    meta: { type: "Airport", IATA: "JPA" },
  },
  {
    id: "4",
    label: "Parque Solon de Lucena (Lagoa)",
    description: "Centro, João Pessoa - PB",
    meta: { type: "Park" },
  },
]

// Simulated API call
async function mockSearch(query: string): Promise<LocationSuggestion[]> {
  await new Promise((r) => setTimeout(r, 600))
  return MOCK_LOCATIONS.filter(
    (l) =>
      l.label.toLowerCase().includes(query.toLowerCase()) ||
      l.description?.toLowerCase().includes(query.toLowerCase())
  )
}

const meta = {
  title: "Form/LocationPicker",
  component: LocationPicker,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "An address autocomplete picker backed by a custom async `onSearch` callback.",
          "Decoupled from any geocoding API — connect Google Places, Mapbox, ViaCEP, or any endpoint.",
          "",
          "Built on `Command` + `Popover` from shadcn/ui with debounced search.",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    locale: {
      control: "inline-radio",
      options: ["en-US", "pt-BR", "es-ES", "fr-FR"],
    },
  },
} satisfies Meta<typeof LocationPicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState<LocationSuggestion | null>(null)
    return (
      <div className="max-w-sm">
        <LocationPicker
          value={value}
          onChange={setValue}
          onSearch={mockSearch}
          placeholder="Search for a location…"
        />
        {value && (
          <div className="mt-2 text-xs text-muted-foreground">
            Selected: {value.label}{" "}
            {value.lat
              ? `(${value.lat.toFixed(4)}, ${value.lng?.toFixed(4)})`
              : ""}
          </div>
        )}
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: "Type 'João' or 'Praia' to see suggestions from the mock API.",
      },
    },
  },
}

export const WithPreselectedValue: Story = {
  render: () => (
    <div className="max-w-sm">
      <LocationPicker value={MOCK_LOCATIONS[0]!} onSearch={mockSearch} />
    </div>
  ),
}

export const Loading: Story = {
  render: () => (
    <div className="max-w-sm">
      <LocationPicker value={null} onSearch={mockSearch} loading />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="max-w-sm">
      <LocationPicker
        value={MOCK_LOCATIONS[1]!}
        onSearch={mockSearch}
        disabled
      />
    </div>
  ),
}

export const NoSearch: Story = {
  render: () => (
    <div className="max-w-sm">
      <LocationPicker value={null} placeholder="No API connected" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Without `onSearch`, shows an empty state inside the dropdown.",
      },
    },
  },
}
