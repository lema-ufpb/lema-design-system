import * as React from "react"

import { cn } from "@/lib/utils"
import { CardIcon, type CardIconTone } from "./card-icon"

// ── Types ──

export interface ContactChannel {
  icon: React.ElementType
  title: string
  description?: string
  href?: string
  actionLabel?: string
  tone?: CardIconTone
}

export interface ContactChannelsProps extends React.HTMLAttributes<HTMLDivElement> {
  channels: ContactChannel[]
}

// ── Component ──

/**
 * A row of contact-channel cards (email, phone, chat...) — composed from
 * `CardIcon`.
 */
export function ContactChannels({
  channels,
  className,
  ...props
}: ContactChannelsProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
        className
      )}
      data-slot="contact-channels"
      {...props}
    >
      {channels.map((channel) => (
        <CardIcon
          key={channel.title}
          icon={channel.icon}
          title={channel.title}
          description={channel.description}
          href={channel.href}
          actionLabel={channel.actionLabel}
          tone={channel.tone ?? "primary"}
        />
      ))}
    </div>
  )
}
