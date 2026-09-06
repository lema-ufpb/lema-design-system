"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Register, type RegisterProps } from "./register"

// ── Types ──────────────────────────────────────────────────────────────────

export type RegisterSimpleProps = RegisterProps & { badge?: string }

// ── Component ──────────────────────────────────────────────────────────────

export function RegisterSimple({
  className,
  badge,
  ...props
}: RegisterSimpleProps) {
  return (
    <div
      data-slot="register-simple"
      className={cn("mx-auto flex w-full max-w-md flex-col gap-4", className)}
    >
      {badge && (
        <Badge variant="outline" className="mx-auto rounded-full">
          {badge}
        </Badge>
      )}
      <Register {...props} />
    </div>
  )
}
