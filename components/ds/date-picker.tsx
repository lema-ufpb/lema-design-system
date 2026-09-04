"use client"

import * as React from "react"
import { format, type Locale } from "date-fns"
import { ptBR, enUS, es, fr } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"

const dateFnsLocales: Record<UILocale, Locale> = {
  "pt-BR": ptBR,
  "en-US": enUS,
  "es-ES": es,
  "fr-FR": fr,
}

// ── Types ──

export interface DatePickerProps extends Omit<
  React.ComponentProps<typeof Button>,
  "onClick" | "size" | "onSelect"
> {
  /**
   * The currently selected date.
   */
  date?: Date
  /**
   * Callback when a date is selected.
   */
  onSelect?: (date?: Date) => void
  /**
   * Placeholder text when no date is selected.
   */
  placeholder?: string
  /**
   * Disables the date picker.
   */
  disabled?: boolean
  /**
   * Locale for date formatting and the calendar component.
   */
  locale?: UILocale
  /**
   * Component size, applied to the trigger button.
   */
  size?: "sm" | "md" | "lg"
}

// ── Component ──

export const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  (
    {
      date,
      onSelect,
      placeholder,
      disabled = false,
      locale = "pt-BR",
      size = "md",
      className,
      ...props
    },
    ref
  ) => {
    const currentPlaceholder =
      placeholder ?? UI_I18N[locale].datePicker.placeholder
    const dfLocale = dateFnsLocales[locale]

    const buttonSize = size === "md" ? "default" : size

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant="outline"
            size={buttonSize}
            disabled={disabled}
            className={cn(
              "w-60 justify-start text-left font-normal",
              !date && "text-muted-foreground",
              className
            )}
            {...props}
          >
            <CalendarIcon data-icon="inline-start" />
            {date ? (
              format(date, "PPP", { locale: dfLocale })
            ) : (
              <span>{currentPlaceholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={onSelect}
            locale={dfLocale}
          />
        </PopoverContent>
      </Popover>
    )
  }
)
DatePicker.displayName = "DatePicker"
