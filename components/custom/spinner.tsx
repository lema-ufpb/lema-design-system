import { cn } from "@/lib/utils"
import { UI_I18N, type UILocale } from "@/lib/ui-i18n"
import { Loader2Icon } from "lucide-react"

function Spinner({
  className,
  locale = "en-US",
  ...props
}: React.ComponentProps<"svg"> & { locale?: UILocale }) {
  return (
    <Loader2Icon
      role="status"
      aria-label={UI_I18N[locale].spinner.loading}
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  )
}

export { Spinner }
