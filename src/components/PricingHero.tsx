"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { Star } from "lucide-react"

interface PricingHeroProps {
  selectedContacts: string
  onContactsChange: (value: string) => void
  selectedPeriod: string
  onPeriodChange: (value: string) => void
}

export const PricingHero = ({
  selectedContacts,
  onContactsChange,
  selectedPeriod,
  onPeriodChange,
}: PricingHeroProps) => {
  return (
    <section className="text-center py-12 md:py-16 px-4">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent leading-tight">
        Escolha o plano ideal para seu restaurante
      </h1>
      <p className="text-base md:text-xl text-muted-foreground mb-6 md:mb-8 max-w-3xl mx-auto px-4">
        Aumente suas vendas com campanhas automatizadas e estratégias personalizadas
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-6 md:mb-8">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 md:w-6 md:h-6 fill-primary text-primary" />
          ))}
        </div>
        <span className="text-sm md:text-base text-muted-foreground">4.9/5 de 500+ restaurantes</span>
      </div>

      <div className="max-w-2xl mx-auto space-y-4 md:space-y-6 mb-8 md:mb-12">
        <div className="bg-card rounded-2xl p-4 md:p-6 shadow-[var(--shadow-card)]">
          <Label htmlFor="contacts" className="text-base md:text-lg font-semibold mb-3 block text-left">
            Quantos contatos você tem?
          </Label>
          <Select value={selectedContacts} onValueChange={onContactsChange}>
            <SelectTrigger id="contacts" className="w-full h-11 md:h-12 text-sm md:text-base">
              <SelectValue placeholder="Selecione a quantidade de contatos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1000">Até 1.000 contatos</SelectItem>
              <SelectItem value="2500">Até 2.500 contatos</SelectItem>
              <SelectItem value="5000">Até 5.000 contatos</SelectItem>
              <SelectItem value="10000">Até 10.000 contatos</SelectItem>
              <SelectItem value="20000">Até 20.000 contatos</SelectItem>
              <SelectItem value="custom">Mais de 20.000 contatos</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="bg-card rounded-2xl p-4 md:p-6 shadow-[var(--shadow-card)]">
          <Label className="text-base md:text-lg font-semibold mb-4 block text-left">
            Escolha o período de pagamento
          </Label>
          <RadioGroup
            value={selectedPeriod}
            onValueChange={onPeriodChange}
            className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center"
          >
            <div className={cn(
              "flex items-center space-x-2 bg-background px-4 md:px-6 py-3 rounded-xl border-2 transition-colors cursor-pointer",
              selectedPeriod === "monthly" ? "border-primary" : "border-border"
            )}>
              <RadioGroupItem value="monthly" id="monthly" />
              <Label htmlFor="monthly" className="cursor-pointer font-medium text-sm md:text-base">
                Mensal
              </Label>
            </div>
            <div className={cn(
              "flex items-center space-x-2 bg-background px-4 md:px-6 py-3 rounded-xl border-2 transition-colors cursor-pointer",
              selectedPeriod === "semiannual" ? "border-primary" : "border-border"
            )}>
              <RadioGroupItem value="semiannual" id="semiannual" />
              <Label htmlFor="semiannual" className="cursor-pointer font-medium text-sm md:text-base">
                Semestral
              </Label>
            </div>
            <div className={cn(
              "flex items-center space-x-2 bg-background px-4 md:px-6 py-3 rounded-xl border-2 transition-colors cursor-pointer relative",
              selectedPeriod === "annual" ? "border-primary" : "border-border"
            )}>
              <RadioGroupItem value="annual" id="annual" />
              <Label htmlFor="annual" className="cursor-pointer font-medium text-sm md:text-base">
                Anual
              </Label>
              <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full font-bold">
                -10%
              </span>
            </div>
          </RadioGroup>
        </div>
      </div>
    </section>
  )
}
