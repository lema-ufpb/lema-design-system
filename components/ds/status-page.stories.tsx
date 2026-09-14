import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, within } from "storybook/test"

import { StatusPage, type StatusService } from "./status-page"

const sampleServices: StatusService[] = [
  {
    id: "s1",
    name: "API de Modelos Econométricos",
    description: "Endpoints REST para simulação e estimação bayesiana",
    status: "operational",
    uptimePercentage: 99.98,
  },
  {
    id: "s2",
    name: "Cluster Spark & Processamento de Microdados",
    description: "Workers de ETL da PNAD, Censo Escolar e RAIS",
    status: "operational",
    uptimePercentage: 99.95,
  },
  {
    id: "s3",
    name: "Banco de Dados e Séries Temporais (S3 / RustFS)",
    description: "Armazenamento diskless de parquet e índices de consulta",
    status: "operational",
    uptimePercentage: 100,
  },
  {
    id: "s4",
    name: "Portal Web e Documentação",
    description: "Frontend do LEMA e Storybook público",
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
      options: ["pt-BR", "en-US", "es-ES", "fr-FR"],
      description: "Language locale.",
    },
  },
} satisfies Meta<typeof StatusPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    locale: "pt-BR",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(
      canvas.getByText("Todos os sistemas operacionais")
    ).toBeInTheDocument()
    await expect(
      canvas.getByText("API de Modelos Econométricos")
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
        title: "Interrupção na API de Modelos Econométricos",
        date: "Hoje às 14:22",
        status: "investigating",
        description:
          "Identificamos latência elevada e timeouts em consultas de simulação de longo prazo. A equipe de engenharia está aplicando correção no cluster de workers.",
      },
    ],
  },
}

export const Loading: Story = {
  args: {
    loading: true,
  },
}
