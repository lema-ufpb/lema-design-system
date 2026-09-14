"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import {
  HeartIcon,
  ThumbsUpIcon,
  LaughIcon,
  FlameIcon,
  PlusIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export const reactionBarVariants = cva(
  "relative flex items-center justify-center rounded-full transition-all",
  {
    variants: {
      size: {
        sm: "h-8",
        md: "h-10",
        lg: "h-12",
      },
      intent: {
        default: "bg-muted text-muted-foreground",
        primary: "bg-primary text-primary-foreground",
      },
    },
    defaultVariants: {
      size: "md",
      intent: "default",
    },
  }
)

export const reactionMenuVariants = cva(
  "absolute bottom-full mb-2 flex items-center gap-1 rounded-full border bg-background p-1.5 shadow-xl ring-1 ring-black/5",
  {
    variants: {
      size: {
        sm: "h-10",
        md: "h-12",
        lg: "h-14",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

export interface ReactionType {
  id: string
  label: string
  icon: React.ReactNode
  colorClass?: string
}

const DEFAULT_REACTIONS: ReactionType[] = [
  {
    id: "heart",
    label: "Love",
    icon: <HeartIcon className="fill-current" />,
    colorClass:
      "text-destructive hover:text-destructive hover:bg-destructive/10",
  },
  {
    id: "thumbs-up",
    label: "Like",
    icon: <ThumbsUpIcon className="fill-current" />,
    colorClass:
      "text-highlight-sky hover:text-highlight-sky hover:bg-highlight-sky/10",
  },
  {
    id: "laugh",
    label: "Haha",
    icon: <LaughIcon />,
    colorClass: "text-warning hover:text-warning hover:bg-warning/10",
  },
  {
    id: "flame",
    label: "Fire",
    icon: <FlameIcon className="fill-current" />,
    colorClass: "text-warning hover:text-warning hover:bg-warning/10",
  },
]

export interface ReactionBarProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof reactionBarVariants> {
  reactions?: ReactionType[]
  value?: string | null
  onReact?: (id: string | null) => void
  disabled?: boolean
}

export const ReactionBar = React.forwardRef<HTMLDivElement, ReactionBarProps>(
  (
    {
      className,
      size,
      intent,
      reactions = DEFAULT_REACTIONS,
      value = null,
      onReact,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = React.useState(false)
    const [isFocused, setIsFocused] = React.useState(false)

    const isOpen = !disabled && (isHovered || isFocused)
    const activeReaction = reactions.find((r) => r.id === value)

    const handleReact = (id: string) => {
      if (disabled) return
      if (value === id) {
        onReact?.(null)
      } else {
        onReact?.(id)
      }
      setIsFocused(false)
      setIsHovered(false)
    }

    const iconSizeClass =
      size === "sm" ? "size-3.5" : size === "md" ? "size-4" : "size-5"
    const menuIconSizeClass =
      size === "sm" ? "size-4" : size === "md" ? "size-5" : "size-6"

    return (
      <div
        className="relative inline-flex flex-col items-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        ref={ref}
        {...props}
      >
        {isOpen && (
          <div
            className={cn(
              "animate-in duration-200 fade-in-0 zoom-in-90 slide-in-from-bottom-1",
              reactionMenuVariants({ size })
            )}
            role="group"
            aria-label="Reactions"
          >
            {reactions.map((reaction, index) => (
              <div
                key={reaction.id}
                className="animate-in duration-200 fade-in-0 zoom-in-50"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "rounded-full transition-transform hover:scale-125 focus-visible:scale-125",
                    size === "sm"
                      ? "size-7"
                      : size === "md"
                        ? "size-9"
                        : "size-11",
                    reaction.colorClass
                  )}
                  onClick={() => handleReact(reaction.id)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  aria-label={`React with ${reaction.label}`}
                  aria-pressed={value === reaction.id}
                >
                  <span
                    className={cn(
                      menuIconSizeClass,
                      "flex items-center justify-center"
                    )}
                  >
                    {React.cloneElement(
                      reaction.icon as React.ReactElement<{
                        className?: string
                      }>,
                      { className: "size-full" }
                    )}
                  </span>
                </Button>
              </div>
            ))}
          </div>
        )}

        <Button
          variant={intent === "primary" ? "default" : "secondary"}
          size={size === "md" ? "default" : size}
          className={cn(
            "gap-2 rounded-full px-4 shadow-sm transition-all duration-300",
            activeReaction &&
              intent === "default" &&
              "border bg-background shadow-sm",
            activeReaction &&
              intent === "primary" &&
              "bg-primary text-primary-foreground",
            className
          )}
          disabled={disabled}
          onClick={() => {
            if (activeReaction) {
              handleReact(activeReaction.id)
            } else {
              setIsFocused(!isFocused)
            }
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setTimeout(() => setIsFocused(false), 200)
          }}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          {activeReaction ? (
            <span
              key={activeReaction.id}
              className={cn(
                "flex animate-in items-center duration-200 zoom-in-50",
                activeReaction.colorClass
              )}
            >
              {React.cloneElement(
                activeReaction.icon as React.ReactElement<{
                  className?: string
                }>,
                { className: iconSizeClass }
              )}
            </span>
          ) : (
            <span
              key="plus"
              className="flex animate-in items-center text-muted-foreground duration-200 zoom-in-50"
            >
              <PlusIcon className={iconSizeClass} />
            </span>
          )}
          <span className="text-sm font-medium">
            {activeReaction ? activeReaction.label : "React"}
          </span>
        </Button>
      </div>
    )
  }
)
ReactionBar.displayName = "ReactionBar"
