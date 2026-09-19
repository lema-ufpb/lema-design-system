import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { MapPin, TrendingUp } from "lucide-react"
import { GeoMapChart } from "@/components/ds/geomap-chart"
import { formatValue } from "@/lib/format-utils"

// ── GeoJSON files are served from /public/geojson/ ────────────────────────
//
// world.geojson          — 177 countries, feature.id = ISO Alpha-3 ("BRA", "ARG"…)
// brazil-states.geojson  — 27 states, no top-level id; featureIdProperty="postal" ("SP", "RJ"…)
// us-states-topo.json    — us-atlas@3 TopoJSON, feature.id = FIPS string ("06" = California)
//
// react-simple-maps fetches URL strings internally — no loaders needed.

// ── Meta ───────────────────────────────────────────────────────────────────

const meta = {
  title: "Data Display/GeoMapChart",
  component: GeoMapChart,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A reusable geographic map chart built on **react-simple-maps**.",
          "",
          "Accepts any **GeoJSON FeatureCollection** object *or* a URL string via the `geoData` prop.",
          "When a string is passed, the library fetches it internally — ideal for files in `/public`.",
          "",
          "---",
          "",
          "## Data API",
          "",
          "### `geoData`",
          "",
          "The geographic topology. Accepts either a GeoJSON `FeatureCollection` object or a URL string.",
          "",
          "```tsx",
          "// URL string — fetched internally by react-simple-maps",
          'geoData="/geojson/world.geojson"',
          "",
          "// GeoJSON object (imported or inlined)",
          "geoData={{",
          '  type: "FeatureCollection",',
          "  features: [",
          "    {",
          '      type: "Feature",',
          '      id: "BRA",',
          '      properties: { name: "Brazil" },',
          "      geometry: { ... },",
          "    },",
          "  ],",
          "}}",
          "```",
          "",
          "> **Type:** `FeatureCollection | string`  •  **Required**",
          "",
          "### `data` (choropleth values)",
          "",
          "An optional array of feature value overrides. Each item is matched to a GeoJSON feature by its `id`. The `value` field drives the choropleth color intensity.",
          "",
          "```tsx",
          "const data = [",
          '  { id: "BRA", name: "Brazil",   value: 12000 },',
          '  { id: "ARG", name: "Argentina", value: 8500 },',
          '  { id: "USA", name: "United States", value: 45000, color: "var(--chart-1)" },',
          "]",
          "```",
          "",
          "#### `GeoMapFeature`",
          "",
          "| Field | Type | Required | Description |",
          "| --- | --- | --- | --- |",
          "| `id` | `string \\| number` | ✓ | Feature identifier — matched against `feature.id` or `properties[featureIdProperty]` |",
          "| `name` | `string` | — | Display name — appears in tooltips |",
          "| `value` | `number` | — | Numeric value — drives the choropleth color scale |",
          "| `color` | `string` | — | Override fill color — skips the palette gradient |",
          "",
          "> **Type:** `GeoMapFeature[]`",
          "",
          "### `markers` (point data)",
          "",
          "An optional array of point markers to overlay on the map.",
          "",
          "```tsx",
          "const markers = [",
          "  {",
          '    id: "rec-001",',
          "    coordinates: [-34.88, -7.12],",
          '    label: "João Pessoa",',
          "    value: 12000,",
          '    color: "var(--destructive)",',
          "    size: 12,",
          "  },",
          "]",
          "```",
          "",
          "#### `GeoMapMarker`",
          "",
          "| Field | Type | Required | Description |",
          "| --- | --- | --- | --- |",
          "| `id` | `string \\| number` | ✓ | Unique marker identifier |",
          "| `coordinates` | `[number, number]` | ✓ | `[longitude, latitude]` — position on the map |",
          "| `label` | `string` | — | Label displayed in the marker tooltip |",
          "| `value` | `number` | — | Numeric value — shown in the tooltip |",
          "| `color` | `string` | — | Marker fill color; defaults to `--primary` |",
          "| `size` | `number` | — | Marker radius; defaults to `8` |",
          "",
          "> **Type:** `GeoMapMarker[]`",
          "",
          "### `featureIdProperty`",
          "",
          "When the GeoJSON feature has no top-level `id`, specify which property key to use as the feature ID.",
          "",
          "```tsx",
          'featureIdProperty="postal"   // matches feature.properties.postal ("SP", "RJ"…)',
          "```",
          "",
          "### ID resolution order",
          "",
          "1. `feature.id` (top-level GeoJSON `id` field)",
          "2. `feature.properties[featureIdProperty]` (when `featureIdProperty` is set)",
          "3. `feature.properties.id` / `feature.properties.ID` (fallback)",
          "",
          "### Putting it together",
          "",
          "```tsx",
          'import { GeoMapChart } from "@/components/ds/geomap-chart"',
          "",
          "function WorldMap() {",
          "  const data = [",
          '    { id: "BRA", value: 12000 },',
          '    { id: "ARG", value: 8500 },',
          "  ]",
          "",
          "  return (",
          "    <GeoMapChart",
          '      geoData="/geojson/world.geojson"',
          "      data={data}",
          '      colorRange={["#f0f9ff", "#0369a1"]}',
          "      height={450}",
          "    />",
          "  )",
          "}",
          "```",
          "",
          "---",
          "---",
          "",
          "## Bundled GeoJSON files (`/public/geojson/`)",
          "| File | ID field | Example |",
          "| --- | --- | --- |",
          '| `world.geojson` | `feature.id` ISO Alpha-3 | `"BRA"` |',
          '| `brazil-states.geojson` | `properties.postal` (use `featureIdProperty`) | `"SP"` |',
          '| `us-states-topo.json` | `feature.id` FIPS string | `"06"` |',
          "",
          "---",
          "",
          "## Component Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          "| `geoData` | `FeatureCollection \\| string` | — | (required) GeoJSON object or URL |",
          "| `featureIdProperty` | `string` | — | Feature property to use as ID |",
          "| `data` | `GeoMapFeature[]` | `[]` | Choropleth values matched by feature id |",
          "| `markers` | `GeoMapMarker[]` | `[]` | Point markers to overlay |",
          "| `title` | `string` | — | Optional title |",
          "| `subtitle` | `string` | — | Optional subtitle |",
          "| `footer` | `React.ReactNode` | — | Optional footer |",
          "| `height` | `number` | `400` | Chart height in px |",
          '| `projection` | `GeoProjection` | `"geoMercator"` | D3 projection name |',
          "| `projectionConfig` | `{ scale?: number; center?: [number, number]; rotate?: [number, number, number] }` | — | D3 projection configuration |",
          "| `enableZoom` | `boolean` | `false` | Enable zoom and pan |",
          "| `zoomRange` | `[number, number]` | `[1, 8]` | Min/max zoom multiplier |",
          "| `colorRange` | `[string, string]` | — | Choropleth color range |",
          "| `defaultFill` | `string` | — | Default fill for unmatched features |",
          "| `selectedFeatureIds` | `(string \\| number)[]` | `[]` | Feature IDs to highlight |",
          "| `selectedStroke` | `string` | — | Stroke color for selected features |",
          "| `showTooltip` | `boolean` | `true` | Show tooltip on hover |",
          "| `showLegend` | `boolean` | — | Show color scale legend |",
          '| `legendPosition` | `LegendPosition` | `"bottom-right"` | Legend position |',
          '| `legendOrientation` | `LegendOrientation` | `"horizontal"` | Legend bar direction |',
          "| `legendLabel` | `string` | — | Label above the gradient bar |",
          "| `onFeatureClick` | `(feature: GeoMapFeature \\| null, originalId: string \\| number) => void` | — | Feature click handler |",
          "| `onMarkerClick` | `(marker: GeoMapMarker) => void` | — | Marker click handler |",
          "| `valueFormatter` | `(value: number) => string` | — | Format tooltip values |",
          "| `format` | `FormatPreset` | — | Format preset |",
          "| `decimals` | `number` | — | Decimal places |",
          "| `currency` | `string` | — | Currency symbol |",
          "| `abbreviate` | `boolean` | — | Abbreviate large numbers |",
          '| `locale` | `UILocale` | `"en-US"` | i18n locale |',
          "| `loading` | `boolean` | `false` | Animated skeleton while data loads |",
        ].join("\n"),
      },
    },
  },
  args: {
    geoData: "/geojson/world.geojson",
  },
  argTypes: {
    height: {
      control: { type: "range", min: 200, max: 700, step: 20 },
      table: { defaultValue: { summary: "400" } },
    },
    enableZoom: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    showZoomControls: {
      control: "boolean",
      description:
        "Zoom in / out / reset buttons on the right edge. Implies zoom and pan.",
      table: { defaultValue: { summary: "false" } },
    },
    expandable: {
      control: "boolean",
      description:
        "Expand button (top-right) that opens the map in a full-screen dialog.",
      table: { defaultValue: { summary: "false" } },
    },
    showTooltip: {
      control: "boolean",
      table: { defaultValue: { summary: "true" } },
    },
    showLegend: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    title: {
      control: "text",
      table: { defaultValue: { summary: "" } },
    },
    subtitle: {
      control: "text",
      table: { defaultValue: { summary: "" } },
    },
    legendLabel: {
      control: "text",
      table: { defaultValue: { summary: "" } },
    },
    loading: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    locale: {
      control: "inline-radio",
      options: ["en-US", "pt-BR", "es-ES", "fr-FR"],
      table: { defaultValue: { summary: "en-US" } },
    },
    projection: {
      control: "select",
      options: [
        "geoMercator",
        "geoEqualEarth",
        "geoNaturalEarth1",
        "geoAlbersUsa",
        "geoOrthographic",
      ],
      table: { defaultValue: { summary: "geoMercator" } },
    },
    legendPosition: {
      control: "select",
      options: [
        "top-left",
        "top-right",
        "bottom-left",
        "bottom-right",
        "bottom",
      ],
      table: { defaultValue: { summary: "bottom-right" } },
    },
    legendOrientation: {
      control: "inline-radio",
      options: ["horizontal", "vertical"],
      table: { defaultValue: { summary: "horizontal" } },
    },
    defaultFill: {
      control: "text",
      table: { defaultValue: { summary: "" } },
    },
    featureIdProperty: {
      control: "text",
      table: { defaultValue: { summary: "" } },
    },
    selectedStroke: {
      control: "color",
      table: { defaultValue: { summary: "" } },
    },
    format: {
      control: "inline-radio",
      options: ["number", "currency", "percent", "compact"],
      table: { defaultValue: { summary: "" } },
    },
    decimals: {
      control: { type: "range", min: 0, max: 6, step: 1 },
      table: { defaultValue: { summary: "" } },
    },
    currency: {
      control: "text",
      table: { defaultValue: { summary: "" } },
    },
    abbreviate: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    geoData: { table: { disable: true } },
    data: { table: { disable: true } },
    colorRange: { table: { disable: true } },
    projectionConfig: { table: { disable: true } },
    zoomRange: { table: { disable: true } },
    markers: { table: { disable: true } },
    footer: { table: { disable: true } },
    selectedFeatureIds: { table: { disable: true } },
    onFeatureClick: { table: { disable: true } },
    onMarkerClick: { table: { disable: true } },
    onExpandedChange: { table: { disable: true } },
    valueFormatter: { table: { disable: true } },
  },
} satisfies Meta<typeof GeoMapChart>

export default meta
type Story = StoryObj<typeof meta>

// ── Stories ────────────────────────────────────────────────────────────────

/** World map — neutral, no data overlay */
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Neutral world map using the Natural Earth projection with a muted fill and no tooltip or data overlay.",
      },
    },
  },
  args: {
    title: "World Map",
    subtitle: "Neutral — no data overlay",
    geoData: "/geojson/world.geojson",
    data: [],
    markers: [],
    projection: "geoNaturalEarth1",
    enableZoom: false,
    zoomRange: [1, 8],
    selectedFeatureIds: [],
    showTooltip: false,
    legendPosition: "bottom-right",
    legendOrientation: "horizontal",
    loading: false,
    locale: "en-US",
    format: undefined,
    decimals: 0,
    abbreviate: false,
    currency: undefined,
    height: 420,
    defaultFill: "var(--muted)",
  },
}

/**
 * Choropleth over South American countries.
 * GeoJSON: world.geojson — feature.id = ISO Alpha-3.
 */
export const Choropleth: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "South America choropleth map coloring countries by active student enrollment with a vertical color legend and footer summary.",
      },
    },
  },
  args: {
    title: "Enrollment by Country",
    subtitle: "Active students — South America 2025",
    geoData: "/geojson/world.geojson",
    projection: "geoMercator",
    projectionConfig: { scale: 350, center: [-60, -15] },
    height: 420,
    colorRange: ["#dbeafe", "#1d4ed8"],
    legendOrientation: "vertical",

    data: [
      { id: "BRA", name: "Brazil", value: 98400 },
      { id: "ARG", name: "Argentina", value: 64200 },
      { id: "COL", name: "Colombia", value: 52100 },
      { id: "PER", name: "Peru", value: 38700 },
      { id: "VEN", name: "Venezuela", value: 31500 },
      { id: "CHL", name: "Chile", value: 28900 },
      { id: "ECU", name: "Ecuador", value: 22300 },
      { id: "BOL", name: "Bolivia", value: 18600 },
    ],
    showTooltip: true,
    valueFormatter: (v) =>
      formatValue(v, "integer", { abbreviate: true }) + " students",
    footer: (
      <div className="flex w-full items-center justify-between">
        <span className="flex items-center gap-1.5">
          <TrendingUp className="size-3.5 text-blue-500" />
          <span>Brazil leads with 98.4k active students</span>
        </span>
      </div>
    ),
  },
}

/**
 * Color legend — shown by default whenever colorRange is set.
 * legendPosition controls where it appears; legendOrientation switches
 * between a horizontal gradient bar and a vertical one.
 * Use the controls panel to try all combinations.
 */
export const WithLegend: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Brazil states choropleth demonstrating configurable legend position and orientation via the Controls panel.",
      },
    },
  },
  args: {
    title: "Legend — position & orientation",
    subtitle:
      "Switch legendPosition and legendOrientation in the controls panel",
    geoData: "/geojson/brazil-states.geojson",
    projection: "geoMercator",
    projectionConfig: { scale: 700, center: [-54, -15] },
    height: 420,
    featureIdProperty: "postal",
    colorRange: ["#dcfce7", "#16a34a"],
    legendLabel: "Active students",
    legendPosition: "bottom-right",
    legendOrientation: "horizontal",
    data: [
      { id: "SP", name: "Sao Paulo", value: 98400 },
      { id: "MG", name: "Minas Gerais", value: 64200 },
      { id: "RJ", name: "Rio de Janeiro", value: 52100 },
      { id: "BA", name: "Bahia", value: 38700 },
      { id: "RS", name: "Rio Grande do Sul", value: 31500 },
      { id: "PR", name: "Parana", value: 28900 },
      { id: "SC", name: "Santa Catarina", value: 22300 },
      { id: "GO", name: "Goias", value: 18600 },
    ],
    showTooltip: true,
    valueFormatter: (v) => formatValue(v, "integer", { abbreviate: true }),
  },
}

/**
 * Brazilian states choropleth.
 * GeoJSON: brazil-states.geojson (Natural Earth 50m) — no top-level id.
 * featureIdProperty="postal" maps UF codes (SP, RJ, MG…).
 */
export const BrazilStates: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Full Brazil states choropleth with enrollment data using feature ID mapping to postal codes and a green color gradient.",
      },
    },
  },
  args: {
    title: "Enrollment by State — Brazil",
    subtitle: "Active students 2025",
    geoData: "/geojson/brazil-states.geojson",
    projection: "geoMercator",
    projectionConfig: { scale: 700, center: [-54, -15] },
    height: 480,
    featureIdProperty: "postal",
    colorRange: ["#dcfce7", "#16a34a"],
    data: [
      { id: "SP", name: "Sao Paulo", value: 98400 },
      { id: "MG", name: "Minas Gerais", value: 64200 },
      { id: "RJ", name: "Rio de Janeiro", value: 52100 },
      { id: "BA", name: "Bahia", value: 38700 },
      { id: "RS", name: "Rio Grande do Sul", value: 31500 },
      { id: "PR", name: "Parana", value: 28900 },
      { id: "SC", name: "Santa Catarina", value: 22300 },
      { id: "GO", name: "Goias", value: 18600 },
      { id: "CE", name: "Ceara", value: 15200 },
      { id: "PE", name: "Pernambuco", value: 13800 },
      { id: "AM", name: "Amazonas", value: 11200 },
      { id: "PA", name: "Para", value: 10800 },
      { id: "MA", name: "Maranhao", value: 9600 },
      { id: "MT", name: "Mato Grosso", value: 8400 },
      { id: "ES", name: "Espirito Santo", value: 7900 },
      { id: "PB", name: "Paraiba", value: 7100 },
      { id: "RN", name: "Rio Grande do Norte", value: 6800 },
      { id: "AL", name: "Alagoas", value: 5900 },
      { id: "PI", name: "Piaui", value: 5400 },
      { id: "MS", name: "Mato Grosso do Sul", value: 5100 },
      { id: "SE", name: "Sergipe", value: 4300 },
      { id: "RO", name: "Rondonia", value: 3800 },
      { id: "TO", name: "Tocantins", value: 3200 },
      { id: "AC", name: "Acre", value: 2100 },
      { id: "DF", name: "Federal District", value: 1900 },
      { id: "AP", name: "Amapa", value: 1700 },
      { id: "RR", name: "Roraima", value: 1200 },
    ],
    showTooltip: true,
    valueFormatter: (v) =>
      formatValue(v, "integer", { abbreviate: true }) + " students",
    footer: (
      <div className="flex w-full items-center justify-between">
        <span className="flex items-center gap-1.5">
          <TrendingUp className="size-3.5 text-green-600" />
          <span>SP leads with 98.4k active students</span>
        </span>
      </div>
    ),
  },
}

/** Point markers on the world map, zoomed to Brazil */
export const WithMarkers: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "World map zoomed to Brazil showing six campus location markers with tooltip values and interactive marker clicks.",
      },
    },
  },
  args: {
    title: "Campus Locations",
    subtitle: "Distribution of physical campuses",
    geoData: "/geojson/world.geojson",
    projection: "geoMercator",
    projectionConfig: { scale: 700, center: [-50, -15] },
    height: 420,
    defaultFill: "var(--muted)",
    markers: [
      {
        id: "campus-sp-1",
        coordinates: [-46.63, -23.55],
        label: "SP Central",
        value: 12400,
      },
      {
        id: "campus-sp-2",
        coordinates: [-47.93, -22.12],
        label: "SP Interior",
        value: 5200,
      },
      {
        id: "campus-rj",
        coordinates: [-43.17, -22.9],
        label: "Rio",
        value: 8800,
      },
      {
        id: "campus-mg",
        coordinates: [-43.93, -19.92],
        label: "BH",
        value: 6300,
      },
      {
        id: "campus-rs",
        coordinates: [-51.23, -30.03],
        label: "POA",
        value: 4100,
      },
      {
        id: "campus-pr",
        coordinates: [-49.26, -25.43],
        label: "CWB",
        value: 3700,
      },
    ],
    showTooltip: true,
    valueFormatter: (v) => formatValue(v, "integer") + " students",
    footer: (
      <span className="flex items-center gap-1.5">
        <MapPin className="size-3.5 text-chart-1" />
        <span>6 campuses — click a marker for details</span>
      </span>
    ),
  },
}

/** Feature highlight on Brazil states */
export const WithHighlight: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Brazil states choropleth with SP, MG, and RJ highlighted using `selectedFeatureIds` and a custom primary stroke color.",
      },
    },
  },
  args: {
    title: "Selected States",
    subtitle: "SP, MG and RJ highlighted — control via selectedFeatureIds",
    geoData: "/geojson/brazil-states.geojson",
    projection: "geoMercator",
    projectionConfig: { scale: 700, center: [-54, -15] },
    height: 480,
    featureIdProperty: "postal",
    data: [
      { id: "SP", name: "Sao Paulo", value: 98400 },
      { id: "MG", name: "Minas Gerais", value: 64200 },
      { id: "RJ", name: "Rio de Janeiro", value: 52100 },
    ],
    colorRange: ["#dbeafe", "#1d4ed8"],
    selectedFeatureIds: ["SP", "MG", "RJ"],
    selectedStroke: "var(--primary)",
    showTooltip: true,
    valueFormatter: (v) =>
      formatValue(v, "integer", { abbreviate: true }) + " students",
  },
}

/**
 * US states choropleth — geoAlbersUsa projection.
 * Source: us-atlas@3 TopoJSON (react-simple-maps official recommendation).
 * Feature id = FIPS string ("06" = California). DC (id "11") excluded from data.
 *
 * Uses median household income ($52k–$98k) — evenly distributed so the
 * full color gradient is visible across all states.
 */
export const UsaStates: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "US states choropleth using the geoAlbersUsa projection with median household income data and an amber color gradient.",
      },
    },
  },
  args: {
    title: "Median Household Income — US States",
    subtitle: "Estimated annual income (USD thousands) — 2023",
    geoData: "/geojson/us-states-topo.json",
    projection: "geoAlbersUsa",
    height: 420,
    colorRange: ["#fef3c7", "#b45309"],
    defaultFill: "var(--muted)",
    showTooltip: true,
    valueFormatter: (v) =>
      formatValue(v * 1000, "currency", {
        currency: "USD",
        abbreviate: true,
        decimals: 0,
      }) + " / year",
    data: [
      { id: "01", name: "Alabama", value: 58 },
      { id: "02", name: "Alaska", value: 85 },
      { id: "04", name: "Arizona", value: 72 },
      { id: "05", name: "Arkansas", value: 57 },
      { id: "06", name: "California", value: 84 },
      { id: "08", name: "Colorado", value: 84 },
      { id: "09", name: "Connecticut", value: 90 },
      { id: "10", name: "Delaware", value: 75 },
      { id: "12", name: "Florida", value: 67 },
      { id: "13", name: "Georgia", value: 71 },
      { id: "15", name: "Hawaii", value: 92 },
      { id: "16", name: "Idaho", value: 67 },
      { id: "17", name: "Illinois", value: 74 },
      { id: "18", name: "Indiana", value: 67 },
      { id: "19", name: "Iowa", value: 70 },
      { id: "20", name: "Kansas", value: 68 },
      { id: "21", name: "Kentucky", value: 61 },
      { id: "22", name: "Louisiana", value: 57 },
      { id: "23", name: "Maine", value: 68 },
      { id: "24", name: "Maryland", value: 98 },
      { id: "25", name: "Massachusetts", value: 93 },
      { id: "26", name: "Michigan", value: 70 },
      { id: "27", name: "Minnesota", value: 84 },
      { id: "28", name: "Mississippi", value: 52 },
      { id: "29", name: "Missouri", value: 67 },
      { id: "30", name: "Montana", value: 68 },
      { id: "31", name: "Nebraska", value: 71 },
      { id: "32", name: "Nevada", value: 70 },
      { id: "33", name: "New Hampshire", value: 87 },
      { id: "34", name: "New Jersey", value: 92 },
      { id: "35", name: "New Mexico", value: 60 },
      { id: "36", name: "New York", value: 79 },
      { id: "37", name: "North Carolina", value: 68 },
      { id: "38", name: "North Dakota", value: 70 },
      { id: "39", name: "Ohio", value: 68 },
      { id: "40", name: "Oklahoma", value: 60 },
      { id: "41", name: "Oregon", value: 73 },
      { id: "42", name: "Pennsylvania", value: 71 },
      { id: "44", name: "Rhode Island", value: 74 },
      { id: "45", name: "South Carolina", value: 63 },
      { id: "46", name: "South Dakota", value: 68 },
      { id: "47", name: "Tennessee", value: 65 },
      { id: "48", name: "Texas", value: 69 },
      { id: "49", name: "Utah", value: 82 },
      { id: "50", name: "Vermont", value: 74 },
      { id: "51", name: "Virginia", value: 85 },
      { id: "53", name: "Washington", value: 89 },
      { id: "54", name: "West Virginia", value: 55 },
      { id: "55", name: "Wisconsin", value: 72 },
      { id: "56", name: "Wyoming", value: 71 },
    ],
    footer: (
      <div className="flex w-full items-center justify-between">
        <span className="flex items-center gap-1.5">
          <TrendingUp className="size-3.5 text-amber-600" />
          <span>MD highest ($98k) · MS lowest ($52k) — US Census ACS 2023</span>
        </span>
      </div>
    ),
  },
}

// ── Loading ────────────────────────────────────────────────────────────────

function LoadingDemo(props: React.ComponentProps<typeof GeoMapChart>) {
  const [loading, setLoading] = React.useState(true)
  React.useEffect(() => {
    if (!loading) return
    const t = setTimeout(() => setLoading(false), 2500)
    return () => clearTimeout(t)
  }, [loading])
  return (
    <div className="flex flex-col gap-3">
      <GeoMapChart {...props} loading={loading} />
      <div className="flex items-center gap-3 px-1">
        <button
          onClick={() => setLoading(true)}
          className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
        >
          ↺ Simulate reload
        </button>
        <span className="text-xs text-muted-foreground">
          {loading ? "Fetching data…" : "Data loaded"}
        </span>
      </div>
    </div>
  )
}

export const Loading: Story = {
  name: "Loading State",
  parameters: {
    docs: {
      description: {
        story:
          "Pass `loading={true}` to replace the geo map with an animated skeleton that mirrors the title and subtitle structure.",
      },
    },
  },
  args: {
    title: "World Map",
    subtitle: "Neutral — no data overlay",
    geoData: "/geojson/world.geojson",
    projection: "geoNaturalEarth1",
    height: 420,
    showTooltip: false,
    defaultFill: "var(--muted)",
  },
  render: (args) => <LoadingDemo {...args} />,
}

/** Zoom and pan on Brazil states */
export const ZoomPan: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Brazil states choropleth with scroll-to-zoom and drag-to-pan enabled for interactive map exploration.",
      },
    },
  },
  args: {
    title: "Zoom & Pan enabled",
    subtitle: "Scroll to zoom · drag to pan",
    geoData: "/geojson/brazil-states.geojson",
    projection: "geoMercator",
    projectionConfig: { scale: 700, center: [-54, -15] },
    height: 480,
    featureIdProperty: "postal",
    enableZoom: true,
    zoomRange: [1, 10],
    colorRange: ["#dcfce7", "#16a34a"],
    data: [
      { id: "SP", name: "Sao Paulo", value: 98400 },
      { id: "MG", name: "Minas Gerais", value: 64200 },
      { id: "RJ", name: "Rio de Janeiro", value: 52100 },
      { id: "BA", name: "Bahia", value: 38700 },
      { id: "RS", name: "Rio Grande do Sul", value: 31500 },
      { id: "PR", name: "Parana", value: 28900 },
      { id: "SC", name: "Santa Catarina", value: 22300 },
      { id: "GO", name: "Goias", value: 18600 },
    ],
    showTooltip: true,
    valueFormatter: (v) => formatValue(v, "integer", { abbreviate: true }),
  },
}

const BRAZIL_STATES_DATA = [
  { id: "SP", name: "Sao Paulo", value: 98400 },
  { id: "MG", name: "Minas Gerais", value: 64200 },
  { id: "RJ", name: "Rio de Janeiro", value: 52100 },
  { id: "BA", name: "Bahia", value: 38700 },
  { id: "RS", name: "Rio Grande do Sul", value: 31500 },
  { id: "PR", name: "Parana", value: 28900 },
  { id: "SC", name: "Santa Catarina", value: 22300 },
  { id: "GO", name: "Goias", value: 18600 },
]

/** Zoom in / zoom out / reset buttons on the right edge of the map */
export const ZoomControls: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`showZoomControls` adds + / − / reset buttons on the right edge and enables drag-to-pan. The buttons disable at the `zoomRange` limits. When a vertical legend sits on the right, the buttons move to the left edge.",
      },
    },
  },
  args: {
    title: "Zoom controls",
    subtitle: "Use the buttons on the right · drag to pan",
    geoData: "/geojson/brazil-states.geojson",
    projection: "geoMercator",
    projectionConfig: { scale: 700, center: [-54, -15] },
    height: 480,
    featureIdProperty: "postal",
    showZoomControls: true,
    zoomRange: [1, 8],
    colorRange: ["#dcfce7", "#16a34a"],
    data: BRAZIL_STATES_DATA,
    legendLabel: "Students",
    valueFormatter: (v) => formatValue(v, "integer", { abbreviate: true }),
  },
}

/** Expand button that opens the map in a full-screen dialog */
export const Expandable: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`expandable` adds an expand button in the top-right corner. It opens the same map (data, legend, tooltip, zoom controls) in a full-screen dialog; the button becomes *collapse*, and Esc also closes it. Combine with `showZoomControls` to zoom inside the dialog.",
      },
    },
  },
  args: {
    title: "Expandable map",
    subtitle: "Click the expand button in the top-right corner",
    geoData: "/geojson/brazil-states.geojson",
    projection: "geoMercator",
    projectionConfig: { scale: 700, center: [-54, -15] },
    height: 480,
    featureIdProperty: "postal",
    expandable: true,
    showZoomControls: true,
    colorRange: ["#dcfce7", "#16a34a"],
    data: BRAZIL_STATES_DATA,
    legendLabel: "Students",
    valueFormatter: (v) => formatValue(v, "integer", { abbreviate: true }),
  },
}
