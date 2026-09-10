import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// ── Types ──

export interface MeteorShowerProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof meteorShowerVariants> {}

// ── Variants ──

export const meteorShowerVariants = cva(
  "pointer-events-none absolute inset-0 overflow-hidden",
  {
    variants: {
      tone: {
        primary: "[--meteor-color:var(--primary)]",
        violet: "[--meteor-color:var(--highlight-violet)]",
        sky: "[--meteor-color:var(--highlight-sky)]",
        neutral: "[--meteor-color:var(--foreground)]",
      },
      density: {
        sm: "",
        md: "",
        lg: "",
      },
    },
    defaultVariants: { tone: "primary", density: "md" },
  }
)

const DENSITY_COUNT = { sm: 8, md: 14, lg: 20 } as const
const MAX_METEORS = 20

// mulberry32 — gerador pseudo-aleatório determinístico, garante que o
// markup do servidor e do cliente sejam idênticos sem precisar de
// "use client" nem de estado para posicionar os meteoros.
function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const rand = mulberry32(42)
const METEORS = Array.from({ length: MAX_METEORS }, () => ({
  left: `${Math.round(rand() * 100)}%`,
  top: `${Math.round(rand() * -50 - 5)}%`,
  delay: `${(rand() * 6).toFixed(2)}s`,
  duration: `${(2.5 + rand() * 2.5).toFixed(2)}s`,
}))

// ── Component ──

/**
 * Chuva de meteoros 100% CSS para fundo de hero — sem canvas, sem RAF,
 * sem "use client". As posições são geradas de forma determinística para
 * evitar mismatch de hidratação. `motion-reduce:hidden` remove os
 * meteoros por completo sob `prefers-reduced-motion`.
 */
export function MeteorShower({
  className,
  tone = "primary",
  density = "md",
  ...props
}: MeteorShowerProps) {
  const count = DENSITY_COUNT[density ?? "md"]

  return (
    <div
      aria-hidden="true"
      data-slot="meteor-shower"
      className={cn(meteorShowerVariants({ tone, density }), className)}
      {...props}
    >
      {METEORS.slice(0, count).map((meteor, index) => (
        <span
          key={index}
          className="absolute top-0 left-0 size-1 rotate-[215deg] rounded-full bg-[var(--meteor-color)] before:absolute before:top-1/2 before:left-0 before:h-px before:w-12 before:-translate-y-1/2 before:bg-gradient-to-r before:from-[var(--meteor-color)] before:to-transparent before:content-[''] motion-reduce:hidden"
          style={{
            left: meteor.left,
            top: meteor.top,
            animationName: "meteor-fall",
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            animationDelay: meteor.delay,
            animationDuration: meteor.duration,
          }}
        />
      ))}
      <style>{`
        @keyframes meteor-fall {
          0% { transform: rotate(215deg) translateX(0); opacity: 1; }
          70% { opacity: 1; }
          100% { transform: rotate(215deg) translateX(-500px); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
