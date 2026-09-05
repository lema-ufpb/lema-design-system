import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// ── Types ──

export interface FounderLetterProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof founderLetterVariants> {
  title: string
  paragraphs: string[]
  authorName: string
  authorRole: string
  authorAvatar?: string
  authorSignature?: string
  withDropCap?: boolean
}

// ── Variants ──

export const founderLetterVariants = cva(
  "relative overflow-hidden rounded-3xl border border-border bg-card p-8 transition-all md:p-12",
  {
    variants: {
      variant: {
        default: "shadow-xs",
        elevated: "border-primary/20 shadow-lg",
        muted: "bg-muted/40",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

// ── Component ──

export function FounderLetter({
  title,
  paragraphs,
  authorName,
  authorRole,
  authorAvatar,
  authorSignature,
  withDropCap = true,
  variant,
  className,
  ...props
}: FounderLetterProps) {
  return (
    <div
      className={cn(founderLetterVariants({ variant }), className)}
      {...props}
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12">
        {/* Coluna do Autor / Liderança */}
        <div className="flex flex-col items-start gap-4 border-b border-border/50 pb-6 md:border-r md:border-b-0 md:pr-6 md:pb-0">
          {authorAvatar ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={authorAvatar}
              alt={authorName}
              loading="lazy"
              decoding="async"
              className="size-20 rounded-2xl border border-border object-cover shadow-xs"
            />
          ) : (
            <div className="flex size-20 items-center justify-center rounded-2xl border border-border bg-muted text-xl font-bold text-foreground">
              {authorName.charAt(0)}
            </div>
          )}

          <div>
            <h4 className="text-base font-semibold text-foreground">
              {authorName}
            </h4>
            <p className="text-xs text-muted-foreground">{authorRole}</p>
          </div>

          {authorSignature && (
            <div className="mt-2 pt-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={authorSignature}
                alt={`Assinatura de ${authorName}`}
                loading="lazy"
                decoding="async"
                className="h-10 w-auto opacity-75"
              />
            </div>
          )}
        </div>

        {/* Coluna do Conteúdo / Prosa */}
        <div className="flex flex-col gap-4 md:col-span-2">
          <h3 className="text-xl font-bold tracking-tight text-foreground md:text-2xl">
            {title}
          </h3>

          <div className="flex flex-col gap-4 text-sm leading-relaxed text-muted-foreground">
            {paragraphs.map((para, index) => (
              <p
                key={index}
                className={cn(
                  index === 0 &&
                    withDropCap &&
                    "first-letter:float-left first-letter:mr-2 first-letter:text-4xl first-letter:leading-none first-letter:font-bold first-letter:text-primary"
                )}
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
