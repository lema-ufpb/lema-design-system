"use client"

import React, { useState } from "react"
import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// ── Types ──

export interface PricingCalculatorProps extends React.HTMLAttributes<HTMLDivElement> {
  basePrice?: number
  unitLabel?: string
  unitPrice?: number
  minUnits?: number
  maxUnits?: number
  step?: number
  discountPercent?: number
  currency?: string
  title?: string
  description?: string
  features?: string[]
}

// ── Component ──

export const PricingCalculator = React.forwardRef<
  HTMLDivElement,
  PricingCalculatorProps
>(
  (
    {
      basePrice = 0,
      unitLabel = "usuários",
      unitPrice = 15,
      minUnits = 1,
      maxUnits = 100,
      step = 1,
      discountPercent = 20,
      currency = "R$",
      title = "Calcule seu plano",
      description = "Ajuste o volume necessário e veja seu preço final na hora.",
      features = [
        "Suporte prioritário 24/7",
        "Analytics avançados",
        "Integrações ilimitadas",
        "SSO (Single Sign-On)",
      ],
      className,
      ...props
    },
    ref
  ) => {
    const [units, setUnits] = useState(minUnits)
    const [isYearly, setIsYearly] = useState(false)

    const calculatePrice = () => {
      const rawPrice = basePrice + units * unitPrice
      if (isYearly) {
        return rawPrice * (1 - discountPercent / 100)
      }
      return rawPrice
    }

    const price = calculatePrice()

    return (
      <div
        ref={ref}
        className={cn(
          "grid w-full grid-cols-1 overflow-hidden rounded-2xl border border-border bg-card shadow-sm md:grid-cols-2",
          className
        )}
        {...props}
      >
        {/* Esquerda: Controles */}
        <div className="flex flex-col justify-center p-8 sm:p-10">
          <h3 className="text-2xl font-bold tracking-tight text-card-foreground">
            {title}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>

          <div className="mt-10 flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <Label className="text-base">Quantidade de {unitLabel}</Label>
                <span className="font-mono text-xl font-bold text-foreground tabular-nums">
                  {units}
                </span>
              </div>
              <Slider
                value={[units]}
                min={minUnits}
                max={maxUnits}
                step={step}
                onValueChange={(vals) => setUnits(vals[0])}
                className="py-4"
              />
            </div>

            <div className="flex items-center justify-between rounded-lg border border-border p-4">
              <div className="flex flex-col gap-1">
                <Label
                  htmlFor="billing-toggle"
                  className="cursor-pointer text-base"
                >
                  Faturamento Anual
                </Label>
                <p className="text-sm text-muted-foreground">
                  Economize até {discountPercent}%
                </p>
              </div>
              <Switch
                id="billing-toggle"
                checked={isYearly}
                onCheckedChange={setIsYearly}
              />
            </div>
          </div>
        </div>

        {/* Direita: Resultado */}
        <div className="flex flex-col justify-between bg-muted p-8 sm:p-10">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <h4 className="font-semibold text-foreground">Resumo do Plano</h4>
              {isYearly && (
                <Badge
                  variant="default"
                  className="bg-success text-success-foreground hover:bg-success/80"
                >
                  Desconto Aplicado
                </Badge>
              )}
            </div>

            <div className="my-8 flex items-baseline text-card-foreground">
              <span className="text-3xl font-semibold tracking-tight">
                {currency}
              </span>
              <span className="ml-1 text-6xl font-bold tracking-tight tabular-nums">
                {price.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
              <span className="ml-2 text-sm text-muted-foreground">
                / {isYearly ? "mês (cobrado anualmente)" : "mês"}
              </span>
            </div>

            <ul className="flex flex-col gap-3">
              {features.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-center text-sm text-muted-foreground"
                >
                  <CheckIcon className="mr-3 h-5 w-5 shrink-0 text-primary" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <Button size="lg" className="mt-10 w-full font-semibold">
            Assinar Agora
          </Button>
        </div>
      </div>
    )
  }
)

PricingCalculator.displayName = "PricingCalculator"

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
