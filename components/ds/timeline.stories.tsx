import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { CheckIcon, AlertTriangleIcon, InfoIcon } from "lucide-react"

import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
} from "./timeline"

const meta = {
  title: "Data Display/Timeline",
  component: Timeline,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "Displays a list of events connected by a vertical timeline.",
          "Supports CVA variants.",
          "",
          "---",
          "",
          "## Props",
          "",
          "| Prop | Type | Default | Description |",
          "| --- | --- | --- | --- |",
          '| `status` | `"default" \| "primary" \| "success" \| "warning" \| "destructive"` | `"default"` | Variant |',
          '| `solid` | `"true" \| "false"` | — | Variant |',
        ].join("\n"),
      },
    },
  },
} satisfies Meta<typeof Timeline>

export default meta
type Story = StoryObj<typeof meta>

const STATUSES = [
  "default",
  "primary",
  "success",
  "warning",
  "destructive",
] as const

export const Default: Story = {
  render: () => (
    <Timeline>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <h4 className="font-medium">Pedido recebido</h4>
          <p className="text-sm text-muted-foreground">
            O pedido foi recebido no sistema.
          </p>
          <span className="text-xs text-muted-foreground">10:00 AM</span>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <h4 className="font-medium">Em processamento</h4>
          <p className="text-sm text-muted-foreground">
            O pedido está sendo separado no estoque.
          </p>
          <span className="text-xs text-muted-foreground">11:30 AM</span>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
        </TimelineSeparator>
        <TimelineContent>
          <h4 className="font-medium">Enviado</h4>
          <p className="text-sm text-muted-foreground">
            O pedido está a caminho.
          </p>
          <span className="text-xs text-muted-foreground">02:15 PM</span>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="mb-2 text-sm font-medium text-muted-foreground">
          Outline (solid=false)
        </h3>
        <Timeline>
          {STATUSES.map((status, i) => (
            <TimelineItem key={status}>
              <TimelineSeparator>
                <TimelineDot status={status} />
                {i < STATUSES.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent>
                <h4 className="font-medium capitalize">{status}</h4>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium text-muted-foreground">
          Solid (solid=true)
        </h3>
        <Timeline>
          {STATUSES.map((status, i) => (
            <TimelineItem key={status}>
              <TimelineSeparator>
                <TimelineDot status={status} solid />
                {i < STATUSES.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent>
                <h4 className="font-medium capitalize">{status}</h4>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </div>
    </div>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <Timeline>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot
            status="success"
            className="size-6 border-none bg-success text-success-foreground"
          >
            <CheckIcon className="size-3" />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <h4 className="mt-0.5 font-medium">Sucesso</h4>
          <p className="text-sm text-muted-foreground">
            Aprovado pelo sistema.
          </p>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot
            status="warning"
            className="size-6 border-none bg-warning text-warning-foreground"
          >
            <AlertTriangleIcon className="size-3" />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <h4 className="mt-0.5 font-medium">Aviso</h4>
          <p className="text-sm text-muted-foreground">
            Requer atenção manual.
          </p>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot className="size-6 border-none bg-muted text-muted-foreground">
            <InfoIcon className="size-3" />
          </TimelineDot>
        </TimelineSeparator>
        <TimelineContent>
          <h4 className="mt-0.5 font-medium">Informação</h4>
          <p className="text-sm text-muted-foreground">Apenas para registro.</p>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  ),
}
