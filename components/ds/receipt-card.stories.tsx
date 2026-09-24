import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  ReceiptCard,
  ReceiptCardHeader,
  ReceiptCardTitle,
  ReceiptCardDivider,
  ReceiptCardContent,
  ReceiptCardItem,
  ReceiptCardTotal,
  ReceiptCardFooter,
} from "./receipt-card"
import { BarcodeIcon } from "lucide-react"

const meta = {
  title: "Data Display/ReceiptCard",
  component: ReceiptCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ReceiptCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <ReceiptCard edges="both">
      <ReceiptCardHeader>
        <ReceiptCardTitle>LEMA-DS STORE</ReceiptCardTitle>
        <div className="mt-2 text-sm text-muted-foreground">
          Av. dos Ipês, S/N - Castelo Branco
          <br />
          João Pessoa - PB
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          23/10/2026 14:32:05
        </div>
      </ReceiptCardHeader>

      <ReceiptCardDivider />

      <ReceiptCardContent>
        <div className="space-y-3 text-sm">
          <ReceiptCardItem>
            <span>1x Radial Menu</span>
            <span>$29.90</span>
          </ReceiptCardItem>
          <ReceiptCardItem>
            <span>2x Morphing Dialog</span>
            <span>$50.00</span>
          </ReceiptCardItem>
          <ReceiptCardItem>
            <span>1x Dynamic Island</span>
            <span>$15.00</span>
          </ReceiptCardItem>
          <ReceiptCardItem>
            <span>1x Feedback Widget</span>
            <span>$0.00</span>
          </ReceiptCardItem>
        </div>

        <ReceiptCardTotal>
          <span>TOTAL</span>
          <span>$94.90</span>
        </ReceiptCardTotal>
      </ReceiptCardContent>

      <ReceiptCardDivider />

      <ReceiptCardFooter>
        <BarcodeIcon
          className="mb-4 h-12 w-full text-foreground/80"
          strokeWidth={1}
        />
        <p>Thank you for using LEMA-DS!</p>
        <p>Come again soon.</p>
      </ReceiptCardFooter>
    </ReceiptCard>
  ),
}

export const TopEdgeOnly: Story = {
  render: () => (
    <ReceiptCard edges="top">
      <ReceiptCardHeader>
        <ReceiptCardTitle>TICKET #42</ReceiptCardTitle>
      </ReceiptCardHeader>
      <ReceiptCardDivider />
      <ReceiptCardContent>
        <ReceiptCardItem>
          <span>VIP Ticket</span>
          <span>$150.00</span>
        </ReceiptCardItem>
      </ReceiptCardContent>
    </ReceiptCard>
  ),
}

export const BottomEdgeOnly: Story = {
  render: () => (
    <ReceiptCard edges="bottom">
      <ReceiptCardContent>
        <div className="text-center">
          <div className="text-4xl font-bold">TICKET</div>
          <div className="mt-4 text-6xl font-black text-primary">A042</div>
        </div>
      </ReceiptCardContent>
    </ReceiptCard>
  ),
}
