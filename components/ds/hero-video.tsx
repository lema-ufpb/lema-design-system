import * as React from "react"

import { Badge } from "@/components/ui/badge"
import type { UILocale } from "@/lib/ui-i18n"
import {
  HeroActions,
  HeroDescription,
  HeroHeader,
  HeroMedia,
  HeroSection,
  HeroTitle,
} from "./hero-section"
import { VideoDialog } from "./video-dialog"

// ── Types ──

export interface HeroVideoProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "title"
> {
  kicker?: string
  title: React.ReactNode
  description?: string
  actions?: React.ReactNode
  videoSrc: string
  thumbnailSrc: string
  videoTitle?: string
  locale?: UILocale
}

// ── Component ──

/**
 * Centered hero with a video thumbnail below the fold that opens in a
 * dialog on click — composed from `HeroSection` and `VideoDialog`.
 */
export function HeroVideo({
  kicker,
  title,
  description,
  actions,
  videoSrc,
  thumbnailSrc,
  videoTitle,
  locale,
  className,
  ...props
}: HeroVideoProps) {
  return (
    <HeroSection
      align="center"
      className={className}
      data-slot="hero-video"
      {...props}
    >
      {kicker && (
        <HeroHeader>
          <Badge variant="secondary">{kicker}</Badge>
        </HeroHeader>
      )}

      <HeroTitle>{title}</HeroTitle>
      {description && <HeroDescription>{description}</HeroDescription>}
      {actions && <HeroActions>{actions}</HeroActions>}

      <HeroMedia className="mx-auto max-w-3xl">
        <VideoDialog
          videoSrc={videoSrc}
          thumbnailSrc={thumbnailSrc}
          title={videoTitle}
          locale={locale}
          variant="glow"
        />
      </HeroMedia>
    </HeroSection>
  )
}
