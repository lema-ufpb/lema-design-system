"use client"

import { useRef, useEffect, Children, useMemo, Fragment } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"

// ── Types ──────────────────────────────────────────────────────────────────

export type DashrowAlignment = "left" | "right" | "equal"
export type DashrowGap = "none" | "sm" | "md" | "lg"
export type DashrowPadding = "none" | "sm" | "md" | "lg"

export interface DashrowProps extends DashrowVariants {
  /**
   * Width ratio between children on desktop (lg+).
   * - `left`  — first child gets 60%, rest share 40%
   * - `right` — first child gets 40%, last gets 60%
   * - `equal` — all children share equally
   * @default "left"
   */
  alignment?: DashrowAlignment
  /** @default "md" */
  gap?: DashrowGap
  /** @default "none" */
  padding?: DashrowPadding
  /**
   * A unique key used to persist panel sizes in sessionStorage.
   * If omitted, sizes are not persisted across renders.
   */
  storageKey?: string
  /** @default true */
  resizable?: boolean
  locale?: UILocale
  children: ReactNode
  className?: string
}

// ── Variants ───────────────────────────────────────────────────────────────

export const dashrowContainerVariants = cva(
  ["flex w-full flex-col lg:flex-row", "transition-all duration-300"],
  {
    variants: {
      alignment: {
        left: "",
        right: "",
        equal: "",
      },
      gap: {
        none: "gap-0",
        sm: "gap-2",
        md: "gap-4",
        lg: "gap-6",
      },
      padding: {
        none: "p-0",
        sm: "p-2",
        md: "p-4",
        lg: "p-6",
      },
    },
    defaultVariants: {
      alignment: "left",
      gap: "md",
      padding: "none",
    },
  }
)

export const dashrowChildVariants = cva(
  "flex w-full min-w-0 flex-col lg:w-auto",
  {
    variants: {
      alignment: {
        left: "",
        right: "",
        equal: "",
      },
      position: {
        first: "",
        last: "",
        middle: "",
      },
    },
    compoundVariants: [
      { alignment: "left", position: "first", class: "lg:flex-[3]" },
      { alignment: "left", position: "last", class: "lg:flex-[2]" },
      { alignment: "left", position: "middle", class: "lg:flex-[2]" },
      { alignment: "right", position: "first", class: "lg:flex-[2]" },
      { alignment: "right", position: "last", class: "lg:flex-[3]" },
      { alignment: "right", position: "middle", class: "lg:flex-[2]" },
      { alignment: "equal", position: "first", class: "lg:flex-1" },
      { alignment: "equal", position: "last", class: "lg:flex-1" },
      { alignment: "equal", position: "middle", class: "lg:flex-1" },
    ],
    defaultVariants: {
      alignment: "left",
      position: "first",
    },
  }
)

export const dashrowDividerVariants = cva([
  "hidden shrink-0 items-center justify-center lg:flex",
  "w-3 cursor-col-resize rounded-full select-none",
  "transition-colors duration-200",
  "hover:bg-primary/10",
  "data-[dragging=true]:bg-primary/15",
  "focus-visible:ring-2 focus-visible:outline-none",
  "focus-visible:ring-ring focus-visible:ring-offset-1",
])

export const dashrowDividerHandleVariants = cva([
  "h-8 w-1 rounded-full",
  "bg-border",
  "transition-colors duration-200",
  "group-hover/divider:bg-primary/40",
])

export type DashrowVariants = VariantProps<typeof dashrowContainerVariants>
export type DashrowChildVariants = VariantProps<typeof dashrowChildVariants>

// ── Helpers ────────────────────────────────────────────────────────────────

/** Computes the initial aria-valuenow (0–100) for a divider based on alignment. */
function getInitialValueNow(
  alignment: DashrowAlignment,
  dividerIndex: number,
  count: number
): number {
  const weights = Array.from({ length: count }, (_, i) => {
    if (alignment === "equal") return 1
    if (alignment === "left") return i === 0 ? 3 : 2
    return i === count - 1 ? 3 : 2 // right
  })
  const total = weights.reduce((a, b) => a + b, 0)
  const sumBefore = weights
    .slice(0, dividerIndex + 1)
    .reduce((a, b) => a + b, 0)
  return Math.round((sumBefore / total) * 100)
}

// ── Dashrow ────────────────────────────────────────────────────────────────

export function Dashrow({
  alignment = "left",
  gap = "md",
  padding = "none",
  resizable = true,
  storageKey,
  children,
  locale = "en-US",
  className,
}: DashrowProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const childRefs = useRef<(HTMLDivElement | null)[]>([])
  const isDraggingRef = useRef(false)
  const manualWidthsRef = useRef<(string | null)[]>([])
  const activeDividerRef = useRef<{
    index: number
    startX: number
    leftPct: number
    rightPct: number
  } | null>(null)

  const childrenArray = Children.toArray(children)
  const count = childrenArray.length

  useEffect(() => {
    if (!storageKey) return
    try {
      const saved = sessionStorage.getItem(`dashrow:${storageKey}`)
      if (!saved) return
      const widths: string[] = JSON.parse(saved)
      widths.forEach((w, i) => {
        const el = childRefs.current[i]
        if (el) {
          el.style.flex = "none"
          el.style.width = w
          manualWidthsRef.current[i] = w
        }
      })
    } catch {
      // ignore corrupt storage
    }
  }, [storageKey])

  useEffect(() => {
    if (!resizable || count < 2) return

    const container = containerRef.current
    if (!container) return

    const dividers = container.querySelectorAll<HTMLElement>(
      "[data-dashrow-divider]"
    )

    function getClientX(e: MouseEvent | TouchEvent) {
      return "touches" in e ? e.touches[0].clientX : e.clientX
    }

    function onStart(dividerIndex: number) {
      return (e: MouseEvent | TouchEvent) => {
        if ("button" in e && e.button !== 0) return
        e.preventDefault()
        isDraggingRef.current = true

        const left = childRefs.current[dividerIndex]
        const right = childRefs.current[dividerIndex + 1]
        const rect = container!.getBoundingClientRect()

        activeDividerRef.current = {
          index: dividerIndex,
          startX: getClientX(e),
          leftPct: left
            ? (left.getBoundingClientRect().width / rect.width) * 100
            : 50,
          rightPct: right
            ? (right.getBoundingClientRect().width / rect.width) * 100
            : 50,
        }

        dividers[dividerIndex]?.setAttribute("data-dragging", "true")
        document.body.style.cursor = "col-resize"
        document.body.style.userSelect = "none"
      }
    }

    function onMove(e: MouseEvent | TouchEvent) {
      if (!isDraggingRef.current || !activeDividerRef.current) return
      const { index, startX, leftPct, rightPct } = activeDividerRef.current

      const rect = container!.getBoundingClientRect()
      const delta = ((getClientX(e) - startX) / rect.width) * 100
      const newLeft = Math.min(
        Math.max(leftPct + delta, 15),
        leftPct + rightPct - 15
      )
      const newRight = leftPct + rightPct - newLeft

      const leftEl = childRefs.current[index]
      const rightEl = childRefs.current[index + 1]
      if (leftEl) {
        leftEl.style.flex = "none"
        leftEl.style.width = `${newLeft}%`
      }
      if (rightEl) {
        rightEl.style.flex = "none"
        rightEl.style.width = `${newRight}%`
      }
      dividers[index]?.setAttribute(
        "aria-valuenow",
        String(Math.round(newLeft))
      )
    }

    function onKeyDown(dividerIndex: number) {
      return (e: KeyboardEvent) => {
        const step = e.shiftKey ? 15 : 5
        let delta = 0
        if (e.key === "ArrowLeft") delta = -step
        else if (e.key === "ArrowRight") delta = step
        else return

        e.preventDefault()

        const leftEl = childRefs.current[dividerIndex]
        const rightEl = childRefs.current[dividerIndex + 1]
        if (!leftEl || !rightEl) return

        const rect = container!.getBoundingClientRect()
        const leftPct =
          (leftEl.getBoundingClientRect().width / rect.width) * 100
        const rightPct =
          (rightEl.getBoundingClientRect().width / rect.width) * 100
        const newLeft = Math.min(
          Math.max(leftPct + delta, 15),
          leftPct + rightPct - 15
        )
        const newRight = leftPct + rightPct - newLeft

        leftEl.style.flex = "none"
        leftEl.style.width = `${newLeft}%`
        rightEl.style.flex = "none"
        rightEl.style.width = `${newRight}%`
        manualWidthsRef.current[dividerIndex] = `${newLeft}%`
        manualWidthsRef.current[dividerIndex + 1] = `${newRight}%`
        dividers[dividerIndex]?.setAttribute(
          "aria-valuenow",
          String(Math.round(newLeft))
        )

        if (storageKey) {
          try {
            const widths = childRefs.current.map((el) => el?.style.width ?? "")
            sessionStorage.setItem(
              `dashrow:${storageKey}`,
              JSON.stringify(widths)
            )
          } catch {
            // ignore quota errors
          }
        }
      }
    }

    function onEnd() {
      if (!isDraggingRef.current) return
      isDraggingRef.current = false

      if (activeDividerRef.current !== null) {
        dividers[activeDividerRef.current.index]?.setAttribute(
          "data-dragging",
          "false"
        )
      }
      activeDividerRef.current = null
      document.body.style.cursor = ""
      document.body.style.userSelect = ""

      childRefs.current.forEach((el, i) => {
        if (el?.style.width) manualWidthsRef.current[i] = el.style.width
      })

      if (storageKey) {
        try {
          const widths = childRefs.current.map((el) => el?.style.width ?? "")
          sessionStorage.setItem(
            `dashrow:${storageKey}`,
            JSON.stringify(widths)
          )
        } catch {
          // ignore quota errors
        }
      }
    }

    const listeners: Array<[HTMLElement, string, EventListener]> = []

    dividers.forEach((div, i) => {
      const mousedown = onStart(i) as EventListener
      const touchstart = onStart(i) as EventListener
      const keydown = onKeyDown(i) as EventListener
      div.addEventListener("mousedown", mousedown)
      div.addEventListener("touchstart", touchstart, { passive: false })
      div.addEventListener("keydown", keydown)
      listeners.push(
        [div, "mousedown", mousedown],
        [div, "touchstart", touchstart],
        [div, "keydown", keydown]
      )
    })

    const mousemove = onMove as EventListener
    const touchmove = onMove as EventListener
    const mouseup = onEnd as EventListener
    const touchend = onEnd as EventListener

    window.addEventListener("mousemove", mousemove)
    window.addEventListener("touchmove", touchmove, { passive: false })
    window.addEventListener("mouseup", mouseup)
    window.addEventListener("touchend", touchend)

    return () => {
      listeners.forEach(([el, type, fn]) => el.removeEventListener(type, fn))
      window.removeEventListener("mousemove", mousemove)
      window.removeEventListener("touchmove", touchmove)
      window.removeEventListener("mouseup", mouseup)
      window.removeEventListener("touchend", touchend)
      document.body.style.cursor = ""
      document.body.style.userSelect = ""
    }
  }, [resizable, count, storageKey])

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)")

    function applyBreakpoint(isDesktop: boolean) {
      if (!isDesktop) {
        childRefs.current.forEach((el) => {
          if (el) {
            el.style.flex = ""
            el.style.width = ""
          }
        })
      } else {
        childRefs.current.forEach((el, i) => {
          const w = manualWidthsRef.current[i]
          if (el && w) {
            el.style.flex = "none"
            el.style.width = w
          }
        })
      }
    }

    const handler = (e: MediaQueryListEvent) => applyBreakpoint(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  const containerClass = useMemo(
    () => cn(dashrowContainerVariants({ alignment, gap, padding }), className),
    [alignment, gap, padding, className]
  )

  function getPosition(index: number) {
    if (index === 0) return "first"
    if (index === childrenArray.length - 1) return "last"
    return "middle"
  }

  return (
    <div ref={containerRef} data-slot="dashrow" className={containerClass}>
      {childrenArray.map((child, index) => (
        <Fragment key={index}>
          <div
            data-slot="dashrow-panel"
            ref={(el) => {
              childRefs.current[index] = el
            }}
            className={dashrowChildVariants({
              alignment,
              position: getPosition(index),
            })}
          >
            {child}
          </div>

          {resizable && index < childrenArray.length - 1 && (
            <div
              data-slot="dashrow-divider"
              data-dashrow-divider
              data-dragging="false"
              role="separator"
              aria-orientation="vertical"
              aria-label={`${UI_I18N[locale].dashrow.resizePanels} ${index + 1} ${index + 2}`}
              aria-valuenow={getInitialValueNow(alignment, index, count)}
              aria-valuemin={15}
              aria-valuemax={85}
              tabIndex={0}
              className={cn(dashrowDividerVariants(), "group/divider")}
            >
              <div
                data-slot="dashrow-divider-handle"
                className={dashrowDividerHandleVariants()}
              />
            </div>
          )}
        </Fragment>
      ))}
    </div>
  )
}

Dashrow.displayName = "Dashrow"
