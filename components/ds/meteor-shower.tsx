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

const DENSITY_COUNT = { sm: 8, md: 14, lg: 24 } as const
const MAX_METEORS = 24

// mulberry32 — deterministic pseudo-random generator, ensures server
// and client markup are identical without needing
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
const METEORS = Array.from({ length: MAX_METEORS }, (_, i) => ({
  left: `${Math.round(rand() * 100)}%`,
  top: `${Math.round(rand() * -55 - 2)}%`,
  // First 4 meteors without delay for immediate effect when opening the story
  delay:
    i < 4 ? `${(rand() * 0.8).toFixed(2)}s` : `${(rand() * 3.5).toFixed(2)}s`,
  duration: `${(1.8 + rand() * 1.8).toFixed(2)}s`,
}))

// ── Component ──

/**
 * 100% CSS meteor shower for hero backgrounds — no canvas, no RAF,
 * no "use client". Positions are generated deterministically to
 * avoid hydration mismatch. `motion-reduce:hidden` removes the
 * meteors entirely under `prefers-reduced-motion`.
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
          className="absolute top-0 left-0 motion-reduce:hidden"
          style={{
            left: meteor.left,
            top: meteor.top,
            animation: `meteor-fall ${meteor.duration} linear ${meteor.delay} infinite`,
            willChange: "transform, opacity",
          }}
        >
          {/* Meteor head + tail via real elements (not pseudo) to ensure Tailwind generation */}
          <span
            className="absolute top-1/2 left-0 block size-[3px] -translate-y-1/2 rotate-[215deg] rounded-full"
            style={{ backgroundColor: "var(--meteor-color)" }}
          />
          <span
            className="absolute top-1/2 left-0 block h-px w-[72px] origin-right -translate-y-1/2 rotate-[215deg] opacity-90"
            style={{
              background: `linear-gradient(to left, var(--meteor-color), transparent)`,
            }}
          />
        </span>
      ))}
      <style>{`
        @keyframes meteor-fall {
          0% { transform: translate3d(0, 0, 0); opacity: 1; }
          70% { opacity: 1; }
          100% { transform: translate3d(-650px, 650px, 0); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-slot="meteor-shower"] { display: none; }
        }
      `}</style>
    </div>
  )
}
