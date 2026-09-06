"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { CheckCircle2Icon, Loader2Icon } from "lucide-react"

import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { PillGroup } from "./pill-group"

// ── Types ──

export type ContactFormSize = "sm" | "md" | "lg"
export type ContactFormStatus = "idle" | "submitting" | "success" | "error"

export interface ContactFormTopic {
  value: string
  label: string
}

export interface ContactFormValues {
  name: string
  email: string
  subject?: string
  topic?: string
  message: string
}

export interface ContactFormProps
  extends
    Omit<React.FormHTMLAttributes<HTMLFormElement>, "onSubmit">,
    VariantProps<typeof contactFormVariants> {
  /** Optional topic/department chips rendered above the message field. */
  topics?: ContactFormTopic[]
  /** Shows the subject field. Defaults to true when `topics` is omitted. */
  showSubject?: boolean
  onSubmit?: (values: ContactFormValues) => Promise<boolean | void> | void
  locale?: UILocale
  disabled?: boolean
}

// ── Variants ──

export const contactFormVariants = cva("flex w-full flex-col", {
  variants: {
    size: {
      sm: "max-w-md gap-4",
      md: "max-w-lg gap-6",
      lg: "max-w-xl gap-6",
    },
  },
  defaultVariants: { size: "md" },
})

// ── Component ──

export const ContactForm = React.forwardRef<HTMLFormElement, ContactFormProps>(
  (
    {
      topics = [],
      showSubject,
      onSubmit,
      locale = "en-US",
      size = "md",
      disabled = false,
      className,
      ...props
    },
    ref
  ) => {
    const [name, setName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [subject, setSubject] = React.useState("")
    const [topic, setTopic] = React.useState<string | null>(null)
    const [message, setMessage] = React.useState("")
    const [status, setStatus] = React.useState<ContactFormStatus>("idle")

    const t = UI_I18N[locale]?.contactForm ?? UI_I18N["en-US"].contactForm
    const resolvedShowSubject = showSubject ?? topics.length === 0
    const isSubmitting = status === "submitting"
    const generatedId = React.useId()

    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault()
      if (isSubmitting || disabled) return

      setStatus("submitting")

      try {
        const values: ContactFormValues = {
          name,
          email,
          message,
          ...(resolvedShowSubject && { subject }),
          ...(topic && { topic }),
        }

        if (onSubmit) {
          const result = await onSubmit(values)
          if (result === false) {
            setStatus("error")
            return
          }
        } else {
          await new Promise((resolve) => setTimeout(resolve, 600))
        }

        setStatus("success")
        setName("")
        setEmail("")
        setSubject("")
        setTopic(null)
        setMessage("")
      } catch {
        setStatus("error")
      }
    }

    if (status === "success") {
      return (
        <div
          role="status"
          aria-live="polite"
          className={cn(
            "flex items-center gap-2 rounded-lg border border-success/30 bg-success/10 px-4 py-3 text-sm text-success",
            contactFormVariants({ size }),
            className
          )}
        >
          <CheckCircle2Icon className="size-4 shrink-0" aria-hidden="true" />
          <span>{t.success}</span>
        </div>
      )
    }

    return (
      <form
        ref={ref}
        onSubmit={handleSubmit}
        className={cn(contactFormVariants({ size }), className)}
        data-slot="contact-form"
        {...props}
      >
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor={`${generatedId}-name`}>{t.name}</FieldLabel>
            <Input
              id={`${generatedId}-name`}
              required
              disabled={disabled || isSubmitting}
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder={t.namePlaceholder}
              autoComplete="name"
            />
          </Field>

          <Field>
            <FieldLabel htmlFor={`${generatedId}-email`}>{t.email}</FieldLabel>
            <Input
              id={`${generatedId}-email`}
              type="email"
              required
              disabled={disabled || isSubmitting}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={t.emailPlaceholder}
              autoComplete="email"
            />
          </Field>

          {resolvedShowSubject && (
            <Field>
              <FieldLabel htmlFor={`${generatedId}-subject`}>
                {t.subject}
              </FieldLabel>
              <Input
                id={`${generatedId}-subject`}
                disabled={disabled || isSubmitting}
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
                placeholder={t.subjectPlaceholder}
              />
            </Field>
          )}

          {topics.length > 0 && (
            <Field>
              <FieldLabel>{t.topic}</FieldLabel>
              <PillGroup
                items={topics}
                value={topic}
                onChange={(value) =>
                  setTopic(Array.isArray(value) ? (value[0] ?? null) : value)
                }
                disabled={disabled || isSubmitting}
                locale={locale}
                label={t.topic}
              />
            </Field>
          )}

          <Field>
            <FieldLabel htmlFor={`${generatedId}-message`}>
              {t.message}
            </FieldLabel>
            <Textarea
              id={`${generatedId}-message`}
              required
              disabled={disabled || isSubmitting}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder={t.messagePlaceholder}
              rows={5}
            />
          </Field>

          {status === "error" && (
            <FieldDescription role="alert" className="text-destructive">
              {t.error}
            </FieldDescription>
          )}

          <Button type="submit" disabled={disabled || isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2Icon
                  className="mr-1.5 size-4 animate-spin"
                  aria-hidden="true"
                />
                {t.sending}
              </>
            ) : (
              t.send
            )}
          </Button>
        </FieldGroup>
      </form>
    )
  }
)
ContactForm.displayName = "ContactForm"
