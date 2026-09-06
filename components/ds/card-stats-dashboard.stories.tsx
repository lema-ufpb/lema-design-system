import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  DollarSignIcon,
  ShoppingCartIcon,
  ActivityIcon,
  EyeIcon,
  BarChart2Icon,
  ShieldCheckIcon,
  HeartIcon,
  TrendingUpIcon,
  UsersIcon,
} from "lucide-react"
import {
  CardStat,
  CardStatHighlight,
  CardStatCompact,
  CardStatSparkline,
  CardStatComparison,
  CardStatProgress,
  CardStatGauge,
  CardStatHeatbar,
  CardStatList,
} from "./card-stats"

// ── Shared realistic dataset ────────────────────────────────────────────────

const WEEKLY_SESSIONS = [32400, 38100, 35600, 41200, 39800, 48500, 57891]
const WEEKLY_REVENUE = [18200, 21500, 19800, 24100, 22900, 28400, 31750]
const WEEKLY_ORDERS = [310, 365, 340, 398, 381, 452, 521]
const WEEKLY_BOUNCE = [42, 39, 41, 36, 38, 34, 32]

const meta = {
  title: "Blocks/CardStatsDashboard",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Dashboard: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Full dashboard layout combining all CardStat variants — compact counters, sparklines, comparison, progress, gauge, heatbar, and list components in a realistic grid.",
      },
    },
  },
  render: () => (
    <div className="flex min-h-screen flex-col gap-4 rounded-2xl bg-muted/30 p-6">
      <CardStat
        label="Active Users"
        value={15309}
        format="integer"
        description="No change this week"
        trend="neutral"
        icon={UsersIcon}
      />
      {/* Banner KPI */}
      <CardStatHighlight
        label="Total Revenue — Q4 2024"
        value={2400000}
        format="currency"
        trend="up"
        trendValue="+18% YoY"
        description="ahead of forecast"
        icon={TrendingUpIcon}
        variant="emerald"
      />

      {/* Row 1 — compact counters */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <CardStatCompact
          label="Sessions"
          value={57891}
          format="integer"
          trend="up"
          trendValue="+12.4%"
          icon={EyeIcon}
        />
        <CardStatCompact
          label="Orders"
          value={1847}
          format="integer"
          trend="up"
          trendValue="+8.1%"
          icon={ShoppingCartIcon}
        />
        <CardStatCompact
          label="Avg. Order Value"
          value={67.4}
          format="currency"
          trend="up"
          trendValue="+$4.20"
          icon={DollarSignIcon}
        />
        <CardStatCompact
          label="Churn Rate"
          value={0.024}
          format="percent"
          decimals={1}
          trend="down"
          trendValue="−0.8%"
          icon={ActivityIcon}
        />
      </div>

      {/* Row 2 — sparklines */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <CardStatSparkline
          label="Weekly Sessions"
          value={57891}
          format="integer"
          data={WEEKLY_SESSIONS}
          trend="up"
          trendValue="+5.2%"
          icon={EyeIcon}
        />
        <CardStatSparkline
          label="Weekly Revenue"
          value={31750}
          format="currency"
          data={WEEKLY_REVENUE}
          trend="up"
          trendValue="+11.8%"
          icon={DollarSignIcon}
        />
        <CardStatSparkline
          label="Weekly Orders"
          value={521}
          format="integer"
          data={WEEKLY_ORDERS}
          trend="up"
          trendValue="+15.2%"
          icon={ShoppingCartIcon}
        />
        <CardStatSparkline
          label="Bounce Rate"
          value={0.324}
          format="percent"
          decimals={1}
          data={WEEKLY_BOUNCE}
          trend="down"
          trendValue="−5.9%"
          icon={ActivityIcon}
        />
      </div>

      {/* Row 3 — comparison + progress */}
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        <CardStatComparison
          label="Monthly Revenue"
          current={124500}
          previous={98200}
          format="currency"
          currentLabel="This month"
          previousLabel="Last month"
          icon={DollarSignIcon}
        />
        <CardStatProgress
          label="Monthly Orders Goal"
          value={1284}
          goal={2000}
          format="integer"
          description="Target by end of month"
          icon={ShoppingCartIcon}
        />
        <CardStatProgress
          label="Revenue Goal"
          value={87500}
          goal={100000}
          format="currency"
          description="Q4 quarterly target"
          icon={DollarSignIcon}
        />
      </div>

      {/* Row 4 — gauge + heatbar + list */}
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        <div className="grid grid-cols-2 gap-3">
          <CardStatGauge
            label="NPS Score"
            value={78}
            min={0}
            max={100}
            description="Customer loyalty"
          />
          <CardStatGauge
            label="Quality"
            value={91}
            min={0}
            max={100}
            description="Code pipeline"
            icon={ShieldCheckIcon}
          />
        </div>
        <CardStatHeatbar
          label="Customer Satisfaction"
          value={87}
          description="Based on 2,847 responses this month"
          icon={HeartIcon}
        />
        <CardStatList
          label="Performance Overview"
          icon={BarChart2Icon}
          items={[
            {
              label: "Sessions",
              value: 57891,
              format: "integer",
              trend: "up",
              trendValue: "+12%",
            },
            {
              label: "Bounce Rate",
              value: 0.342,
              format: "percent",
              decimals: 1,
              trend: "down",
              trendValue: "−3pts",
            },
            {
              label: "Avg. Duration",
              value: "3m 42s",
              trend: "up",
              trendValue: "+8%",
            },
            {
              label: "Conversions",
              value: 1284,
              format: "integer",
              trend: "up",
              trendValue: "+8%",
            },
          ]}
        />
      </div>
    </div>
  ),
}

export const DashboardWithIconMiniCards: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Adds an extra row of mini icon cards at the bottom — ultra-compact `CardStatCompact` with `size='sm'` showing only icons and minimal data.",
      },
    },
  },
  render: () => (
    <div className="flex min-h-screen flex-col gap-4 rounded-2xl bg-muted/30 p-6">
      <CardStat
        label="Active Users"
        value={15309}
        format="integer"
        description="No change this week"
        trend="neutral"
        icon={UsersIcon}
      />
      <CardStatHighlight
        label="Total Revenue — Q4 2024"
        value={2400000}
        format="currency"
        trend="up"
        trendValue="+18% YoY"
        description="ahead of forecast"
        icon={TrendingUpIcon}
        variant="emerald"
      />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <CardStatCompact
          label="Sessions"
          value={57891}
          format="integer"
          trend="up"
          trendValue="+12.4%"
          icon={EyeIcon}
        />
        <CardStatCompact
          label="Orders"
          value={1847}
          format="integer"
          trend="up"
          trendValue="+8.1%"
          icon={ShoppingCartIcon}
        />
        <CardStatCompact
          label="Avg. Order Value"
          value={67.4}
          format="currency"
          trend="up"
          trendValue="+$4.20"
          icon={DollarSignIcon}
        />
        <CardStatCompact
          label="Churn Rate"
          value={0.024}
          format="percent"
          decimals={1}
          trend="down"
          trendValue="−0.8%"
          icon={ActivityIcon}
        />
      </div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <CardStatSparkline
          label="Weekly Sessions"
          value={57891}
          format="integer"
          data={WEEKLY_SESSIONS}
          trend="up"
          trendValue="+5.2%"
          icon={EyeIcon}
        />
        <CardStatSparkline
          label="Weekly Revenue"
          value={31750}
          format="currency"
          data={WEEKLY_REVENUE}
          trend="up"
          trendValue="+11.8%"
          icon={DollarSignIcon}
        />
        <CardStatSparkline
          label="Weekly Orders"
          value={521}
          format="integer"
          data={WEEKLY_ORDERS}
          trend="up"
          trendValue="+15.2%"
          icon={ShoppingCartIcon}
        />
        <CardStatSparkline
          label="Bounce Rate"
          value={0.324}
          format="percent"
          decimals={1}
          data={WEEKLY_BOUNCE}
          trend="down"
          trendValue="−5.9%"
          icon={ActivityIcon}
        />
      </div>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        <CardStatComparison
          label="Monthly Revenue"
          current={124500}
          previous={98200}
          format="currency"
          currentLabel="This month"
          previousLabel="Last month"
          icon={DollarSignIcon}
        />
        <CardStatProgress
          label="Monthly Orders Goal"
          value={1284}
          goal={2000}
          format="integer"
          description="Target by end of month"
          icon={ShoppingCartIcon}
        />
        <CardStatProgress
          label="Revenue Goal"
          value={87500}
          goal={100000}
          format="currency"
          description="Q4 quarterly target"
          icon={DollarSignIcon}
        />
      </div>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        <div className="grid grid-cols-2 gap-3">
          <CardStatGauge
            label="NPS Score"
            value={78}
            min={0}
            max={100}
            description="Customer loyalty"
          />
          <CardStatGauge
            label="Quality"
            value={91}
            min={0}
            max={100}
            description="Code pipeline"
            icon={ShieldCheckIcon}
          />
        </div>
        <CardStatHeatbar
          label="Customer Satisfaction"
          value={87}
          description="Based on 2,847 responses this month"
          icon={HeartIcon}
        />
        <CardStatList
          label="Performance Overview"
          icon={BarChart2Icon}
          items={[
            {
              label: "Sessions",
              value: 57891,
              format: "integer",
              trend: "up",
              trendValue: "+12%",
            },
            {
              label: "Bounce Rate",
              value: 0.342,
              format: "percent",
              decimals: 1,
              trend: "down",
              trendValue: "−3pts",
            },
            {
              label: "Avg. Duration",
              value: "3m 42s",
              trend: "up",
              trendValue: "+8%",
            },
            {
              label: "Conversions",
              value: 1284,
              format: "integer",
              trend: "up",
              trendValue: "+8%",
            },
          ]}
        />
      </div>

      {/* ── Row 5 — Mini Icon Cards ── */}
      <h3 className="mt-2 text-sm font-semibold text-muted-foreground">
        Mini Icon Cards
      </h3>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
        <CardStatCompact
          label="Users"
          value={15309}
          format="integer"
          icon={UsersIcon}
          size="sm"
          variant="muted"
        />
        <CardStatCompact
          label="Revenue"
          value={31750}
          format="currency"
          icon={DollarSignIcon}
          size="sm"
          variant="muted"
        />
        <CardStatCompact
          label="Orders"
          value={521}
          format="integer"
          icon={ShoppingCartIcon}
          size="sm"
          variant="muted"
        />
        <CardStatCompact
          label="Sessions"
          value={57891}
          format="integer"
          icon={EyeIcon}
          size="sm"
          variant="muted"
        />
        <CardStatCompact
          label="Churn"
          value={0.024}
          format="percent"
          decimals={1}
          trend="down"
          trendValue="−0.8%"
          icon={ActivityIcon}
          size="sm"
          variant="muted"
        />
        <CardStatCompact
          label="NPS"
          value={78}
          format="integer"
          icon={ShieldCheckIcon}
          size="sm"
          variant="muted"
        />
        <CardStatCompact
          label="Satisfaction"
          value={0.87}
          format="percent"
          decimals={0}
          icon={HeartIcon}
          size="sm"
          variant="muted"
        />
        <CardStatCompact
          label="Conversions"
          value={1284}
          format="integer"
          icon={BarChart2Icon}
          size="sm"
          variant="muted"
        />
      </div>
    </div>
  ),
}
