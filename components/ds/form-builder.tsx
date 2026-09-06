"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm, type FieldValues } from "react-hook-form"
import type { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Spinner } from "@/components/ui/spinner"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"

// ── Types ──

export type FormFieldType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "textarea"
  | "select"
  | "checkbox"
  | "switch"

export interface FormFieldOption {
  label: string
  value: string
}

export interface FormFieldConfig {
  name: string
  label: string
  /** @default "text" */
  type?: FormFieldType
  placeholder?: string
  description?: string
  /** Required for `type: "select"`. */
  options?: FormFieldOption[]
}

export interface FormBuilderProps {
  /** Validation only — field rendering comes from `fields`, not schema introspection. */
  schema: z.ZodType<FieldValues, FieldValues>
  fields: FormFieldConfig[]
  defaultValues?: FieldValues
  onSubmit: (values: FieldValues) => void | Promise<void>
  submitLabel?: string
  loading?: boolean
  className?: string
}

// ── Variants ──

export const formBuilderVariants = undefined

// ── Component ──

/**
 * Generates a validated form from a zod `schema` (validation) plus a
 * `fields` list (rendering meta — label, widget type, options). Built on
 * `react-hook-form` + the project's `Field`/`FieldGroup` primitives, so
 * every field gets the standard `data-invalid`/`aria-invalid`/`FieldError`
 * wiring for free.
 */
export function FormBuilder({
  schema,
  fields,
  defaultValues,
  onSubmit,
  submitLabel = "Submit",
  loading = false,
  className,
}: FormBuilderProps) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  })

  const busy = loading || isSubmitting

  return (
    <form
      data-slot="form-builder"
      className={cn("w-full", className)}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <FieldGroup>
        {fields.map((field) => {
          const fieldName = field.name
          const error = errors[field.name]
          const errorMessage =
            error && typeof error.message === "string"
              ? error.message
              : undefined

          if (field.type === "select") {
            return (
              <Controller
                key={field.name}
                control={control}
                name={fieldName}
                render={({ field: rhf }) => (
                  <Field data-invalid={!!errorMessage}>
                    <FieldLabel htmlFor={field.name}>{field.label}</FieldLabel>
                    <Select
                      value={(rhf.value as string) ?? ""}
                      onValueChange={rhf.onChange}
                    >
                      <SelectTrigger
                        id={field.name}
                        className="w-full"
                        aria-invalid={!!errorMessage}
                      >
                        <SelectValue placeholder={field.placeholder} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {field.options?.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {field.description && !errorMessage && (
                      <FieldDescription>{field.description}</FieldDescription>
                    )}
                    <FieldError
                      errors={
                        errorMessage ? [{ message: errorMessage }] : undefined
                      }
                    />
                  </Field>
                )}
              />
            )
          }

          if (field.type === "checkbox" || field.type === "switch") {
            const ToggleControl = field.type === "switch" ? Switch : Checkbox
            return (
              <Controller
                key={field.name}
                control={control}
                name={fieldName}
                render={({ field: rhf }) => (
                  <Field orientation="horizontal" data-invalid={!!errorMessage}>
                    <ToggleControl
                      id={field.name}
                      checked={!!rhf.value}
                      onCheckedChange={rhf.onChange}
                      aria-invalid={!!errorMessage}
                    />
                    <FieldContent>
                      <FieldLabel htmlFor={field.name}>
                        {field.label}
                      </FieldLabel>
                      {field.description && !errorMessage && (
                        <FieldDescription>{field.description}</FieldDescription>
                      )}
                      <FieldError
                        errors={
                          errorMessage ? [{ message: errorMessage }] : undefined
                        }
                      />
                    </FieldContent>
                  </Field>
                )}
              />
            )
          }

          const InputControl = field.type === "textarea" ? Textarea : Input

          return (
            <Field key={field.name} data-invalid={!!errorMessage}>
              <FieldLabel htmlFor={field.name}>{field.label}</FieldLabel>
              <InputControl
                id={field.name}
                type={
                  field.type === "textarea" ? undefined : (field.type ?? "text")
                }
                placeholder={field.placeholder}
                aria-invalid={!!errorMessage}
                {...register(fieldName, {
                  valueAsNumber: field.type === "number",
                })}
              />
              {field.description && !errorMessage && (
                <FieldDescription>{field.description}</FieldDescription>
              )}
              <FieldError
                errors={errorMessage ? [{ message: errorMessage }] : undefined}
              />
            </Field>
          )
        })}

        <Field orientation="horizontal">
          <Button type="submit" disabled={busy}>
            {busy && <Spinner data-icon="inline-start" />}
            {submitLabel}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
