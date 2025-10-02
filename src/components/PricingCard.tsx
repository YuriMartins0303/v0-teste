import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface PricingCardProps {
  title: string
  price: string
  annualPrice?: string
  messages: string
  description?: string
  features: string[]
  ctaText: string
  ctaLink: string
  recommended?: boolean
  isEnterprise?: boolean
}

export const PricingCard = ({
  title,
  price,
  annualPrice,
  messages,
  description,
  features,
  ctaText,
  ctaLink,
  recommended = false,
  isEnterprise = false,
}: PricingCardProps) => {
  return (
    <div
      className={cn(
        "relative rounded-2xl p-6 md:p-8 transition-all duration-300 hover:-translate-y-2",
        recommended
          ? "bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-[0_0_40px_rgba(124,58,237,0.3)]"
          : "bg-card shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)]",
      )}
    >
      {recommended && (
        <Badge className="absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-4 md:px-6 py-1 text-xs md:text-sm font-bold">
          RECOMENDADO
        </Badge>
      )}

      <div className="mb-4 md:mb-6">
        <h3 className={cn("text-lg md:text-xl font-bold mb-2", recommended ? "text-white" : "text-foreground")}>
          {title}
        </h3>
        {description && (
          <p className={cn("text-xs leading-relaxed", recommended ? "text-white/90" : "text-muted-foreground")}>
            {description}
          </p>
        )}
      </div>

      <div className="mb-4 md:mb-6">
        <div className={cn("text-2xl md:text-3xl font-bold mb-1", recommended ? "text-white" : "text-foreground")}>
          {price}
        </div>
        {annualPrice && (
          <p className={cn("text-xs", recommended ? "text-white/80" : "text-muted-foreground")}>
            Ou {annualPrice} no plano anual
          </p>
        )}
      </div>

      <div className="mb-4 md:mb-6">
        <p className={cn("text-xl md:text-2xl font-bold", recommended ? "text-white" : "text-primary")}>{messages}</p>
        <p className={cn("text-xs", recommended ? "text-white/80" : "text-muted-foreground")}>Mensagens Mensais</p>
      </div>

      <Button
        className={cn(
          "w-full mb-6 md:mb-8 font-semibold text-sm h-10 md:h-11 rounded-xl",
          recommended
            ? "bg-white text-primary hover:bg-white/90"
            : "bg-primary text-primary-foreground hover:bg-primary/90",
        )}
        asChild
      >
        <a href={ctaLink}>{ctaText}</a>
      </Button>

      <div className="space-y-2 md:space-y-3">
        <p className={cn("text-xs font-semibold mb-3 md:mb-4", recommended ? "text-white" : "text-foreground")}>
          {isEnterprise ? "Inclui todas as funcionalidades de Pro +" : "Inclui:"}
        </p>
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-2 md:gap-3">
            <div className={cn("rounded-full p-1 mt-0.5 flex-shrink-0", recommended ? "bg-white/20" : "bg-primary/10")}>
              <Check className={cn("w-3 h-3 md:w-4 md:h-4", recommended ? "text-white" : "text-primary")} />
            </div>
            <span className={cn("text-xs leading-relaxed", recommended ? "text-white/90" : "text-foreground")}>
              {feature}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
