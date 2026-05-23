import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { AlertCircle, TrendingDown, TrendingUp } from "lucide-react"
import { CandlestickChart } from "@/components/custom/candlestick-chart"

const meta = {
  title: "Data Display/CandlestickChart",
  component: CandlestickChart,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A responsive OHLC candlestick chart built on **Recharts** with shadcn semantic color tokens.",
          "",
          "Each candle encodes four values: **Open**, **High**, **Low**, and **Close**.",
          "The hollow body (open border, no fill) indicates a **bullish** candle (close ≥ open).",
          "The filled body indicates a **bearish** candle (close < open).",
          "Thin wicks extend from the body to the high and low prices.",
          "",
          "Enable `showVolume` to render color-coded volume bars in the lower section of the chart.",
          "Pass `movingAverages` with period configurations to overlay SMA lines (e.g. MA 7, MA 20, MA 50).",
          "Add `referenceLines` to mark support/resistance levels or price targets.",
          "Enable `showBrush` to add a range slider for panning and zooming a long series.",
          "",
          "## Colors",
          "",
          "Candle colors are intentionally fixed as financial conventions (green/red) regardless of theme.",
          "Override `positiveColor` and `negativeColor` with any CSS value.",
          "",
          "| Element | Default |",
          "| --- | --- |",
          "| **Bullish candle** | `#22c55e` (green-500) |",
          "| **Bearish candle** | `#ef4444` (red-500) |",
          "| **MA 1st** | `--chart-1` |",
          "| **MA 2nd** | `--chart-3` |",
          "| **MA 3rd** | `--chart-4` |",
          "",
          "## Other Semantic Tokens Used",
          "",
          "| Element | CSS Variable |",
          "| --- | --- |",
          "| **Grid lines** | `--border` |",
          "| **Axis labels** | `--muted-foreground` |",
          "| **Tooltip background** | `--card` / `--card-foreground` |",
          "| **Tooltip border** | `--border` |",
          "| **Tooltip cursor** | `--muted` |",
          "| **Brush handle** | `--card` / `--border` |",
          "| **Footer border** | `--border` |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    showVolume: { control: "boolean" },
    showGrid: { control: "boolean" },
    showLegend: { control: "boolean" },
    showTooltip: { control: "boolean" },
    showBrush: { control: "boolean" },
    legendPosition: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
    },
    height: { control: { type: "range", min: 200, max: 600, step: 10 } },
    positiveColor: { control: "color" },
    negativeColor: { control: "color" },
    title: { control: "text" },
    subtitle: { control: "text" },
    data: { table: { disable: true } },
    movingAverages: { table: { disable: true } },
    referenceLines: { table: { disable: true } },
    footer: { table: { disable: true } },
    valueFormatter: { table: { disable: true } },
    dateFormatter: { table: { disable: true } },
  },
} satisfies Meta<typeof CandlestickChart>

export default meta
type Story = StoryObj<typeof meta>

// ── Shared data sets ───────────────────────────────────────────────────────

// 30-day equity price — moderate trend with volatility
const equityData = [
  {
    date: "2025-01-02",
    open: 148.2,
    high: 152.4,
    low: 146.8,
    close: 151.3,
    volume: 1_820_000,
  },
  {
    date: "2025-01-03",
    open: 151.3,
    high: 154.6,
    low: 150.1,
    close: 153.8,
    volume: 2_140_000,
  },
  {
    date: "2025-01-06",
    open: 153.8,
    high: 156.2,
    low: 150.5,
    close: 151.0,
    volume: 2_480_000,
  },
  {
    date: "2025-01-07",
    open: 151.0,
    high: 153.4,
    low: 148.6,
    close: 149.2,
    volume: 1_960_000,
  },
  {
    date: "2025-01-08",
    open: 149.2,
    high: 151.8,
    low: 147.3,
    close: 150.9,
    volume: 1_720_000,
  },
  {
    date: "2025-01-09",
    open: 150.9,
    high: 155.1,
    low: 150.2,
    close: 154.6,
    volume: 2_650_000,
  },
  {
    date: "2025-01-10",
    open: 154.6,
    high: 158.3,
    low: 153.4,
    close: 157.8,
    volume: 3_120_000,
  },
  {
    date: "2025-01-13",
    open: 157.8,
    high: 160.5,
    low: 155.9,
    close: 159.2,
    volume: 2_890_000,
  },
  {
    date: "2025-01-14",
    open: 159.2,
    high: 161.4,
    low: 157.0,
    close: 158.1,
    volume: 2_210_000,
  },
  {
    date: "2025-01-15",
    open: 158.1,
    high: 163.2,
    low: 157.4,
    close: 162.5,
    volume: 3_450_000,
  },
  {
    date: "2025-01-16",
    open: 162.5,
    high: 165.8,
    low: 161.3,
    close: 164.9,
    volume: 3_810_000,
  },
  {
    date: "2025-01-17",
    open: 164.9,
    high: 166.2,
    low: 160.4,
    close: 161.7,
    volume: 2_560_000,
  },
  {
    date: "2025-01-21",
    open: 161.7,
    high: 164.5,
    low: 159.8,
    close: 163.4,
    volume: 2_180_000,
  },
  {
    date: "2025-01-22",
    open: 163.4,
    high: 167.1,
    low: 162.5,
    close: 166.2,
    volume: 2_920_000,
  },
  {
    date: "2025-01-23",
    open: 166.2,
    high: 169.8,
    low: 165.1,
    close: 168.4,
    volume: 3_340_000,
  },
  {
    date: "2025-01-24",
    open: 168.4,
    high: 170.6,
    low: 164.2,
    close: 165.3,
    volume: 2_740_000,
  },
  {
    date: "2025-01-27",
    open: 165.3,
    high: 168.9,
    low: 163.7,
    close: 167.8,
    volume: 2_480_000,
  },
  {
    date: "2025-01-28",
    open: 167.8,
    high: 171.4,
    low: 166.9,
    close: 170.6,
    volume: 3_650_000,
  },
  {
    date: "2025-01-29",
    open: 170.6,
    high: 174.2,
    low: 169.4,
    close: 173.1,
    volume: 4_120_000,
  },
  {
    date: "2025-01-30",
    open: 173.1,
    high: 175.8,
    low: 170.2,
    close: 171.4,
    volume: 3_280_000,
  },
]

// Crypto — high volatility, big wicks
const cryptoData = [
  {
    date: "2025-02-03",
    open: 42100,
    high: 45800,
    low: 40200,
    close: 44600,
    volume: 28_400,
  },
  {
    date: "2025-02-04",
    open: 44600,
    high: 46200,
    low: 41800,
    close: 42300,
    volume: 31_200,
  },
  {
    date: "2025-02-05",
    open: 42300,
    high: 48100,
    low: 41500,
    close: 47200,
    volume: 48_600,
  },
  {
    date: "2025-02-06",
    open: 47200,
    high: 49800,
    low: 44100,
    close: 45600,
    volume: 39_800,
  },
  {
    date: "2025-02-07",
    open: 45600,
    high: 50200,
    low: 44800,
    close: 49400,
    volume: 52_100,
  },
  {
    date: "2025-02-10",
    open: 49400,
    high: 52600,
    low: 46300,
    close: 51800,
    volume: 61_400,
  },
  {
    date: "2025-02-11",
    open: 51800,
    high: 55100,
    low: 50400,
    close: 53200,
    volume: 58_700,
  },
  {
    date: "2025-02-12",
    open: 53200,
    high: 54800,
    low: 47600,
    close: 48900,
    volume: 72_300,
  },
  {
    date: "2025-02-13",
    open: 48900,
    high: 52100,
    low: 45200,
    close: 50600,
    volume: 64_500,
  },
  {
    date: "2025-02-14",
    open: 50600,
    high: 57400,
    low: 49800,
    close: 56200,
    volume: 83_900,
  },
  {
    date: "2025-02-17",
    open: 56200,
    high: 58900,
    low: 53100,
    close: 54700,
    volume: 67_200,
  },
  {
    date: "2025-02-18",
    open: 54700,
    high: 59800,
    low: 53400,
    close: 58900,
    volume: 78_400,
  },
]

// Bearish trend — for the BearishTrend story
const bearishData = [
  {
    date: "2025-03-03",
    open: 285.4,
    high: 288.6,
    low: 280.2,
    close: 282.1,
    volume: 4_200_000,
  },
  {
    date: "2025-03-04",
    open: 282.1,
    high: 284.8,
    low: 274.6,
    close: 276.3,
    volume: 5_100_000,
  },
  {
    date: "2025-03-05",
    open: 276.3,
    high: 280.1,
    low: 271.4,
    close: 272.8,
    volume: 4_870_000,
  },
  {
    date: "2025-03-06",
    open: 272.8,
    high: 275.2,
    low: 264.5,
    close: 266.1,
    volume: 6_340_000,
  },
  {
    date: "2025-03-07",
    open: 266.1,
    high: 270.8,
    low: 261.3,
    close: 263.4,
    volume: 5_720_000,
  },
  {
    date: "2025-03-10",
    open: 263.4,
    high: 267.9,
    low: 256.8,
    close: 258.2,
    volume: 7_180_000,
  },
  {
    date: "2025-03-11",
    open: 258.2,
    high: 261.4,
    low: 249.6,
    close: 251.8,
    volume: 8_430_000,
  },
  {
    date: "2025-03-12",
    open: 251.8,
    high: 256.1,
    low: 244.3,
    close: 254.6,
    volume: 6_910_000,
  },
  {
    date: "2025-03-13",
    open: 254.6,
    high: 258.4,
    low: 247.1,
    close: 249.3,
    volume: 7_250_000,
  },
  {
    date: "2025-03-14",
    open: 249.3,
    high: 252.8,
    low: 241.6,
    close: 244.1,
    volume: 9_120_000,
  },
]

// 60-day dataset for the brush story
const longSeries = (() => {
  const pts = []
  let price = 100
  const start = new Date("2025-01-02")
  for (let i = 0; i < 60; i++) {
    const d = new Date(start)
    d.setDate(start.getDate() + i + Math.floor(i / 5) * 2)
    const o = price
    const move = (Math.random() - 0.48) * 4
    const c = Math.max(20, o + move)
    const h = Math.max(o, c) + Math.random() * 2.5
    const l = Math.min(o, c) - Math.random() * 2.5
    pts.push({
      date: d.toISOString().slice(0, 10),
      open: parseFloat(o.toFixed(2)),
      high: parseFloat(h.toFixed(2)),
      low: parseFloat(Math.max(1, l).toFixed(2)),
      close: parseFloat(c.toFixed(2)),
      volume: Math.round(1_000_000 + Math.random() * 4_000_000),
    })
    price = c
  }
  return pts
})()

// ── Stories ────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    title: "Equity Price — OHLC",
    subtitle: "January 2025 · hollow = bullish · filled = bearish",
    data: equityData,
    showGrid: true,
    showTooltip: true,
    height: 340,
  },
}

export const WithVolume: Story = {
  args: {
    title: "Equity Price with Volume",
    subtitle:
      "Volume bars in the lower section — green = bullish session · red = bearish",
    data: equityData,
    showVolume: true,
    showGrid: true,
    showTooltip: true,
    height: 360,
  },
}

export const WithMovingAverages: Story = {
  args: {
    title: "Equity Price — MA 7 & MA 14",
    subtitle: "Hover a candle to see MA values at that date",
    data: equityData,
    movingAverages: [
      { period: 7, label: "MA 7", color: "var(--chart-1)" },
      { period: 14, label: "MA 14", color: "var(--chart-3)", dashed: true },
    ],
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    height: 360,
  },
}

export const FullFeatured: Story = {
  args: {
    title: "Equity Price — Full Feature View",
    subtitle: "Volume · MA 7 · MA 20 · support and resistance reference lines",
    data: equityData,
    showVolume: true,
    movingAverages: [
      { period: 7, label: "MA 7", color: "var(--chart-1)" },
      { period: 20, label: "MA 20", color: "var(--chart-3)", dashed: true },
    ],
    referenceLines: [
      { value: 155, label: "Support", color: "var(--chart-2)", dashed: true },
      {
        value: 170,
        label: "Target",
        color: "var(--destructive)",
        dashed: false,
      },
    ],
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    height: 400,
  },
}

export const CryptoVolatility: Story = {
  args: {
    title: "BTC/USD — High-Volatility Session",
    subtitle: "Large wicks signal indecision — volume confirms breakout",
    data: cryptoData,
    showVolume: true,
    movingAverages: [{ period: 5, label: "MA 5", color: "var(--chart-1)" }],
    showGrid: true,
    showTooltip: true,
    height: 360,
    valueFormatter: (v) =>
      v >= 1000
        ? `$${v.toLocaleString("en-US", { maximumFractionDigits: 0 })}`
        : `$${v.toFixed(2)}`,
  },
}

export const BearishTrend: Story = {
  args: {
    title: "Equity Price — Bearish Breakdown",
    subtitle: "Downtrend confirmed by increasing volume on down days",
    data: bearishData,
    showVolume: true,
    movingAverages: [{ period: 5, label: "MA 5", color: "var(--chart-1)" }],
    referenceLines: [
      { value: 250, label: "Support", color: "var(--chart-2)", dashed: true },
    ],
    showGrid: true,
    showTooltip: true,
    height: 360,
    footer: (
      <span className="flex items-center gap-1.5">
        <TrendingDown className="size-3.5 text-destructive" />
        Price broke 250 support on Mar 11 — high volume confirms distribution
      </span>
    ),
  },
}

export const WithReferenceLines: Story = {
  args: {
    title: "Equity Price — Support & Resistance",
    subtitle: "Reference lines highlight key price levels to watch",
    data: equityData,
    referenceLines: [
      { value: 150, label: "Support", color: "var(--chart-2)", dashed: true },
      {
        value: 165,
        label: "Mid target",
        color: "var(--chart-3)",
        dashed: true,
      },
      {
        value: 175,
        label: "Resistance",
        color: "var(--destructive)",
        dashed: false,
      },
    ],
    showGrid: true,
    showTooltip: true,
    height: 360,
  },
}

export const WithBrush: Story = {
  args: {
    title: "60-Day Chart — Drag to Zoom",
    subtitle:
      "Drag the handles below to focus on any window · drag the bar to pan",
    data: longSeries,
    showVolume: true,
    movingAverages: [
      { period: 10, label: "MA 10", color: "var(--chart-1)" },
      { period: 20, label: "MA 20", color: "var(--chart-3)", dashed: true },
    ],
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    showBrush: true,
    height: 420,
  },
}

export const LegendPositions: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6">
      {(["top", "right", "bottom", "left"] as const).map((pos) => (
        <CandlestickChart
          key={pos}
          title={`legendPosition="${pos}"`}
          data={equityData.slice(0, 10)}
          movingAverages={[
            { period: 5, label: "MA 5", color: "var(--chart-1)" },
          ]}
          showLegend
          legendPosition={pos}
          showGrid
          showTooltip
          height={260}
        />
      ))}
    </div>
  ),
  args: { data: equityData },
}

export const LocalePTBR: Story = {
  args: {
    title: "Preço de Ações — OHLC",
    subtitle: "Janeiro 2025 · vazado = alta · preenchido = baixa",
    data: equityData,
    showGrid: true,
    showTooltip: true,
    height: 340,
    locale: "pt-BR",
  },
}

// ── Loading & Empty ────────────────────────────────────────────────────────

function LoadingDemo(props: React.ComponentProps<typeof CandlestickChart>) {
  const [loading, setLoading] = React.useState(true)
  React.useEffect(() => {
    if (!loading) return
    const t = setTimeout(() => setLoading(false), 2500)
    return () => clearTimeout(t)
  }, [loading])
  return (
    <div className="space-y-3">
      <CandlestickChart {...props} loading={loading} />
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
  args: {
    title: "Equity Price — OHLC",
    subtitle: "January 2025 · hollow = bullish · filled = bearish",
    data: equityData,
    showGrid: true,
    showTooltip: true,
    height: 340,
  },
  render: (args) => <LoadingDemo {...args} />,
}

export const EmptyState: Story = {
  args: {
    title: "Equity Price — OHLC",
    subtitle: "January 2025",
    data: [],
    height: 340,
  },
}

export const WithFooter: Story = {
  args: {
    title: "Equity Price — January 2025",
    subtitle: "20 trading sessions · OHLC + volume",
    data: equityData,
    showVolume: true,
    movingAverages: [
      { period: 7, label: "MA 7", color: "var(--chart-1)" },
      { period: 14, label: "MA 14", color: "var(--chart-3)", dashed: true },
    ],
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    height: 380,
    footer: (
      <div className="flex w-full items-center justify-between">
        <span className="flex items-center gap-1.5">
          <TrendingUp className="size-3.5 text-emerald-500" />
          +16.3% from open (148.20) to close (173.10)
        </span>
        <span className="flex items-center gap-1.5 text-muted-foreground/70">
          <AlertCircle className="size-3" />
          Jan 6–7: pullback after initial rally
        </span>
      </div>
    ),
  },
}
