import * as React from "react"

import { BentoGrid, BentoGridItem } from "./bento-grid"
import { BrowserMockup, type BrowserMockupProps } from "./browser-mockup"
import { CopyBlock } from "./copy-block"
import { FloatingCard } from "./floating-card"

// ── Types ──

export interface BentoShowcaseProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Rendered inside the large FloatingCard tile (e.g. an <img>). */
  screenshot: React.ReactNode
  browserUrl?: string
  browserVariant?: BrowserMockupProps["variant"]
  /** Rendered inside the terminal/browser tile. */
  browserContent?: React.ReactNode
  codeSnippet?: string
}

// ── Component ──

/**
 * A bento grid showcasing a product screenshot, a terminal/browser preview
 * and an install snippet — composed from `BentoGrid`, `FloatingCard`,
 * `BrowserMockup` and `CopyBlock`.
 */
export function BentoShowcase({
  screenshot,
  browserUrl,
  browserVariant = "terminal",
  browserContent,
  codeSnippet,
  className,
  ...props
}: BentoShowcaseProps) {
  return (
    <BentoGrid className={className} data-slot="bento-showcase" {...props}>
      <BentoGridItem
        colSpan={2}
        rowSpan={2}
        className="border-0 bg-transparent p-0 hover:translate-y-0 hover:shadow-none"
      >
        <FloatingCard className="h-full w-full overflow-hidden">
          {screenshot}
        </FloatingCard>
      </BentoGridItem>

      <BentoGridItem
        colSpan={2}
        className="border-0 bg-transparent p-0 hover:translate-y-0 hover:shadow-none"
      >
        <BrowserMockup
          url={browserUrl}
          variant={browserVariant}
          className="h-full"
        >
          {browserContent}
        </BrowserMockup>
      </BentoGridItem>

      {codeSnippet && (
        <BentoGridItem colSpan={2}>
          <CopyBlock value={codeSnippet} truncate className="w-full" />
        </BentoGridItem>
      )}
    </BentoGrid>
  )
}
