"use client"

import * as React from "react"
import { PlusIcon, Trash2Icon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { useUILocale } from "@/components/ds/locale-provider"

export interface FilterRule {
  id: string
  field: string
  operator: string
  value: string
}

export interface FilterField {
  id: string
  label: string
  operators: { value: string; label: string }[]
}

export interface FilterBuilderProps {
  fields: FilterField[]
  rules: FilterRule[]
  onChange: (rules: FilterRule[]) => void
  locale?: UILocale
  className?: string
}

export function FilterBuilder({
  fields,
  rules,
  onChange,
  locale: localeProp,
  className,
}: FilterBuilderProps) {
  const locale = useUILocale(localeProp)
  const i18n = UI_I18N[locale].filterBuilder

  const handleAddRule = () => {
    const newRule: FilterRule = {
      id: crypto.randomUUID(),
      field: fields[0]?.id || "",
      operator: fields[0]?.operators[0]?.value || "",
      value: "",
    }
    onChange([...rules, newRule])
  }

  const handleRemoveRule = (id: string) => {
    onChange(rules.filter((rule) => rule.id !== id))
  }

  const handleUpdateRule = (id: string, updates: Partial<FilterRule>) => {
    onChange(
      rules.map((rule) => {
        if (rule.id === id) {
          const updatedRule = { ...rule, ...updates }
          // Reset operator if field changes and new field doesn't have current operator
          if (updates.field) {
            const fieldDef = fields.find((f) => f.id === updates.field)
            if (
              fieldDef &&
              !fieldDef.operators.some((o) => o.value === updatedRule.operator)
            ) {
              updatedRule.operator = fieldDef.operators[0]?.value || ""
            }
          }
          return updatedRule
        }
        return rule
      })
    )
  }

  return (
    <div
      className={cn("flex flex-col gap-4", className)}
      data-slot="ds-filter-builder"
    >
      <div className="flex flex-col gap-3">
        {rules.map((rule) => {
          const currentField = fields.find((f) => f.id === rule.field)
          const availableOperators = currentField?.operators || []

          return (
            <div
              key={rule.id}
              className="flex flex-col gap-2 sm:flex-row sm:items-center"
            >
              <Select
                value={rule.field}
                onValueChange={(val) =>
                  handleUpdateRule(rule.id, { field: val })
                }
              >
                <SelectTrigger
                  className="w-full sm:w-50"
                  aria-label={i18n.selectField}
                >
                  <SelectValue placeholder={i18n.selectField} />
                </SelectTrigger>
                <SelectContent>
                  {fields.map((field) => (
                    <SelectItem key={field.id} value={field.id}>
                      {field.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={rule.operator}
                onValueChange={(val) =>
                  handleUpdateRule(rule.id, { operator: val })
                }
                disabled={availableOperators.length === 0}
              >
                <SelectTrigger
                  className="w-full sm:w-36"
                  aria-label={i18n.operator}
                >
                  <SelectValue placeholder={i18n.operator} />
                </SelectTrigger>
                <SelectContent>
                  {availableOperators.map((op) => (
                    <SelectItem key={op.value} value={op.value}>
                      {op.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input
                value={rule.value}
                onChange={(e) =>
                  handleUpdateRule(rule.id, { value: e.target.value })
                }
                className="w-full sm:w-auto sm:flex-1"
                placeholder={i18n.value}
                aria-label={i18n.valuePlaceholder}
              />

              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveRule(rule.id)}
                aria-label={i18n.removeRule}
                className="shrink-0 text-muted-foreground hover:text-destructive"
              >
                <Trash2Icon className="size-4" />
              </Button>
            </div>
          )
        })}
      </div>

      <div className="flex">
        <Button variant="outline" size="sm" onClick={handleAddRule}>
          <PlusIcon className="mr-2 size-4" />
          {i18n.addRule}
        </Button>
      </div>
    </div>
  )
}
