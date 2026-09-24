"use client"

import * as React from "react"
import {
  format,
  subDays,
  startOfMonth,
  endOfMonth,
  subMonths,
  type Locale,
} from "date-fns"
import { ptBR, enUS, es, fr } from "date-fns/locale"
import type { DateRange } from "react-day-picker"
import { CalendarIcon, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { useUILocale } from "@/components/ds/locale-provider"

const dateFnsLocales: Record<UILocale, Locale> = {
  "pt-BR": ptBR,
  "en-US": enUS,
  "es-ES": es,
  "fr-FR": fr,
}

// ── Types ──

export interface DateRangePickerProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onSelect"
> {
  /**
   * Selected date range { from, to }.
   */
  date?: DateRange
  /**
   * Callback fired when a range is selected.
   */
  onSelect?: (range?: DateRange) => void
  /**
   * Whether to display quick selection presets.
   */
  presets?: boolean
  /**
   * Placeholder displayed when no date is selected.
   */
  placeholder?: string
  /**
   * Disables the trigger and calendar interaction.
   */
  disabled?: boolean
  /**
   * Localization setting.
   */
  locale?: UILocale
  /**
   * Button trigger size.
   */
  size?: "sm" | "md" | "lg"
}

// ── Component ──

export const DateRangePicker = React.forwardRef<
  HTMLDivElement,
  DateRangePickerProps
>(
  (
    {
      date,
      onSelect,
      presets = true,
      placeholder,
      disabled = false,
      locale: localeProp,
      size = "md",
      className,
      ...props
    },
    ref
  ) => {
    const locale = useUILocale(localeProp)
    const [open, setOpen] = React.useState(false)
    const t = UI_I18N[locale].dateRangePicker
    const dfLocale = dateFnsLocales[locale]

    const currentPlaceholder = placeholder ?? t.selectRange

    const buttonSize = size === "md" ? "default" : size
    const iconSize =
      size === "sm" ? "size-3.5" : size === "lg" ? "size-5" : "size-4"

    const now = React.useMemo(() => new Date(), [])

    const presetOptions = React.useMemo(
      () => [
        {
          label: t.today,
          range: { from: now, to: now },
        },
        {
          label: t.yesterday,
          range: { from: subDays(now, 1), to: subDays(now, 1) },
        },
        {
          label: t.last7Days,
          range: { from: subDays(now, 6), to: now },
        },
        {
          label: t.last30Days,
          range: { from: subDays(now, 29), to: now },
        },
        {
          label: t.thisMonth,
          range: { from: startOfMonth(now), to: endOfMonth(now) },
        },
        {
          label: t.lastMonth,
          range: {
            from: startOfMonth(subMonths(now, 1)),
            to: endOfMonth(subMonths(now, 1)),
          },
        },
      ],
      [now, t]
    )

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation()
      onSelect?.(undefined)
    }

    const renderDateText = () => {
      if (!date?.from) {
        return <span>{currentPlaceholder}</span>
      }
      if (!date.to) {
        return <span>{format(date.from, "PP", { locale: dfLocale })} — …</span>
      }
      return (
        <span>
          {format(date.from, "PP", { locale: dfLocale })} –{" "}
          {format(date.to, "PP", { locale: dfLocale })}
        </span>
      )
    }

    return (
      <div
        ref={ref}
        className={cn("relative inline-block", className)}
        {...props}
      >
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size={buttonSize}
              disabled={disabled}
              className={cn(
                "min-w-64 justify-start gap-2 text-left font-normal",
                date?.from && !disabled && "pr-8",
                !date?.from && "text-muted-foreground",
                size === "sm" && "h-8 text-xs",
                size === "md" && "h-9 text-sm",
                size === "lg" && "h-10 text-base"
              )}
            >
              <CalendarIcon className={iconSize} data-icon="inline-start" />
              <span className="flex-1 truncate">{renderDateText()}</span>
            </Button>
          </PopoverTrigger>
          {date?.from && !disabled && (
            <button
              type="button"
              aria-label={t.clear}
              onClick={handleClear}
              className="absolute top-1/2 right-2.5 -translate-y-1/2 rounded-sm p-0.5 text-muted-foreground opacity-70 hover:opacity-100 focus:outline-none"
            >
              <X className="size-3.5" />
            </button>
          )}
          <PopoverContent
            className="flex w-auto flex-col divide-y divide-border p-0 sm:flex-row sm:divide-x sm:divide-y-0"
            align="start"
          >
            {presets && (
              <div className="flex w-44 shrink-0 flex-col gap-1 bg-muted/20 p-3">
                <span className="px-2 py-1 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  {t.customRange}
                </span>
                {presetOptions.map((item) => (
                  <Button
                    key={item.label}
                    variant="ghost"
                    size="sm"
                    className="h-8 justify-start px-2 text-xs font-normal"
                    onClick={() => {
                      onSelect?.(item.range)
                      setOpen(false)
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </div>
            )}
            <div className="p-2">
              <Calendar
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={(newRange) => {
                  onSelect?.(newRange)
                }}
                numberOfMonths={2}
                locale={dfLocale}
              />
            </div>
          </PopoverContent>
        </Popover>
      </div>
    )
  }
)

DateRangePicker.displayName = "DateRangePicker"
