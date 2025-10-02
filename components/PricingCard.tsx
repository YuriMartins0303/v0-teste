import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface PriceInfo {
  fullPrice: string
  period: string
  installments?: {
    value: string
    times: number
    text: string
  }
}

interface PricingCardProps {
  title: string
  price: PriceInfo
  messages: string
  description?: string
  features: string[]
  ctaText: string
  ctaLink?: string
  onCtaClick?: () => void
  recommended?: boolean
  isEnterprise?: boolean
}

export const PricingCard = ({
  title,
  price,
  messages,
  description,
  features,
  ctaText,
  ctaLink,
  onCtaClick,
  recommended = false,
  isEnterprise = false,
}: PricingCardProps) => {
  return (
    <div
      className={cn(
        "relative rounded-2xl p-6 md:p-8 transition-all duration-300 hover:-translate-y-2 border-2",
        recommended
          ? "bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-[0_0_40px_rgba(124,58,237,0.3)] border-primary/30"
          : "bg-card shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)] border-border",
      )}
    >
      {recommended && (
        <Badge className="absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-4 md:px-6 py-1 text-xs md:text-sm font-bold">
          RECOMENDADO
        </Badge>
      )}

      <div className="mb-4 md:mb-6">
        <h3 className={cn("text-xl md:text-2xl font-bold mb-2", recommended ? "text-white" : "text-foreground")}>
          {title}
        </h3>
        {description && (
          <p
            className={cn(
              "text-xs md:text-sm leading-relaxed",
              recommended ? "text-white/90" : "text-muted-foreground",
            )}
          >
            {description}
          </p>
        )}
      </div>

      <div className="mb-6 md:mb-8">
        {price.installments ? (
          <div className="text-center">
            <p className={cn("text-sm mb-1", recommended ? "text-white/80" : "text-muted-foreground")}>
              À vista por
            </p>
            <div className={cn("text-2xl md:text-3xl font-bold mb-2", recommended ? "text-white" : "text-foreground")}>
              {price.fullPrice}
            </div>
            <div className={cn("flex items-baseline justify-center gap-1", recommended ? "text-white/90" : "text-muted-foreground")}>
              <span className="text-base md:text-lg font-semibold">{price.installments.value}</span>
              <span className="text-sm font-normal">/mês</span>
            </div>
            <p className={cn("text-sm mt-1", recommended ? "text-white/80" : "text-red-500")}>
              {price.installments.text}
            </p>
          </div>
        ) : (
          <div className={cn("text-center", recommended ? "text-white" : "text-foreground")}>
            
            <div className="text-2xl md:text-2xl font-bold">
              {price.fullPrice}
            </div>
            <span className="text-sm font-normal">{price.period}</span>
          </div>
        )}
      </div>

      <div className="mb-6 md:mb-8 text-center">
        <p className={cn("text-2xl md:text-3xl font-bold mb-1", recommended ? "text-white" : "text-primary")}>{messages}</p>
        <p className={cn("text-sm", recommended ? "text-white/90" : "text-muted-foreground")}>
          Mensagens Mensais
        </p>
      </div>

      <Button
        className={cn(
          "w-full mb-6 md:mb-8 font-semibold text-sm md:text-base h-11 md:h-12 rounded-xl",
          recommended
            ? "bg-white text-primary hover:bg-white/90"
            : "bg-primary text-primary-foreground hover:bg-primary/90",
        )}
        onClick={onCtaClick}
      >
        {ctaText}
      </Button>

      <div className="space-y-2 md:space-y-3">
        <p
          className={cn(
            "text-xs md:text-sm font-semibold mb-3 md:mb-4",
            recommended ? "text-white" : "text-foreground",
          )}
        >
          {isEnterprise ? "Inclui todas as funcionalidades de Pro +" : "Inclui:"}
        </p>
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-2 md:gap-3">
            <div className={cn("rounded-full p-1 mt-0.5 flex-shrink-0", recommended ? "bg-white/20" : "bg-primary/10")}>
              <Check className={cn("w-3 h-3 md:w-4 md:h-4", recommended ? "text-white" : "text-primary")} />
            </div>
            <span
              className={cn("text-xs md:text-sm leading-relaxed", recommended ? "text-white/90" : "text-foreground")}
            >
              {feature}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
