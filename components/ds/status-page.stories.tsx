import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, within } from "storybook/test"

import { StatusPage, type StatusService } from "./status-page"

const sampleServices: StatusService[] = [
  {
    id: "s1",
    name: "Econometric Models API",
    description: "REST endpoints for simulation and Bayesian estimation",
    status: "operational",
    uptimePercentage: 99.98,
  },
  {
    id: "s2",
    name: "Spark Cluster & Microdata Processing",
    description: "ETL workers for PNAD, School Census and RAIS",
    status: "operational",
    uptimePercentage: 99.95,
  },
  {
    id: "s3",
    name: "Database & Time Series (S3 / RustFS)",
    description: "Diskless parquet storage and query indexes",
    status: "operational",
    uptimePercentage: 100,
  },
  {
    id: "s4",
    name: "Web Portal & Documentation",
    description: "LEMA frontend and public Storybook",
    status: "operational",
    uptimePercentage: 99.99,
  },
]

const meta = {
  title: "Data Display/StatusPage",
  component: StatusPage,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "System health and status page widget featuring 90-day daily uptime bars, incident log, and service availability badges.",
      },
    },
  },
  args: {
    services: sampleServices,
    overallStatus: "operational",
  },
  argTypes: {
    overallStatus: {
      control: "radio",
      options: ["operational", "degraded", "outage"],
      description: "Global system status.",
    },
    loading: {
      control: "boolean",
      description: "Shows skeleton loading layout.",
    },
    locale: {
      control: "radio",
      options: ["en-US", "pt-BR", "es-ES", "fr-FR"],
      description: "Language locale.",
    },
  },
} satisfies Meta<typeof StatusPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    locale: "en-US",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(
      canvas.getByText("All systems operational")
    ).toBeInTheDocument()
    await expect(
      canvas.getByText("Econometric Models API")
    ).toBeInTheDocument()
  },
}

export const DegradedPerformance: Story = {
  args: {
    overallStatus: "degraded",
    services: [
      sampleServices[0],
      {
        ...sampleServices[1],
        status: "degraded",
        uptimePercentage: 98.42,
      },
      sampleServices[2],
      sampleServices[3],
    ],
  },
}

export const MajorOutageWithIncidents: Story = {
  args: {
    overallStatus: "outage",
    services: [
      {
        ...sampleServices[0],
        status: "outage",
        uptimePercentage: 94.1,
      },
      sampleServices[1],
      sampleServices[2],
    ],
    incidents: [
      {
        id: "inc-1",
        title: "Outage in Econometric Models API",
        date: "Today at 2:22 PM",
        status: "investigating",
        description:
          "We have identified high latency and timeouts in long-running simulation queries. The engineering team is applying a fix to the worker cluster.",
      },
    ],
  },
}

export const Loading: Story = {
  args: {
    loading: true,
  },
}
